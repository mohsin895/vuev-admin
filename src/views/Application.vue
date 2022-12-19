<template>
    <div>
        <b-card  title="আবেদন তালিকা">
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

          <div class="applications-table mt-2">
            <div class="table-info" >
                <div 
                class="table-wrapper"
                >
                    <table class="table table-bordered table-hover" >
                        <thead>
                        
                        <tr>
                            <th>মামলার নম্বর</th>
                            <th>মামলা গ্রহণের তারিখ</th>
                            <th>ইউনিয়ন,উপজেলা,জেলা</th>
                            <th>আবেদনকারীর নাম</th>
                            <th>প্রতিবাদীর নাম</th>
                            <th>সাক্ষীগণের নাম</th>
                            <th>বিরোধের বিষয়বস্তু</th>
                            <th>অপশনস</th>
                        </tr>
                        
                        </thead>
                        <tbody>
                            <tr v-for="dataInfo,dataIndex in dataList.data" :key="dataIndex" :class="{ 'text-success ':(dataInfo.status==2), 'text-danger': (dataInfo.status==3) }">
                                <th>{{dataInfo.id | banglaNumber}}</th>
                                <td>{{dataInfo.created_at | formatDateBd}}</td>
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
                                    <!-- <a href="#"  class="text-dark">
                                        <icon name="check" size="20px"/>
                                    </a> -->
                                 <slot v-if="$store.state.userInfo.permissions.includes(69)">
                                        <router-link :to="{name:'ApplicationEdit',params:{dataId:dataInfo.id}}" class="text-warning" style="margin-left:5px;">
                                            <icon name="edit" size="15px"/>
                                        </router-link>
                                </slot>
                                <slot v-if="$store.state.userInfo.permissions.includes(5)">
                                    <a href="#" class="text-primary ml-2" v-b-modal.application-form-view @click="getApplicationDetails(dataInfo.id)">
                                        <icon name="eye" size="15px"/>
                                    </a>
                                </slot>
                                <slot v-if="$store.state.userInfo.permissions.includes(6)">
                                    <slot v-if="dataInfo.acceptDate==null">
                                        <a href="#" class="text-danger ml-2" style="margin-left:5px;">
                                            <icon name="trash-alt" size="15px"/>
                                        </a>
                                    </slot>
                                </slot>

                                </td>
                            </tr>
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
                </div>
            </div>
           <b-modal id="application-form-view" title="আবেদনের  বিবরণ" size="xl" ok-only ok-variant="secondary" ok-title="Close">
            <b-row>
                <b-col class="text-center">
                    <h4>আবেদন ফরম-১</h4>
                    <!-- <pre>{{applicationDetails.applicant_infos}}</pre> -->
                </b-col>
            </b-row>
            <b-row>
                <slot v-if="applicationDetails.applicant_infos!=null">
                    <img :src="applicationDetails.applicant_infos[0].photo " style="height:120px;width:120px; border-radius:20px;">
                </slot>
            </b-row>
            
            <b-row>
                <b-col>
                <slot v-if="applicationDetails.applicant_infos!=null">
                    <table class="table table-borderless caption-top" v-for="applicantInfo,applicantIndex in applicationDetails.applicant_infos" :key="applicantIndex">
                        <tr>
                            <th colspan="2">আবেদনকারীর তথ্য-{{++applicantIndex | banglaNumber}}</th>
                        </tr>
                        <tr>
                            <th>আবেদনকারীর নাম :</th>
                            <td>{{applicantInfo.name}}</td>
                        </tr>
                        <tr>
                            <th>আবেদনকারীর পিতার নাম :</th>
                            <td>{{applicantInfo.fName}}</td>
                        </tr>
                        <tr>
                            <th>আবেদনকারীর মাতার নাম :</th>
                            <td>{{applicantInfo.mName}}</td>
                        </tr>
                        <tr>
                            <th>আবেদনকারীর স্বামী/স্ত্রীর নাম :</th>
                            <td>{{applicantInfo.sName}}</td>
                        </tr>
                        <tr>
                            <th>আবেদনকারীর জাতীয় পরিচয় পত্র নং :</th>
                            <td>{{applicantInfo.nid  | banglaNumber}}</td>
                        </tr>
                        <tr>
                            <th>আবেদনকারীর মোবাইল নং :</th>
                            <td>{{applicantInfo.phone | banglaNumber}}</td>
                        </tr>
                    </table>
                </slot>
                </b-col>
                <b-col>
                <slot v-if="applicationDetails.oppositor_infos!=null">
                    <table class="table table-borderless caption-top" v-for="oppositorInfo,oppositorIndex in applicationDetails.oppositor_infos" :key="oppositorIndex">
                        <tr>
                            <th colspan="2">প্রতিবাদীর তথ্য-{{++oppositorIndex | banglaNumber}}</th>
                        </tr>
                        <tr>
                            <th>প্রতিবাদীর নাম :</th>
                            <td>{{oppositorInfo.name}}</td>
                        </tr>
                        <tr>
                            <th>প্রতিবাদীর পিতার নাম :</th>
                            <td>{{oppositorInfo.fName}}</td>
                        </tr>
                        <tr>
                            <th>প্রতিবাদীর মাতার নাম :</th>
                            <td>{{oppositorInfo.mName}}</td>
                        </tr>
                        <tr>
                            <th>প্রতিবাদীর স্বামী/স্ত্রীর নাম :</th>
                            <td>{{oppositorInfo.sName}}</td>
                        </tr>
                        <tr>
                            <th>প্রতিবাদীর জাতীয় পরিচয় পত্র নং :</th>
                            <td>{{oppositorInfo.nid  | banglaNumber}}</td>
                        </tr>
                        <tr>
                            <th>প্রতিবাদীর মোবাইল নং :</th>
                            <td>{{oppositorInfo.phone | banglaNumber}}</td>
                        </tr>
                    </table>
                </slot>
                </b-col>
            </b-row>

            <b-row>
                <b-col>
                <slot v-if="applicationDetails.witness_infos!=null">
                    <table class="table table-borderless caption-top" v-for="witnessInfo,witnessIndex in applicationDetails.witness_infos" :key="witnessIndex">
                        <tr>
                            <th colspan="2">স্বাক্ষীর তথ্য-{{++witnessIndex | banglaNumber}}</th>
                        </tr>
                        <tr>
                            <th>স্বাক্ষীর নাম :</th>
                            <td>{{witnessInfo.name}}</td>
                        </tr>
                        <tr>
                            <th>স্বাক্ষীর পিতার নাম :</th>
                            <td>{{witnessInfo.fName}}</td>
                        </tr>
                        <tr>
                            <th>স্বাক্ষীর মাতার নাম :</th>
                            <td>{{witnessInfo.mName}}</td>
                        </tr>
                        <tr>
                            <th>স্বাক্ষীর স্বামী/স্ত্রীর নাম :</th>
                            <td>{{witnessInfo.sName}}</td>
                        </tr>
                        <tr>
                            <th>স্বাক্ষীর জাতীয় পরিচয় পত্র নং :</th>
                            <td>{{witnessInfo.nid | banglaNumber}}</td>
                        </tr>
                        <tr>
                            <th>স্বাক্ষীর মোবাইল নং :</th>
                            <td>{{witnessInfo.phone | banglaNumber}}</td>
                        </tr>
                    </table>
                </slot>
                </b-col>
                <b-col>
                    <table class="table table-borderless caption-top">
                        
                        <tr>
                            <th>শিরোনাম:</th>
                            <td>{{applicationDetails.caseTitle}}</td>
                        </tr>
                        <tr>
                            <th>বিবরন :</th>
                            <td>
                                <p v-html="applicationDetails.caseDetails"></p>
                            </td>
                        </tr>
                        <tr>
                            <th>প্রমাণ সমূহের সংযুক্ত নথি  :</th>
                            <td>
                                <slot v-for="evidenceInfo in applicationDetails.evidence_infos">
                                    <img :src="evidenceInfo.photo" style="height:100px;width:100px;">
                                </slot>
                            </td>
                        </tr>
                        <tr>
                            <th>আবেদনকারীর প্রত্যাশিত প্রতিকার :</th>
                            <td>
                                {{applicationDetails.expectation}}
                                <a href="#">
                                    <icon name="edit" size="15px"/>
                                </a>
                            </td>
                        </tr>
                    </table>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="text-center">
                    <h5>আবেদনকারীর মনোনয়ন ফরম-১</h5>
                    <h6>আবেদনকারীর পক্ষে :</h6>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <table class="table table-borderless caption-top">
                        <tr>
                            <th colspan="2">ইউনিয়ন পরিষদের সদস্য</th>
                        </tr>
                        <tr>
                            <th>নাম :</th>
                            <td>
                                <slot v-if="applicationDetails.applicant_nominators!=null">
                                    {{applicationDetails.applicant_nominators[0].name}}
                                </slot>
                            </td>
                        </tr>
                        <tr>
                            <th>পিতা/স্বামী :</th>
                            <td>
                                <slot v-if="applicationDetails.applicant_nominators!=null">
                                    {{applicationDetails.applicant_nominators[0].guardian}}
                                </slot>
                            </td>
                        </tr>
                        <tr>
                            <th>গ্রাম :</th>
                            <td>
                                <slot v-if="applicationDetails.applicant_nominators!=null">
                                    {{applicationDetails.applicant_nominators[0].village}}
                                </slot>
                            </td>
                        </tr>
                        <tr>
                            <th>ওয়াড নং :</th>
                            <td>
                                <slot v-if="applicationDetails.applicant_nominators!=null">
                                    {{applicationDetails.applicant_nominators[0].wordNo | banglaNumber}}
                                </slot>
                            </td>
                        </tr>
                        <tr>
                            <th>ডাকঘর :</th>
                            <td>
                                <slot v-if="applicationDetails.applicant_nominators!=null">
                                    {{applicationDetails.applicant_nominators[0].postOffice}}
                                </slot>
                            </td>
                        </tr>
                        <tr>
                            <th>ইউনিয়ন :</th>
                            <td>
                                <slot v-if="applicationDetails.applicant_nominators!=null">
                                    <slot v-if="applicationDetails.applicant_nominators[0].union_info!=null">
                                        {{applicationDetails.applicant_nominators[0].union_info.bn_name}}
                                    </slot>
                                </slot>
                            </td>
                        </tr>
                        <tr>
                            <th>জেলা :</th>
                            <td>
                                <slot v-if="applicationDetails.applicant_nominators!=null">
                                    <slot v-if="applicationDetails.applicant_nominators[0].district_info!=null">
                                        {{applicationDetails.applicant_nominators[0].district_info.bn_name}}
                                    </slot>
                                </slot>
                            </td>
                        </tr>
                    </table>
                </b-col>
                <b-col>
                    <table class="table table-borderless caption-top">
                        <tr>
                            <th colspan="2">স্থানীয় ব্যক্তি</th>
                        </tr>
                        <tr>
                            <th>নাম :</th>
                            <td>
                                <slot v-if="applicationDetails.applicant_nominators!=null">
                                    {{applicationDetails.applicant_nominators[1].name}}
                                </slot>
                            </td>
                        </tr>
                        <tr>
                            <th>পিতা/স্বামী :</th>
                            <td>
                                <slot v-if="applicationDetails.applicant_nominators!=null">
                                    {{applicationDetails.applicant_nominators[1].guardian}}
                                </slot>
                            </td>
                        </tr>
                        <tr>
                            <th>গ্রাম :</th>
                            <td>
                                <slot v-if="applicationDetails.applicant_nominators!=null">
                                    {{applicationDetails.applicant_nominators[1].village}}
                                </slot>
                            </td>
                        </tr>
                        <tr>
                            <th>ওয়াড নং :</th>
                            <td>
                                <slot v-if="applicationDetails.applicant_nominators!=null">
                                    {{applicationDetails.applicant_nominators[1].wordNo | banglaNumber}}
                                </slot>
                            </td>
                        </tr>
                        <tr>
                            <th>ডাকঘর :</th>
                            <td>
                                <slot v-if="applicationDetails.applicant_nominators!=null">
                                    {{applicationDetails.applicant_nominators[1].postOffice}}
                                </slot>
                            </td>
                        </tr>
                        <tr>
                            <th>ইউনিয়ন :</th>
                            <td>
                                <slot v-if="applicationDetails.applicant_nominators!=null">
                                    <slot v-if="applicationDetails.applicant_nominators[1].union_info!=null">
                                        {{applicationDetails.applicant_nominators[1].union_info.bn_name}}
                                    </slot>
                                </slot>
                            </td>
                        </tr>
                        <tr>
                            <th>জেলা :</th>
                            <td>
                                <slot v-if="applicationDetails.applicant_nominators!=null">
                                    <slot v-if="applicationDetails.applicant_nominators[1].district_info!=null">
                                        {{applicationDetails.applicant_nominators[1].district_info.bn_name}}
                                    </slot>
                                </slot>
                            </td>
                        </tr>
                    </table>
                </b-col>
            </b-row>
            <b-row>
                <b-col></b-col>
                <b-col>
                    <table>
                        <tr>
                            <th>মামলার ধরণ :</th>
                            <td>
                                <select v-model="caseType">
                                    <option value="ফৌজদারী">ফৌজদারী</option>
                                    <option value="দেওয়ানী">দেওয়ানী</option>
                                </select>
                            </td>
                            <th>মামলার ফি :</th>
                            <td>
                                <select v-model="caseFee">
                                    <option value="20">২০ টাকা</option>
                                    <option value="30">৩০ টাকা</option>
                                </select> 
                            </td>
                        </tr>
                        <tr>
                            <th colspan="4">
                                <br/>
                            <slot v-if="$store.state.userInfo.permissions.includes(5)">
                                <a href="#" class="btn btn-sm btn-success" @click="acceptCase(applicationDetails.id)">মামলাটি গ্রহণ করুন</a>
                            </slot>
                            </th>
                        </tr>
                    </table>
                </b-col>
                
            </b-row>
            
          </b-modal> 
        </div>
        </b-card>
</div>
    
</template>

<script>

export default{
    data(){
        return{
            dataList:[],
            msgFlag:false,
            errMsgFlag:false,
            msg:'',
            errMsg:'',
            pageNo:1,
            numOfData:50,
            dataIds:[],
            status:'',
            lastPage:1,  
            isOngoing:'',
            isDegreed:'',
            isOrdered:'',
            isTransfer:'',
            searchKey:'',
            applicationDetails:[],
            caseFee:null,
            caseType:null,    
            districtList:[],
            upazilaList:[],
            unionList:[],
            district:'',
            upazila:'',
            union:'',
            startDate:'',
            endDate:'',
        }
    },
   
    beforeMount(){
        // this.getDataList();
        
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
         acceptCase(dataId){
            if(this.caseType!=null && this.caseFee!=null){
                let token=window.localStorage.getItem("token");
                let config = {
                           headers: {
                              'Authorization': 'Bearer '+token
                          }   
                      };
                
                let url="staff/accept/case";
                let formData=new FormData();
                formData.append("dataId",dataId);
                formData.append("caseFee",this.caseFee);
                formData.append("caseType",this.caseType);

                 this.$http.post(url,formData,config)
                 .then(response=>{
                    if(response.data.msgFlag==true){
                        this.$toaster.success(response.data.msg);
                        this.getApplicationDetails(dataId);
                        this.getDataList();
                        this.caseFee=null;
                        this.caseType=null;
                    }
                    if(response.data.errMsgFlag==true)
                        this.$toaster.warning(response.data.errMsg);
                 })
                 .catch(error=>{console.dir(error)})
                 .finally();
            }
            else{
               if(this.caseType==null)
                this.$toaster.warning("দয়াকরে মামলার ধরণ নির্বাচন করুন।");
            if(this.caseFee==null)
                this.$toaster.warning("দয়াকরে মামলার মূল্য নির্বাচন করুন।"); 
            }
        },
        async getApplicationDetails(dataId){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token
                      }   
                  };
            
            let url="staff/get/applcation/details?dataId="+dataId;

            await this.$http.get(url,config)
             .then(response=>{
                if(response.data.msgFlag==true){
                    this.applicationDetails=response.data.dataInfo;
                }
                if(response.data.errMsgFlag==true)
                    this.$toaster.warning(response.data.errMsg);
             })
             .catch(error=>{console.dir(error+"Error occur")})
             .finally();
        },
        statusFilter(status){
            this.status=status;
            this.getDataList();
        },
        async getDataList(){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token
                      }   
                  };
            
            let url="staff/get/case/list?page="+this.pageNo+"&numOfData="+this.numOfData+"&isOngoing="+this.isOngoing+"&isTransfer="+this.isTransfer+"&isOrdered="+this.isOrdered+"&isDegreed="+this.isDegreed+"&status="+this.status+"&searchKey="+this.searchKey+"&unionId="+this.union+"&upazilaId="+this.upazila;

            await this.$http.get(url,config)
             .then(response=>{
                this.dataList=response.data;
                this.lastPage=this.dataList.last_page;
             })
             .catch(error=>{
                (error.response.status==401) ? this.$store.commit("logout"):console.log(error);
             })
             .finally();
        },
        markData(id)
        {
            if($("#data_row_"+id).is(':checked'))
            {
                this.dataIds.push(id);
                this.markCounter=this.markCounter+1;
            }
            else
            {
                this.unMarkData(id);
            }   
        },
        unMarkData(id) {
            $("#selectAll").prop("checked", false);
            $("#selectAlls").prop("checked", false);
            for (var i = this.dataIds.length; i--;) {
            if (this.dataIds[i] === id) {
                    this.dataIds.splice(i, 1);
                    this.markCounter=this.markCounter-1;
                }
            }
        },
        
        markAllData()
        {
            
            if($("#selectAll").is(':checked') || $("#selectAlls").is(":checked")){
                this.markCounter=0;
                $("#selectAll").prop("checked", true);
                $("#selectAlls").prop("checked", true);
                $("#unSelectAll").prop("checked", false);
                this.dataList.data.forEach(dataInfo=>{
                    $("#data_row_"+dataInfo.id).prop("checked", true);
                    this.dataIds.push(dataInfo.id);
                    this.markCounter=this.markCounter+1;
                });
            }
            else
            {
                this.unMarkAllData();
            }   
        },
        unMarkAllData() {
            this.markCounter=0;
            $("#selectAll").prop("checked", false);
            $("#selectAlls").prop("checked", false);
            for (var i = this.dataIds.length; i--;) {
                $("#data_row_"+this.dataIds[i]).prop("checked", false);
                this.dataIds.splice(i, 1);
            }
        },
        dataByPaginate(pageIndex){
            this.pageNo=pageIndex;
            this.getDataList();
        },
    }
}
</script>

<style lang="scss" scoped>

</style>
