<template>
    <div>
        <b-card  title="থানা নির্বাহী কর্মকর্তা তালিকা"
        >
        <b-row>
            <b-col></b-col>
            <b-col class="float-right">
            <slot v-if="$store.state.userInfo.permissions.includes(50)">
                <b-button variant="primary" class="ml-2" v-b-modal.new-dc-form> নতুন থানা নির্বাহী কর্মকর্তা যোগ করুন</b-button>
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
                            <th colspan="5" class="text-right">
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
                            <th>ফোন</th> 
                            <th>ইমেইল</th>
                            <th>ঠিকানা</th>
                            <th>অপশনস</th>
                        </tr>
                        
                        </thead>
                        <tbody>
                            <tr v-for="dataInfo,dataIndex in dataList.data">
                                <td>{{++dataIndex | banglaNumber}}</td>
                                <td>
                                    <img :src="dataInfo.avatar |getImageUrl" :alt="dataInfo.name" height="70" width="70">
                                </td>
                                <td>{{dataInfo.name}}</td>
                              
                                <td>{{dataInfo.phone |banglaNumber}}</td>
                                
                                <td>{{dataInfo.email }}</td>
                                
                                <td>{{dataInfo.address}}</td>
                                
                                <td>
                                    <!-- <a href="#"  class="text-light bg-success">
                                        <icon name="check" size="15px"/>
                                    </a> -->
                                <slot v-if="$store.state.userInfo.permissions.includes(51)">
                                    <a href="#" class="text-primary" v-b-modal.member-edit-form @click="getTnoInfo(dataInfo.id)">
                                        <icon name="eye" size="15px"/>
                                    </a>
                                </slot>
                                <slot v-if="$store.state.userInfo.permissions.includes(52)">
                                    <a href="#" class="text-danger" style="margin-left:5px;">
                                        <icon name="trash-alt" size="15px"/>
                                    </a>
                                </slot>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="7">
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



        <b-modal id="dc-edit-form" title="থানা নির্বাহী কর্মকর্তা তথ্য" size="xl" ok-only ok-variant="secondary" ok-title="Close">
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
                            <b-form-input type="number" v-model="phone"></b-form-input>
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
                    <b-col>
                        <b-input-group prepend="উপজেলা" class="mt-3">
                            <v-select :options="upazilaList" :reduce="upazilaList => upazilaList.id" label="bn_name" v-model="upazila" @input="filterUnionList">
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
                       <b-col>
                            <b-button variant="danger" @click="resetForm">মুছুন</b-button>
                        <slot v-if="$store.state.userInfo.permissions.includes(51)">
                             <b-button variant="success" class="ml-2" @click="updateTnoInfo">আপডেট করুন</b-button>
                        </slot>
                       </b-col>
                   </b-row>
               </b-col>
           </b-row>
          </b-modal>





          <b-modal id="new-dc-form" title="থানা নির্বাহী কর্মকর্তা তথ্য" size="xl" ok-only ok-variant="secondary" ok-title="Close">
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
                            <b-form-input type="number" v-model="phone"></b-form-input>
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

                    <b-col>
                        <b-input-group prepend="উপজেলা" class="mt-3">
                            <v-select :options="upazilaList" :reduce="upazilaList => upazilaList.id" label="bn_name" v-model="upazila" @input="filterUnionList">
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
                       <b-col>
                            <b-button variant="danger" @click="resetForm">মুছুন</b-button>
                        <slot v-if="$store.state.userInfo.permissions.includes(50)">
                             <b-button variant="success" class="ml-2" @click="storeTnoInfo">সংরক্ষণ করুন</b-button>
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
           
            districtList:[],
            unionList:[],
            divisionList:[],
            finalDistrictList:[],
            finalMemberList:[],
            finalUnionList:[],
            finalDivisionList:[],
            finalUpazilaList:[],
            upazilaList:[],
            division:null,
            district:null,
            upazila:null,

            name:null,
            email:null,
            phone:null,
            photo:null,
            address:null,
        }
    },
    beforeMount(){
        this.getDataList();
    },
    mounted(){
        this.getDivisionList();
        this.getDistrictList();
        this.getUpazilaList();
        this.getUnionList();
    },
    methods:{
        filterUpazilaList(){
            this.upazilaList=[];
            this.finalUpazilaList.forEach(dataInfo=>{
                if(this.$store.state.userInfo.districtId==dataInfo.district_id)
                    this.upazilaList.push(dataInfo);
            })
        },
        filterUnionList(){
            this.unionList=[];
            this.finalUnionList.forEach(dataInfo=>{
                if(this.$store.state.userInfo.upazilaId==dataInfo.thana_id)
                    this.unionList.push(dataInfo);
            })
        },
        async getUnionList(){

            let url="frontend/get/active/union/list";

            await this.$http.get(url)
             .then(response=>{
                this.finalUnionList=response.data;
                this.unionList=response.data;
                this.filterUnionList();
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
                this.filterUpazilaList();
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
        },
        async updateTnoInfo(){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token,
                          'Content-Type': 'multipart/form-data'
                      }   
                  };
            
            let url="staff/settings/upazila/update/tno/info";

            let formData=new FormData();

                formData.append("dataId",this.dataId);
                formData.append("name",this.name);
                formData.append("address",this.address);
                formData.append("phone",this.phone);
                formData.append("email",this.email);
                formData.append("division",this.division);
                formData.append("district",this.district);
                formData.append("upazila",this.district);


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
        async storeTnoInfo(){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token,
                          'Content-Type': 'multipart/form-data'
                      }   
                  };
            
            let url="staff/settings/upazila/store/tno/info";

            let formData=new FormData();

                formData.append("name",this.name);
                formData.append("address",this.address);
                formData.append("phone",this.phone);
                formData.append("email",this.email);
                formData.append("division",this.division);
                formData.append("district",this.district);
                formData.append("upazila",this.district);

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
        async getTnoInfo(dataId){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token
                      }   
                  };
            
            let url="staff/settings/upazila/get/tno/info?dataId="+dataId;
            this.dataId=dataId;
            await this.$http.get(url,config)
             .then(response=>{
                if(response.data.msgFlag==true){
                    
                    this.name=response.data.dataInfo.name;
                    this.address=response.data.dataInfo.address;
                   
                    this.photo=response.data.dataInfo.avatar;
                
                    this.phone=response.data.dataInfo.phone;
                    this.email=response.data.dataInfo.email;

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
        async getDataList(){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token
                      }   
                  };
            
            let url="staff/settings/upazila/get/tno/list?page="+this.pageNo+"&numOfData="+this.numOfData+"&searchKey="+this.searchKey;

            await this.$http.get(url,config)
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
