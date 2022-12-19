<template>
    <div>
        <b-card  title="ইউনিয়ন সদস্য তালিকা"
        >
        <b-row>
            <b-col></b-col>
            <b-col class="float-right">
            <slot v-if="$store.state.userInfo.permissions.includes(46)">
                <b-button variant="primary" class="ml-2" v-b-modal.new-member-form> নতুন সদস্য যোগ করুন</b-button>
            </slot>
            </b-col>
        </b-row>
          <div class="applications-table">
            <div class="table-info" >
                <div 
                class="table-wrapper"
                >
                    <table class="table table-bordered table-hover" >
                        <thead>
                        <tr>
                            <th>
                                <icon name="filter" size="20px" class="text-info"/>
                                <select v-model="numOfData" @change="getDataList()" style="margin-left:5px;">
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                    <option value="200">200</option>
                                    <option value="500">500</option>
                                </select>
                            </th>
                            <th colspan="10" class="text-right">
                                <input type="text" class="form-control" v-model="searchKey" placeholder="সদস্য এর নাম " v-on:keyup.enter="getDataList()">
                            </th>
                            <th class="float-left">
                                <a href="#" class="btn btn-sm btn-info text-light" @click="getDataList()">
                                    <icon name="search" size="15px"/> অনুসন্ধান করুন
                                </a>
                            </th>
                            
                        </tr>
                        <tr>
                            <th>নং</th>
                            <th>ছবি</th>
                            <th>নাম</th>
                            <th>লিঙ্গ</th>
                            <th>অভিভাবক</th>
                            <th>ফোন</th>
                            <th>গ্রাম ও ওয়ার্ড নং</th>
                            <th>ডাকঘর</th>
                            <th>ইউনিয়ন,উপজেলা,জেলা</th>
                            <th>ঠিকানা</th>
                            <th>পদবী</th>
                            <th>অপশনস</th>
                        </tr>
                        
                        </thead>
                        <tbody>
                            <tr v-for="dataInfo,dataIndex in dataList.data">
                                <td>{{++dataIndex | banglaNumber}}</td>
                                <td>
                                    <img :src="dataInfo.avatar " :alt="dataInfo.name" height="70" width="70">
                                </td>
                                <td>{{dataInfo.name}}</td>
                                <td>{{dataInfo.gender}}</td>
                                <td>{{dataInfo.guardian}}</td>
                                <td>{{dataInfo.phone |banglaNumber}}</td>
                                <td>
                                    <strong>গ্রামঃ</strong> {{dataInfo.village}}<br>
                                    <strong>ওয়ার্ড নংঃ</strong> {{dataInfo.wordNo |banglaNumber}}
                                </td>
                                <td>{{dataInfo.postOffice }}</td>
                                <td>
                                    <slot v-if="dataInfo.union_info!=null">
                                        <strong>গ্রামঃ</strong> {{dataInfo.union_info.bn_name}}<br>
                                    </slot>
                                    <slot v-if="dataInfo.union_info!=null">
                                        <slot v-if="dataInfo.union_info.thana!=null">
                                            <strong>উপজেলা</strong> {{dataInfo.union_info.thana.bn_name}}<br>
                                        </slot>
                                    </slot>
                                    <slot v-if="dataInfo.district_info!=null">
                                        <strong>জেলাঃ</strong> {{dataInfo.district_info.bn_name}}<br>
                                    </slot>
                                </td>
                                <td>{{dataInfo.address}}</td>
                                <td>
                                    {{dataInfo.designation}}<br>
                                    {{dataInfo.courtDesignation}}
                                </td>
                                <td>
                                    <!-- <a href="#"  class="text-light bg-success">
                                        <icon name="check" size="15px"/>
                                    </a> -->
                                <slot v-if="$store.state.userInfo.permissions.includes(47)">
                                    <a href="#" class="text-primary" v-b-modal.member-edit-form @click="getMemberInfo(dataInfo.id)">
                                        <icon name="eye" size="15px"/>
                                    </a>
                                </slot>
                                <slot v-if="$store.state.userInfo.permissions.includes(48)">
                                    <a href="#" class="text-danger" style="margin-left:5px;" @click="deleteDataInfo(dataInfo.id)">
                                        <icon name="trash-alt" size="15px"/>
                                    </a>
                                </slot>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="12">
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
        </div>



        <b-modal id="member-edit-form" title="ইউনিয়ন সদস্যের তথ্য" size="xl" ok-only ok-variant="secondary" ok-title="Close">
           <b-row>
               <b-col>
                   <b-row>
                    <b-col>
                        <img :src="photo" height="70" width="70">
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <!-- <b-input-group prepend="ছবি" class="mt-3">
                            <b-form-file v-model="name"></b-form-file>
                        </b-input-group> -->

                        <b-form-group  prepend="ছবি" label-cols-sm="2">
                            <b-form-file id="file-default" ref="photo" accept="image/*"  @change="loadPhoto"></b-form-file>
                          </b-form-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="নামঃ" class="mt-3">
                            <b-form-input v-model="name"></b-form-input>
                        </b-input-group>

                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="লিঙ্গ" class="mt-3">
                            <b-form-select v-model="gender" :options="genders"></b-form-select>
                        </b-input-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="অভিভাবক" class="mt-3">
                            <b-form-input v-model="guardian"></b-form-input>
                        </b-input-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="ফোন" class="mt-3">
                            <b-form-input type="number" v-model="phone"></b-form-input>
                        </b-input-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="গ্রাম" class="mt-3">
                            <b-form-input v-model="village"></b-form-input>
                        </b-input-group>
                    </b-col>
                   
                       <b-col>
                        <b-input-group prepend="ওয়ার্ড নং" class="mt-3">
                            <!-- <b-form-select v-model="wordNo" :options="wordNos"></b-form-select > -->
                            <select class="form-control" required v-model="wordNo">
                                <option value="১ নং ওয়াড"> ১ নং ওয়াড</option>
                                <option value="২ নং ওয়াড"> ২ নং ওয়াড</option>
                                <option value="৩ নং ওয়াড"> ৩ নং ওয়াড</option>
                                <option value="৪ নং ওয়াড"> ৪ নং ওয়াড</option>
                                <option value="৫ নং ওয়াড"> ৫ নং ওয়াড</option>
                                <option value="৬ নং ওয়াড"> ৬ নং ওয়াড</option>
                                <option value="৭ নং ওয়াড"> ৭ নং ওয়াড</option>
                                <option value="৮ নং ওয়াড"> ৮ নং ওয়াড</option>
                                <option value="৯ নং ওয়াড"> ৯ নং ওয়াড</option>
                            </select>
                        </b-input-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="ডাকঘর" class="mt-3">
                            <b-form-input v-model="postOffice"></b-form-input>
                        </b-input-group>
                    </b-col>
                   </b-row>
               </b-col>
               <b-col>
                   
                   
                   <b-row>
                    <b-col>
                        <b-input-group prepend="বিভাগ" class="mt-3">
                            <v-select :options="divisionList" :reduce="divisionList => divisionList.id" label="bn_name" v-model="division" @input="filterDistrictList">
                                <template v-slot:option="option">
                                    {{option.bn_name}}
                                </template>
                             </v-select>
                        </b-input-group>
                    </b-col>
                   
                    <b-col>
                        <b-input-group prepend="জেলা" class="mt-3">
                            <v-select :options="districtList" :reduce="districtList => districtList.id" label="bn_name" v-model="district" @input="filterUpazilaList">
                                <template v-slot:option="option">
                                    {{option.bn_name}}
                                </template>
                             </v-select>
                        </b-input-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="উপজেলা" class="mt-3">
                            <v-select :options="upazilaList" :reduce="upazilaList => upazilaList.id" label="bn_name" v-model="upazila" @input="filterUnionList">
                                <template v-slot:option="option">
                                    {{option.bn_name}}
                                </template>
                             </v-select>
                        </b-input-group>
                    </b-col>
                   
                    <b-col>
                        <b-input-group prepend="ইউনিয়ন" class="mt-3">
                            <v-select :options="unionList" :reduce="unionList => unionList.id" label="bn_name" v-model="union" >
                                <template v-slot:option="option">
                                    {{option.bn_name}}
                                </template>
                             </v-select>
                        </b-input-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="ঠিকানা" class="mt-3">
                            <b-form-textarea rows="4" v-model="address"></b-form-textarea>
                        </b-input-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="ইউনিয়ন পদবী" class="mt-3">
                            <b-form-input v-model="designation"></b-form-input>
                        </b-input-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="আদালতের পদবী" class="mt-3">
                            <b-form-input v-model="courtDesignation"></b-form-input>
                        </b-input-group>
                    </b-col>
                   </b-row>

                   <b-row class="mt-2">
                       <b-col>
                               
                       </b-col>
                       <b-col>
                            <b-button variant="danger" @click="resetForm">মুছুন</b-button>
                        <slot v-if="$store.state.userInfo.permissions.includes(47)">
                             <b-button variant="success" class="ml-2" @click="updateMemberInfo">আপডেট করুন</b-button>
                        </slot>
                       </b-col>
                   </b-row>
               </b-col>
           </b-row>
          </b-modal>





          <b-modal id="new-member-form" title="ইউনিয়ন সদস্যের তথ্য" size="xl" ok-only ok-variant="secondary" ok-title="Close">
           <b-row>
               <b-col>
                   <b-row>
                    <b-col>
                        <img :src="photo" height="70" width="70">
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <!-- <b-input-group prepend="ছবি" class="mt-3">
                            <b-form-file v-model="name"></b-form-file>
                        </b-input-group> -->

                        <b-form-group  prepend="ছবি" label-cols-sm="2">
                            <b-form-file id="file-default" ref="photo" accept="image/*"  @change="loadPhoto"></b-form-file>
                          </b-form-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="নামঃ" class="mt-3">
                            <b-form-input v-model="name"></b-form-input>
                        </b-input-group>

                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="লিঙ্গ" class="mt-3">
                            <b-form-select v-model="gender" :options="genders"></b-form-select>
                        </b-input-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="অভিভাবক" class="mt-3">
                            <b-form-input v-model="guardian"></b-form-input>
                        </b-input-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="ফোন" class="mt-3">
                            <b-form-input type="number" v-model="phone"></b-form-input>
                        </b-input-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="গ্রাম" class="mt-3">
                            <b-form-input v-model="village"></b-form-input>
                        </b-input-group>
                    </b-col>
                   
                       <b-col>
                        <b-input-group prepend="ওয়ার্ড নং" class="mt-3">
                            <!-- <b-form-select v-model="wordNo" :options="wordNos"></b-form-select > -->
                            <select class="form-control" required v-model="wordNo">
                                <option value="১ নং ওয়াড"> ১ নং ওয়াড</option>
                                <option value="২ নং ওয়াড"> ২ নং ওয়াড</option>
                                <option value="৩ নং ওয়াড"> ৩ নং ওয়াড</option>
                                <option value="৪ নং ওয়াড"> ৪ নং ওয়াড</option>
                                <option value="৫ নং ওয়াড"> ৫ নং ওয়াড</option>
                                <option value="৬ নং ওয়াড"> ৬ নং ওয়াড</option>
                                <option value="৭ নং ওয়াড"> ৭ নং ওয়াড</option>
                                <option value="৮ নং ওয়াড"> ৮ নং ওয়াড</option>
                                <option value="৯ নং ওয়াড"> ৯ নং ওয়াড</option>
                            </select>
                        </b-input-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="ডাকঘর" class="mt-3">
                            <b-form-input v-model="postOffice"></b-form-input>
                        </b-input-group>
                    </b-col>
                   </b-row>
               </b-col>
               <b-col>
                   
                   
                   <b-row>
                    <b-col>
                        <b-input-group prepend="বিভাগ" class="mt-3">
                            <v-select :options="divisionList" :reduce="divisionList => divisionList.id" label="bn_name" v-model="division" @input="filterDistrictList">
                                <template v-slot:option="option">
                                    {{option.bn_name}}
                                </template>
                             </v-select>
                        </b-input-group>
                    </b-col>
                   
                    <b-col>
                        <b-input-group prepend="জেলা" class="mt-3">
                            <v-select :options="districtList" :reduce="districtList => districtList.id" label="bn_name" v-model="district" @input="filterUpazilaList">
                                <template v-slot:option="option">
                                    {{option.bn_name}}
                                </template>
                             </v-select>
                        </b-input-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="উপজেলা" class="mt-3">
                            <v-select :options="upazilaList" :reduce="upazilaList => upazilaList.id" label="bn_name" v-model="upazila" @input="filterUnionList">
                                <template v-slot:option="option">
                                    {{option.bn_name}}
                                </template>
                             </v-select>
                        </b-input-group>
                    </b-col>
                   
                    <b-col>
                        <b-input-group prepend="ইউনিয়ন" class="mt-3">
                            <v-select :options="unionList" :reduce="unionList => unionList.id" label="bn_name" v-model="union" >
                                <template v-slot:option="option">
                                    {{option.bn_name}}
                                </template>
                             </v-select>
                        </b-input-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="ঠিকানা" class="mt-3">
                            <b-form-textarea rows="4" v-model="address"></b-form-textarea>
                        </b-input-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="ইউনিয়ন পদবী" class="mt-3">
                            <b-form-input v-model="designation"></b-form-input>
                        </b-input-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="আদালতের পদবী" class="mt-3">
                            <b-form-input v-model="courtDesignation"></b-form-input>
                        </b-input-group>
                    </b-col>
                   </b-row>

                   <b-row class="mt-2">
                       <b-col>
                               
                       </b-col>
                       <b-col>
                            <b-button variant="danger" @click="resetForm">মুছুন</b-button>
                        <slot v-if="$store.state.userInfo.permissions.includes(46)">
                             <b-button variant="success" class="ml-2" @click="storeMemberInfo">সেভ করুন</b-button>
                        </slot>
                       </b-col>
                   </b-row>
               </b-col>
           </b-row>
          </b-modal>


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
            lastPage:1,
            numOfData:20,
            dataIds:[],
            dataId:null,
            searchKey:'',
            wordNos:[
                { value: '1', text: '১ নং' },
                { value: '2', text: '২ নং' },
                { value: '3', text: '৩ নং' },
                { value: '4', text: '৪ নং' },
                { value: '5', text: '৫ নং' },
                { value: '6', text: '৬ নং' },
                { value: '7', text: '৭ নং' },
                { value: '8', text: '৮ নং' },
                { value: '9', text: '৯ নং' },
            ],
            genders:[
                {value:'পুরুষ',text:'পুরুষ'},
                {value:'মহিলা',text:'মহিলা'},
                {value:'হিজড়া',text:'হিজড়া'},
            ],
            districtList:[],
            unionList:[],
            divisionList:[],
            finalDistrictList:[],
            finalMemberList:[],
            finalUnionList:[],
            finalDivisionList:[],
            finalUpazilaList:[],
            upazilaList:[],

            name:null,
            address:null,
            wordNo:null,
            photo:null,
            gender:null,
            guardian:null,
            phone:null,
            village:null,
            postOffice:null,
            division:null,
            district:null,
            upazila:null,
            union:null,
            designation:null,
            courtDesignation:null,
        }
    },
    beforeMount(){
        this.getDataList();
        this.getDivisionList();
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
    dataStatusChange(dataId,status) {
          
          let token=window.localStorage.getItem("token");

            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token,
                          'Content-Type': 'multipart/form-data'
                      }   
                  };
            
            let url="staff/settings/union/member/info/status/change?dataId="+dataId+"&status="+status;

             this.$http.get(url,config)
             .then(response=>{
                if(response.data.msgFlag==true)
                    this.$toaster.success(response.data.msg);
                if(response.data.errMsgFlag==true)
                    this.$toaster.warning(response.data.errMsg);
             })
             .catch(error=>{console.dir(error)})
             .finally();
             this.getDataList();
        },
         deleteDataInfo(dataId) {
          
          let token=window.localStorage.getItem("token");

            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token,
                          'Content-Type': 'multipart/form-data'
                      }   
                  };
            
            let url="staff/settings/union/member/info/delete?dataId="+dataId;

             this.$http.get(url,config)
             .then(response=>{
                if(response.data.msgFlag==true)
                    this.$toaster.success(response.data.msg);
                if(response.data.errMsgFlag==true)
                    this.$toaster.warning(response.data.errMsg);
             })
             .catch(error=>{console.dir(error)})
             .finally();
             this.getDataList();
        },
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
            this.dataId=null;
            this.name=null;
            this.address=null;
            this.wordNo=null;
            this.photo=null;
            this.guardian=null;
            this.phone=null;
            this.village=null;
            this.postOffice=null;
            this.division=null;
            this.district=null;
            this.upazila=null;
            this.union=null;
            this.designation=null;
            this.courtDesignation=null;
        },
        async updateMemberInfo(){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token,
                          'Content-Type': 'multipart/form-data'
                      }   
                  };
            
            let url="staff/settings/union/update/member/info";

            let formData=new FormData();

                formData.append("dataId",this.dataId);
                formData.append("name",this.name);
                formData.append("address",this.address);
                formData.append("wordNo",this.wordNo);
                // formData.append("photo",this.photo);
                formData.append("guardian",this.guardian);
                formData.append("phone",this.phone);
                formData.append("village",this.village);
                formData.append("postOffice",this.postOffice);
                formData.append("division",this.division);
                formData.append("district",this.district);
                formData.append("upazila",this.upazila);
                formData.append("union",this.union);
                formData.append("designation",this.designation);
                formData.append("courtDesignation",this.courtDesignation);

                if(this.$refs.photo.files[0]!=null)
                     formData.append("photo",this.$refs.photo.files[0]);

            await this.$http.post(url,formData,config)
             .then(response=>{
                if(response.data.msgFlag==true)
                    this.$toaster.success(response.data.msg);
                if(response.data.errMsgFlag==true)
                    this.$toaster.warning(response.data.errMsg);
             })
             .catch(error=>{console.dir(error)})
             .finally();
        },
        async storeMemberInfo(){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token,
                          'Content-Type': 'multipart/form-data'
                      }   
                  };
            
            let url="staff/settings/union/store/member/info";

            let formData=new FormData();

                formData.append("name",this.name);
                formData.append("address",this.address);
                formData.append("wordNo",this.wordNo);
                // formData.append("photo",this.photo);
                formData.append("guardian",this.guardian);
                formData.append("phone",this.phone);
                formData.append("village",this.village);
                formData.append("postOffice",this.postOffice);
                formData.append("division",this.division);
                formData.append("district",this.district);
                formData.append("upazila",this.upazila);
                formData.append("union",this.union);
                formData.append("designation",this.designation);
                formData.append("courtDesignation",this.courtDesignation);

                if(this.$refs.photo.files[0]!=null)
                     formData.append("photo",this.$refs.photo.files[0]);

            await this.$http.post(url,formData,config)
             .then(response=>{
                if(response.data.msgFlag==true)
                    this.$toaster.success(response.data.msg);
                if(response.data.errMsgFlag==true)
                    this.$toaster.warning(response.data.errMsg);
             })
             .catch(error=>{console.dir(error)})
             .finally();
        },
        async getMemberInfo(dataId){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token
                      }   
                  };
           
             let url="staff/settings/union/get/member/info?dataId="+dataId;
            this.dataId=dataId;
            await this.$http.get(url,config)
             .then(response=>{
                if(response.data.msgFlag==true){
                    
                    this.name=response.data.dataInfo.name;
                    this.address=response.data.dataInfo.address;
                    this.wordNo=response.data.dataInfo.wordNo;
                    this.photo=response.data.dataInfo.avatar;
                    this.guardian=response.data.dataInfo.guardian;
                    this.phone=response.data.dataInfo.phone;
                    this.gender=response.data.dataInfo.gender;
                    this.village=response.data.dataInfo.village;
                    this.postOffice=response.data.dataInfo.postOffice;
                    // this.division=response.data.dataInfo.division;
                    // this.district=response.data.dataInfo.
                    // this.upazila=response.data.dataInfo.
                    // this.union=response.data.dataInfo.
                    this.designation=response.data.dataInfo.designation;
                    this.courtDesignation=response.data.dataInfo.courtDesignation;
                }
                if(response.data.errMsgFlag==true)
                    this.$toaster.warning(response.data.errMsg);
             })
             .catch(error=>{console.dir(error)})
             .finally();
        },
        loadPhoto(e){
            
            this.errMsgFlag=false;
            this.msgFlag=false;
            const file= e.target.files[0];
            let Extension = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
            if ( Extension == "png" || Extension == "bmp" || Extension == "jpeg" || Extension == "jpg") {
                this.photo = URL.createObjectURL(file);              
            }
            else
            {
                this.errMsg="Image only allows file types of  PNG, JPG, JPEG and BMP.";
                this.errMsgFlag=true;
                this.msgFlag=false;
                this.$toaster.warning(this.errMsg);
            }
        },
        async getUnionList(){

            let url="frontend/get/active/union/list";

            await this.$http.get(url)
             .then(response=>{
                this.finalUnionList=response.data;
                this.unionList=response.data;
             })
             .catch(error=>{console.dir(error)})
             .finally();
        },
        async getUpazilaList(){

            let url="frontend/get/active/upazila/list";

            await this.$http.get(url)
             .then(response=>{
                this.finalUpazilaList=response.data;
                this.upazilaList=response.data;
             })
             .catch(error=>{console.dir(error)})
             .finally();
        },
        async getDistrictList(){

            let url="frontend/get/active/district/list";

            await this.$http.get(url)
             .then(response=>{
                this.finalDistrictList=response.data;
                this.districtList=response.data;
             })
             .catch(error=>{console.dir(error)})
             .finally();
        },
        async getDivisionList(){

            let url="frontend/get/active/division/list";

            await this.$http.get(url)
             .then(response=>{
                this.finalDivisionList=response.data;
                this.divisionList=response.data;
             })
             .catch(error=>{console.dir(error)})
             .finally();
        },
        filterDistrictList(){
            this.districtList=[];
            this.finalDistrictList.forEach(dataInfo=>{
                if(this.division==dataInfo.division_id)
                    this.districtList.push(dataInfo);
            })
        },
        filterUpazilaList(){
            this.upazilaList=[];
            this.finalUpazilaList.forEach(dataInfo=>{
                if(this.district==dataInfo.district_id)
                    this.upazilaList.push(dataInfo);
            })
        },
        filterUnionList(){
            this.unionList=[];
            this.finalUnionList.forEach(dataInfo=>{
                if(this.upazila==dataInfo.thana_id)
                    this.unionList.push(dataInfo);
            })
        },
         getDataList(){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token
                      }   
                  };
            
            let url="staff/settings/union/get/member/list?page="+this.pageNo+"&numOfData="+this.numOfData+"&searchKey="+this.searchKey;

             this.$http.get(url,config)
             .then(response=>{
                this.dataList=response.data;
                this.lastPage=this.dataList.last_page;
             })
             .catch(error=>{console.dir(error)})
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
