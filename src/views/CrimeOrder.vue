<template>
  <div>
  <b-card title="মামলার আদেশনামা ">
    <div class="crime-order">
      <!-- <CreateApplication/> -->
      <b-row class="text-center">
        <b-col cols="12">
          <p class="align-center">ফরম-৩</p>
        </b-col>
      </b-row>
      <b-row class="text-center">
        <b-col cols="12">
          <p class="align-middle">[ বিধি ৫ (২) দ্রষ্টব্য ]</p>
        </b-col>
      </b-row>
      <b-row class="text-center">
        <b-col cols="12">
          <h5 class="align-middle">মামলার আদেশনামা</h5>
        </b-col>
      </b-row>
      <b-row class="text-center">
        <b-col cols="12">
          <h6 class="align-middle">( আবেদনকারী, প্রতিবাদী )</h6>
        </b-col>
      </b-row>
      
      <b-row>
            <b-col>
                <b-input-group prepend="মামলা নং" class="mb-2 mr-sm-2 mb-sm-0">
                 <input type="text" class="form-control" v-model="searchKey" placeholder="মামলা নং" v-on:keyup.enter="getDataList()">
                </b-input-group>
            </b-col>
            
        <slot v-if="$store.state.userInfo.permissions.includes(777)">
            <b-col>
                <b-input-group prepend="জেলা" class="mb-2 mr-sm-2 mb-sm-0">
                  
                    <select v-model="district" class="form-control" @change="getUpazilaList(); getDataList();">
                        <slot v-for="districtInfo,districtIndex in districtList">
                            <option :value="districtInfo.id">{{districtInfo.bn_name}}</option>
                        </slot>
                    </select>
                
                </b-input-group>
            </b-col>
        </slot>
        <slot v-if="$store.state.userInfo.permissions.includes(999)">
            <b-col>
                <b-input-group prepend="উপজেলা" class="mb-2 mr-sm-2 mb-sm-0">
                  <slot v-if="$store.state.userInfo.permissions.includes(999)">
                    <select v-model="upazila" class="form-control" @change="getUnionList(); getDataList();">
                        <slot v-for="upazilaInfo,upazilaIndex in upazilaList">
                            <option :value="upazilaInfo.id">{{upazilaInfo.bn_name}}</option>
                        </slot>
                    </select>
                </slot>
                </b-input-group>
            </b-col>
        </slot>
        <slot v-if="$store.state.userInfo.permissions.includes(888)">
            <b-col>
                <b-input-group prepend="ইউনিয়ন" class="mb-2 mr-sm-2 mb-sm-0">
                    <select v-model="union" class="form-control" @change="getDataList()">
                        <slot v-for="unionInfo,unionIndex in unionList">
                            <option :value="unionInfo.id">{{unionInfo.bn_name}}</option>
                        </slot>
                    </select>
                </b-input-group>
            </b-col>
        </slot>
            <b-col>
                <b-button variant="danger" @click="resetForm();getDataList;">মুছুন</b-button>
                <b-button variant="info" @click="getDataList" class="ml-4">অনুসন্ধান করুন</b-button>
            </b-col>
            
        </b-row>

      <table class="table">
        <thead>
          
          <tr>
            <th scope="col">মামলার নম্বর:</th>
            <th scope="col">মামলা গ্রহনের তারিখ:</th>
            <th>ইউনিয়ন,উপজেলা,জেলা</th>
            <th scope="col">আবেদনকারীর নাম:</th>
            <th scope="col">প্রতিবাদীর নাম:</th>
            <th scope="col">স্বাক্ষীগণের নাম:</th>
            <th scope="col">বিরোদের বিষয়বস্তু:</th>
            <th scope="col">মামলার আদেশের তারিখ:</th>
            <th scope="col">মন্তব্য:</th>
            <th scope="col">অ্যাকশন</th>
          </tr>
        </thead>
        <tbody>
          <slot v-for="dataInfo,dataIndex in dataList.data">
              <tr  :class="(dataIndex%2==0) ? 'table-primary':''">
                <th scope="row">{{dataInfo.id | banglaNumber}}</th>
                <td>{{dataInfo.acceptDate | formatDateBd}}</td>
                <td>
                    <slot v-if="dataInfo.union_info!=null">
                        {{dataInfo.union_info.bn_name}}<br>
                    </slot>
                    <slot v-if="dataInfo.upazila_info!=null">
                        {{dataInfo.upazila_info.bn_name}}<br>
                    </slot>
                    <slot v-if="dataInfo.district_info!=null">
                        {{dataInfo.district_info.bn_name}}<br>
                    </slot>
                </td>
                <td>
                    <slot v-for="applicantInfo,applicantIndex in dataInfo.applicant_infos">
                        {{++applicantIndex | banglaNumber}}. {{applicantInfo.name}}<br>
                    </slot>
                </td>
                <td>
                    <slot v-for="oppositorInfo,oppositorIndex in dataInfo.oppositor_infos">
                        {{++oppositorIndex | banglaNumber}}. {{oppositorInfo.name}}<br>
                    </slot>
                </td>
                <td>
                    <slot v-for="witnessInfo,witnessIndex in dataInfo.witness_infos">
                        {{++witnessIndex | banglaNumber}}. {{witnessInfo.name}}<br>
                    </slot>
                </td>
                <td style="max-width:30px;">{{dataInfo.caseTitle}}</td>
                <td>
                  <slot v-if="dataInfo.last_order!=null">
                    {{dataInfo.last_order.created_at |formatDateBd}}
                  </slot>
                </td>
                <td>
                  <slot v-if="dataInfo.last_order!=null">
                    {{dataInfo.last_order.comment}}
                  </slot>
                </td>
                <td>
                <slot v-if="$store.state.userInfo.permissions.includes(21) || $store.state.userInfo.permissions.includes(22)">
                  <a href="#" @click="showCaseOrderForm(dataInfo.id)" v-b-modal.data-view>
                    <icon name="eye" size="20px"
                  /></a>
                </slot>
                </td>
            </tr>
          </slot>
         
        </tbody>

        <tfoot>
            <tr>
                <th colspan="10">
                    <paginate
                      :page-count="lastPage"
                      :click-handler="dataByPaginate"
                      :prev-text="'<'"
                      :next-text="'>'"
                      :container-class="'pagination justify-content-end'"
                      :page-class="'page-item'"
                      :page-link-class="'page-link'"
                      :prev-class="'page-item'"
                      :prev-link-class="'page-link'"
                      :next-class="'page-item'"
                      :next-link-class="'page-link'"
                      :first-last-button="true"
                      :first-button-text="'<<'"
                      :last-button-text="'>>'"
                     
                      >

                     <span slot="prevContent">Changed previous button</span>
                      <span slot="nextContent">Changed next button</span>
                      <span slot="breakViewContent">
                        <svg width="16" height="4" viewBox="0 0 16 4">
                          <circle fill="#999999" cx="2" cy="2" r="2" />
                          <circle fill="#999999" cx="8" cy="2" r="2" />
                          <circle fill="#999999" cx="14" cy="2" r="2" />
                        </svg>
                      </span>
                    </paginate>
                </th>
            </tr>
        </tfoot>
      </table>
    </div>
  </b-card>

  <b-modal id="data-view" title="আবেদনের  বিবরণ" size="xl" ok-only ok-variant="secondary" ok-title="Close">
    <slot v-if="listShow">
      <div class="crime-place mt-5">
        <b-row class="text-center">
          <b-col cols="12">
            <h5 class="align-middle">বিরোধের স্থান:</h5>
          </b-col>
        </b-row>
        <br />
        <br />
        <b-row cols="1" cols-sm="4" class="justify-content-md-center">
          <b-col>
            <div class="division">
              <div class="label">বিভাগ</div>
              <slot v-if="caseInfos.division_info!=null">
                <span class="form-control">{{caseInfos.division_info.bn_name}}</span>
              </slot>
            </div>
          </b-col>
          <b-col>
            <div class="district">
              <div class="label">জেলা</div>
              <slot v-if="caseInfos.district_info!=null">
                <span class="form-control">{{caseInfos.district_info.bn_name}}</span>
              </slot>
            </div>
          </b-col>
          <b-col>
            <div class="sub-district">
              <div class="label">উপজেলা</div>
              <slot v-if="caseInfos.upazila_info!=null">
                <span class="form-control">{{caseInfos.upazila_info.bn_name}}</span>
              </slot>
            </div>
          </b-col>
          <b-col>
            <div class="union">
              <div class="label">ইউনিয়ন</div>
              <slot v-if="caseInfos.union_info!=null">
                <span class="form-control">{{caseInfos.union_info.bn_name}}</span>
              </slot>
            </div>
          </b-col>
        </b-row>
      </div>
      <b-row class="text-center mt-5">
        <b-col cols="2">
          <p class="">মামলার নম্বর :</p>
        </b-col>
        <b-col cols="">
          <p class="caseNo">{{caseInfos.id |banglaNumber}}</p>
        </b-col>
        <b-col cols="2">
          <p class="">মামলার ধরন :</p>
        </b-col>
        <b-col cols="2">
          <p class="caseNo">{{caseInfos.caseType }}</p>
        </b-col>
        <b-col cols="2">
          <p class="">মামলা গ্রহনের তারিখ :</p>
        </b-col>
        <b-col cols="2">
          <p class="caseNo">{{caseInfos.acceptDate |formatDateBd}}</p>
        </b-col>
      </b-row>
      <table class="Table">
        <Thead>
          <tr>
            <th scope="col">আদেশ নং: <br /></th>
            <th scope="col">আদেশর তারিখ: <br /></th>
            <th scope="col">আদেশের বিবরণ:</th>
            <th scope="col">জরিমানা:</th>
            <th scope="col">মন্তব্য: <br /></th>
            <th scope="col">স্বাক্ষর: <br /></th>
          </tr>
        </Thead>
        <tbody>

          <slot v-if="caseInfos!=null">
          <slot v-for="orderInfo,orderIndex in caseInfos.order_list">
            <tr>
              <td style="width: 150px">{{orderInfo.id |banglaNumber}}</td>
              <td style="width: 150px">{{orderInfo.created_at |formatDateBd }}</td>
              <td>
                {{orderInfo.details }}
              </td>
              <td>
                {{orderInfo.order_amount }}
              </td>
              <td style="width: 150px">
                {{orderInfo.comment}}
              </td>
              <td>
                <img src="https://www.seoclerk.com/pics/211935-1qeWBB1398605222.jpg" width="100">
              </td>
            </tr>
          </slot>
        </slot>
          <tr>
              <td style="width: 150px"></td>
              <td style="width: 150px">
                <input type="date" name="date" v-model="orderDate" class="form-control">
              </td>
              <td>
                <textarea
                  rows="8"
                  class="form-control"
                  placeholder="আদেশের বিবরণ লিখুন"
                  v-model="order"
                ></textarea>
              </td>
              <td>
                <input
                
                  class="form-control"
                  placeholder="জরিমানার টাকা লিখুন"
                  v-model="order_amount"
                />
              </td>
              <td style="width: 150px">
                <textarea
                  rows="8"
                  class="form-control"
                  placeholder="মন্তব্য:"
                  v-model="comment"
                ></textarea>
              </td>
              <td>
                <img src="https://www.seoclerk.com/pics/211935-1qeWBB1398605222.jpg" width="100">
              </td>
            </tr>
        
        </tbody>
      </table>
      <div class="status mt-5">
        <b-col>
          <b-row> শর্ত:</b-row>
          <b-row>
            <b-form-checkbox
              id="checkbox-1"
              v-model="condition"
              name="checkbox-1"

            >
              শুধু মাত্র স্বাক্ষী ও আবেদনকারীর হাজিরা উপস্থিতিতে রায় কাযকর হইবে।
              তবে প্রতিবাদীর প্রমান ও নথির আলোকে রায় পুনরায় বিবেচনা করা যাবে।
            </b-form-checkbox>
          </b-row>

          <!-- <div>
            Status: <strong>{{ status }}</strong>
          </div> -->
        </b-col>
      </div>
      <b-row class="text-center mt-5">
        <b-col cols="6">
          <div class="printfile">
            <slot v-if="$store.state.userInfo.permissions.includes(21)">
            <a href="#" @click="storeOrderInfo();generateReport();"> 
              <icon name="print" size="20px" />
            </a>
          </slot>
          </div>
        </b-col>
        <b-col cols="6">
          <slot v-if="$store.state.userInfo.permissions.includes(22)">
            <button type="button" class="btn btn-success" @click="storeOrderInfo()">সেভ করুন</button>
          </slot>
        </b-col>
      </b-row>
    </slot>
  </b-modal>
    <div class="pdfmargin">
      <vue-html2pdf
          :show-layout="false"
          :float-layout="true"
          :enable-download="false"
          :preview-modal="true"
          :paginate-elements-by-height="2480"
          filename="hee hee"
          :pdf-quality="2"
          :manual-pagination="false"
          pdf-format="a4"
          pdf-orientation="portrait"
          pdf-content-width="800px"
          @beforeDownload="beforeDownload($event)"
          @progress="onProgress($event)"
          @hasStartedGeneration="hasStartedGeneration()"
          @hasGenerated="hasGenerated($event)"
          ref="html2Pdf"
      >
        <section slot="pdf-content" class="pdfrmargin">
          <!-- PDF Content Here -->

          <div class="crime-place mt-5">
            <b-row class="text-center">
              <b-col cols="12">
                <h5 class="align-middle">বিরোধের স্থান:</h5>
              </b-col>
            </b-row>
            <br />
            <br />
            <b-row cols="1" cols-sm="4" class="justify-content-md-center">
              <b-col>
                <div class="division">
                  <div class="label">বিভাগ</div>
                  <slot v-if="caseInfos.division_info!=null">
                    <span class="form-control">{{caseInfos.division_info.bn_name}}</span>
                  </slot>
                </div>
              </b-col>
              <b-col>
                <div class="district">
                  <div class="label">জেলা</div>
                  <slot v-if="caseInfos.district_info!=null">
                    <span class="form-control">{{caseInfos.district_info.bn_name}}</span>
                  </slot>
                </div>
              </b-col>
              <b-col>
                <div class="sub-district">
                  <div class="label">উপজেলা</div>
                  <slot v-if="caseInfos.upazila_info!=null">
                    <span class="form-control">{{caseInfos.upazila_info.bn_name}}</span>
                  </slot>
                </div>
              </b-col>
              <b-col>
                <div class="union">
                  <div class="label">ইউনিয়ন</div>
                  <slot v-if="caseInfos.union_info!=null">
                    <span class="form-control">{{caseInfos.union_info.bn_name}}</span>
                  </slot>
                </div>
              </b-col>
            </b-row>
          </div>
          <b-row class="text-center mt-5">
            <b-col cols="2">
              <p class="">মামলার নম্বর :</p>
            </b-col>
            <b-col cols="">
              <p class="caseNo">{{caseInfos.id |banglaNumber}}</p>
            </b-col>
            <b-col cols="2">
              <p class="">মামলার ধরন :</p>
            </b-col>
            <b-col cols="2">
              <p class="caseNo">{{caseInfos.caseType }}</p>
            </b-col>
            <b-col cols="2">
              <p class="">মামলা গ্রহনের তারিখ :</p>
            </b-col>
            <b-col cols="2">
              <p class="caseNo">{{caseInfos.acceptDate |formatDateBd}}</p>
            </b-col>
          </b-row>
          <table class="Table">
            <Thead>
              <tr>
                <th scope="col">আদেশ নং: <br /></th>
                <th scope="col">আদেশর তারিখ: <br /></th>
                <th scope="col">আদেশের বিবরণ:</th>
                <th scope="col">মন্তব্য: <br /></th>
                <th scope="col">স্বাক্ষর: <br /></th>
              </tr>
            </Thead>
            <tbody>
           
            <slot v-if="caseInfos!=null">
              <slot v-for="orderInfo,orderIndex in caseInfos.order_list">
                <tr>
                  <td style="width: 150px">{{orderInfo.id |banglaNumber}}</td>
                  <td style="width: 150px">{{orderInfo.created_at |formatDateBd }}</td>
                  <td>
                    {{orderInfo.details }}
                  </td>
                  <td style="width: 150px">
                    {{orderInfo.comment}}
                  </td>
                  <td>
                    <img src="https://www.seoclerk.com/pics/211935-1qeWBB1398605222.jpg" width="100">
                  </td>
                </tr>
              </slot>
            </slot>
            </tbody>
          </table>
          <div class="status mt-5">
            <b-col>
              <b-row> শর্ত:</b-row>
              <b-row>
                <b-form-checkbox
                  id="checkbox-1"
                  v-model="condition"
                  name="checkbox-1"

                >
                  শুধু মাত্র স্বাক্ষী ও আবেদনকারীর হাজিরা উপস্থিতিতে রায় কাযকর হইবে।
                  তবে প্রতিবাদীর প্রমান ও নথির আলোকে রায় পুনরায় বিবেচনা করা যাবে।
                </b-form-checkbox>
              </b-row>

              <!-- <div>
                Status: <strong>{{ status }}</strong>
              </div> -->
            </b-col>
          </div>

        </section>
      </vue-html2pdf>
    </div>
</div>

</template>

<script>
import VueHtml2pdf from "vue-html2pdf";
export default {
  components: {
    VueHtml2pdf,
  },
  data() {
    return {
      listShow: false,
      dataList:[],
      msgFlag:false,
      errMsgFlag:false,
      msg:'',
      errMsg:'',
      pageNo:1,
      numOfData:10,
      status:2,
      searchKey:'',
      lastPage:1,
      caseInfos:[],
      comment:null,
      order:null,
      condition:null,
      
      districtList:[],
      upazilaList:[],
      unionList:[],
      district:'',
      upazila:'',
      union:'',
      startDate:'',
      endDate:'',
      orderDate:this.currentDate(),
    };
  },
  beforeMount(){
    // this.getDataList();
     // this.getUpazilaList();
     //    this.getUnionList();
    },
  mounted(){
      if(this.$store.state.userInfo.permissions.includes(777)){
         this.getDistrictList();
      }

      if(this.$store.state.userInfo.permissions.includes(999)){
          this.district=this.$store.state.userInfo.districtId;
          this.getUpazilaList();
      }

      if(this.$store.state.userInfo.permissions.includes(888)){
          this.upazila=this.$store.state.userInfo.upazilaId;
          this.getUnionList();
      }

      this.union=this.$store.state.userInfo.unionId;
      this.getDataList();
  },
  methods:{
    getUnionList(){
            this.unionList=[];
            this.union='';
            let url="frontend/get/active/union/list?upazila="+this.upazila;

             this.$http.get(url)
             .then(response=>{
              
                this.unionList=response.data;
                
             })
             .catch(error=>{console.dir(error)})
             .finally();
        },
     getUpazilaList(){
        this.unionList=[];
        this.union='';
        this.upazilaList=[];
        this.upazila='';
        let url="frontend/get/active/upazila/list?district="+this.district;

         this.$http.get(url)
         .then(response=>{
            
            this.upazilaList=response.data;
           
         })
         .catch(error=>{console.dir(error)})
         .finally();
    },

     getDistrictList(){
        this.upazilaList=[];
        this.upazila='';
        this.districtList=[];
        this.district='';
        this.unionList=[];
        this.union='';
        let url="frontend/get/active/district/list";

         this.$http.get(url)
         .then(response=>{
            this.districtList=response.data;
           
         })
         .catch(error=>{console.dir(error)})
         .finally();
    },
    resetForm(){
        this.startDate='';
        this.endDate='';
        this.upazila='';
        this.union='';
        this.district='';
        this.searchKey='';
    },
    async beforeDownload(){},
    onProgress(){},
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
    async storeOrderInfo(){
      let token=window.localStorage.getItem("token");
      let config = {
                 headers: {
                    'Authorization': 'Bearer '+token
                }   
            };
      
      let url="staff/store/case/order/info";
      let formData=new FormData();
      formData.append("caseId",this.caseInfos.id);
      formData.append("comment",this.comment);
      formData.append("details",this.order);
      formData.append("orderDate",this.orderDate);
      formData.append("order_amount",this.order_amount);
    
      if(this.condition != "") 
        formData.append("condition",1);
      else
        formData.append("condition",0); 

      await this.$http.post(url,formData,config)
       .then(response=>{
          if(response.data.msgFlag==true){
            this.$toaster.success(response.data.msg);
            this.showCaseOrderForm(this.caseInfos.id);
          }
          if(response.data.errMsgFlag==true)
            this.$toaster.warning(response.data.errMsg);
       })
       .catch(error=>{console.dir(error)})
       .finally();
    },
    async showCaseOrderForm(caseId){
      this.listShow=false;
      let token=window.localStorage.getItem("token");
      let config = {
                 headers: {
                    'Authorization': 'Bearer '+token
                }   
            };
      
      let url="staff/get/case/order/infos?caseId="+caseId;

      await this.$http.get(url,config)
       .then(response=>{
          if(response.data.msgFlag==true){
            this.listShow=true;
            this.caseInfos=response.data.dataInfo;
          }
          if(response.data.errMsgFlag==true)
            this.$toaster.warning(response.data.errMsg);
       })
       .catch(error=>{console.dir(error)})
       .finally();
    },
    async getDataList(){
        let token=window.localStorage.getItem("token");
        let config = {
                   headers: {
                      'Authorization': 'Bearer '+token
                  }   
              };
        
        let url="staff/get/case/list/for/order?page="+this.pageNo+"&numOfData="+this.numOfData+"&status="+this.status+"&searchKey="+this.searchKey+"&unionId="+this.union+"&upazilaId="+this.upazila;

        await this.$http.get(url,config)
         .then(response=>{
            this.dataList=response.data;
            this.lastPage=this.dataList.last_page;
         })
         .catch(error=>{console.dir(error)})
         .finally();
    },
    dataByPaginate(pageIndex){
        this.pageNo=pageIndex;
        this.getDataList();
    },
    changeView() {
      this.listShow = !this.listShow;

    },
    currentDate() {
      // return new Date();
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      return date;
    }
  },
};
</script>

<style lang="scss" scoped>
.crime-order {
  margin: 50px 0px 0px 50px;
}
.container-lg input {
  margin-top: 40px;
  margin-right: 20px;
  padding: 7px;
  background-color: rgb(219, 219, 219);
  border: 0px;
  color: #000;
  font-size: 1.1em;
  float: right;
  margin-bottom: 30px;
}
.container-lg button {
  float: right;
  margin-top: 40px;
  margin-bottom: 30px;
  margin-right: 34px;
}

.table thead {
  background-color: rgb(219, 219, 219);
  text-align: center;
}
.table tbody {
  background-color: rgb(220, 255, 231);
}
.table {
  width: 89.3%;
  margin-top: 50px;
  font-size: 14px;
  text-align: center;
}
.table td,
td {
  border: 0px solid #000;
}

// listShow start here
.crime-place {
  width: 89.3%;
  margin-top: 50px;
  font-size: 12px;
}
.label {
  font-size: 18px;
  text-align: center;
}
.text-center {
  width: 91%;
  font-size: 18px;
  font-weight: 700;
}
.caseNo,
.caseNo2 {
  background-color: rgb(231, 231, 231);
}
.align-middle {
  border: 0px solid #000;
}
.Table {
  width: 89.3%;
  margin-top: 50px;
  font-size: 16px;
  text-align: center;
}
.Table th,
td {
  border: 1px solid #000;
  padding: 12px;
}
.color {
  color: red;
}
.Table input {
  width: 89%;
  height: 300px;
  border: none;
}
.status strong {
  color: green;
}
.status {
  width: 100%;
  float: left;
  margin-left: 150px;
  font-size: 18px;
}
.text-center button {
  float: right;
}
.printfile {
  width: 50px;
  height: 50px;
  background-color: rgb(224, 224, 224);
  color: rgb(0, 97, 0);
  text-align: center;
  font-size: 25px;
  padding: 5px;
  float: right;
}
</style>