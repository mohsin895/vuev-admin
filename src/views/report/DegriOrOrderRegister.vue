<template>
    <div class="DegreeOrOrderRegister">
       <b-card title="ডিক্রী এবং আদেশের রেজিস্টার"> 
        <!-- Main Table Start Hare -->
        <b-row class="text-center">
          <b-col cols="12">
            <p class="align-center">ফরম-১২</p>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <p class="align-middle">[ বিধি  ১৯ (১) দ্রষ্টব্য ]</p>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <h5 class="align-middle">ডিক্রী এবং আদেশের রেজিস্টার</h5>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <h6 class="align-middle">( তেতুলঝোড়া ইউনিয়ন পরিষদ )</h6>
          </b-col>
        </b-row>
        <b-row>
            
            <b-col>
                <b-input-group prepend="শুরু তারিখ" class="mb-2 mr-sm-2 mb-sm-0">
                  <input type="date" name="startDate" v-model="startDate" class="form-control" placeholder="শুরু তারিখ" @input="getDataList">
                </b-input-group>
            </b-col>
            <b-col>
                <b-input-group prepend="শেষ তারিখ" class="mb-2 mr-sm-2 mb-sm-0">
                  <input type="date" name="endDate" v-model="endDate" class="form-control" placeholder="শেষ তারিখ" @input="getDataList">
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
        <table class="table text-center mt-2">
          <thead>
            <tr  class="text-center">
              <th scope="col">ক্রমিক নং</th>
              <th scope="col">বৎসর</th>
              <th scope="col">মামলা নং</th>
              <th scope="col">মামলা গ্রহনের তারিখ</th>
              <th scope="col">আবেদনকারীর নাম ও ঠিকানা</th>
              <th scope="col">প্রতিবাদীর নাম ও ঠিকানা</th>
              <th scope="col">ডিক্রী বা আদেশের তারিখ</th>
              <th scope="col">ডিক্রী বা আদেশের বিবরণ</th>
              <th scope="col">গ্রাম_আদালতের সম্মুখে দাবী মিটানো হয়েছে কিনা</th>
              <th scope="col">জুডিসিয়াল ম্যাজিস্ট্রেট বা সহকারী জজ কোন আদেশ প্রদান করিলে তাহা</th>
              <!-- <th scope="col">যে তারিখের পূবে ডিক্রীর দাবী মিটাইতে হইবে বা ক্ষতিপুরন প্রদান করিতে হইবে তাহা </th>
              <th scope="col">দাবী মিটানোর তারিখ</th>
              <th scope="col">যদি নিধারিত মেয়াদের মধ্যে ডিক্রীর দাবী মিটানো অথবা ক্ষতিপুরণ প্রদান করা না হয় তাহা হইলে গৃহীত ব্যবস্থার বিবরণ</th> -->
              <th scope="col">মন্তব্য</th>
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
              <!-- <th scope="col">১২</th>
              <th scope="col">১৩</th>
              <th scope="col">১৪</th> -->
            </tr>

          </thead>
          <tbody>
            <!-- <tr >
              <td>০১</td>
              <td>২০২২</td>
              <td  style="font-weight:600; color:red;">১০৫০০</td>
              <td>০২/০৫/২০২২</td>
              <td>আনোয়ার হোসেন  <span style="font-weight:600"> গ্রামঃশ্যামপুর </span></td>
              <td>জসিম হোসেন<span style="font-weight:600"> গ্রামঃতেঁতুলঝোড়া </span></td>
              <td> ০২/০৬/২০২২ </td>
              <td>-</td>
              <td>হ্যা</td>
               <td>না</td>
               <td>০২/০৮/২০২২</td>
               <td>০২/০৮/২০২২</td>
               <td>৩০০০০</td>
               <td>বিচার</td>
            </tr>
            <tr >
              <td>০২</td>
              <td>২০২২</td>
              <td  style="font-weight:600; color:red;">১০৫০১</td>
              <td>০২/০৫/২০২২</td>
              <td>আহসান হাবিব <span style="font-weight:600"> গ্রামঃঝাউচর </span></td>
              <td>জাহিদ হোসেন<span style="font-weight:600"> গ্রামঃতেঁতুলঝোড়া </span></td>
             <td> ০২/০৬/২০২২ </td>
              <td>-</td>
              <td>হ্যা</td>
               <td>না</td>
               <td>০২/০৮/২০২২</td>
               <td>০২/০৮/২০২২</td>
               <td>৩০০০০</td>
               <td>বিচার</td>
            </tr> -->
            <slot v-for="dataInfo,dataIndex in dataList.data">
              <tr>
                <td>{{++dataIndex |banglaNumber}}</td>
                <td>{{dataInfo.created_at | formatYearBn}}</td>
                <td  style="font-weight:600; color:red;">{{dataInfo.id |banglaNumber}}</td>
                <td>{{dataInfo.acceptDate |formatDateBd}}</td>
                <!-- <td>আহসান হাবিব <span style="font-weight:600"> গ্রামঃঝাউচর </span></td> -->
                <td>
                <slot v-for="applicantInfo in dataInfo.applicant_infos">
                  {{applicantInfo.name}}<br>
                </slot>
              </td>
              <td>
                <slot v-for="oppositorInfo in dataInfo.oppositor_infos">
                  {{oppositorInfo.name}}<br>
                </slot>
              </td>

               <td>
                 <slot v-if="dataInfo.case_degree!=null">
                   {{dataInfo.case_degree.created_at |formatDateBd}}
                 </slot>
                 <slot v-else>---</slot>
               </td>
                <td>
                  <slot v-if="dataInfo.case_degree!=null">
                    <slot v-for="condition,conditionIndex in getCaseDegreeConditions(dataInfo.case_degree.conditions)">
                      {{++conditionIndex |banglaNumber}}. {{condition}}<br>
                    </slot>
                 </slot>
                 <slot v-else>---</slot>
                </td>
                <td>
                  <slot v-if="dataInfo.case_degree!=null">
                    হ্যাঁ
                 </slot>
                 <slot v-else>---</slot>
                </td>
                 <td>
                   <slot v-if="dataInfo.case_degree!=null">
                    না
                 </slot>
                 <slot v-else>---</slot>
                 </td>
                 <!-- <td>০২/০৮/২০২২</td>
                 <td>০২/০৮/২০২২</td>
                 <td>৩০০০০</td> -->
                 <td>{{dataInfo.comment}}</td>
              </tr>
            </slot>
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
        numOfData:20,
        pageNo:1,
        lastPage:1,
        dataList:[],
        startDate:'',
        endDate:'',
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
      this.getDataList();
      // this.getUpazilaList();
      // this.getUnionList();
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
            
            let url="staff/report/get/degree/case/list?page="+this.pageNo+"&numOfData="+this.numOfData+"&startDate="+this.startDate+"&endDate="+this.endDate;

            await this.$http.get(url,config)
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
.DegreeOrOrderRegister {
  margin: 10px 0px 0px 10px;
}
.container-lg input {
  margin-top: 40px;
  margin-right: 20px;
  padding: 8px;
  background-color: rgb(219, 219, 219);
  border: 0px;
  color: #000;
  font-size: 1.1em;
  float: right;
  margin-bottom: 30px;
}
.container-lg button {
  float: right;
  margin-top: 40px;
  margin-bottom: 30px;
}
.table{
    max-width: 100%;
    font-size: 12px;
    text-align:center !important;
    border: 1px solid rgb(182, 182, 182);
}
.overflow-auto{
    float: right;
}
//table responsive Max-width 720px
@media screen  and (max-width:720px){
    .table{
        font-size: 10px !important;

    }

}

</style>