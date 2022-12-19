<template>
  <div>
    <b-card title="মামলার স্লিপ ">
      <div class="crime-slip">
        <!-- select option -->
        <b-row class="text-center">
          <b-col cols="12">
            <p class="align-middle">ফরম-১১</p>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <p class="align-middle">[ বিধি ১৪ (৩) দ্রষ্টব্য ]</p>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <h5 class="align-middle">মামলার স্লিপ</h5>
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
                  <slot v-if="$store.state.userInfo.permissions.includes(34)">
                   <a href="#" v-b-modal.modal-1 @click="getCaseSlip(dataInfo.id)">
                      <icon name="credit-card" size="20px"/>
                    </a>
                  </slot>
                </td>
            </tr>
          </slot>
          </tbody>
          <tfoot>
            <tr>
                <th colspan="8">
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
        <!-- modal start here -->
        <b-modal id="modal-1" title="ফরম-১১" size="lg" margin="center" ok-only ok-variant="secondary" ok-title="Close">
          <b-row class="text-center">
            <b-col cols="12">
              <p class="align-middle">ফরম-১১</p>
            </b-col>
          </b-row>
          <b-row class="text-center">
            <b-col cols="12">
              <p class="align-middle">[ বিধি ১৪ (৩) দ্রষ্টব্য ]</p>
            </b-col>
          </b-row>
          <b-row class="text-center">
            <b-col cols="12">
              <h5 class="align-middle">মামলার স্লিপ</h5>
            </b-col>
          </b-row>

          <br /><br />
          <b-row class="text-center mt-4">
            <b-col cols="6">
              <p class="caseNo">
                <slot v-if="caseSlipInfo.union_info!=null">
                  {{caseSlipInfo.union_info.bn_name}}
                </slot>
              </p>
            </b-col>
            <b-col cols="6">
              <p class="">ইউনিয়ন/গ্রাম আদালত</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="2">
              <p class="">মামলার স্লিপ নং:</p>
            </b-col>
            <b-col cols="">
              <p class="caseNo">{{caseSlipInfo.id |banglaNumber}}</p>
            </b-col>
          </b-row>
          <b-row class="text-center mt-4">
            <b-col cols="2">
              <p class="">মামলার নম্বর :</p>
            </b-col>
            <b-col cols="">
              <p class="caseNo">{{caseSlipInfo.id |banglaNumber}}</p>
            </b-col>
            <b-col cols="2">
              <p class="">মামলার ধরন :</p>
            </b-col>
            <b-col cols="2">
              <p class="caseNo">{{caseSlipInfo.caseType}}</p>
            </b-col>
            <b-col cols="2">
              <p class="">মামলা গ্রহনের তারিখ :</p>
            </b-col>
            <b-col cols="2">
              <p class="caseNo">{{caseSlipInfo.acceptDate |formatDateBd}}</p>
            </b-col>
          </b-row>

          <b-row class="text-center mt-4">
            <b-col cols="4">
              <p class="Applicants">আবেদনকারী :</p>
            </b-col>
            <b-col cols="8">
              <p class="caseNo">
                <slot v-for="applicantInfo,applicantIndex in caseSlipInfo.applicant_infos">
                    {{applicantInfo.name+'-'+applicantInfo.phone}},
                </slot>
              </p>
            </b-col>
          </b-row>
          <b-row class="text-center mt-4">
            <b-col cols="4">
              <p class="Applicants">প্রতিবাদী :</p>
            </b-col>
            <b-col cols="8">
              <p class="caseNo">
                  <slot v-for="oppositorInfo,oppositorIndex in caseSlipInfo.oppositor_infos">
                     {{oppositorInfo.name+'-'+oppositorInfo.phone}},
                  </slot>
              </p>
            </b-col>
          </b-row>
          <b-row class="text-center mt-4">
            <b-col cols="6">
              <p class="">মামলার আগামী তারিখ :</p>
            </b-col>
            <b-col cols="4">
              <p class="caseNo">
                <slot v-if="caseSlipInfo.next_date_info!=null">
                  {{caseSlipInfo.next_date_info.attendDate |formatDateBd}}
                </slot>
                 <!-- <icon name="calendar" size="20px" /> -->
              </p>
            </b-col>
          </b-row>
          <b-form-group>
            
            <b-row class="text-center mt-4">
              <b-col cols="6">
                <b-form-checkbox value="1" @change="checkReasons(1)">
                  প্রতিবাদীর জবাব প্রদানের জন্য :</b-form-checkbox
                >
              </b-col>
              <b-col cols="6">
                <b-form-checkbox value="2" @change="checkReasons(2)"> সাক্ষ্য গ্রহনের জন্য :</b-form-checkbox>
              </b-col>
            </b-row>
            <b-row class="text-center mt-4">
              <b-col cols="6">
                <b-form-checkbox value="3" @change="checkReasons(3)"> আপোষ-নিষ্পত্তির জন্য :</b-form-checkbox>
              </b-col>
              <b-col cols="6">
                <b-form-checkbox value="4" @change="checkReasons(4)"> শুনানীর জন্য :</b-form-checkbox>
              </b-col>
            </b-row>
            <b-row class="text-center mt-4">
              <b-col cols="6">
                <b-form-checkbox value="5" @change="checkReasons(5)"> সিদ্ধান্ত গ্রহনের জন্য :</b-form-checkbox>
              </b-col>
            </b-row>
          </b-form-group>
          <br />
          <br />
          <b-row cols="1" cols-sm="2" class="text-center mt-5">
            <b-col>
              <div class="underline"></div>
              <br />
              <p class="underlinep">তারিখ: {{currentDate() |formatDateBd}}</p>
              <p class="underlinep">সীলমোহর</p>
            </b-col>
            <b-col>
              <div class="underline"></div>
              <br />
              <p class="underlinep">গ্রাম আদালত/ইউনিয়ন পরিষদ</p>
              <p class="underlinep">এর চেয়ারম্যানের স্বাক্ষর</p>
            </b-col>
          </b-row>
          <div class="printfile mt-5">
           
            <slot v-if="$store.state.userInfo.permissions.includes(34)">
            <a href="#" @click="printCaseSlip()">
              <icon name="print" size="20px"
            /></a>
          </slot>
          </div>
        </b-modal>
      </div>
    </b-card>

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

          <b-row class="text-center">
            <b-col cols="12">
              <p class="align-middle">ফরম-১১</p>
            </b-col>
          </b-row>
          <b-row class="text-center">
            <b-col cols="12">
              <p class="align-middle">[ বিধি ১৪ (৩) দ্রষ্টব্য ]</p>
            </b-col>
          </b-row>
          <b-row class="text-center">
            <b-col cols="12">
              <h5 class="align-middle">মামলার স্লিপ</h5>
            </b-col>
          </b-row>

          <br /><br />
          <b-row class="text-center mt-4">
            <b-col cols="6">
              <p class="caseNo">
                <slot v-if="caseSlipInfo.union_info!=null">
                  {{caseSlipInfo.union_info.bn_name}}
                </slot>
              </p>
            </b-col>
            <b-col cols="6">
              <p class="">ইউনিয়ন/গ্রাম আদালত</p>
            </b-col>
          </b-row>
          <b-row>
             <b-col cols="2">
              <p class="">মামলার স্লিপ নং:</p>
            </b-col>
            <b-col cols="">
              <p class="caseNo">{{caseSlipInfo.id |banglaNumber}}</p>
            </b-col>
          </b-row>
          <b-row class="text-center mt-4">
            <b-col cols="2">
              <p class="">মামলার নম্বর :</p>
            </b-col>
            <b-col cols="">
              <p class="caseNo">{{caseSlipInfo.id |banglaNumber}}</p>
            </b-col>
            <b-col cols="2">
              <p class="">মামলার ধরন :</p>
            </b-col>
            <b-col cols="2">
              <p class="caseNo">{{caseSlipInfo.caseType}}</p>
            </b-col>
            <b-col cols="2">
              <p class="">মামলা গ্রহনের তারিখ :</p>
            </b-col>
            <b-col cols="2">
              <p class="caseNo">{{caseSlipInfo.acceptDate |formatDateBd}}</p>
            </b-col>
          </b-row>

          <b-row class="text-center mt-4">
            <b-col cols="4">
              <p class="Applicants">আবেদনকারী :</p>
            </b-col>
            <b-col cols="8">
              <p class="caseNo">
                <slot v-for="applicantInfo,applicantIndex in caseSlipInfo.applicant_infos">
                    {{applicantInfo.name+'-'+applicantInfo.phone}},
                </slot>
              </p>
            </b-col>
          </b-row>
          <b-row class="text-center mt-4">
            <b-col cols="4">
              <p class="Applicants">প্রতিবাদী :</p>
            </b-col>
            <b-col cols="8">
              <p class="caseNo">
                <slot v-for="oppositorInfo,oppositorIndex in caseSlipInfo.oppositor_infos">
                     {{oppositorInfo.name+'-'+oppositorInfo.phone}},
                  </slot>
              </p>
            </b-col>
          </b-row>
          <b-row class="text-center mt-4">
            <b-col cols="6">
              <p class="">মামলার আগামী তারিখ :</p>
            </b-col>
            <b-col cols="4">
              <p class="caseNo">
                <slot v-if="caseSlipInfo.next_date_info!=null">
                  {{caseSlipInfo.next_date_info.attendDate |formatDateBd}}
                </slot>
              </p>
            </b-col>
          </b-row>
          <b-form-group>
            <b-row class="text-center mt-4">
              <b-col cols="6">
                <b-form-checkbox :checked="checkReasonsExists(1)">
                  প্রতিবাদীর জবাব প্রদানের জন্য :</b-form-checkbox
                >
              </b-col>
              <b-col cols="6">
                <b-form-checkbox :checked="checkReasonsExists(2)"> সাক্ষ্য গ্রহনের জন্য :</b-form-checkbox>
              </b-col>
            </b-row>
            <b-row class="text-center mt-4">
              <b-col cols="6">
                <b-form-checkbox :checked="checkReasonsExists(3)"> আপোষ-নিষ্পত্তির জন্য :</b-form-checkbox>
              </b-col>
              <b-col cols="6">
                <b-form-checkbox :checked="checkReasonsExists(4)"> শুনানীর জন্য :</b-form-checkbox>
              </b-col>
            </b-row>
            <b-row class="text-center mt-4">
              <b-col cols="6">
                <b-form-checkbox :checked="checkReasonsExists(5)"> সিদ্ধান্ত গ্রহনের জন্য :</b-form-checkbox>
              </b-col>
            </b-row>
          </b-form-group>
          <br />
          <br />
          <b-row cols="1" cols-sm="2" class="text-center mt-5">
            <b-col>
              <div class="underline"></div>
              <br />
              <p class="underlinep">তারিখ: {{date |formatDateBd}}</p>
              <p class="underlinep">সীলমোহর</p>
            </b-col>
            <b-col>
              <div class="underline"></div>
              <br />
              <p class="underlinep">গ্রাম আদালত/ইউনিয়ন পরিষদ</p>
              <p class="underlinep">এর চেয়ারম্যানের স্বাক্ষর</p>
            </b-col>
          </b-row>
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
      caseSlipInfo:[],
      reasons:[],
      
      districtList:[],
      upazilaList:[],
      unionList:[],
      district:'',
      upazila:'',
      union:'',
      startDate:'',
      endDate:'',
    };
  },
  beforeMount(){
    // this.getDataList();
     // this.getUpazilaList();
     //  this.getUnionList();
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
    async printCaseSlip(){
      let token=window.localStorage.getItem("token");
      let config = {
                 headers: {
                    'Authorization': 'Bearer '+token
                }   
            };
      
      let url="staff/print/case/slip";
      let formData=new FormData();
      formData.append("caseId",this.caseSlipInfo.id);
      formData.append("reasons",this.reasons);
      if(this.caseSlipInfo.next_date_info!=null)
          formData.append("nextDate",this.caseSlipInfo.next_date_info.attendDate);

      await this.$http.post(url,formData,config)
       .then(response=>{
          if(response.data.msgFlag==true){
            this.$toaster.success(response.data.msg);
            this.generateReport();
          }
          if(response.data.errMsgFlag==true)
            this.$toaster.warning(response.data.errMsg);
       })
       .catch(error=>{console.dir(error)})
       .finally();
    },
    checkReasonsExists(reasonId){
      if(this.reasons.includes(reasonId))
        return true;
      else
        return false;
    },
    checkReasons(reasonId){
      if(this.reasons.includes(reasonId)){
          let index=this.reasons.indexOf(reasonId);
          this.reasons.splice(index,1);
          
      }
      else{
        this.reasons.push(reasonId);
        
      }
    },
    async getCaseSlip(caseId){
      this.reasons=[];
      let token=window.localStorage.getItem("token");
        let config = {
                   headers: {
                      'Authorization': 'Bearer '+token
                  }   
              };
        
        let url="staff/get/case/slip/info?caseId="+caseId;

        await this.$http.get(url,config)
         .then(response=>{
            if(response.data.msgFlag==true){
              this.caseSlipInfo=response.data.dataInfo;
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
        
        let url="staff/get/case/list?page="+this.pageNo+"&numOfData="+this.numOfData+"&status="+this.status+"&searchKey="+this.searchKey+"&unionId="+this.union+"&upazilaId="+this.upazila;

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
    async beforeDownload(){},
    onProgress(){},
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
      // this.printCaseSlip();
    },
    changeView() {
      this.listShow = !this.listShow;
    },
     currentDate() {
      return new Date();
      // const current = new Date();
      // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      // return date;
    }
  },
};
</script>

<style lang="scss" scoped>
.crime-slip {
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
.table td {
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

//modal css hare

.text-center {
  .align-middle {
    text-align: center !important;
  }
  width: 100%;
  font-size: 14px;
  font-weight: 700;
  text-align: left !important;
}
.caseNo,
.caseNo2 {
  background-color: rgb(231, 231, 231);
  text-align: center !important;
}

.text-center button {
  float: right;
}
.underline {
  width: 250px;
  height: 1px;
  background-color: gray;
  margin: auto;
  text-align: center !important;
}
.underlinep {
  text-align: center !important;
}
.printfile {
  width: 50px;
  height: 50px;
  background-color: rgb(224, 224, 224);
  color: rgb(0, 97, 0);
  font-size: 25px;
  padding: 5px;
  text-align: center;
  float: right;
}
.Applicants {
  text-align: right;
}
//pdf design hare
.pdfrmargin {
  margin: 200px 100px 100px 100px !important;
  font-size: 10px;
}
</style>