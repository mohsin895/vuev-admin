<template>
    <div class="RegisterCase">
       <b-card title="ফিস বা জরিমানা রেজিস্টার রির্পোট"> 
        <!-- Main Table Start Hare -->
        <b-row class="text-center">
          <b-col cols="12">
            <p class="align-center">ফরম-১৫</p>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <p class="align-middle">[ বিধি ২৫ (২) দ্রষ্টব্য ]</p>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <h5 class="align-middle">ফিস বা জরিমানা রেজিস্টার রির্পোট</h5>
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
              <th scope="col">আবেদনকারীর_নাম ও_ঠিকানা</th>
              <th scope="col">প্রতিবাদীর_নাম ও_ঠিকানা</th>
              <th scope="col">প্রদানকারীর_নাম</th>
              <th scope="col">আদায়কৃত_অথের_পরিমান</th>
              <th scope="col">বিবরণ</th>
              <th scope="col">অথ_প্রাপ্তির_তারিখ</th>
              <th scope="col">১৪_নং_ফরমে রসিদের_নম্বর</th>
              <th scope="col">গ্রাম আদালত/_ইউনিয়ন পরিষদের চেয়ারম্যানের_স্বাক্ষর</th>
              <th scope="col">মন্তব্য</th>
            </tr>
            <tr class="table-secondary" >
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
            </tr>

          </thead>
          <tbody>
           
            <tr v-for="dataInfo,dataIndex in dataList.data" :key="dataInfo.id">
              <td>{{++dataIndex |banglaNumber}}</td>
              <td>
                <solt v-for="applicantInfo in dataInfo.applicant_infos" :key="applicantInfo.id">
                   {{applicantInfo.name}}
                </solt>
                
                <span style="font-weight:600" v-if="dataInfo.userunion_info"> {{dataInfo.userunion_info.bn_name}} </span>
              
              </td>
              <td>
                <solt v-for="oppositorInfo  in dataInfo.oppositor_infos" :key="oppositorInfo.id">
                  {{oppositorInfo.name}}
                </solt>
                <span style="font-weight:600" v-if="dataInfo.userunion_info"> {{dataInfo.userunion_info.bn_name}} </span>
              </td>
              <td> আবুল মিয়া</td>
              <td>১৫,০০০</td>
              <td>আবেদনকারী তার প্রাপ্য অথ উত্তোলনের জন্য আবেদন করেছেন, দেখিলামআবেদনটি মন্জুর করা হলো।
                   সংশ্লিষ্ট রেজিষ্ট্রারে ২ জন স্বাক্ষীর নাম লিখে </td>
              <td>০২/০৫/২০২২</td>
               <td>125</td>
               <td>ফখরুল আলম সমর</td>
               <td>-</td>
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
        numOfData:3,
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
      this.getDataList()
    },
    methods:{
      
      getCaseDegreeConditions(conditions){
        return JSON.parse(conditions);
      },
      async getDataList(){
        let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token
               }   
           };
        let url = "staff/report/get/fine/money/register?page="+this.pageNo+"&numOfData="+this.numOfData+"&startDate="+this.startDate+"&endDate="+this.endDate;
        await this.$http.get(url,config)
        .then(response=>{
          console.log(response.data);
          this.dataList = response.data;
          this.lastPage=this.dataList.last_page;
        })
        .catch(error=>{console.dir(error)})
        .finally();
      },
      
        dataByPaginate(pageIndex){
            this.pageNo=pageIndex;
            this.getDataList();
        },
        dataByPaginate(pageIndex){
            this.pageNo=pageIndex;
            this.getDataList();
        },

    }
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



</style>