<template>
    <div class="RegisterCase">
       <b-card title="মামলার রেজিস্টার রির্পোট"> 
        <!-- Main Table Start Hare -->
        <b-row class="text-center">
          <b-col cols="12">
            <p class="align-center">ফরম-2</p>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <p class="align-middle">[ বিধি ৫(২), ৫(৪), ১০(৪), ১৯(৩), ৩০(৩), ৩২(২) দ্রষ্টব্য ]</p>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <h5 class="align-middle">মামলার রেজিস্টার রির্পোট</h5>
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
            <tr>
              <th scope="col">ক্রমিক নং</th>
              <th scope="col">বৎসর</th>
              <th scope="col">মামলা গ্রহনের তারিখ</th>
              <th scope="col">আবেদনকারীর নাম ও ঠিকানা</th>
              <th scope="col">প্রতিবাদীর নাম ও ঠিকানা</th>
              <!-- <th scope="col">আবেদনকারীর সদস্যগনের নাম</th> -->
             <!--  <th scope="col">প্রতিবাদীর সদস্যগনের_নাম</th> -->
              <th scope="col">গ্রাম আদালতের চেয়ারম্যানের নাম</th>
              <th scope="col">বিরোধের বিষয়বস্তু ও উহার মূল্যমান</th>
              <th scope="col">প্রতিবাদীর আপত্তি থাকিলে উহার সারাংশ</th>
              <th scope="col">সিদ্ধান্ত গ্রহণের ক্ষেত্রে সংখ্যা গরিষ্ঠতার অনুপাত</th>
              <th scope="col">উচ্চ আদালতের কোন আদেশ থাকিলে উহার সারাংশ এবং তারিখ</th>
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
              <th scope="col">১৩</th> -->
            </tr>

          </thead>
          <tbody>
          <slot v-for="dataInfo,index in dataList.data">
            <tr >
              <td>{{++index |banglaNumber}}</td>
              <td>{{dataInfo.created_at | formatYearBn}}</td>
              <td>{{dataInfo.created_at | formatDateBd}}</td>
              <!-- <td>আনোয়ার হোসেন   <span style="font-weight:600"> গ্রামঃশ্যামপুর </span> </td> -->
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
                <slot v-for="witnessInfo in dataInfo.witness_infos">
                  {{witnessInfo.name}}<br>
                </slot>
              </td>
              
               <td>{{dataInfo.caseTitle}}</td>
               <td>
                <slot v-if="dataInfo.case_degree!=null">
                  প্রতিবাদীর আপত্তি নেই।
                </slot>
                <slot v-else>
                  ---
                </slot>
              </td>
               <td>
                  <slot v-if="dataInfo.case_degree!=null">
                    <span>{{dataInfo.case_degree.agreeNumber|banglaNumber}}</span> : <span>{{dataInfo.case_degree.disAgreeNumber |banglaNumber}} </span>
                  </slot>
                  <slot v-else>
                    ---
                  </slot>
                </td>
               <td>
                 <slot v-if="dataInfo.higher_court_info!=null">
                    <span>উচ্চ আদালতে প্রেরণ করা হয়েছে।</span> 
                    <span>{{dataInfo.higher_court_info.created_at |formatDateBd}} </span>
                  </slot>
                  <slot v-else>
                    ---
                  </slot>
               </td>
               <td>
                 {{dataInfo.comment}}
               </td>
            </tr>
           </slot>
          </tbody>
        </table>
        <div class="gadget">  ১৪৪০ , বাংলাদেশ গেজেট, অতিরিক্ত, ফেব্রুয়ারী ১৫, ২০১৬</div>

        <div class="overflow-auto">
           <!--  <b-pagination-nav :link-gen="linkGen" :number-of-pages="10" use-router></b-pagination-nav> -->
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
        finalUpazilaList:[],
        finalUnionList:[],
        upazilaList:[],
        unionList:[],
        upazila:'',
        union:'',
    	}
    },
    beforeMount(){
    	// this.getDataList();
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
      this.getDataList();
      
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
    	async getDataList(){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token
                      }   
                  };
            
            let url="staff/report/get/register/case/list?page="+this.pageNo+"&numOfData="+this.numOfData+"&startDate="+this.startDate+"&endDate="+this.endDate+"&unionId="+this.union+"&upazilaId="+this.upazila;

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
.RegisterCase {
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
    width: 100%;
    font-size: 12px;
    text-align:center !important;
    border: 1px solid rgb(182, 182, 182);
}
.overflow-auto{
    float: right;
}
</style>