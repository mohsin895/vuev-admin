<template>
    <div>
        <b-card  title="আইন তালিকা"
        >
        <b-row>
            
             <div class="d-flex flex-row-reverse">
                    <b-button variant="primary" class="ml-2" v-b-modal.new-data-form> নতুন আইন যোগ করুন</b-button>
			 </div>
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
                                <input type="text" class="form-control" v-model="searchKey" placeholder=" এর নাম " v-on:keyup.enter="getDataList()">
                            </th>
                            <th class="float-left">
                                <a href="#" class="btn btn-sm btn-info text-light" @click="getDataList()" >
                                    <icon name="search" size="15px"/> অনুসন্ধান করুন
                                </a>
                            </th>
                            
                        </tr>
                        <tr>
                            <th>নং</th>
                            <th>প্রশ্ন </th>
                            <th>আইন </th>
                            <th>অপশনস</th>
                        </tr>
                        
                        </thead>
                        <tbody>
                            <tr v-for="dataInfo,dataIndex in dataList.data">
                                <td>{{++dataIndex | banglaNumber}}</td>
                                
                                <td>{{dataInfo.question}}</td>
                                <td style="white-space: normal;">{{dataInfo.law}}</td>

                                
                                <slot>
                                    <a href="#" class="text-primary" v-b-modal.data-edit-form @click="getDataInfo(dataInfo.id)">
                                        <icon name="eye" size="15px"/>
                                    </a>
                                </slot>
                                <slot >
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



        <b-modal id="data-edit-form" title="আইন তথ্য" size="xl" ok-only ok-variant="secondary" ok-title="Close">
           <b-row>
               <b-col>
                   
                   <b-row>
                    <b-col>
                        <b-input-group prepend="আইন" class="mt-3">
                            <b-form-input v-model="question"></b-form-input>
                        </b-input-group>

                    </b-col>
                   </b-row>

                   <b-row>
                    <b-col>
                        <b-input-group prepend="আইন" class="mt-3">
                           <textarea class="form-control" rows="6" placeholder="আইন" v-model="law"></textarea>
                        </b-input-group>

                    </b-col>
                   </b-row>

                   <b-row class="mt-2">
                       	<div class="d-flex flex-row-reverse">
                       		<slot >
	                             <b-button variant="success" class="ml-2" @click="updateDataInfo">আপডেট করুন</b-button>
	                        </slot>
                            <b-button variant="danger" @click="resetForm">মুছুন</b-button>
                        
                       </div>
                   </b-row>
               </b-col>
           </b-row>
          </b-modal>





          <b-modal id="new-data-form" title="আইন তথ্য" size="xl" ok-only ok-variant="secondary" ok-title="Close">
           <b-row>
               <b-col>
                   
                   <b-row>
                    <b-col>
                        <b-input-group prepend="আইন" class="mt-3">
                            <b-form-input v-model="question"></b-form-input>
                        </b-input-group>

                    </b-col>
                   </b-row>

                   <b-row>
                    <b-col>
                        <b-input-group prepend="আইন" class="mt-3">
                           <textarea class="form-control" rows="6" placeholder="আইন" v-model="law"></textarea>
                        </b-input-group>

                    </b-col>
                   </b-row>
                   
                  
                   <b-row class="mt-2">
                       <div class="d-flex flex-row-reverse">
	                       	<slot >
	                             <b-button variant="success" class="ml-2" @click="storeDataInfo">সংরক্ষণ করুন</b-button>
	                        </slot>
                            <b-button variant="danger" @click="resetForm">মুছুন</b-button>
	                        
                       </div>
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
           
          	question:'',
          	law:'',
        }
    },
    beforeMount(){
        this.getDataList();
        // this.getUpazilaList();
        // this.getUnionList();
    },
        
    mounted(){
     
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
            
            let url="staff/frontend/laws/info/status/change?dataId="+dataId+"&status="+status;

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
            
            let url="staff/frontend/laws/info/delete?dataId="+dataId;

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
        resetForm(){  
            this.dataId=null;
            this.question=null;
            this.law=null;
        },
        
        async updateDataInfo(){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token,
                          'Content-Type': 'multipart/form-data'
                      }   
                  };
            
            let url="staff/frontend/laws/info/update";

            let formData=new FormData();

                formData.append("dataId",this.dataId);
                formData.append("question",this.question);
                formData.append("law",this.law);


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
        async storeDataInfo(){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token,
                          'Content-Type': 'multipart/form-data'
                      }   
                  };
            
            let url="staff/frontend/laws/info/store";

            let formData=new FormData();

                formData.append("question",this.question);
                formData.append("law",this.law);


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
        async getDataInfo(dataId){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token
                      }   
                  };
            
            let url="staff/frontend/laws/info?dataId="+dataId;
            this.dataId=dataId;
            await this.$http.get(url,config)
             .then(response=>{
                if(response.data.msgFlag==true){
                    
                    this.question=response.data.dataInfo.question;
                   
                    this.law=response.data.dataInfo.law;
                

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
       
         getDataList(){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token
                      }   
                  };
            
            let url="staff/frontend/laws/list?page="+this.pageNo+"&numOfData="+this.numOfData+"&searchKey="+this.searchKey;

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
