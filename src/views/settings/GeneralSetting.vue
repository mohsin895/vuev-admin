<template>
<div class="card">
   <div class="card-body">
        <b-row>
            <b-col>
                <b-row>
                    <b-col cols="12">
                      <div role="group">
                        <label for="input-live">Short Description:</label>
                        <b-form-textarea
                          v-model="shortDescription"
                          placeholder="Short Description"
                        ></b-form-textarea>
                      </div>
                    </b-col>
                    <b-col cols="12">
                      <div role="group">
                        <label for="input-live">Mobile Number:</label>
                        <b-form-input
                          v-model="mobileNumber"
                          placeholder="Mobile Number"
                        ></b-form-input>
                      </div>
                    </b-col>
                    <b-col cols="12">
                      <div role="group">
                        <label for="input-live">Phone Number:</label>
                        <b-form-input
                          v-model="phoneNumber"
                          placeholder="Phone Number"
                        ></b-form-input>
                      </div>
                    </b-col>
                    <b-col cols="12">
                      <div role="group">
                        <label for="input-live">Email:</label>
                        <b-form-input
                          v-model="email"
                          placeholder="Email"
                        ></b-form-input>
                      </div>
                    </b-col>
                    <b-col cols="12">
                      <div role="group">
                        <label for="input-live">Website:</label>
                        <b-form-input
                          v-model="website"
                          placeholder="Website"
                        ></b-form-input>
                      </div>
                    </b-col>
                    <!-- <b-col cols="12">
                      <div role="group">
                        <label for="input-live">Website Logo:</label>
                        <b-form-file
                          v-model="logo"
                        ></b-form-file>
                      </div>
                    </b-col> -->
                    <b-col cols="12">
                      <div role="group">
                        <label for="input-live">Non Masking Api Key:</label>
                        <b-form-input
                          v-model="nonMaskingApiKey"
                          placeholder="Non Masking Api Key"
                          
                        ></b-form-input>
                      </div>
                    </b-col>
                    <b-col cols="12">
                      <div role="group">
                        <label for="input-live">Non Masking Client Id:</label>
                        <b-form-input
                          v-model="nonMaskingClientId"
                          placeholder="Non Masking Client Id"
                        ></b-form-input>
                      </div>
                    </b-col>
                </b-row>
            </b-col>
             <b-col>
                 <b-row>
                    
                    <b-col cols="12">
                      <div role="group">
                        <label for="input-live">Masking Api Key:</label>
                        <b-form-input
                          v-model="maskingApiKey"
                          placeholder="Masking Api Key"
                        ></b-form-input>
                      </div>
                    </b-col>
                    <b-col cols="12">
                      <div role="group">
                        <label for="input-live">Masking Client Id:</label>
                        <b-form-input
                          v-model="maskingClientId"
                          placeholder="Masking Client Id"
                        ></b-form-input>
                      </div>
                    </b-col>
                    <b-col cols="12">
                      <div role="group">
                        <label for="input-live">SMS Pattern For Case Summon: (write #caseno #date #time for getting case no date and time.)</label>
                        <b-form-textarea
                          v-model="summonSms"
                          placeholder="write #caseno #date #time for getting case no date and time."
                          rows="4"
                        ></b-form-textarea>
                      </div>
                    </b-col>
                    <b-col cols="12">
                      <div role="group">
                        <label for="input-live">SMS Pattern For Application: (write #caseno for getting case no.)</label>
                        <b-form-textarea
                          v-model="applicationSms"
                          placeholder="write #caseno for getting case no."
                          rows="4"
                        ></b-form-textarea>
                      </div>
                    </b-col>
                    <b-col cols="12" class="mt-2">
                        <div class="d-flex flex-row-reverse">
                            <slot >
                                 <b-button variant="success" class="ml-2" @click="updateDataInfo">Update</b-button>
                            </slot>
                            <b-button variant="danger" @click="resetForm">মুছুন</b-button>
                       </div>
                    </b-col> 
                </b-row>
            </b-col>
        </b-row>
	</div>
</div>	
</template>
<script>
export default {
    data(){
        return{
             shortDescription:null,
             mobileNumber:null,
             phoneNumber:null,
             email:null,
             website:null,
             logo:null,
             nonMaskingApiKey:null,
             nonMaskingClientId:null,
             maskingApiKey:null,
             maskingClientId:null,
            summonSms:null,
            applicationSms:null,
        }
    },
    mounted(){
        this.getDataInfo();
    },
    methods:{
        getDataInfo(){
            let token=window.localStorage.getItem("token");

            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token,
                          'Content-Type': 'multipart/form-data'
                      }   
                  };
            
            let url="staff/settings/get/general/setting/info";

             this.$http.get(url,config)
             .then(response=>{
                    if(response.data.msgFlag==true){
                        let dataInfo=response.data.dataInfo;
                        this.shortDescription=dataInfo.shortDescription;
                        this.mobileNumber=dataInfo.mobileNumber;
                        this.phoneNumber=dataInfo.phoneNumber;
                        this.email=dataInfo.email;
                        this.website=dataInfo.website;
                        this.nonMaskingApiKey=dataInfo.nonMaskingApiKey;
                        this.nonMaskingClientId=dataInfo.nonMaskingClientId;
                        this.maskingApiKey=dataInfo.maskingApiKey;
                        this.maskingClientId=dataInfo.maskingClientId;
                        this.summonSms=dataInfo.summonSms;
                        this.applicationSms=dataInfo.applicationSms;
                    }
             })
             .catch(error=>{console.dir(error)})
             .finally();
        },
        resetForm(){
            this.getDataInfo();
        },
        updateDataInfo(){
            let token=window.localStorage.getItem("token");

            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token,
                          'Content-Type': 'multipart/form-data'
                      }   
                  };
            
            let url="staff/settings/update/general/setting/info";

            let formData=new FormData();
            formData.append("shortDescription",this.shortDescription);
            formData.append("mobileNumber",this.mobileNumber);
            formData.append("phoneNumber",this.phoneNumber);
            formData.append("email",this.email);
            formData.append("website",this.website);
            formData.append("nonMaskingApiKey",this.nonMaskingApiKey);
            formData.append("nonMaskingClientId",this.nonMaskingClientId);
            formData.append("maskingApiKey",this.maskingApiKey);
            formData.append("maskingClientId",this.maskingClientId);
            formData.append("summonSms",this.summonSms);
            formData.append("applicationSms",this.applicationSms);

             this.$http.post(url,formData,config)
             .then(response=>{
                if(response.data.msgFlag==true)
                    this.$toaster.success(response.data.msg);
                if(response.data.errMsgFlag==true)
                    this.$toaster.warning(response.data.errMsg);
                this.getDataInfo();
             })
             .catch(error=>{console.dir(error)})
             .finally();  
        }
    }
}
</script>