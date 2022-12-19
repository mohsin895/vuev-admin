<template>
    <div>
        <b-card  title="কর্মী তালিকা"
        >
        <b-row>
            <b-col></b-col>
            <b-col class="d-flex flex-row-reverse">
                <slot v-if="$store.state.userInfo.permissions.includes(58)">
                    <b-button variant="primary" class="ml-2" v-b-modal.new-staff-form> নতুন কর্মী যোগ করুন</b-button>
                </slot>
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
                            <th colspan="8" class="text-right">
                                <input type="text" class="form-control" v-model="searchKey" placeholder=" এর নাম " v-on:keyup.enter="getDataList()">
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
                            <th>ভূমিকা</th>
                            <th>ফোন</th> 
                            <th>ইমেইল</th>
                            <th>ঠিকানা</th>
                            <th>বিভাগ</th>
                            <th>ইউনিয়ন</th>
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

                                <td>
                                    <slot v-if="dataInfo.role_info!=null">
                                        {{dataInfo.role_info.roleNameBn}}
                                    </slot>
                                </td>
                              
                                <td>{{dataInfo.phone |banglaNumber}}</td>
                                
                                <td>{{dataInfo.email }}</td>
                                
                                <td>{{dataInfo.address}}</td>
                                <td>
                                    <slot v-if="dataInfo.district_info!=null">
                                        {{dataInfo.district_info.bn_name}}
                                    </slot>
                                </td>
                                <td>
                                    <slot v-if="dataInfo.union_info!=null">
                                        {{dataInfo.union_info.bn_name}}
                                    </slot>
                                </td>
                                
                                <td>
                                    <!-- <a href="#"  class="text-light bg-success">
                                        <icon name="check" size="15px"/>
                                    </a> -->
                                <slot v-if="$store.state.userInfo.permissions.includes(59)">
                                    <a href="#" class="text-primary" v-b-modal.staff-edit-form @click="getStaffInfo(dataInfo.id)">
                                        <icon name="eye" size="15px"/>
                                    </a>
                                </slot>
                                <slot v-if="$store.state.userInfo.permissions.includes(60)">
                                    <a href="#" class="text-danger" style="margin-left:5px;" @click="deleteDataInfo(dataInfo.id)">
                                        <icon name="trash-alt" size="15px"/>
                                    </a>
                                </slot>
                                </td>
                            </tr>
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
            </div>    
        </div>



        <b-modal id="staff-edit-form" title="কর্মী তথ্য" size="xl" ok-only ok-variant="secondary" ok-title="Close">
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
                        <b-input-group prepend="ফোন" class="mt-3">
                            <b-form-input type="text" v-model="phone"></b-form-input>
                        </b-input-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="ইমেইল" class="mt-3">
                            <b-form-input v-model="email"></b-form-input>
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
                        <b-input-group prepend="ভূমিকা" class="mt-3">
                            <select class="form-control" v-model="role">
                                <slot v-for="roleInfo,roleIndex in roleList">
                                    <option :value="roleInfo.id">{{roleInfo.roleNameBn}}</option>
                                </slot>
                            </select>
                        </b-input-group>
                    </b-col>
                    <b-row>
                    <b-col>
                        <b-input-group prepend="পাসওয়ার্ড" class="mt-3">
                            <b-form-input type="password" v-model="password"></b-form-input>
                        </b-input-group>
                    </b-col>
                   </b-row>
                    <b-col>
                        <b-input-group prepend="বিভাগ" class="mt-3">
                            <v-select :options="divisionList" :reduce="divisionList => divisionList.id" label="bn_name" v-model="division" @input="getDistrictList">
                                <template v-slot:option="option">
                                    {{option.bn_name}}
                                </template>
                             </v-select>
                        </b-input-group>
                    </b-col>
                   
                    <b-col>
                        <b-input-group prepend="জেলা" class="mt-3">
                            <v-select :options="districtList" :reduce="districtList => districtList.id" label="bn_name" v-model="district" @input="getUpazilaList">
                                <template v-slot:option="option">
                                    {{option.bn_name}}
                                </template>
                             </v-select>
                        </b-input-group>
                    </b-col>
                    <b-col>
                        <b-input-group prepend="উপজেলা" class="mt-3">
                            <v-select :options="upazilaList" :reduce="upazilaList => upazilaList.id" label="bn_name" v-model="upazila" @input="getUnionList">
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
                   <b-row class="mt-2">
                       <b-col>
                               
                       </b-col>
                       <b-col class="d-flex flex-row-reverse">
                            
                        <slot v-if="$store.state.userInfo.permissions.includes(59)">
                             <b-button variant="success" class="ml-2" @click="updateStaffInfo">আপডেট করুন</b-button>
                         </slot>
                         <b-button variant="danger" @click="resetForm">মুছুন</b-button>
                       </b-col>
                   </b-row>
               </b-col>
           </b-row>
          </b-modal>





          <b-modal id="new-staff-form" title="কর্মী তথ্য" size="xl" ok-only ok-variant="secondary" ok-title="Close">
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
                        <b-input-group prepend="ফোন" class="mt-3">
                            <b-form-input type="text" v-model="phone"></b-form-input>
                        </b-input-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="ইমেইল" class="mt-3">
                            <b-form-input v-model="email"></b-form-input>
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
                        <b-input-group prepend="পাসওয়ার্ড" class="mt-3">
                            <b-form-input type="password" v-model="password"></b-form-input>
                        </b-input-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="ভূমিকা" class="mt-3">
                            <select class="form-control" v-model="role">
                                <slot v-for="roleInfo,roleIndex in roleList">
                                    <option :value="roleInfo.id">{{roleInfo.roleNameBn}}</option>
                                </slot>
                            </select>
                        </b-input-group>
                    </b-col>

                    <b-col>
                        <b-input-group prepend="বিভাগ" class="mt-3">
                            <v-select :options="divisionList" :reduce="divisionList => divisionList.id" label="bn_name" v-model="division" @input="getDistrictList">
                                <template v-slot:option="option">
                                    {{option.bn_name}}
                                </template>
                             </v-select>
                        </b-input-group>
                    </b-col>
                   
                    <b-col>
                        <b-input-group prepend="জেলা" class="mt-3">
                            <v-select :options="districtList" :reduce="districtList => districtList.id" label="bn_name" v-model="district" @input="getUpazilaList">
                                <template v-slot:option="option">
                                    {{option.bn_name}}
                                </template>
                             </v-select>
                        </b-input-group>
                    </b-col>
                    <b-col>
                        <b-input-group prepend="উপজেলা" class="mt-3">
                            <v-select :options="upazilaList" :reduce="upazilaList => upazilaList.id" label="bn_name" v-model="upazila" @input="getUnionList">
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
                   <b-row class="mt-2">
                       <b-col>
                               
                       </b-col>
                       <b-col class="d-flex flex-row-reverse">
                            
                        <slot v-if="$store.state.userInfo.permissions.includes(58)">
                             <b-button variant="success" class="ml-2" @click="storeStaffInfo">সংরক্ষণ করুন</b-button>
                        </slot>
                        <b-button variant="danger" @click="resetForm">মুছুন</b-button>
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
           
            districtList:[],
            unionList:[],
            divisionList:[],
            finalDistrictList:[],
            finalMemberList:[],
            finalUnionList:[],
            finalDivisionList:[],
            finalUpazilaList:[],
            roleList:[],
            upazilaList:[],
            division:null,
            district:null,
            upazila:null,
            union:null,

            name:null,
            role:null,
            email:null,
            phone:null,
            photo:null,
            address:null,

            finalUpazilaList:[],
            finalUnionList:[],
            upazilaList:[],
            unionList:[],
            upazila:'',
            union:'',
            password:null,
        }
    },
    beforeMount(){
       
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

       this.getDataList();
        this.getRoleList();
      
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
            this.dataId=null;
            this.name=null;
            this.address=null;
            this.email=null;
            this.photo=null;
            this.phone=null;
            this.district=null;
            this.division=null;
            this.upazila=null;
            this.union=null;
            this.password=null;
        },
        
        async updateStaffInfo(){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token,
                          'Content-Type': 'multipart/form-data'
                      }   
                  };
            
            let url="staff/settings/staff/update/info";

            let formData=new FormData();

                formData.append("dataId",this.dataId);
                formData.append("name",this.name);
                formData.append("address",this.address);
                formData.append("phone",this.phone);
                formData.append("email",this.email);
                formData.append("division",this.division);
                formData.append("district",this.district);
                formData.append("upazila",this.upazila);
                formData.append("union",this.union);
                formData.append("role",this.role);


                if(this.password!=null)
                     formData.append("password",this.password);

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
            this.getDataList();
        },
         dataStatusChange(dataId,status) {
          
          let token=window.localStorage.getItem("token");

            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token,
                          'Content-Type': 'multipart/form-data'
                      }   
                  };
            
            let url="staff/settings/staff/info/status/change?dataId="+dataId+"&status="+status;

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
            
            let url="staff/settings/staff/info/delete?dataId="+dataId;

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
        async storeStaffInfo(){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token,
                          'Content-Type': 'multipart/form-data'
                      }   
                  };
            
            let url="staff/settings/staff/store/info";

            let formData=new FormData();

                formData.append("name",this.name);
                formData.append("address",this.address);
                formData.append("phone",this.phone);
                formData.append("email",this.email);
                formData.append("division",this.division);
                formData.append("district",this.district);
                formData.append("upazila",this.upazila);
                formData.append("union",this.union);
                formData.append("role",this.role);

                if(this.password!=null)
                     formData.append("password",this.password);

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
             this.getDataList();
        },
        async getStaffInfo(dataId){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token
                      }   
                  };
            
            let url="staff/settings/staff/get/info?dataId="+dataId;
            this.dataId=dataId;
            await this.$http.get(url,config)
             .then(response=>{
                if(response.data.msgFlag==true){
                    
                    this.name=response.data.dataInfo.name;
                    this.address=response.data.dataInfo.address;
                   
                    this.photo=response.data.dataInfo.avatar;
                
                    this.phone=response.data.dataInfo.phone;

                    this.email=response.data.dataInfo.email;

                    this.role=response.data.dataInfo.role;

                    this.division=response.data.dataInfo.divisionId;

                    this.district=response.data.dataInfo.districtId;

                    this.upazila=response.data.dataInfo.upazilaId;

                    this.union=response.data.dataInfo.unionId;

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
        async getRoleList(){

            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token
                      }   
                  };

            let url="staff/settings/role/get/active/list";

            await this.$http.get(url,config)
             .then(response=>{
                this.roleList=response.data;
             })
             .catch(error=>{console.dir(error)})
             .finally();
        },
        // async getUnionList(){

        //     let url="frontend/get/active/union/list";

        //     await this.$http.get(url)
        //      .then(response=>{
        //         this.finalUnionList=response.data;
        //         this.unionList=response.data;
        //      })
        //      .catch(error=>{console.dir(error)})
        //      .finally();
        // },
        // async getUpazilaList(){

        //     let url="frontend/get/active/upazila/list";

        //     await this.$http.get(url)
        //      .then(response=>{
        //         this.finalUpazilaList=response.data;
        //         this.upazilaList=response.data;
        //      })
        //      .catch(error=>{console.dir(error)})
        //      .finally();
        // },
        // async getDistrictList(){

        //     let url="frontend/get/active/district/list";

        //     await this.$http.get(url)
        //      .then(response=>{
        //         this.finalDistrictList=response.data;
        //         this.districtList=response.data;
        //      })
        //      .catch(error=>{console.dir(error)})
        //      .finally();
        // },
         getDivisionList(){

            let url="frontend/get/active/division/list";

             this.$http.get(url)
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
            
            let url="staff/settings/staff/get/list?page="+this.pageNo+"&numOfData="+this.numOfData+"&searchKey="+this.searchKey;

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
