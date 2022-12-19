<template>
    <div class="RegisterCase">
       <b-card title="গ্রাম আদালতের ক্ষতিপুরণের অথ লেনদেন রেজিস্টার রির্পোট"> 
        <!-- Main Table Start Hare -->
        <b-row class="text-center">
          <b-col cols="12">
            <p class="align-center">ফরম-১৩</p>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <p class="align-middle">[ বিধি ২২ (২) দ্রষ্টব্য ]</p>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <h5 class="align-middle">গ্রাম আদালতের ক্ষতিপুরণের অথ লেনদেন রেজিস্টার রির্পোট</h5>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <h6 class="align-middle">( তেতুলঝোড়া ইউনিয়ন পরিষদ )</h6>
          </b-col>
        </b-row>
        <div class="container-lg">
          
          <b-row class="Date_time text-center mt-3 mb-4" cols-lg="12" cols-sm="">
              <b-col cols=""> 
              </b-col>
              <b-col cols="3"> 
                      <b-form-datepicker id="timepicker-valid" :state="true"  > 
                      </b-form-datepicker>
              </b-col>
              <b-col cols="1"> 
                <strong>থেকে</strong>
              </b-col>
              <b-col cols="3"> 
                      <b-form-datepicker id="timepicker-invalid" :state="true"  > 
                      </b-form-datepicker>
              </b-col>
                <b-col cols="3"> 
                      <button type="button" class="btn btn-success">প্রতিবেদন প্রিন্ট করুন</button>
                </b-col>
          </b-row>

        </div>
        <table class="table text-center">
          <thead>
            <tr>
              <th scope="col">ক্রমিক নং</th>
              <th scope="col">বৎসর</th>
              <th scope="col">মামলা নং</th>
              <th scope="col">আবেদনকারীর_নাম ও_ঠিকানা</th>
              <th scope="col">প্রতিবাদীর_নাম ও_ঠিকানা</th>
              <th scope="col">সিদ্ধান্তকৃত_টাকার পরিমান_ও_তারিখ</th>
              <th scope="col">জমাকৃত_টাকা ও_তারিখ</th>
              <th scope="col">টাকা_জমাকারীর নাম_ও_স্বাক্ষর</th>
              <th scope="col">গ্রহনকৃত_টাকা ও_তারিখ</th>
              <th scope="col">টাকা_গ্রহনকারীন নাম_ও_তারিখ</th>
              <th scope="col">স্বাক্ষীর_নাম, স্বাক্ষর_ও_তারিখ</th>
              <th scope="col">মন্তব্য</th>
              <th scope="col">অ্যাকশন</th>
            </tr>  
            <tr class="table-secondary">
              <th scope="col">১</th>
              <th scope="col">২</th>
              <th scope="col">৩</th>
              <th scope="col">৪</th>
              <th scope="col">৫</th>
              <th scope="col">৬</th>
              <th scope="col">৭</th>
              <th scope="col">৮</th>
              <th scope="col">৯</th>
              <th scope="col">১০</th>
              <th scope="col">১১</th>
              <th scope="col">১২</th>
            </tr>

          </thead>
          <tbody>
          

              <tr v-for="dataInfo,dataIndex in dataList.data" :key="dataInfo.id">
              <td>{{++dataIndex |banglaNumber}}</td>
              <td>{{dataInfo.created_at |formatYearBn}}</td>
              <td>{{dataInfo.id |banglaNumber}}
                
              
              </td>
              <td>
                <slot v-for="applicantInfo in dataInfo.applicant_infos" >
                  {{applicantInfo.name}}
                </slot>
                <slot v-if="dataInfo.userunion_info">{{dataInfo.userunion_info.bn_name}}<br></slot>
                <slot v-if="dataInfo.upazila_info">{{dataInfo.upazila_info.bn_name}}<br></slot>
                <slot v-if="dataInfo.district_info">{{dataInfo.district_info.bn_name}}</slot>
               
            
                    
                         
                  
              
          
              </td>
              <td>
                <slot v-for="oppositorInfo in dataInfo.oppositor_infos">
                  {{oppositorInfo.name}}
                </slot>
                <slot v-if="dataInfo.userunion_info">{{dataInfo.userunion_info.bn_name}}<br></slot>
                <slot v-if="dataInfo.upazila_info">{{dataInfo.upazila_info.bn_name}}<br></slot>
                <slot v-if="dataInfo.district_info">{{dataInfo.district_info.bn_name}}</slot>
              
              </td>
              <td span style="font-weight:700;">
                <slot v-if="dataInfo.last_order!=null">
                    {{dataInfo.last_order.order_amount}}
                    <br> <span style="font-weight:600"> {{dataInfo.last_order.created_at |formatDateBd}}</span> 
                </slot>
                 </td>
              <td span style="font-weight:700;"> ১২,০০০  <br> <span style="font-weight:600"> 02/06/2022 </span>  </td>
              <td>আনোয়ার হোসেন  <span style="font-weight:600"> গ্রামঃশ্যামপুর </span></td>
              <td span style="font-weight:700;"> ১২,০০০  <br> <span style="font-weight:600"> 02/06/2022 </span>  </td>
               <td>জসিম হোসেন<span style="font-weight:600"> গ্রামঃতেঁতুলঝোড়া </span></td>
               <td></td>
               <td>-</td>
               <td>
                <a href="#" class="text-primary ml-2" v-b-modal.application-form-view @click="getFineDetails()">
                <icon name="edit" size="15px"/>
                </a>

              </td>
            </tr>
      
            
           
          </tbody>
        </table>
        <div class="gadget">  ১৪৪০ , বাংলাদেশ গেজেট, অতিরিক্ত, ফেব্রুয়ারী ১৫, ২০১৬</div>

        <div class="overflow-auto">
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
        </div>
        <b-modal id="application-form-view" title="গ্রাম আদালতের ক্ষতিপুরণের অথ লেনদেন রেজিস্টার" size="xl" ok-only ok-variant="secondary" ok-title="Close">
            <b-row>
                <b-col class="text-center">
                    <h4>আবেদন ফরম-১</h4>
                    <!-- <pre>{{applicationDetails.applicant_infos}}</pre> -->
                </b-col>
            </b-row>
            <table class="Table">
        <Thead>
          <tr>
            <th scope="col">আদেশ নং: <br /></th>
            <th scope="col">আদেশর তারিখ: <br /></th>
            <th scope="col">টাকা_জমাকারীর নাম:</th>
            <th scope="col">জমাকৃত_টাকা:</th>
            <th scope="col">টাকা_গ্রহনকারীন নাম: <br /></th>
            <th scope="col">গ্রহনকৃত_টাকা: <br /></th>
          </tr>
        </Thead>
        <tbody>

          <slot v-if="caseInfos!=null">
          
        </slot>
          <tr>
              <td style="width: 150px"></td>
              <td style="width: 150px">
                <input type="date"  class="form-control">
              </td>
              <td>
                <input
                 
                  class="form-control"
                  placeholder="টাকা_জমাকারীর নাম লিখুন"
                  v-model="receiver_name"
                />
              </td>
              <td>
                <input
                
                  class="form-control"
                  placeholder="জমাকৃত_টাকা লিখুন"
                  v-model="receive_money"
                />
              </td>
              <td style="width: 150px">
                <input
                  rows="8"
                  class="form-control"
                  placeholder="টাকা_গ্রহনকারীন নাম লিখুন:"
                  v-model="adder_name"
                />
              </td>
              <td>
                <input
                  rows="8"
                  class="form-control"
                  placeholder="গ্রহনকৃত_টাকা লিখুন:"
                  v-model="add_money"
                />
              </td>
            </tr>
        
        </tbody>
      </table>
          
          
      <b-row class="text-center mt-5">
      
        <b-col cols="6">
          
            <button type="button" class="btn btn-success" @click="storeOrderMoney()">সেভ করুন</button>
        
        </b-col>
      </b-row>
            
          </b-modal> 
       </b-card>
    </div>
</template>

<script>
export default {
    data(){
      return{
        errMsg:null,
        errMsgFlag:false,
        msg:null,
        msgFlag:false,
        numOfData:20,
        pageNo:1,
        lastPage:1,
        dataList:[],
        startDate:'',
        endDate:'',
     
        startDate:'',
        endDate:'',
      }
    },
    beforeMount(){
      this.getDataList();
      // this.getUpazilaList();
      // this.getUnionList();
    },
   
  methods:{
  

    
      getCaseDegreeConditions(conditions){
        return JSON.parse(conditions);
      },

      async storeOrderMoney(){
      let token=window.localStorage.getItem("token");
      let config = {
                 headers: {
                    'Authorization': 'Bearer '+token
                }   
            };
      
      let url="staff/report/store/case/order/money";
      let formData=new FormData();
      formData.append("receiver_name",this.receiver_name);
      formData.append("receive_money",this.receive_money);
      formData.append("adder_name",this.adder_name);
      formData.append("add_money",this.add_money);
  
    

      await this.$http.post(url,config)
       .then(response=>{
          if(response.data.msgFlag==true){
            this.$toaster.success(response.data.msg);
            this.showCaseOrderForm(this.caseInfos.id);
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
            
            let url="staff/report/get/compensation/money/register?page="+this.pageNo+"&numOfData="+this.numOfData+"&startDate="+this.startDate+"&endDate="+this.endDate;

            await this.$http.get(url,config)
             .then(response=>{
              // console.log(response.data);
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
    },
   


}
</script>

<style lang="scss" scoped>
.RegisterCase {
  margin: 10px 0px 0px 10px;
}
 .container-lg, .Date_time {
  float: right;

 }
.table{
    width: 100%;
    font-size: 12px;
    text-align:center !important;
    border: 1px solid rgb(182, 182, 182);
}
.overflow-auto{
    float: right;
}

.Table th,
td {
  border: 1px solid #000;
  padding: 12px;
}
</style>