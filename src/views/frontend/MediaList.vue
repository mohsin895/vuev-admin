<template>
    <div>
        <b-card  title="মিডিয়া তালিকা"
        >
        <b-row>
            
             <div class="d-flex flex-row-reverse">
                    <b-button variant="primary" class="ml-2" v-b-modal.new-data-form> নতুন মিডিয়া যোগ করুন</b-button>
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
                                <a href="#" class="btn btn-sm btn-info text-light" @click="getDataList()">
                                    <icon name="search" size="15px"/> অনুসন্ধান করুন
                                </a>
                            </th>
                            
                        </tr>
                        <tr>
                            <th>নং</th>
                            <th>মিডিয়া স্লাইডার </th>
                            <th>মিডিয়া নাম</th>
                            <th>অপশনস</th>
                        </tr>
                        
                        </thead>
                        <tbody>
                            <tr v-for="dataInfo,dataIndex in dataList.data">
                                <td>{{++dataIndex | banglaNumber}}</td>
                                <td>
                                	<div class="carousel-wrapper">
								        <carousel 
								        :per-page="1"
								        :mouse-drag="true"
								        :autoplay="true"
								        :autoplayTimeout="3000"
								        :navigationEnabled="false"
								        :paginationEnabled="true"
								        
								        :paginationPosition="'bottom-overlay'"
								        >
								          <slide
								          v-for="sliderInfo,index in dataInfo.media_slider_infos"
								          :key="index"
								          >
								            <!-- <img src="@/assets/images/sliderFirst.png" alt=""> -->
								            <img :src="sliderInfo.sliderUrl" :alt="sliderInfo.altName" height="70" width="140">
								          </slide>
								        </carousel>
								      </div>
                                </td>
                                <td>{{dataInfo.title}}</td>

                                
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



        <b-modal id="data-edit-form" title="মিডিয়া তথ্য" size="xl" ok-only ok-variant="secondary" ok-title="Close">
           <b-row>
               <b-col>
                   <b-row class="d-flex flex-row">
                   	<slot v-if="mediaSliderUrls.length">
                    <slot v-for="(image, index) in mediaSliderUrls">
                    <b-col >
                    	
                    		<div>
	                        <img :src="image" height="70" >
	                        <a href="#" @click="removeSliderInfo(index); return false;">
	                                <b-icon style="color:#fff;background-color:red;margin-left: -35px;font-size: 18px;cursor: pointer;" icon="x" scale="2" />
	                            </a>
	                        </div>
	                    
                    </b-col>

					</slot>
					</slot>
                   </b-row>
                   <b-row>
                    <b-col>
                       

                        <b-form-group  prepend="মিডিয়া স্লাইডার	" label-cols-sm="2">
                            <b-form-file id="file-default" ref="photo" accept="image/*"  @change="addSliders"></b-form-file>
                          </b-form-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="মিডিয়া নাম" class="mt-3">
                            <b-form-input v-model="title"></b-form-input>
                        </b-input-group>

                    </b-col>
                   </b-row>

                   <b-row>
                    <b-col>
                        <b-input-group prepend="বিস্তারিত:" class="mt-3">
                             <vue-editor v-model="details"></vue-editor>
                        </b-input-group>

                    </b-col>
                   </b-row>
                   
               </b-col>
           </b-row>

           <b-row class="mt-5">
                <div class="d-flex flex-row-reverse">
                    <slot >
                         <b-button variant="success" class="ml-2" @click="updateDataInfo">আপডেট করুন</b-button>
                    </slot>
                    <b-button variant="danger" @click="resetForm">মুছুন</b-button>
                
               </div>
           </b-row>
          </b-modal>





          <b-modal id="new-data-form" title="মিডিয়া তথ্য" size="xl" ok-only ok-variant="secondary" ok-title="Close">
           <b-row>
               <b-col>
                   <b-row class="d-flex flex-row">
                   	<slot v-if="mediaSliderUrls.length">
                    <slot v-for="(image, index) in mediaSliderUrls">
                    <b-col >
                    	
                    		<div>
	                        <img :src="image" height="70" >
	                        <a href="#" @click="removeSliderInfo(index); return false;">
	                                <b-icon style="color:#fff;background-color:red;margin-left: -35px;font-size: 18px;cursor: pointer;" icon="x" scale="2" />
	                            </a>
	                        </div>
	                    
                    </b-col>

					</slot>
					</slot>
                   </b-row>
                   <b-row>
                    <b-col>
                       

                        <b-form-group  prepend="মিডিয়া স্লাইডার	" label-cols-sm="2">
                            <b-form-file id="file-default" ref="photo" accept="image/*"  @change="addSliders"></b-form-file>
                          </b-form-group>
                    </b-col>
                   </b-row>
                   <b-row>
                    <b-col>
                        <b-input-group prepend="মিডিয়া নাম" class="mt-3">
                            <b-form-input v-model="title"></b-form-input>
                        </b-input-group>

                    </b-col>
                   </b-row>

                   <b-row>
                    <b-col>
                        <b-input-group prepend="বিস্তারিত:" class="mt-3">
                             <vue-editor v-model="details"></vue-editor>
                        </b-input-group>

                    </b-col>
                   </b-row>
                   
               </b-col>
           </b-row>

           <b-row class="mt-5">
                <div class="d-flex flex-row-reverse">
                    <slot >
                         <b-button variant="success" class="ml-2" @click="storeDataInfo">সংরক্ষণ করুন</b-button>
                    </slot>
                    <b-button variant="danger" @click="resetForm">মুছুন</b-button>
                
               </div>
           </b-row>
          
          </b-modal>


        </b-card>
</div>
    
</template>

<script>

export default{
    data(){
        return{
        	mediaSliderUrls:[],
        	mediaSliders:[],
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
           
          	title:'',
          	photo:'',
          	details:'',
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
	addSliders(event) {
        const file= event.target.files[0];
        if (file) {
            
        let Extension = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
        if ( !(Extension == "png" || Extension == "bmp" || Extension == "jpeg" || Extension == "jpg")) {
                toast.error({
                    position: 'topRight',
                    title: 'ছবি *JPG*/ *PNG* ফরমেট হতে হবে',
                });
                return false;
            } else {
                const imgUrl = URL.createObjectURL(file);
                this.mediaSliderUrls.push(imgUrl);
                this.mediaSliders.push(file);
            }
        }

        
    },
	removeSliderInfo(index){
		this.mediaSliderUrls.splice(index,1);
		this.mediaSliders.splice(index,1);
	},
      dataStatusChange(dataId,status) {
          
          let token=window.localStorage.getItem("token");

            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token,
                          'Content-Type': 'multipart/form-data'
                      }   
                  };
            
            let url="staff/frontend/media/info/status/change?dataId="+dataId+"&status="+status;

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
            
            let url="staff/frontend/media/info/delete?dataId="+dataId;

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
            this.name=null;
            this.address=null;
            this.email=null;
            this.photo=null;
            this.phone=null;
            this.district=null;
            this.division=null;
            this.upazila=null;
            this.union=null;
        },
        
         updateDataInfo(){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token,
                          'Content-Type': 'multipart/form-data'
                      }   
                  };
            
            let url="staff/frontend/media/info/update";

            let formData=new FormData();

                formData.append("dataId",this.dataId);
                formData.append("title",this.title);
                formData.append("details",this.details);


                this.mediaSliders.forEach(photo=>{
		                formData.append("sliders[]",photo);
		         });

             this.$http.post(url,formData,config)
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
         storeDataInfo(){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token,
                          'Content-Type': 'multipart/form-data'
                      }   
                  };
            
            let url="staff/frontend/media/info/store";

            let formData=new FormData();

                formData.append("title",this.title);
                formData.append("details",this.details);


                this.mediaSliders.forEach(photo=>{
		                formData.append("sliders[]",photo);
		         });


             this.$http.post(url,formData,config)
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
         getDataInfo(dataId){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token
                      }   
                  };
            
            let url="staff/frontend/media/info?dataId="+dataId;
            this.dataId=dataId;
             this.$http.get(url,config)
             .then(response=>{
                if(response.data.msgFlag==true){
                    
                    this.title=response.data.dataInfo.title;
                   
                    this.details=response.data.dataInfo.details;
                

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
            
            let url="staff/frontend/media/list?page="+this.pageNo+"&numOfData="+this.numOfData+"&searchKey="+this.searchKey;

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
