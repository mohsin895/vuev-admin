<template>
  <div class="">
    <b-card title="সদস্য মননোয়ন ফরম ">
      <div class="member-nomination-form">
        <!-- Main Table Start Hare -->
        <b-row class="text-center">
          <b-col cols="12">
            <p class="align-center">ফরম-৭</p>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <p class="align-middle">[ বিধি ১০ (২) দ্রষ্টব্য ]</p>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <h5 class="align-middle">সদস্য মননোয়ন ফরম</h5>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <h6 class="align-middle">( আবেদনকারীর, প্রতিবাদীর পক্ষে সদস্য মননোয়ন  )</h6>
          </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-input-group prepend="মামলা নং" class="mb-2 mr-sm-2 mb-sm-0">
                 <input type="text" class="form-control" v-model="searchKey" placeholder="মামলা নং" v-on:keyup.enter="getDataList()">
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
        <table class="table">
          <thead>
           <!--  <tr>
                <th colspan="4">
                    <input v-model="searchKey" placeholder="মামলার নং" v-on:keyup.enter="getRequestedAttendList()" class="form-control" />
                </th>
                <th colspan="2">
                    <slot v-if="this.$store.state.userInfo.permissions.includes(999)">
                        <select v-model="upazila" class="form-control" @change="getDataList();filterUnionList();">
                            <slot v-for="upazilaInfo,upazilaIndex in upazilaList">
                                <option :value="upazilaInfo.id">{{upazilaInfo.bn_name}}</option>
                            </slot>
                        </select>
                    </slot>
                </th>
                <th colspan="2">
                    <slot v-if="this.$store.state.userInfo.permissions.includes(888)">
                        <select v-model="union" class="form-control" @change="getDataList()">
                            <slot v-for="unionInfo,unionIndex in unionList">
                                <option :value="unionInfo.id">{{unionInfo.bn_name}}</option>
                            </slot>
                        </select>
                    </slot>
                </th>
                <th colspan="2">
                    <button type="button" class="btn btn-success" @click="getRequestedAttendList()">অনুসন্ধান করুন</button>
                </th>
            </tr> -->
            <tr>
              <th scope="col">মামলার নম্বর:</th>
              <th scope="col">মামলা গ্রহনের তারিখ:</th>
              <th>ইউনিয়ন,উপজেলা,জেলা</th>
              <th scope="col">আবেদনকারীর নাম:</th>
              <th scope="col">প্রতিবাদীর নাম:</th>
              <th scope="col">স্বাক্ষীগণের নাম:</th>
              <th scope="col">বিরোদের বিষয়বস্তু:</th>
              <th scope="col">সদস্য মননোয়ন তারিখ:</th>
              <th scope="col">মন্তব্য:</th>
              <th scope="col">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            
            <slot v-for="dataInfo,dataIndex in dataList.data">
              <tr :class="(++dataIndex%2==0) ? 'table-primary':''">
                <td scope="row">{{dataInfo.id |banglaNumber}}</td>
                <td>{{dataInfo.acceptDate | formatDateBd}}</td>
                <td>
                    <slot v-if="dataInfo.union_info!=null">
                        {{dataInfo.union_info.bn_name}}<br>
                    </slot>
                    <slot v-if="dataInfo.upazila_info!=null">
                        {{dataInfo.upazila_info.bn_name}}<br>
                    </slot>
                    <slot v-if="dataInfo.district_info!=null">
                        {{dataInfo.district_info.bn_name}}<br>
                    </slot>
                </td>
                <td>
                    <slot v-for="applicantInfo,applicantIndex in dataInfo.applicant_infos">
                        {{++applicantIndex | banglaNumber}}. {{applicantInfo.name}}<br>
                    </slot>
                </td>
                <td>
                    <slot v-for="oppositorInfo,oppositorIndex in dataInfo.oppositor_infos">
                        {{++oppositorIndex | banglaNumber}}. {{oppositorInfo.name}}<br>
                    </slot>
                </td>
                <td>
                    <slot v-for="witnessInfo,witnessIndex in dataInfo.witness_infos">
                        {{++witnessIndex | banglaNumber}}. {{witnessInfo.name}}<br>
                    </slot>
                </td>
                <td style="max-width:30px;">{{dataInfo.caseTitle}}</td>
                <td>
                    <slot v-if="dataInfo.applicant_infos.length>0">
                        {{dataInfo.applicant_infos[0].created_at | formatDateBd}}
                    </slot>
                </td>
                <td>
                    <slot v-if="dataInfo.nomminator_for_applicants.length>0">
                        আবেদনকারীর পক্ষে মননোয়ন করা হয়েছে<br>
                    </slot>
                    <slot v-if="dataInfo.nomminator_for_oppositors.length>0">
                        প্রতিবাদীর পক্ষে মননোয়ন করা হয়েছে<br>
                    </slot>
                    <slot v-if="dataInfo.nomminator_for_applicants.length<1 && dataInfo.nomminator_for_oppositors.length<1">
                         কারো মননোয়ন করা নাই
                    </slot>
                </td>
                <td>
                <slot v-if="$store.state.userInfo.permissions.includes(68)">
                  <a href="#" @click="prepareNommineeForm(dataInfo)" v-b-modal.data-view>
                    <icon name="eye" size="20px"
                  /></a>
                </slot>
                </td>
              </tr>
            </slot>
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
      <!-- LIST SHOW START HARE-->
    </b-card>

    <b-modal id="data-view" title="আবেদনের  বিবরণ" size="xl" ok-only ok-variant="secondary" ok-title="Close">
      <slot v-if="listShow">
        <div class="crime-place mt-5">
          <b-col cols="12">
            <select class="selection_persons" name="select_persons" v-model="type" @change="prepareNommineeForm(caseInfos)">
              <option value="1">
                আবেদনকারীর পক্ষে মননোয়ন
              </option>
              <option value="2">
                প্রতিবাদী পক্ষে মননোয়ন
              </option>
            </select>
          </b-col>
          <b-row class="text-center">
            <b-col cols="12">
              <h5 class="align-middle">বিরোধের স্থান:</h5>
            </b-col>
          </b-row>
          <br />
          <br />
          <!--loaction -->
          <b-row cols="1" cols-sm="4" class="justify-content-md-center">
            <b-col>
              <div class="division">
                <div class="label">বিভাগ</div>
                <slot v-if="caseInfos.division_info!=null">
                    <span class="form-control">{{caseInfos.division_info.bn_name}}</span>
                </slot>
              </div>
            </b-col>
            <b-col>
              <div class="district">
                <div class="label">জেলা</div>
                <slot v-if="caseInfos.district_info!=null">
                    <span class="form-control">{{caseInfos.district_info.bn_name}}</span>
                </slot>
              </div>
            </b-col>
            <b-col>
              <div class="sub-district">
                <div class="label">উপজেলা</div>
                <slot v-if="caseInfos.upazila_info!=null">
                    <span class="form-control">{{caseInfos.upazila_info.bn_name}}</span>
                </slot>
              </div>
            </b-col>
            <b-col>
              <div class="union">
                <div class="label">ইউনিয়ন</div>
                <slot v-if="caseInfos.union_info!=null">
                    <span class="form-control">{{caseInfos.union_info.bn_name}}</span>
                </slot>
              </div>
            </b-col>
          </b-row>
        </div>
        <b-row class="text-center mt-5">
          <b-col cols="2">
            <p class="">মামলার নম্বর :</p>
          </b-col>
          <b-col cols="">
            <p class="caseNo">{{caseInfos.id | banglaNumber}}</p>
          </b-col>
          <b-col cols="2">
            <p class="">মামলার ধরন :</p>
          </b-col>
          <b-col cols="2">
            <p class="caseNo">{{caseInfos.caseType}}</p>
          </b-col>
          <b-col cols="2">
            <p class="">মামলা গ্রহনের তারিখ :</p>
          </b-col>
          <b-col cols="2">
            <p class="caseNo">{{caseInfos.acceptDate |formatDateBd}}</p>
          </b-col>
        </b-row>
        <b-row class="borabor mt-3">
          <b-col>
            <p class="">বরাবর ,</p>
            <p class=""> চেয়ারম্যান </p>
          </b-col>
        </b-row>
        <b-row class="boraborSub mt-3">
          <b-col>
            <p class=""> বিষয়: গ্রাম আদালতের সদস্য মনোনয়ন প্রসঙ্গে ।</p>
          </b-col>
        </b-row>
        <b-row class="Despcription mt-3">
          <b-col>
            <p class="">
            সূত্র: মামলা নং : <span  class="caseNo" style="font-weight: 800" >{{caseInfos.id | banglaNumber}}</span> তারিখ: <span class="caseNo" style="font-weight: 800" >{{caseInfos.acceptDateBd}}</span>, সবিনয়ে আপনার অবগতির জন্য জানানো য়াইতেছে যে,<span
                style="font-weight: 800"
              >
                <slot v-for="applicantInfo in caseInfos.applicant_infos">
                    {{applicantInfo.name}}
                </slot>
              </span>
              আবেদনকারী বনাম
              <span style="font-weight: 800"> 
                <slot v-for="oppositorInfo in caseInfos.oppositor_infos">
                    {{oppositorInfo.name}}
                </slot>
              </span> প্রতিবাদী,
              মামলার ধরন <span style="font-weight: 800"> {{caseInfos.caseType}} </span> এর
              <span style="font-weight: 800"> {{caseInfos.caseTitle}} </span> সংক্রান্ত
              বিরোধের প্রেক্ষিতে গঠিতব্য গ্রাম আদালতে আমার পক্ষে নিম্নেবণিত সদস্য হিসেবে মনোনীত করিলাম ।
            </p>
          </b-col>
        </b-row>
        <br>
        <b-row  style="width:60%; margin:auto;" cols="1" cols-sm="2">
            <b-col class="mt-3">
                <h2 class="text-center"  style="font-size:20px; font-weight:800" >ইউনিয়ন পরিষদের সদস্য</h2>
                <div class="mb-3">
                    <label for="member_name" class="form-label"><strong>নাম:*</strong></label>
                    <!-- <input type="text"  class="form-control" id="member_name" required v-model="memberName"> -->

                    <v-select :options="memberList" :reduce="memberList => memberList.id" label="name" v-model="memberId" @input="setMemberSelected">
                        <template v-slot:option="option">
                            {{option.name}}
                        </template>
                     </v-select>

                </div>
                <div class="mb-3">
                    <label for="m_g_name" class="form-label"><strong>পিতা/স্বামী:*</strong></label>
                    <input type="text"  class="form-control" id="m_g_name" :value="memberInfo.guardian" readonly>
                </div>
                <div class="mb-3">
                    <label for="m_village" class="form-label"><strong>গ্রাম:*</strong></label>
                    <input type="text"  class="form-control" id="m_village" :value="memberInfo.village" readonly>
                </div>
                <div class="mb-3">
                    <label for="m_ward" class="form-label"><strong>ওয়াড নং:*</strong></label>
                    <!-- <input type="number"  class="form-control" id="m_ward" :value="memberInfo.wordNo" readonly> -->
                    <select class="form-control" required v-model="memberInfo.wordNo" readonly>
                        <option value="১ নং ওয়াড"> ১ নং ওয়াড</option>
                        <option value="২ নং ওয়াড"> ২ নং ওয়াড</option>
                        <option value="৩ নং ওয়াড"> ৩ নং ওয়াড</option>
                        <option value="৪ নং ওয়াড"> ৪ নং ওয়াড</option>
                        <option value="৫ নং ওয়াড"> ৫ নং ওয়াড</option>
                        <option value="৬ নং ওয়াড"> ৬ নং ওয়াড</option>
                        <option value="৭ নং ওয়াড"> ৭ নং ওয়াড</option>
                        <option value="৮ নং ওয়াড"> ৮ নং ওয়াড</option>
                        <option value="৯ নং ওয়াড"> ৯ নং ওয়াড</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="m_post" class="form-label"><strong>ডাকঘর:*</strong></label>
                    <input type="text"  class="form-control" id="m_post" :value="memberInfo.postOffice" readonly>
                </div>
                <div class="mb-3">
                    <label for="m_union" class="form-label"><strong>ইউনিয়ন:*</strong></label>
                <slot v-if="memberInfo.union_info!=null">
                    <input type="text"  class="form-control" id="m_union" :value="memberInfo.union_info.bn_name" readonly>
                </slot>
                <slot v-else>
                    <input type="text"  class="form-control" id="m_union"  readonly>
                </slot>
                </div>
                <div class="mb-3">
                    <label for="m_district" class="form-label"><strong>জেলা:*</strong></label>
                <slot v-if="memberInfo.district_info!=null">
                    <input type="text"  class="form-control" id="m_district" :value="memberInfo.district_info.bn_name" readonly>
                </slot>
                <slot v-else>
                    <input type="text"  class="form-control" id="m_district"  readonly>
                </slot>
                </div>
            </b-col>
            <b-col class="mt-3">
                <h2 class="text-center " style="font-size:20px; font-weight:800">স্থানীয় ব্যক্তি</h2>
                <div class="mb-3">
                    <label for="local_member_name" class="form-label"><strong>নাম:*</strong></label>
                    <input type="text"  class="form-control" id="local_member_name" v-model="name" required>
                </div>
                <div class="mb-3">
                    <label for="local_m_g_name" class="form-label"><strong>পিতা/স্বামী:*</strong></label>
                    <input type="text"  class="form-control" id="local_m_g_name" v-model="guardian" required>
                </div>
                <div class="mb-3">
                    <label for="local_m_village" class="form-label"><strong>গ্রাম:*</strong></label>
                    <input type="text"  class="form-control" id="local_m_village" v-model="village" required>
                </div>
                <div class="mb-3">
                    <label for="local_m_ward" class="form-label"><strong>ওয়াড নং:*</strong></label>
                    <!-- <input type="number"  class="form-control" id="local_m_ward" v-model="wordNo" required> -->
                    <select class="form-control" required v-model="wordNo">
                        <option value="১ নং ওয়াড"> ১ নং ওয়াড</option>
                        <option value="২ নং ওয়াড"> ২ নং ওয়াড</option>
                        <option value="৩ নং ওয়াড"> ৩ নং ওয়াড</option>
                        <option value="৪ নং ওয়াড"> ৪ নং ওয়াড</option>
                        <option value="৫ নং ওয়াড"> ৫ নং ওয়াড</option>
                        <option value="৬ নং ওয়াড"> ৬ নং ওয়াড</option>
                        <option value="৭ নং ওয়াড"> ৭ নং ওয়াড</option>
                        <option value="৮ নং ওয়াড"> ৮ নং ওয়াড</option>
                        <option value="৯ নং ওয়াড"> ৯ নং ওয়াড</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="local_m_post" class="form-label"><strong>ডাকঘর:*</strong></label>
                    <input type="text"  class="form-control" id="local_m_post" v-model="postOffice" required>
                </div>
                <div class="mb-3">
                    <label for="local_m_union" class="form-label"><strong>ইউনিয়ন:*</strong></label>
                    <v-select :options="unionList" :reduce="unionList => unionList.id" label="bn_name" v-model="union" >
                        <template v-slot:option="option">
                            {{option.bn_name}}
                        </template>
                     </v-select>
                </div>
                <div class="mb-3">
                    <label for="local_m_district" class="form-label"><strong>জেলা:*</strong></label>
                    <v-select :options="districtList" :reduce="districtList => districtList.id" label="bn_name" v-model="district" >
                        <template v-slot:option="option">
                            {{option.name}}
                        </template>
                     </v-select>
                </div>                        
            </b-col>
        </b-row>

        <b-row class="Despcription mt-3">
          <b-col>
            <p class="">
             অতএব, মহোদয়ের নিকট আবেদন এই যে, উল্লিখিত ব্যক্তিগনকে আমার মনোনীত সদস্য হিসেবে গ্রহন করিয়া বাধিত করিবেন ।
            </p>
          </b-col>
        </b-row>
        <b-row class="Despcription mt-3">
          <b-col>
            <p class="">
            আপনার বিশ্বস্ত প্রতিবাদী ।
            </p>
          </b-col> 
        </b-row>
        <b-row class="text-center mt-5">
          <b-col cols="12">
            <slot v-if="$store.state.userInfo.permissions.includes(68)">
              <button type="button" class="btn btn-success" @click="addNomminator()">সেভ করুন</button>
            </slot>
          </b-col>
        </b-row>
      </slot>
      </b-modal>

    <!-- PDF Content Here -->
  </div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";
export default {
  components: {
    VueHtml2pdf,
  },
  data() {
    return {
      listShow: false,
      dataList:[],
      msgFlag:false,
      errMsgFlag:false,
      msg:'',
      errMsg:'',
      pageNo:1,
      numOfData:10,
      status:2,
      searchKey:'',
      lastPage:1,
      districtList:[],
      unionList:[],
      memberList:[],
     
      memberInfo:[],
      memberId:null,
      name:null,
      guardian:null,
      wordNo:null,
      postOffice:null,
      village:null,
      district:null,
      union:null,
      caseInfos:[],
      type:2,
      
      districtList:[],
      upazilaList:[],
      unionList:[],
      upazila:'',
      district:'',
      union:'',
      startDate:'',
      endDate:'',

    };
  },
  beforeMount(){
    // this.getDataList();
    // this.getMemberList();
    // this.getDistrictList();
    // this.getUnionList();
    //  this.getUpazilaList();
    //     this.getUnionList();
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
    getMemberListByUnion(unionId){

            let url="frontend/get/active/member/list?union="+unionId;

         this.$http.get(url)
         .then(response=>{
            this.memberList=response.data;
         })
         .catch(error=>{})
         .finally();
    },
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
        this.startDate='';
        this.endDate='';
        this.upazila='';
        this.union='';
        this.district='';
        this.searchKey='';
    },
    resetNomminatorForm(){
        this.memberId=null;
        this.name=null;
        this.guardian=null;
        this.wordNo=null;
        this.postOffice=null;
        this.village=null;
        this.district=null;
        this.union=null;
        this.type=2;
    },
    async addNomminator(){
        let token=window.localStorage.getItem("token");
        let config = {
                   headers: {
                      'Authorization': 'Bearer '+token
                  }   
              };
        
        let url="staff/add/case/nomminator/info";

        let formData=new FormData();
        formData.append("name",this.name);
        formData.append("guardian",this.guardian);
        formData.append("village",this.village);
        formData.append("wordNo",this.wordNo);
        formData.append("postOffice",this.postOffice);
        formData.append("union",this.union);
        formData.append("district",this.district);
        formData.append("caseId",this.caseInfos.id);
        formData.append("type",this.type);
        formData.append("memberId",this.memberId);

        await this.$http.post(url,formData,config)
         .then(response=>{
            if(response.data.msgFlag==true){
                this.$toaster.success(response.data.msg);

            }
            if(response.data.errMsgFlag==true)
                this.$toaster.warning(response.data.errMsg);
         })
         .catch(error=>{console.dir(error)})
         .finally();
    },
    async getDistrictList(){
        let token=window.localStorage.getItem("token");
        let config = {
                   headers: {
                      'Authorization': 'Bearer '+token
                  }   
              };
        
        let url="staff/get/all/district/list";

        await this.$http.get(url,config)
         .then(response=>{
            this.districtList=response.data;
         })
         .catch(error=>{console.dir(error)})
         .finally();
    },
    async getUnionList(){
        let token=window.localStorage.getItem("token");
        let config = {
                   headers: {
                      'Authorization': 'Bearer '+token
                  }   
              };
        
        let url="staff/get/all/union/list";

        await this.$http.get(url,config)
         .then(response=>{
            this.unionList=response.data;
         })
         .catch(error=>{console.dir(error)})
         .finally();
    },
    setMemberSelected(memberId){
       this.memberList.forEach(memberInfo=>{
            if(memberInfo.id==memberId){
                this.memberInfo=memberInfo;
                // console.dir(this.memberInfo);
            }
       });
    },
    async getMemberList(){
        let token=window.localStorage.getItem("token");
        let config = {
                   headers: {
                      'Authorization': 'Bearer '+token
                  }   
              };
        
        let url="staff/get/all/member/list";

        await this.$http.get(url,config)
         .then(response=>{
            this.memberList=response.data;
         })
         .catch(error=>{console.dir(error)})
         .finally();
    },
    prepareNommineeForm(dataInfo){
        if(this.type==1){
            if(dataInfo.nomminator_for_applicants.length>0){
                this.memberInfo=dataInfo.nomminator_for_applicants[0];
                if(dataInfo.nomminator_for_applicants.length>1){
                    this.name=dataInfo.nomminator_for_applicants[1].name;
                    this.guardian=dataInfo.nomminator_for_applicants[1].guardian;
                    this.wordNo=dataInfo.nomminator_for_applicants[1].wordNo;
                    this.postOffice=dataInfo.nomminator_for_applicants[1].postOffice;
                    this.village=dataInfo.nomminator_for_applicants[1].village;
                    this.district=dataInfo.nomminator_for_applicants[1].districtId;
                    this.union=dataInfo.nomminator_for_applicants[1].unionId;
                }
            }
        }
        if(this.type==2){
            if(dataInfo.nomminator_for_oppositors.length>0){
                this.memberInfo=dataInfo.nomminator_for_oppositors[0];
                if(dataInfo.nomminator_for_oppositors.length>1){
                    this.name=dataInfo.nomminator_for_oppositors[1].name;
                    this.guardian=dataInfo.nomminator_for_oppositors[1].guardian;
                    this.wordNo=dataInfo.nomminator_for_oppositors[1].wordNo;
                    this.postOffice=dataInfo.nomminator_for_oppositors[1].postOffice;
                    this.village=dataInfo.nomminator_for_oppositors[1].village;
                    this.district=dataInfo.nomminator_for_oppositors[1].districtId;
                    this.union=dataInfo.nomminator_for_oppositors[1].unionId; 
                }
            }
        }
        this.caseInfos=dataInfo;
        this.getMemberListByUnion(dataInfo.unionId);
        this.listShow=true;
    },
    async getDataList(){
        let token=window.localStorage.getItem("token");
        let config = {
                   headers: {
                      'Authorization': 'Bearer '+token
                  }   
              };
        
        let url="staff/get/case/list/for/nomminator/form?page="+this.pageNo+"&numOfData="+this.numOfData+"&status="+this.status+"&searchKey="+this.searchKey+"&unionId="+this.union+"&upazilaId="+this.upazila;

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
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
    changeView() {
      this.listShow = !this.listShow;
    },
  },
};
</script>

<style lang="scss" scoped>
.member-nomination-form {
  margin: 50px 0px 0px 50px;
}
.container-lg input {
  margin-top: 40px;
  margin-right: 20px;
  padding: 7px;
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
  margin-right: 34px;
}
.table thead {
  background-color: rgb(219, 219, 219);
  text-align: center;
}
.table tbody {
  background-color: rgb(220, 255, 231);
}
.table {
  width: 89.3%;
  margin-top: 50px;
  font-size: 14px;
  text-align: center;
}
.table td,
td {
  border: 0px solid #000;
}
// listShow start here
.crime-place {
  .selection_persons {
    float: right;
    border: 1px solid #bcbcbc;
    padding: 10px;
    font-size: 15px;
  }
  width: 89.3%;
  margin-top: 50px;
  font-size: 12px;
  margin-left: 10px;
}
.label {
  font-size: 18px;
  text-align: center;
}
.text-center {
  width:92%;
  font-size: 16px;
  font-weight: 500;
}
.borabor {
  width: 91%;
  font-size: 18px;
  font-weight: 500;
  margin-left: 70px;
}
.boraborSub {
  width: 91%;
  font-size: 18px;
  font-weight: 700;
  margin-left: 70px;
}
.Despcription {
  width: 85%;
  font-size: 18px;
  margin-left: 70px;
}
.caseNo,
.caseNo2 {
  background-color: rgb(231, 231, 231);
}
.align-middle {
  border: 0px solid #000;
}
.Table {
  width: 89.3%;
  margin-top: 50px;
  font-size: 16px;
  text-align: center;
}
.Table th,
td {
  border: 1px solid #000;
  padding: 12px;
}
.color {
  color: red;
}
.Table input {
  width: 89%;
  height: 300px;
  border: none;
}
.status strong {
  color: green;
}
.status {
  width: 100%;
  float: left;
  margin-left: 150px;
  font-size: 18px;
}
.text-center button {
  float: right;
}
.Applicants {
  text-align: right;
}
</style>