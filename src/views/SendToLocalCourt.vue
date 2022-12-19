<template>
  <div class="send-to-higher-court">
    <b-card title="উচ্চ আদালতে পাঠানো মামলা">
      <div class="send-to-higher-court">
        <!-- Main Table Start Hare -->
        <b-row class="text-center">
          <b-col cols="12">
            <p class="align-center">ফরম-২১</p>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <p class="align-middle">[ বিধি ৩৬ (৫) দ্রষ্টব্য ]</p>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <h5 class="align-middle">উচ্চ আদালতে পাঠানো মামলা</h5>
          </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-input-group prepend="মামলা নং" class="mb-2 mr-sm-2 mb-sm-0">
                 <input type="text" class="form-control" v-model="searchKey" placeholder="মামলা নং" v-on:keyup.enter="getDataList()">
                </b-input-group>
            </b-col>
            <b-col>
                <b-input-group prepend="শুরু তারিখ" class="mb-2 mr-sm-2 mb-sm-0">
                  <input type="date" name="startDate" v-model="startDate" class="form-control" placeholder="শুরু তারিখ" @input="getDataList">
                </b-input-group>
            </b-col>
            <b-col>
                <b-input-group prepend="শেষ তারিখ" class="mb-2 mr-sm-2 mb-sm-0">
                  <input type="date" name="endDate" v-model="endDate" class="form-control" placeholder="শেষ তারিখ" @input="getDataList">
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
            <!-- <tr>
            <th colspan="4">
                <input v-model="searchKey" placeholder="মামলার নং" v-on:keyup.enter="getRequestedAttendList()" class="form-control" />
            </th>
            <th colspan="2">
                <slot v-if="this.$store.state.userInfo.permissions.includes(999)">
                    <select v-model="upazila" class="form-control" @change="getDataList();filterUnionList();">
                        <slot v-for="upazilaInfo,upazilaIndex in upazilaList">
                            <option :value="upazilaInfo.id">{{upazilaInfo.bn_name}}</option>
                        </slot>
                    </select>
                </slot>
            </th>
            <th colspan="2">
                <slot v-if="this.$store.state.userInfo.permissions.includes(888)">
                    <select v-model="union" class="form-control" @change="getDataList()">
                        <slot v-for="unionInfo,unionIndex in unionList">
                            <option :value="unionInfo.id">{{unionInfo.bn_name}}</option>
                        </slot>
                    </select>
                </slot>
            </th>
            <th colspan="2">
                <button type="button" class="btn btn-success" @click="getRequestedAttendList()">অনুসন্ধান করুন</button>
            </th>
        </tr> -->
            <tr>
              <th scope="col">মামলার নম্বর:</th>
              <th scope="col">মামলা গ্রহনের তারিখ:</th>
              <th>ইউনিয়ন,উপজেলা,জেলা</th>
              <th scope="col">আবেদনকারীর নাম:</th>
              <th scope="col">প্রতিবাদীর নাম:</th>
              <th scope="col">স্বাক্ষীগণের নাম:</th>
              <th scope="col">বিরোদের বিষয়বস্তু:</th>
              <th scope="col">উচ্চ আদালতে পাঠানোর তারিখ:</th>
              <th scope="col">মন্তব্য:</th>
              <th scope="col">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            <slot v-for="dataInfo,dataIndex in dataList.data">
              <tr :class="(++dataIndex%2==0) ? 'table-primary':''">
                <td scope="row">{{dataInfo.id |banglaNumber}}</td>
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
                    <slot v-if="dataInfo.higher_court_info!=null">
                        {{dataInfo.higher_court_info.created_at | formatDateBd}}
                    </slot>
                </td>
                <td>
                    <slot v-if="dataInfo.higher_court_info!=null">
                        উচ্চ আদালতে পাঠানো হয়েছে।
                    </slot>
                    <slot v-else>
                        <span class="text-danger">
                        উচ্চ আদালতে পাঠানো নি।
                      </span>
                    </slot>
                </td>
                <td>
                  <slot v-if="$store.state.userInfo.permissions.includes(30)">
                    <a href="#" @click="prepareCaseToHighCourt(dataInfo)">
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
      <!-- LIST SHOW START HARE-->
      <slot v-if="listShow">
        <div class="crime-place mt-5">
          <b-row class="text-center">
            <b-col cols="12">
              <h5 class="align-middle">বিরোধের স্থান:</h5>
            </b-col>
          </b-row>
          <br />
          <br />
          <!--loaction -->
          <b-row cols="1" cols-sm="4" class="justify-content-md-center">
            <b-col>
              <div class="division">
                <div class="label">বিভাগ</div>
                <select
                  class="form-select"
                  ref="division"
                  aria-label="Default select example"
                >
                  <option selected>ঢাকা</option>
                </select>
              </div>
            </b-col>
            <b-col>
              <div class="district">
                <div class="label">জেলা</div>
                <select
                  class="form-select"
                  ref="district"
                  aria-label="Default select example"
                >
                  <option selected>ঢাকা</option>
                </select>
              </div>
            </b-col>
            <b-col>
              <div class="sub-district">
                <div class="label">উপজেলা</div>
                <select
                  class="form-select"
                  ref="subdistrict"
                  aria-label="Default select example"
                >
                  <option selected>সাভার</option>
                </select>
              </div>
            </b-col>
            <b-col>
              <div class="union">
                <div class="label">ইউনিয়ন</div>
                <select
                  class="form-select"
                  ref="union"
                  aria-label="Default select example"
                >
                  <option selected>তেঁতুলঝোড়া</option>
                </select>
              </div>
            </b-col>
          </b-row>
        </div>
        <b-row class="text-center mt-5">
          <b-col cols="2">
            <p class="">মামলার নম্বর :</p>
          </b-col>
          <b-col cols="">
            <p class="caseNo">{{caseInfos.id | banglaNumber}}</p>
          </b-col>
          <b-col cols="2">
            <p class="">মামলার ধরন :</p>
          </b-col>
          <b-col cols="2">
            <p class="caseNo">{{caseInfos.caseType}}</p>
          </b-col>
          <b-col cols="2">
            <p class="">মামলা গ্রহনের তারিখ :</p>
          </b-col>
          <b-col cols="2">
            <p class="caseNo">{{caseInfos.acceptDate | formatDateBd}}</p>
          </b-col>
        </b-row>
         <b-row class="borabor mt-3">
          <b-col>
            <p class="">বরাবর ,</p>
            <p class=""> সিনিয়র জুডিসিয়াল ম্যাজিট্রেট আদালত । </p>
          </b-col>
        </b-row>
        <b-row class="boraborSub mt-3">
          <b-col>
            <p class="">বিষয়: সুবিচারের উদ্দেশ্যে হস্তান্তর প্রসঙ্গে ।</p>
          </b-col>
        </b-row>
        <b-row class="Despcription mt-3">
          <b-col>
            <p class="">
              আপনার অবগতির জন্য জানানো যাইতেছে যেহুতু গ্রাম আদালতের নিকট প্রতীয়মান হইতেছে যে ,<span
                style="font-weight: 800"
              >
                <slot v-for="applicantInfo in caseInfos.applicant_infos">
                    {{applicantInfo.name}}
                </slot>
              </span>
              আবেদনকারী বনাম
              <span style="font-weight: 800">
                <slot v-for="oppositorInfo in caseInfos.oppositor_infos">
                    {{oppositorInfo.name}}
                </slot>
               </span> প্রতিবাদী,
              মামলার ধরন <span style="font-weight: 800"> {{caseInfos.caseType}} </span> এর
              <span style="font-weight: 800"> {{caseInfos.caseTitle}} </span> সংক্রান্ত
              দরখাস্ত/নালিশের পরিপ্রেক্ষিতে অভিযুক্ত ব্যাক্তির অপরাধ গুরুতর ও তাহাকে গ্রাম আদালত এর বিচার কার্য পরিচালনায় কেবল জরিমানা করিলেও সুস্থ ও ন্যায় বিচার করা সম্ভব নয়। তাহার অধিকতর শাস্তি হওয়া উচিত।
            </p>
          </b-col>
        </b-row>
      
        <b-row class="Despcription mt-3">
          <b-col>
            <p class="">
             সেইহেতু ,আমরা এতদ্বারা মামলটি আপনার নিকট প্রেরণ করিতেছি এবং আপনার আদালতে উহার বিচার ও নিস্পত্তি করিতে আপনাকে অনুরোধ করিতেছি ।
            </p>
          </b-col>
        </b-row>


        <b-row class="text-center mt-5">
          <b-col cols="6">
            <div class="printfile">
              <slot v-if="$store.state.userInfo.permissions.includes(30)">
              <a href="#" @click="sendToHighCourt()">
                <icon name="print" size="20px"
              /></a>
            </slot>
            </div>
          </b-col>
          <b-col cols="6">
            <!-- <button type="button" class="btn btn-success">সেভ করুন</button> -->
          </b-col>
        </b-row>
      </slot>
    </b-card>
    <!-- PDF Content Here -->
    <div class="pdfmargin">
      <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1000"
        filename="caseSlipDownloadpdf"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="portrait"
        pdf-content-width="800px"
        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
      >
        <section slot="pdf-content" class="pdfrmargin">
          <b-row class="text-center">
            <b-col cols="12">
              <p class="align-middle">ফরম-২১</p>
            </b-col>
          </b-row>
          <b-row class="text-center">
            <b-col cols="12">
              <p class="align-middle">[ বিধি ১০ (৫) দ্রষ্টব্য ]</p>
            </b-col>
          </b-row>
          <b-row class="text-center">
            <b-col cols="12">
              <h5 class="align-middle">উচ্চ আদালতে পাঠানো মামলা</h5>
            </b-col>
          </b-row>
          <b-row class="text-center mt-4">
            <b-col cols="4">
            </b-col>
            <b-col cols="4">
              <p class="caseNo">তেঁতুলঝোড়া</p>
            </b-col>
            <b-col cols="4">
              <p class="">ইউনিয়ন/গ্রাম আদালত</p>
            </b-col>
          </b-row>
          <b-row class="text-center mt-1">
            <b-col cols="3">
              <p class="">মামলার নম্বর :</p>
            </b-col>
            <b-col cols="3">
              <p class="caseNo">{{caseInfos.id |banglaNumber}}</p>
            </b-col>
            <b-col cols="3">
              <p class="">মামলার ধরন :</p>
            </b-col>
            <b-col cols="3">
              <p class="caseNo">{{caseInfos.caseType}}</p>
            </b-col>
          </b-row>
          <b-row class="boraborSubPDF mt-3">
            <b-col>
              <p >বরাবর ,</p>
              <p> সিনিয়র জুডিসিয়াল ম্যাজিট্রেট আদালত । </p>
              <p style="font-weight: 800">
                বিষয়: সুবিচারের উদ্দেশ্যে হস্তান্তর প্রসঙ্গে ।
              </p>
            </b-col>
          </b-row>
          <b-row class="DespcriptionPDF mt-2">
            <b-col>
              <p class="">
              আপনার অবগতির জন্য জানানো যাইতেছে যেহুতু গ্রাম আদালতের নিকট প্রতীয়মান হইতেছে যে ,<span
                style="font-weight: 800"
              >
                <slot v-for="applicantInfo in caseInfos.applicant_infos">
                    {{applicantInfo.name}}
                </slot>
              </span>
              আবেদনকারী বনাম
              <span style="font-weight: 800"> 
                <slot v-for="oppositorInfo in caseInfos.oppositor_infos">
                    {{oppositorInfo.name}}
                </slot>
              </span> প্রতিবাদী,
              মামলার ধরন <span style="font-weight: 800"> {{caseInfos.caseType}} </span> এর
              <span style="font-weight: 800"> {{caseInfos.caseTitle}}</span> সংক্রান্ত
              দরখাস্ত/নালিশের পরিপ্রেক্ষিতে অভিযুক্ত ব্যাক্তির অপরাধ গুরুতর ও তাহাকে গ্রাম আদালত এর বিচার কার্য পরিচালনায় কেবল জরিমানা করিলেও সুস্থ ও ন্যায় বিচার করা সম্ভব নয়। তাহার অধিকতর শাস্তি হওয়া উচিত।
            </p>
            </b-col>
          </b-row>
        <b-row class="DespcriptionPDF mt-2">
            <b-col>
              <p class="">
                সেইহেতু ,আমরা এতদ্বারা মামলটি আপনার নিকট প্রেরণ করিতেছি এবং আপনার আদালতে উহার বিচার ও নিস্পত্তি করিতে আপনাকে অনুরোধ করিতেছি ।
              </p>
          </b-col>
        </b-row>
        <br> <br> <br> <br>
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
        
        districtList:[],
        upazilaList:[],
        unionList:[],
        upazila:'',
        union:'',
        startDate:'',
        endDate:'',
    };
  },
  beforeMount(){
    this.getDataList();
     this.getUpazilaList();
        this.getUnionList();
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
    async sendToHighCourt (){
      let token=window.localStorage.getItem("token");
        let config = {
                   headers: {
                      'Authorization': 'Bearer '+token
                  }   
              };
        
        let url="staff/send/case/to/high/court";
        let formData=new FormData();
        formData.append("caseId",this.caseInfos.id);

        await this.$http.post(url,formData,config)
         .then(response=>{
            if(response.data.msgFlag==true){
              this.$toaster.success(response.data.msg);
              this.getDataList();
              this.generateReport();
            }
            if(response.data.errMsgFlag==true)
              this.$toaster.warning(response.data.errMsg);
         })
         .catch(error=>{console.dir(error)})
         .finally();
    },
    prepareCaseToHighCourt(dataInfo){
      this.caseInfos=dataInfo;
      this.listShow=true;
    },
    async getDataList(){
        let token=window.localStorage.getItem("token");
        let config = {
                   headers: {
                      'Authorization': 'Bearer '+token
                  }   
              };
        
        let url="staff/get/case/list/for/higher/court?page="+this.pageNo+"&numOfData="+this.numOfData+"&status="+this.status+"&searchKey="+this.searchKey;

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
.send-to-higher-court {
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
  .selection_persons {
    float: right;
    border: 1px solid #bcbcbc;
    padding: 10px;
    font-size: 15px;
  }
  width: 89.3%;
  margin-top: 50px;
  font-size: 12px;
  margin-left: 10px;
}
.label {
  font-size: 18px;
  text-align: center;
}
.text-center {
  width:92%;
  font-size: 16px;
  font-weight: 500;
}
.borabor {
  width: 91%;
  font-size: 18px;
  font-weight: 500;
  margin-left: 70px;
}
.boraborSub {
  width: 91%;
  font-size: 18px;
  font-weight: 700;
  margin-left: 70px;
}
.Despcription {
  width: 85%;
  font-size: 18px;
  margin-left: 70px;
}
.Date_time{
    width: 85%;
    margin-left: 70px;
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
.Applicants {
  text-align: right;
}
//pdf design hare
.pdfrmargin {
    .text-center{
        font-size: 14px !important;
    }
  margin: 250px 50px 50px 80px !important;
  font-size: 14px !important;
}
.boraborSubPDF {
  width: 100%;
  font-size: 14px;
  margin-left: 15px;
}
.DespcriptionPDF {
  width: 100%;
  font-size: 14px;
  margin-left: 15px;
}
.ApplicantPDF {
  width: 100% !important;
  font-size: 14px;
}
.underline {
  width: 250px;
  height: 1px;
  background-color: rgb(34, 34, 34);
  margin: auto;
  text-align: center !important;
  margin-bottom: 0px;
}
.underlinep {
  text-align: center !important;
  font-size: 14px;
  margin-bottom: 0px;
}
</style>