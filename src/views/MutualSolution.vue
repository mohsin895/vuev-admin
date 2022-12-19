<template>
  <div class="mutual-solution-kj">
    <b-card title="আপোষনামা">
      <div class="mutual-solution">
        <!-- Main Table Start Hare -->
        <b-row class="text-center">
          <b-col cols="12">
            <p class="align-center">ফরম-৯</p>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <p class="align-middle">[ বিধি ১৩ (৩)  দ্রষ্টব্য ]</p>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <h5 class="align-middle">আপোষনামা</h5>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <h6 class="align-middle">( আবেদনকারী, প্রতিবাদী )</h6>
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
           
            <tr>
              <th scope="col">মামলার নম্বর:</th>
              <th scope="col">মামলা গ্রহনের তারিখ:</th>
              <th>ইউনিয়ন,উপজেলা,জেলা</th>
              <th scope="col">আবেদনকারীর নাম:</th>
              <th scope="col">প্রতিবাদীর নাম:</th>
              <th scope="col">স্বাক্ষীগণের নাম:</th>
              <th scope="col">বিরোদের বিষয়বস্তু:</th>
              <th scope="col">আপোষনামা তারিখ:</th>
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
                    <slot v-if="dataInfo.mutual_case!=null">
                        {{dataInfo.mutual_case.created_at | formatDateBd}}
                    </slot>
                </td>
                <td>
                    <slot v-if="dataInfo.mutual_case!=null">
                        আপোষনামা দেওয়া হয়েছে
                    </slot>
                    <slot v-else>
                       <span class="text-danger">আপোষনামা দেওয়া নাই</span>
                    </slot>
                </td>
                <td>
                  <slot v-if="$store.state.userInfo.permissions.includes(24) || $store.state.userInfo.permissions.includes(25)">
                    <a href="#" @click="prepareCaseForMutual(dataInfo)" v-b-modal.data-view>
                      <icon name="eye" size="20px"/>
                    </a>
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
          <b-row class="text-center">
            <b-col cols="12">
              <h5 class="align-middle">বিরোধের স্থান:</h5>
            </b-col>
          </b-row>
          <br />
          <br />
          <!--loaction -->
          <b-row cols="1" cols-sm="4" class="area justify-content-md-center">
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
            <p class="caseNo">{{caseInfos.id |banglaNumber}}</p>
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
        <b-row class="boraborSub mt-2">
          <b-col>
            <p class="">বিষয়: আপোষে বিরোধ নিষ্পোত্তি ।</p>
          </b-col>
        </b-row>
        <b-row class="Despcription mt-2">
          <b-col>
            <p class="">
              আপনার অবগতির জন্য জানানো য়াইতেছে যে ,<span
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
               বিরোধীয় বিষয়টি নিম্নলিখিত শর্তসাপেক্ষে ও সাক্ষীর উপস্থিতিতে আপোষ-নিষ্পোত্তি হইয়াছে।
            </p>
          </b-col>
        </b-row>
         <div class="ConditionMain mt-3">
          <b-row style="font-weight: 800">
            <b-col>শর্তাবলী : </b-col>
          </b-row>
          <b-row class="ConditionArea mt-3" cols-lg="12">
            <b-col cols="1"> ০১ :</b-col>
            <b-col cols="11">
              <b-form form-control>
                <b-input type="text" placeholder="শর্ত নম্বর ০১" v-model="condition1"> </b-input>
              </b-form>
            </b-col>
          </b-row>
          <b-row class="ConditionArea mt-3" cols-lg="12">
            <b-col cols="1"> ০২ :</b-col>
            <b-col cols="11">
              <b-form form-control>
                <b-input type="text" placeholder="শর্ত নম্বর ০২" v-model="condition2"> </b-input>
              </b-form>
            </b-col>
          </b-row>
          <b-row class="ConditionArea mt-3" cols-lg="12">
            <b-col cols="1"> ০৩ :</b-col>
            <b-col cols="11">
              <b-form form-control>
                <b-input type="text" placeholder="শর্ত নম্বর ০৩" v-model="condition3"> </b-input>
              </b-form>
            </b-col>
          </b-row>
          <b-row class="ConditionArea mt-3" cols-lg="12">
            <b-col cols="1"> ০৪ :</b-col>
            <b-col cols="11">
              <b-form form-control>
                <b-input type="text" placeholder="শর্ত নম্বর ০৪" v-model="condition4"> </b-input>
              </b-form>
            </b-col>
          </b-row>
          <b-row class="ConditionArea mt-3" cols-lg="12">
            <b-col cols="1"> ০৫ :</b-col>
            <b-col cols="11">
              <b-form form-control>
                <b-input type="text" placeholder="শর্ত নম্বর ০৫" v-model="condition5"> </b-input>
              </b-form>
            </b-col>
          </b-row>
        </div>
        <table class="table table-borderless">
          <tr>
           
            <td colspan="2">
                <select v-model="selectedMember" @change="addWitness">
                  <slot v-for="(memberInfo,memberIndex) in courtMemberList">
                    <option :value="memberIndex">{{memberInfo.name}}</option>
                  </slot>
                 </select>
            </td>
          </tr>
        </table>
        <table class="MononitoMember"
          style="border: 1px solid #000; text-align: center; width: 800px"
        >
          <thead style="height: 60px; font-size: 20px; font-weight: 800">
            <tr>
              <th colspan="4">মনোনীত প্রতিনিধি/ স্বাক্ষীর নাম :</th>
            </tr>
          </thead>
          <tbody>
            <tr style="font-size: 15px; font-weight: 800">
              <td style="width: 60px">নং</td>
              <td>নাম</td>
              <td> সদস্য </td>
              <td style="width: 250px">স্বাক্ষর</td>
              
            </tr>
            <slot v-for="(memberInfo,memberIndex) in decisionList">
              <tr v-if="memberInfo">
                <td >{{++memberIndex |banglaNumber}}</td>
                <td>{{memberInfo.name}}</td>
                <td>মনোনীত প্রতিনিধি</td>
                <td>...</td>
              </tr>
            </slot>
          </tbody>
        </table>
        <b-row class="Despcription mt-3">
          <b-col>
            <p class="">
             এমতাবস্থায় উক্ত মামলাটি আপোষ সূত্রে নিষ্পত্তি করিবার জন্য অনুরোধ করিতেছি।
            </p>
          </b-col>
        </b-row>
        <b-row class="Despcription mt-3">
          <b-col>
            <p class="">
             নিবেদক ,
            </p>
          </b-col>
        </b-row>
        <b-row class="Despcription mt-3">
          <b-col>

            <p class="">
            আবেদনকারীর নাম : <span style="font-weight: 800" > 
              <slot v-if="caseInfos.applicant_infos!=null">
                {{caseInfos.applicant_infos[0].name}}
              </slot>
             </span>
            </p>
            <p class="">
            পিতার নাম : <span style="font-weight: 800" > 
              <slot v-if="caseInfos.applicant_infos!=null">
                {{caseInfos.applicant_infos[0].fName}}
              </slot> 
            </span>
            </p>
            <p class="">
            মাতার নাম : <span style="font-weight: 800" >
                <slot v-if="caseInfos.applicant_infos!=null">
                  {{caseInfos.applicant_infos[0].mName}}
                 </slot> 
              </span>
            </p>
            <!-- <p class="">
            ঠিকানা : <span style="font-weight: 800" > 
                <slot v-if="caseInfos.applicant_infos!=null">
                  {{caseInfos.applicant_infos[0].address}} 
                </slot>
                </span>
            </p> -->
            <p class="">
            তারিখ : <span style="font-weight: 800" > {{date |formatDateBd}} </span>
            </p>
            <p class="">
            স্বাক্ষর : <span style="font-weight: 800" > </span>
            </p>
          </b-col>
          <b-col>
            <p class="">
            প্রতিবাদীর নাম : <span style="font-weight: 800" >
              <slot v-if="caseInfos.oppositor_infos!=null">
                {{caseInfos.oppositor_infos[0].name}}
              </slot>
              </span>
            </p>
            <p class="">
            পিতার নাম : <span style="font-weight: 800" >
                <slot v-if="caseInfos.oppositor_infos!=null">
                  {{caseInfos.oppositor_infos[0].fName}}
                </slot>
            </span>
            </p>
            <p class="">
            মাতার নাম : <span style="font-weight: 800" >
                    <slot v-if="caseInfos.oppositor_infos!=null">
                    {{caseInfos.oppositor_infos[0].mName}}
                  </slot>
            </span>
            </p>
            <!-- <p class="">
            ঠিকানা : <span style="font-weight: 800" >
                    <slot v-if="caseInfos.oppositor_infos!=null">
                    {{caseInfos.oppositor_infos[0].address}}
                  </slot>
            </span>
            </p> -->
            <p class="">
            তারিখ : <span style="font-weight: 800" > {{date |formatDateBd}} </span>
            </p>
            <p class="">
            স্বাক্ষর : <span style="font-weight: 800" > </span>
            </p>
          </b-col>
        </b-row>


        <b-row class="text-center mt-5 d-flex flex-row-reverse">
         
          <b-col cols="12" >
            <slot v-if=" $store.state.userInfo.permissions.includes(24)">
            <div class="printfile">
              <a href="#" @click="generateReport">
                <icon name="print" size="20px"
              /></a>
            </div>
          </slot>
            <slot v-if="$store.state.userInfo.permissions.includes(24) || $store.state.userInfo.permissions.includes(25)">
              <button type="button" class="btn btn-success" @click="storeMutualCaseInfo">সেভ করুন</button>
            </slot>
          </b-col>
        </b-row>
      </slot>
    </b-modal>

    <!-- PDF Content Here -->
    <div class="pdfmargin">
      <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="false"
        :preview-modal="true"
        :paginate-elements-by-height="2480"
        filename="hee hee"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="portrait"
        pdf-content-width="800px"
        @beforeDownload="beforeDownload($event)"
        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
    >
        <section slot="pdf-content" class="pdfrmargin">
          <b-row class="text-center">
            <b-col cols="12">
              <p class="align-middle">ফরম-৯</p>
            </b-col>
          </b-row>
          <b-row class="text-center">
            <b-col cols="12">
              <p class="align-middle">[ বিধি ১৩ (৩) দ্রষ্টব্য ]</p>
            </b-col>
          </b-row>
          <b-row class="text-center">
            <b-col cols="12">
              <h5 class="align-middle">আপোষনামা</h5>
            </b-col>
          </b-row>
          <b-row class="text-center">
            <b-col cols="12">
              <p class="align-middle">( আবেদনকারী, প্রতিবাদী )</p>
            </b-col>
          </b-row>
          <b-row class="text-center mt-1">
            <b-col cols="6">
              <p class="caseNo">
                <slot v-if="caseInfos.union_info!=null">
                  {{caseInfos.union_info.bn_name}}
                </slot>
              </p>
            </b-col>
            <b-col cols="6">
              <p class="">ইউনিয়ন/গ্রাম আদালত</p>
            </b-col>
          </b-row>
          <b-row class="text-center mt-1">
            <b-col cols="3">
              <p class="">মামলার নম্বর :</p>
            </b-col>
            <b-col cols="3">
              <p class="caseNo">{{caseInfos.id |banglaNumber}}</p>
            </b-col>
            <b-col cols="3">
              <p class="">মামলার ধরন :</p>
            </b-col>
            <b-col cols="3">
              <p class="caseNo">{{caseInfos.caseType}}</p>
            </b-col>
          </b-row>
          <b-row class="boraborPDF mt-1">
          <b-col>
            <p class="">বরাবর ,</p>
            <p class=""> চেয়ারম্যান </p>
          </b-col>
        </b-row>
          <b-row class="boraborSubPDF mt-1">
            <b-col>
              <p style="font-weight: 800">
                বিষয়: আপোষে বিরোধ নিষ্পোত্তি ।
              </p>
            </b-col>
          </b-row>
          <b-row class="DespcriptionPDF mt-1">
            <b-col>
              <p class="">
              আপনার অবগতির জন্য জানানো য়াইতেছে যে ,<span
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
               বিরোধীয় বিষয়টি নিম্নলিখিত শর্তসাপেক্ষে ও সাক্ষীর উপস্থিতিতে আপোষ-নিষ্পোত্তি হইয়াছে।
            </p>
            </b-col>
          </b-row>
<b-row class="DespcriptionPDF mt-1">
            <b-col>
              <p class="">
                শর্তাবলী :
            </p>
          </b-col>
        </b-row>
        <b-row class="DespcriptionPDF mt-1" v-for="conditionInfo,conditionIndex in conditions">
            <b-col>
              <p class="">
               <span style="font-weight: 800"> {{++conditionIndex | banglaNumber}} : </span> ‍<span>{{conditionInfo}}</span>
            </p>
          </b-col>
        </b-row>
       
        <b-row class="DespcriptionPDF mt-1">
            <b-col>
              <p class="">
             মনোনীত প্রতিনিধি/ স্বাক্ষীর নাম 
            </p>
                <b-row style="font-weight:800;" >
                    <b-col cols="1">নং </b-col>
                    <b-col>নাম  </b-col>
                    <b-col>সদস্য  </b-col>
                    <b-col>স্বাক্ষর  </b-col>
                </b-row>
                <b-row v-for="(memberInfo,memberIndex) in decisionList">
                    <b-col cols="1"> {{++memberIndex |banglaNumber}} </b-col>
                    <b-col>{{memberInfo.name}}</b-col>
                    <b-col>মনোনীত প্রতিনিধি  </b-col>
                    <b-col>...</b-col>
                </b-row>
               

            </b-col>
          </b-row>
          <b-row class="DespcriptionPDF mt-1">
            <b-col>
              <p class="">
             নিবেদক ,
            </p>
                <b-row  >
                    <b-col cols="3">আবেদনকারীর নাম : </b-col>
                    <b-col style="font-weight:800;" >
                      <slot v-if="caseInfos.applicant_infos!=null">
                        {{caseInfos.applicant_infos[0].name}}
                      </slot>
                    </b-col>
                    <b-col> প্রতিবাদীর নাম :   </b-col>
                    <b-col style="font-weight:800;">
                      <slot v-if="caseInfos.oppositor_infos!=null">
                        {{caseInfos.oppositor_infos[0].name}}
                      </slot>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="3"> পিতার নাম : </b-col>
                    <b-col style="font-weight:800;" >
                      <slot v-if="caseInfos.applicant_infos!=null">
                        {{caseInfos.applicant_infos[0].fName}}
                      </slot>
                    </b-col>
                    <b-col>পিতার নাম : </b-col>
                    <b-col style="font-weight:800;">
                      <slot v-if="caseInfos.oppositor_infos!=null">
                        {{caseInfos.oppositor_infos[0].fName}}
                      </slot>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="3">মাতার নাম : </b-col>
                    <b-col style="font-weight:800;">
                        <slot v-if="caseInfos.applicant_infos!=null">
                          {{caseInfos.applicant_infos[0].mName}}
                        </slot>
                    </b-col>
                    <b-col>মাতার নাম  </b-col>
                    <b-col style="font-weight:800;">
                      <slot v-if="caseInfos.oppositor_infos!=null">
                        {{caseInfos.oppositor_infos[0].mName}}
                      </slot>
                    </b-col>
                </b-row>
                <!-- <b-row>
                    <b-col cols="3">ঠিকানা : </b-col>
                    <b-col style="font-weight:800;">
                      <slot v-if="caseInfos.applicant_infos!=null">
                        {{caseInfos.applicant_infos[0].address}}
                      </slot>
                    </b-col>
                    <b-col> ঠিকানা : </b-col>
                    <b-col style="font-weight:800;">
                      <slot v-if="caseInfos.oppositor_infos!=null">
                        {{caseInfos.oppositor_infos[0].address}}
                      </slot>
                    </b-col>
                </b-row> -->
                 <b-row>
                    <b-col cols="3">স্বাক্ষর :</b-col>
                    <b-col></b-col>
                    <b-col> স্বাক্ষর : </b-col>
                    <b-col>  </b-col>
                </b-row>

            </b-col>
          </b-row>

        </section>
      </vue-html2pdf>
    </div>
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
      status: 2,
      courtMemberList:[],
      decisionList:[],
      conditions:[],
      chairmanInfo:null,
      decisionType:null,
      selectedMember:null,
      agreeNumber:null,
      disAgreeNumber:null,
      isAgree:null,
      caseInfos:[],
      condition1:null,
      condition2:null,
      condition3:null,
      condition4:null,
      condition5:null,
      
      districtList:[],
      upazilaList:[],
      unionList:[],
      district:'',
      upazila:'',
      union:'',
      startDate:'',
      endDate:'',
      date:this.currentDate(),
    };
  },
  beforeMount(){
    // this.getDataList();
    // this.getChairmanInfo();
     // this.getUpazilaList();
     //    this.getUnionList();
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
      this.getChairmanInfo();
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
    resetForm(){
        this.startDate='';
        this.endDate='';
        this.upazila='';
        this.union='';
        this.district='';
        this.searchKey='';
    },
    async storeMutualCaseInfo(){

      let token=window.localStorage.getItem("token");
      let config = {
             headers: {
                'Authorization': 'Bearer '+token
            }   
        };
       
      this.conditions=[];
      this.conditions.push(this.condition1);
      this.conditions.push(this.condition2);
      this.conditions.push(this.condition3);
      this.conditions.push(this.condition4);
      this.conditions.push(this.condition5);

      let formData=new FormData();
        formData.append("caseId",this.caseInfos.id);


        this.conditions.forEach(condition=>{
            formData.append("condition[]",condition);
        });

        if(this.chairmanInfo.msgFlag==true)
          formData.append("chairmanId",this.chairmanInfo.chairmanInfo.id);

        this.decisionList.forEach(decisionInfos=>{
            formData.append("nomminatorId[]",decisionInfos.id);
            formData.append("name[]",decisionInfos.name);
            formData.append("type[]",decisionInfos.type);
            formData.append("designation[]",decisionInfos.deisgnation);
        });

        let url="staff/store/mutual/case/info";

        await this.$http.post(url,formData,config)
         .then(response=>{
              if(response.data.msgFlag==true){
                this.generateReport();
              }
              if(response.data.errMsgFlag)
                this.$toaster.warning(response.data.errMsg);
         })
         .catch(error=>{console.dir(error)})
         .finally();
    },
    addWitness(){
      this.courtMemberList.forEach((courtMemberInfo,courtMemberIndex)=>{
          if(courtMemberIndex==this.selectedMember){
            this.decisionList.push({
                'id':courtMemberInfo.id,
                'name':courtMemberInfo.name,
                'type':courtMemberInfo.type,
                'designation':courtMemberInfo.deisgnation,
            });
          }
      });
    },
    async getChairmanInfo(){
        let token=window.localStorage.getItem("token");
        let config = {
                   headers: {
                      'Authorization': 'Bearer '+token
                  }   
              };
        
        let url="staff/get/running/chairman/info";

        await this.$http.get(url,config)
         .then(response=>{
              this.chairmanInfo=response.data;
            // if(response.data.msgFlag==true){
            //   this.courtMemberList.push({
            //       'id':response.data.chairmanInfo.id,
            //       'name':response.data.chairmanInfo.,
            //       'type':3,
            //       'designation':response.data.courtDesignation,
            //   });
            // }
         })
         .catch(error=>{console.dir(error)})
         .finally();
      },
    prepareCaseForMutual(dataInfo){
      this.caseInfos=dataInfo;
      this.listShow=true;
      this.courtMemberList=[];
      this.decisionList=[];
      // if(this.chairmanInfo.msgFlag==true){
      //   this.courtMemberList.push({
      //       'id':this.chairmanInfo.chairmanInfo.id,
      //       'name':this.chairmanInfo.chairmanInfo.name,
      //       'type':3,
      //       'designation':this.chairmanInfo.courtDesignation,
      //   });
      // }

      dataInfo.nomminator_for_applicants.forEach(nomminatorInfo=>{
          this.courtMemberList.push({
              'id':nomminatorInfo.id,
              'name':nomminatorInfo.name,
              'type':1,
              'designation':nomminatorInfo.deisgnation,
          });
      });
      dataInfo.nomminator_for_oppositors.forEach(nomminatorInfo=>{
          this.courtMemberList.push({
              'id':nomminatorInfo.id,
              'name':nomminatorInfo.name,
              'type':2,
              'designation':nomminatorInfo.deisgnation,
          });
      });
      this.conditions=[];
      this.condition1=null;
      this.condition2=null;
      this.condition3=null;
      this.condition4=null;
      this.condition5=null;
      if(dataInfo.mutual_case!=null){
        let conditions=JSON.parse(dataInfo.mutual_case.conditions);
        conditions.forEach((condition,index)=>{
            this.conditions.push(condition);
            if(index==0)
              this.condition1=condition;
            if(index==1)
              this.condition2=condition;
            if(index==2)
              this.condition3=condition;
            if(index==3)
              this.condition4=condition;
            if(index==4)
              this.condition5=condition;
        });

        dataInfo.mutual_case.mutual_infos.forEach((mutualInfo,index)=>{

           this.courtMemberList.forEach((courtMemberInfo,courtMemberIndex)=>{
              if(courtMemberInfo.id==mutualInfo.nomminatorId){

                    this.decisionList.push({
                      'id':courtMemberInfo.id,
                      'name':courtMemberInfo.name,
                      'type':courtMemberInfo.type,
                      'designation':courtMemberInfo.deisgnation,
                  });

                }
            });
         });

        this.date=dataInfo.mutual_case.created_at;
      }
    },
    async getDataList(){
        let token=window.localStorage.getItem("token");
        let config = {
                   headers: {
                      'Authorization': 'Bearer '+token
                  }   
              };
        
        let url="staff/get/case/list/for/mutual?page="+this.pageNo+"&numOfData="+this.numOfData+"&status="+this.status+"&searchKey="+this.searchKey+"&unionId="+this.union+"&upazilaId="+this.upazila;

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
    async beforeDownload(){},
    onProgress(){},
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
    
    changeView() {
      this.listShow = !this.listShow;
    },
    currentDate() {
      return new Date();
      // const current = new Date();
      // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      // return date;
    }
    
  },
};
</script>

<style lang="scss" scoped>
.mutual-solution {
  margin: 10px 0px 0px 80px;
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
.area{
    margin-left: 50px;
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
    .time{
        width:150px !important;
    }
    .date{
        width:200px !important;
    }
  width: 85%;
  font-size: 18px;
  margin-left: 70px;
}
.MononitoMember{
    margin: auto;
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
.printfile {
  width: 50px;
  height: 50px;
  background-color: rgb(224, 224, 224);
  color: rgb(0, 97, 0);
  text-align: center;
  font-size: 25px;
  padding: 5px;
  float: right;
}
.Applicants {
  text-align: right;
}
.ConditionMain {
  width: 91%;
  float: left;
  margin-bottom: 50px !important;
  margin-left: 50px;
}
//pdf design hare
.pdfrmargin {
    .text-center{
        font-size: 14px !important;
    }
  margin: 50px 50px 20px 50px !important;
  font-size: 14px !important;
}
.boraborSubPDF {
  width: 100%;
  font-size: 14px;
  margin-left: 15px;
  font-weight: 800;
}
.DespcriptionPDF {
  width: 100%;
  font-size: 14px;
  margin-left: 15px;
}
.ApplicantPDF {
  width: 100% !important;
  font-size: 14px;
}
.underline {
  width: 250px;
  height: 1px;
  background-color: rgb(34, 34, 34);
  margin: auto;
  text-align: center !important;
  margin-bottom: -6px;
}
.underlinep {
  text-align: center !important;
  font-size: 14px;
  margin-bottom: -6px;
}
</style>