<template>
<div>
    <b-row>
        <b-col>
            <b-card  title="মামলার হাজিরা " >

                <div class="crime-attendance">
                     <!-- select option -->
                        <b-row class="text-center">
                                <b-col cols="12">
                                    <p class="align-center">ফরম-১০</p>
                                </b-col>
                        </b-row>
                        <b-row class="text-center">
                                <b-col cols="12">
                                    <p class="align-middle">[ বিধি ১৫ (৮) দ্রষ্টব্য ]</p>
                                </b-col>
                        </b-row>
                        <b-row class="text-center">
                                <b-col cols="12">
                                    <h5 class="align-middle">মামলার হাজিরা</h5>
                                </b-col>
                        </b-row>
                        <b-row class="text-center">
                                <b-col cols="12">
                                    <h6 class="align-middle">( আবেদনকারী, প্রতিবাদী ও সাক্ষীর হাজিরা )</h6>
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

                        <table class="table table-bordered table-hover">
                        <thead>
                            
                            <tr >
                            <th scope="col">মামলার নম্বর: </th>
                            <th scope="col">মামলা গ্রহনের তারিখ: </th>
                            <th>ইউনিয়ন<br>উপজেলা<br>জেলা</th>
                            <th scope="col">আবেদনকারীর নাম: </th>
                            <th scope="col">প্রতিবাদীর নাম: </th>
                            <th scope="col">স্বাক্ষীগণের নাম: </th>
                            <th scope="col">বিরোদের বিষয়বস্তু:</th>
                            <th scope="col">মামলার হাজিরা তারিখ:</th>
                            <th scope="col">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <slot v-for="dataInfo,dataIndex in dataList.data">
                               <!--  <pre>{{dataInfo}}</pre> -->
                                <tr :class="(dataIndex%2==0)?'table-primary':''">
                                    <td scope="row">{{dataInfo.caseId | banglaNumber}}</td>
                                    <td >
                                        <slot v-if="dataInfo.case_info!=null">
                                            {{dataInfo.case_info.acceptDate | formatDateBd}}
                                        </slot>
                                    </td>
                                    <td>
                                        <slot v-if="dataInfo.case_info!=null">
                                            <slot v-if="dataInfo.case_info.union_info!=null">
                                                {{dataInfo.case_info.union_info.bn_name}}<br>
                                            </slot>
                                        </slot>
                                        <slot v-if="dataInfo.case_info!=null">
                                            <slot v-if="dataInfo.case_info.upazila_info!=null">
                                                {{dataInfo.case_info.upazila_info.bn_name}}<br>
                                            </slot>
                                        </slot>
                                        <slot v-if="dataInfo.case_info!=null">
                                            <slot v-if="dataInfo.case_info.district_info!=null">
                                                {{dataInfo.case_info.district_info.bn_name}}<br>
                                            </slot>
                                        </slot>
                                    </td>
                                    <td>
                                        <slot v-if="dataInfo.case_info!=null">
                                            <slot v-for="applicantInfo,applicantIndex in dataInfo.case_info.applicant_infos">
                                               {{++applicantIndex | banglaNumber}}. {{applicantInfo.name}}<br>
                                            </slot>
                                        </slot> 
                                    </td>
                                    <td>
                                        <slot v-if="dataInfo.case_info!=null">
                                            <slot v-for="oppositorInfo,oppositorIndex in dataInfo.case_info.oppositor_infos">
                                               {{++oppositorIndex | banglaNumber}}. {{oppositorInfo.name}}<br>
                                            </slot>
                                        </slot> 
                                    </td>
                                    <td>
                                        <slot v-if="dataInfo.case_info!=null">
                                            <slot v-for="witnessInfo,witnessIndex in dataInfo.case_info.witness_infos">
                                               {{++witnessIndex | banglaNumber}}. {{witnessInfo.name}}<br>
                                            </slot>
                                        </slot> 
                                    </td>
                                    <td>
                                        <slot v-if="dataInfo.case_info!=null">
                                            {{dataInfo.case_info.caseTitle }}
                                        </slot>
                                    </td>
                                    <td>
                                        {{dataInfo.attendDate |formatDateBd}}
                                    </td>
                                    <td>
                                        <slot v-if="$store.state.userInfo.permissions.includes(12)">
                                            <a href="#" @click="prepareForAttendance(dataInfo.caseId);attendSheet=true;" v-b-modal.attendance-form-view> <icon name="eye" size="20px"/></a>
                                        </slot> 
                                    </td>
                                </tr>
                            </slot>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="9">
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
        </b-col>
    </b-row>

<b-modal id="attendance-form-view" title="আবেদনের  বিবরণ" size="xl" ok-only ok-variant="secondary" ok-title="Close">
    <slot v-if="attendSheet">
        <div class="crime-place mt-5" >
            
            <b-row class="text-center">
                    <b-col cols="12">
                        <h5 class="align-middle">বিরোধের স্থান:</h5>
                    </b-col>
                </b-row>
                    <br> <br>
                    <b-row cols="1" cols-sm="4" class="justify-content-md-center" >
                        <b-col>
                            <div class="division">
                                <div class="label">বিভাগ</div>
                                <slot v-if="summonDetails.case_info!=null">
                                    <slot v-if="summonDetails.case_info.division_info!=null">
                                        <span class="form-control">{{summonDetails.case_info.division_info.bn_name}}</span>
                                    </slot>
                                </slot>
                            </div>
                        </b-col>
                        <b-col>
                            <div class="district">
                                <div class="label">জেলা</div>
                                <slot v-if="summonDetails.case_info!=null">
                                    <slot v-if="summonDetails.case_info.district_info!=null">
                                        <span class="form-control">{{summonDetails.case_info.district_info.bn_name}}</span>
                                    </slot>
                                </slot>
                            </div>
                        </b-col>
                        <b-col>
                            <div class="sub-district">
                                <div class="label">উপজেলা</div>
                                <slot v-if="summonDetails.case_info!=null">
                                    <slot v-if="summonDetails.case_info.upazila_info!=null">
                                        <span class="form-control">{{summonDetails.case_info.upazila_info.bn_name}}</span>
                                    </slot>
                                </slot>
                            </div>
                        </b-col>
                        <b-col>
                            <div class="union">
                                <div class="label">ইউনিয়ন</div>
                                <slot v-if="summonDetails.case_info!=null">
                                    <slot v-if="summonDetails.case_info.union_info!=null">
                                        <span class="form-control">{{summonDetails.case_info.union_info.bn_name}}</span>
                                    </slot>
                                </slot>
                            </div>
                        </b-col>
                    </b-row>
                </div>
                <b-row class="text-center mt-5 " >
                            <b-col cols="2">
                                <p class="">মামলার নম্বর :</p>
                            </b-col>
                            <b-col cols="">
                                <p class="caseNo">{{summonDetails.caseId |banglaNumber}}</p>
                            </b-col>
                            <b-col cols="2">
                                <p class="">মামলার ধরন :</p>
                            </b-col>
                            <b-col cols="2">
                                <p class="caseNo">
                                    <slot v-if="summonDetails.case_info!=null">
                                        {{summonDetails.case_info.caseType}}
                                    </slot>
                                </p>
                            </b-col>
                            <b-col cols="2">
                                <p class="">মামলা গ্রহনের তারিখ :</p>
                            </b-col>
                            <b-col cols="2">
                                <p class="caseNo">
                                     <slot v-if="summonDetails.case_info!=null">
                                        {{summonDetails.case_info.acceptDate |formatDateBd}}
                                    </slot>
                                </p>
                            </b-col>
                        
                </b-row>
                <b-row>
                    <b-row class="text-center">
                        <b-col cols="12" >
                            <select class="align-middle form-control" v-model="attnederIndex" @change="addAttender()" style="border:1px solid black; border-radius:5px;">
                                <option v-for="attenderInfo,attnederIndex in attenderList" :value="attnederIndex">{{attenderInfo.name+" ("+attenderInfo.type+")"}}</option>
                            </select>
                        </b-col>
                    </b-row>
                </b-row>
                <table class="Table" >
                    <thead>
                        <tr>
                        <th scope="col">তারিখ: <br> </th>
                        <th scope="col">নাম: <br> </th>
                        <th scope="col">ধরন: <br> (আবেদনকারী/প্রতিবাদী/সাক্ষী)</th>
                        <th scope="col">স্বাক্ষর: <br> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <slot v-for="attendanceInfo,attendanceIndex in attendList">
                        <tr >
                            <td scope="row">{{summonDetails.attendDate |formatDateBd}}</td>
                            <td>
                                {{attendanceInfo.name}}
                            </td>
                            <td>
                                {{attendanceInfo.type}}
                                
                            </td>
                            <td>
                                <slot v-if="!attendanceInfo.preAttendedFlag">
                                    <a href="#" @click="removeAttender(attendanceIndex)" class="text-danger">
                                        <icon name="times" size="20px"/>
                                    </a>
                                </slot>
                            </td>
                        </tr>
                        </slot>
                    </tbody>
                </table>
                <!-- <div class="add-icon" @click="addApplicant('applicant')">
                        <b-icon icon="plus" scale="2"/>
                </div> -->
                <b-row class="text-center mt-5">
                        <b-col class="text-center d-flex flex-row-reverse"> 
                            <slot v-if="$store.state.userInfo.permissions.includes(13)">
                                <div class="printfile">
                                    <a href="#" @click="storeAttnderInfo()"> <icon name="print" size="20px"/></a>
                                </div>
                            </slot>
                        </b-col>
                        <!-- <b-col >
                            <button type="button" class="btn btn-success " > সেভ করুন </button>
                        </b-col> -->
                        
                </b-row>
      </slot>
</b-modal>
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
            <section slot="pdf-content">
                <!-- PDF Content Here -->
                    
                        <div class="crime-place mt-5" >
                            
                            <b-row class="text-center">
                                    <b-col cols="12">
                                        <h5 class="align-middle">বিরোধের স্থান:</h5>
                                    </b-col>
                                </b-row>
                                    <br> <br>
                                    <b-row cols="1" cols-sm="4" class="justify-content-md-center" >
                                        <b-col>
                                            <div class="division">
                                                <div class="label">বিভাগ</div>
                                                <slot v-if="summonDetails.case_info!=null">
                                                    <slot v-if="summonDetails.case_info.division_info!=null">
                                                        <span class="form-control">{{summonDetails.case_info.division_info.bn_name}}</span>
                                                    </slot>
                                                </slot>
                                            </div>
                                        </b-col>
                                        <b-col>
                                            <div class="district">
                                                <div class="label">জেলা</div>
                                                <slot v-if="summonDetails.case_info!=null">
                                                    <slot v-if="summonDetails.case_info.district_info!=null">
                                                        <span class="form-control">{{summonDetails.case_info.district_info.bn_name}}</span>
                                                    </slot>
                                                </slot>
                                            </div>
                                        </b-col>
                                        <b-col>
                                            <div class="sub-district">
                                                <div class="label">উপজেলা</div>
                                                <slot v-if="summonDetails.case_info!=null">
                                                    <slot v-if="summonDetails.case_info.upazila_info!=null">
                                                        <span class="form-control">{{summonDetails.case_info.upazila_info.bn_name}}</span>
                                                    </slot>
                                                </slot>
                                            </div>
                                        </b-col>
                                        <b-col>
                                            <div class="union">
                                                <div class="label">ইউনিয়ন</div>
                                                <slot v-if="summonDetails.case_info!=null">
                                                    <slot v-if="summonDetails.case_info.union_info!=null">
                                                        <span class="form-control">{{summonDetails.case_info.union_info.bn_name}}</span>
                                                    </slot>
                                                </slot>
                                            </div>
                                        </b-col>
                                    </b-row>
                                </div>
                        <b-row class="text-center mt-5 " >
                                    <b-col cols="2">
                                        <p class="">মামলার নম্বর :</p>
                                    </b-col>
                                    <b-col cols="">
                                        <p class="caseNo">{{summonDetails.caseId |banglaNumber}}</p>
                                    </b-col>
                                    <b-col cols="2">
                                        <p class="">মামলার ধরন :</p>
                                    </b-col>
                                    <b-col cols="2">
                                        <p class="caseNo">
                                            <slot v-if="summonDetails.case_info!=null">
                                                {{summonDetails.case_info.caseType}}
                                            </slot>
                                        </p>
                                    </b-col>
                                    <b-col cols="2">
                                        <p class="">মামলা গ্রহনের তারিখ :</p>
                                    </b-col>
                                    <b-col cols="2">
                                        <p class="caseNo">
                                             <slot v-if="summonDetails.case_info!=null">
                                                {{summonDetails.case_info.acceptDate |formatDateBd}}
                                            </slot>
                                        </p>
                                    </b-col>
                                
                        </b-row>
                       
                        <table class="Table" >
                            <thead>
                                <tr>
                                <th scope="col">তারিখ: <br> </th>
                                <th scope="col">নাম: <br> </th>
                                <th scope="col">ধরন: <br> (আবেদনকারী/প্রতিবাদী/সাক্ষী)</th>
                                <th scope="col">স্বাক্ষর: <br> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <slot v-for="attendanceInfo,attendanceIndex in attendList" v-if="!attendanceInfo.preAttendedFlag">
                                <tr >
                                    <td scope="row">{{attendanceInfo.attendDate |formatDateBd}}</td>
                                    <td>
                                        {{attendanceInfo.name}}
                                    </td>
                                    <td>
                                        {{attendanceInfo.type}}
                                        
                                    </td>
                                    <td>
                                        
                                    </td>
                                </tr>
                                </slot>
                            </tbody>
                        </table>
                        
                    
                <!-- PDF Content Here --> 
            </section>
    </vue-html2pdf>

    </div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'
export default{
    components: {
        VueHtml2pdf
    },
    data(){
        return{
            attendSheet:false,
            dataList:[],
            msgFlag:false,
            errMsgFlag:false,
            msg:'',
            errMsg:'',
            pageNo:1,
            lastPage:1,
            numOfData:10,
            searchKey:'',
            summonDetails:[],
            attendList:[],
            attenderList:[],
            attnederIndex:0,
            
            districtList:[],
            upazilaList:[],
            unionList:[],
            district:'',
            upazila:'',
            union:'',
            startDate:'',
            endDate:'',
            preAttendList:[],
        }
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
        generateReport(){
            this.$refs.html2Pdf.generatePdf();
            // this.storeAttnderInfo();
        },
        async storeAttnderInfo(){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token
                      }   
                  };
            
            let url="staff/store/attendance/info";
            let formData=new FormData();
            formData.append("summonId",this.summonDetails.id);
            this.attendList.forEach(attenderInfo=>{
                if(!attenderInfo.preAttendedFlag){
                    formData.append("attenderId[]",attenderInfo.id);
                    formData.append("attenderName[]",attenderInfo.name);
                    formData.append("attenderType[]",attenderInfo.type);
                    formData.append("attenderTypeId[]",attenderInfo.typeId);
                }
            });
            await this.$http.post(url,formData,config)
             .then(response=>{
                if(response.data.msgFlag==true){
                    // this.attendList=[];
                    // this.attenderList=[];
                    this.generateReport();
                    this.$toaster.success(response.data.msg);
                }
                if(response.data.errMsgFlag==true)
                    this.$toaster.warning(response.data.errMsg);
             })
             .catch(error=>{console.dir(error)})
             .finally();
        },
        removeAttender(index){
            this.attendList.splice(index,1);
        },
        addAttender(){
            this.attenderList.forEach((attenderInfo,index)=>{
                if(this.attnederIndex==index && index!=0){
                    this.attendList.push({
                        id:attenderInfo.id,
                        name:attenderInfo.name,
                        type:attenderInfo.type,
                        typeId:attenderInfo.typeId,
                        attendDate:attenderInfo.attendDate,
                        preAttendedFlag:false,
                    });
                }
            });
            // let attnedIndex='attnederIndex'+addIndex;
			// let attnederIndex=this.$refs[attnedIndex][0].value;

            // this.attendList.splice(addIndex,1);
            // this.attenderList.forEach((attenderInfo,index)=>{
            //     if(index==attnederIndex){
            //          this.attendList.push({
            //             id:attenderInfo.id,
            //             name:attenderInfo.nmae,
            //             type:attenderInfo.type,
            //             typeId:attenderInfo.typeId,
            //         });
            //     }
            // });
           
        },
        addApplicant(){
            // this.attendList.push({
            //     id:"",
            //     name:"",
            //     type:"",
            //     typeId:"",
            // });
        },
         prepareForAttendance(dataId){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token
                      }   
                  };
            
            let url="staff/get/attendance/info?dataId="+dataId;

             this.$http.get(url,config)
             .then(response=>{
                if(response.data.msgFlag==true){

                    this.summonDetails=response.data.dataInfo;
                    this.preAttendList=response.data.attendanceInfos;

                    this.attenderList=[];
                    this.attendList=[];
                     this.attenderList.push({
                        id:"",
                        name:"",
                        type:"ব্যক্তি নির্বাচন করুন",
                        typeId:1,
                    });
                    if(this.summonDetails.case_info!=null){
                        this.summonDetails.case_info.applicant_infos.forEach(applicantInfo=>{
                            this.attenderList.push({
                                id:applicantInfo.id,
                                name:applicantInfo.name,
                                type:"আবেদনকারী",
                                attendDate:this.summonDetails.attendDate,
                                typeId:1,
                            });
                        });
                        this.summonDetails.case_info.oppositor_infos.forEach(oppositorInfo=>{
                            this.attenderList.push({
                                id:oppositorInfo.id,
                                name:oppositorInfo.name,
                                type:"প্রতিবাদী",
                                attendDate:this.summonDetails.attendDate,
                                typeId:2,
                            });
                        });
                        this.summonDetails.case_info.witness_infos.forEach(witnessInfo=>{
                            this.attenderList.push({
                                id:witnessInfo.id,
                                name:witnessInfo.name,
                                type:"স্বাক্ষী",
                                attendDate:this.summonDetails.attendDate,
                                typeId:3,
                            });
                        });

                        this.preAttendList.forEach(preAttendedInfo=>{
                            let data={};
                            if(preAttendedInfo.type==1){
                                data={
                                    id:preAttendedInfo.attendant,
                                    name:preAttendedInfo.applicant_info.name,
                                    type:'আবেদনকারী',
                                    typeId:preAttendedInfo.type,
                                    attendDate:preAttendedInfo.summon_info.attendDate,
                                    preAttendedFlag:true,
                                }
                            }
                            if(preAttendedInfo.type==2){
                                data={
                                    id:preAttendedInfo.attendant,
                                    name:preAttendedInfo.oppositor_info.name,
                                    type:'প্রতিবাদী',
                                    typeId:preAttendedInfo.type,
                                    attendDate:preAttendedInfo.summon_info.attendDate,
                                    preAttendedFlag:true,
                                }
                            }
                            if(preAttendedInfo.type==3){
                                data={
                                    id:preAttendedInfo.attendant,
                                    name:preAttendedInfo.witness_info.name,
                                    type:'স্বাক্ষী',
                                    typeId:preAttendedInfo.type,
                                    attendDate:preAttendedInfo.summon_info.attendDate,
                                    preAttendedFlag:true,
                                   
                                }
                            }
                            this.attendList.push(data);
                        });
                    }
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
            
            let url="staff/get/requested/attend/list?page="+this.pageNo+"&numOfData="+this.numOfData+"&searchKey="+this.searchKey+"&unionId="+this.union+
            "&upazilaId="+this.upazila;

            await this.$http.get(url,config)
             .then(response=>{
                this.dataList= response.data;
                this.lastPage=this.dataList.last_page;
             })
             .catch(error=>{console.dir(error)})
             .finally();
        },
        dataByPaginate(pageIndex){
            this.pageNo=pageIndex;
            this.getDataList();
        },
        // changeView(){
        //     this.attendSheet=!this.attendSheet;
        // }
    }

}
</script>

<style lang="scss" scoped>
.crime-attendance{
    margin: 50px 0px 0px 50px;
}
.container-lg input{
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
.container-lg button{
    float: right;
    margin-top: 40px;
    margin-bottom: 30px;
    margin-right: 34px;
}

.table thead{
    background-color: rgb(219, 219, 219);
    text-align: center;
   
}
.table tbody{
    background-color: rgb(220, 255, 231);

}
.table {
    width: 89.3%;
    margin-top: 50px;
    font-size: 14px;
    text-align: center;
}
.table td{
    border: 0px solid #000 ;
}
.Table{
    width: 89.3%;
    margin-top: 50px;
    font-size: 16px;
    text-align:center;

}
.Table th,td{
    border: 1px solid #000;
    padding: 12px;
}
.crime-place{
    width: 89.3%;
    margin-top: 50px;
    font-size: 12px
}
.label {
    font-size: 18px;
    text-align: center;
}
.form-select{
    font-size: 18px;
    text-align: center;
    font-weight: 700;
    background-color: rgb(239, 239, 239);
}
.text-center{
    width: 91%;
    font-size: 18px;
    font-weight: 700;
}
.caseNo ,.caseNo2{
    background-color: rgb(231, 231, 231);
}
.align-middle{
    border: 0px solid #000;
}
.add-icon {
    width: 25px;
    height: 25px;
    background: #098009;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
    
}
.text-center button{
    float: right;
}
.printfile{
    width: 50px;
    height: 50px;
    background-color: rgb(224, 224, 224);
    color: rgb(0, 97, 0);
    align:center;
    font-size: 25px;
    padding:5px;
}
</style>