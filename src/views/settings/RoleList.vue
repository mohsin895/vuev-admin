<template>
    <div>
        <b-card  title="ভূমিকা তালিকা"
        >
        <b-row>
            <b-col></b-col>
            <b-col class="d-flex flex-row-reverse">
                <slot v-if="$store.state.userInfo.permissions.includes(62)">
                    <b-button variant="primary" class="ml-2" v-b-modal.new-role-form> নতুন ভূমিকা যোগ করুন</b-button>
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
                            <th colspan="2" class="text-right">
                                <input type="text" class="form-control" v-model="searchKey" placeholder="ভূমিকা " v-on:keyup.enter="getDataList()">
                            </th>
                            <th class="float-left">
                                <a href="#" class="btn btn-sm btn-info text-light" @click="getDataList()">
                                    <icon name="search" size="15px"/> অনুসন্ধান করুন
                                </a>
                            </th>
                            
                        </tr>
                        <tr>
                            <th>নং</th>
                            <th>ভূমিকা(English)</th>
                            <th>ভূমিকা</th>
                            <th>অপশনস</th>
                        </tr>
                        
                        </thead>
                        <tbody>
                            <tr v-for="dataInfo,dataIndex in dataList.data">
                                <td>{{++dataIndex | banglaNumber}}</td>
                               
                                <td>{{dataInfo.roleName}}</td>
                                <td>{{dataInfo.roleNameBn}}</td>
                                
                                <td>
                                  <slot v-if="$store.state.userInfo.permissions.includes(65)">  
                                        <a href="#" class="text-primary" v-b-modal.permission-form @click="getSelectedRolePermissionList(dataInfo.id)">
                                            <icon name="key" size="15px"/>
                                        </a>  
                                   </slot>
                                <slot v-if="$store.state.userInfo.permissions.includes(63)">
                                    <a href="#" class="text-primary" v-b-modal.role-edit-form @click="getRoleInfo(dataInfo.id)">
                                        <icon name="eye" size="15px"/>
                                    </a>
                                </slot>
                                <slot v-if="$store.state.userInfo.permissions.includes(64)">
                                    <a href="#" class="text-danger" style="margin-left:5px;" @click="deleteRoleInfo(dataInfo.id)">
                                        <icon name="trash-alt" size="15px"/>
                                    </a>
                                </slot>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="4">
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



        <b-modal id="permission-form" title="অনুমতি তালিকা" size="xl" ok-only ok-variant="secondary" ok-title="Close">
          	<b-row>
               <b-col>
                   <h4>{{roleName+" এর অনুমতিসমূহ"}}</h4>
               </b-col> 
            </b-row>
            <b-row>
          		<b-col>
                   <Permissions/>
               </b-col>
           </b-row>
          </b-modal>




          <b-modal id="role-edit-form" title="ভূমিকা তথ্য" size="xl" ok-only ok-variant="secondary" ok-title="Close">
            <b-row>
                <b-col>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="ভূমিকা নাম" class="mt-3">
                              <b-form-input v-model="roleName"></b-form-input>
                        </b-input-group>
                    </b-col>
                    <b-col>
                        <b-input-group prepend="ভূমিকা নাম ইংরিজীতে" class="mt-3">
                              <b-form-input v-model="roleNameBn"></b-form-input>
                        </b-input-group>
                    </b-col>
                   </b-row>
                   
                   <b-row class="mt-2">
                       <b-col>
                               
                       </b-col>
                       <b-col class="d-flex flex-row-reverse">
                            
                        <slot v-if="$store.state.userInfo.permissions.includes(63)">
                             <b-button variant="success" class="ml-2" @click="updateRoleInfo">আপডেট করুন</b-button>
                        </slot>
                        <b-button variant="danger" @click="resetForm">মুছুন</b-button>
                       </b-col>
                   </b-row>
               </b-col>
           </b-row>
          </b-modal>





          <b-modal id="new-role-form" title="ভূমিকা তথ্য" size="xl" ok-only ok-variant="secondary" ok-title="Close">
           <b-row>
               <b-col>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="ভূমিকা নাম" class="mt-3">
                              <b-form-input v-model="roleName"></b-form-input>
                        </b-input-group>
                    </b-col>
                    <b-col>
                        <b-input-group prepend="ভূমিকা নাম ইংরিজীতে" class="mt-3">
                              <b-form-input v-model="roleNameBn"></b-form-input>
                        </b-input-group>
                    </b-col>
                   </b-row>
                   
                   <b-row class="mt-2">
                       <b-col>
                               
                       </b-col>
                       <b-col class="d-flex flex-row-reverse"> 
                            
                        <slot v-if="$store.state.userInfo.permissions.includes(62)">
                             <b-button variant="success" class="ml-2" @click="storeRoleInfo">সংরক্ষণ করুন</b-button>
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
import Permissions from './Permission.vue';
export default{
    components:{
        Permissions,
    },
	data(){
		return{
			errMsg:null,
			msgFlag:false,
			errMsgFlag:false,
			msg:null,
			dataList:[],
			lastPage:1,
			numOfData:20,
			pageNo:1,
			searchKey:'',
			roleName:null,
			roleNameBn:null,
            permissionList:[],
		}
	},
	beforeMount(){
		this.getDataList();
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
         
        deleteRoleInfo(dataId){
            let token=window.localStorage.getItem("token");
            
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token,
                          'Content-Type': 'multipart/form-data'
                      }   
                  };

            let url="staff/settings/role/info/delete?dataId="+dataId;

             this.$http.get(url,config)
             .then(response=>{
                
                if(response.data.errMsgFlag==true)
                    this.$toaster.warning(response.data.errMsg);

                if(response.data.msgFlag==true)
                    this.$toaster.success(response.data.msg);

                this.getDataList();
             })
             .catch(error=>{})
             .finally();
        },
		resetForm(){
			this.roleName=null;
			this.dataId=null;
			this.roleNameBn=null;
            this.permissionList=[];
		},
        async getSelectedRolePermissionList(dataId){
            
            let token=window.localStorage.getItem("token");
            
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token,
                          'Content-Type': 'multipart/form-data'
                      }   
                  };

            let url="staff/settings/role/get/permission/list?dataId="+dataId;

            await this.$http.get(url,config)
             .then(response=>{
                this.roleName=response.data.roleName;
                this.$store.commit("storeSelectedRolePermission",response.data);
             })
             .catch(error=>{})
             .finally();
        },
        // async getPermissionInfos(dataId){
        //     let token=window.localStorage.getItem("token");
        //     let config = {
        //                headers: {
        //                   'Authorization': 'Bearer '+token
        //               }   
        //           };
            
        //     let url="staff/settings/role/get/permission/list?dataId="+dataId;

        //     this.dataId=dataId;

        //     await this.$http.get(url,config)
        //      .then(response=>{
        //         if(response.data.msgFlag==true){
                
        //             this.roleName=response.data.roleName;

        //             this.permissionList=response.data.permissionList;
        //         }
        //         if(response.data.errMsgFlag==true){
        //             // this.$toaster.warning(response.data.errMsg);

        //             this.roleName=response.data.roleName;

        //             this.permissionList=response.data.permissionList;
        //         }
        //      })
        //      .catch(error=>{console.dir(error)})
        //      .finally();
        // },
        async getRoleInfo(dataId){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token
                      }   
                  };
            
            let url="staff/settings/role/get/info?dataId="+dataId;

            this.dataId=dataId;

            await this.$http.get(url,config)
             .then(response=>{
                if(response.data.msgFlag==true){
                    
                    this.roleName=response.data.dataInfo.roleName;

                    this.roleNameBn=response.data.dataInfo.roleNameBn;

                }
                if(response.data.errMsgFlag==true)
                    this.$toaster.warning(response.data.errMsg);
             })
             .catch(error=>{console.dir(error)})
             .finally();
        },
		async storeRoleInfo(){
			let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token,
                          'Content-Type': 'multipart/form-data'
                      }   
                  };
            
            let url="staff/settings/role/store/info";

            let formData=new FormData();

                formData.append("roleName",this.roleName);
                formData.append("roleNameBn",this.roleNameBn);
                
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
		async updateRoleInfo(){
			let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token,
                          'Content-Type': 'multipart/form-data'
                      }   
                  };
            
            let url="staff/settings/role/update/info";

            let formData=new FormData();

                formData.append("dataId",this.dataId);
                formData.append("roleName",this.roleName);
                formData.append("roleNameBn",this.roleNameBn);

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
		 getDataList(){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token
                      }   
                  };
            
            let url="staff/settings/role/get/list?page="+this.pageNo+"&numOfData="+this.numOfData+"&searchKey="+this.searchKey;

             this.$http.get(url,config)
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
	}
}
</script>

<style lang="scss" scoped>

</style>
