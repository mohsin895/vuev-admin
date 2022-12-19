<template>
 <div class="degree-or-order-form">
  <b-card title="ডিক্রী বা আদেশের ফরম">
   
      <!-- select option -->
      <b-row class="text-center">
        <b-col cols="12">
          <p class="align-center">ফরম-১২</p>
        </b-col>
      </b-row>
      <b-row class="text-center">
        <b-col cols="12">
          <p class="align-middle">[ বিধি ১৯ (১) ও ২০(১) দ্রষ্টব্য ]</p>
        </b-col>
      </b-row>
      <b-row class="text-center">
        <b-col cols="12">
          <h5 class="align-middle">ডিক্রী বা আদেশের ফরম</h5>
        </b-col>
      </b-row>
      <b-row class="text-center">
        <b-col cols="12">
          <h6 class="align-middle">( আবেদনকারী, প্রতিবাদী ও সাক্ষীর )</h6>
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
            <th scope="col">ডিক্রী বা আদেশের তারিখ:</th>
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
                    <slot v-if="dataInfo.case_degree!=null">
                        {{dataInfo.case_degree.created_at | formatDateBd}}
                    </slot>
                </td>
                <td>
                    <slot v-if="dataInfo.case_degree!=null">
                        ডিক্রী বা আদেশ দেওয়া হয়েছে
                    </slot>
                    <slot v-else>
                       <span class="text-danger"> ডিক্রী বা আদেশ দেওয়া হয় নাই</span>
                    </slot>
                </td>
                <td>
                  <slot v-if="$store.state.userInfo.permissions.includes(27) || $store.state.userInfo.permissions.includes(28)">
                    <a href="#" @click="prepareCaseForDegree(dataInfo)" v-b-modal.data-view>
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
    <b-row class="Despcription mt-3">
      <b-col>
        <p class="">
          আবেদনকারী :<span style="font-weight: 800"> 
            <slot v-for="applicantInfo in caseInfos.applicant_infos">
                {{applicantInfo.name}}
            </slot>
           </span>
          বনাম
          <span style="font-weight: 800"> 
            <slot v-for="oppositorInfo in caseInfos.oppositor_infos">
                {{oppositorInfo.name}}
            </slot>
          </span> প্রতিবাদী,
          মামলার ধরন <span style="font-weight: 800"> {{caseInfos.caseType}} </span> এর
          <span style="font-weight: 800"> {{caseInfos.caseTitle}}</span> সংক্রান্ত এর
          দাবী ।
        </p>
      </b-col>
    </b-row>
    <b-row class="Despcription mt-3">
      <b-col>
        <p class="">
          অদ্য আবেদনপত্রখানি চূরান্ত নিষ্পত্তির জন্য অত্র গ্রাম আদালত সমক্ষে
          উপস্থিত হওয়ায় আমরা সবসম্মতিক্রমে/
          <select v-model="agreeNumber">
            <option value="1">১</option>
            <option value="2">২</option>
            <option value="3">৩</option>
            <option value="4">৪</option>
          </select>
          :
          <select v-model="disAgreeNumber">
            <option value="1">১</option>
            <option value="2">২</option>
            <option value="3">৩</option>
            <option value="4">৪</option>
          </select>
          জনের সংখ্যাগরিষ্ঠতায় আদেশ প্রদান করিতেছি যে,
        </p>
      </b-col>
    </b-row>
    <div class="ConditionMain">
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

    <br />
    <br />

    
    <br />

    
    <table class="table table-borderless">
      <tr>
        <td>
            <select v-model="decisionType">
              <option value="1">সিদ্ধান্তের পক্ষে</option>
              <option value="2">সিদ্ধান্তের বিপক্ষে</option>
            </select>
        </td>
        <td>
            <select v-model="selectedMember" @change="setDecision">
              <slot v-for="(memberInfo,memberIndex) in courtMemberList">
                <option :value="memberIndex">{{memberInfo.name}}</option>
              </slot>
             </select>
        </td>
      </tr>
    </table>

  <div class="row">
    <div class="col d-flex flex-row-reverse">
          <table
            class="Table-Break "
            style="border: 1px solid #000; text-align: center; width:50%; "
          >
            <thead style="height: 60px; font-size: 20px; font-weight: 800">
              <tr>
                <th colspan="3">সিদ্ধান্তের পক্ষে</th>
              </tr>
            </thead>
            <tbody>
              <tr style="font-size: 15px; font-weight: 800">
                <td style="width: 60px">নং</td>
                <td>নাম</td>
                <td>স্বাক্ষর</td>
              </tr>

              <slot v-for="(memberInfo,memberIndex) in decisionList">
                <tr v-if="memberInfo.decisionType==1">
                  <td >{{++memberIndex |banglaNumber}}</td>
                  <td>{{memberInfo.name}}</td>
                  <td></td>
                </tr>
                <tr v-else>
                  <td>{{++memberIndex |banglaNumber}}</td>
                  <td></td>
                  <td></td>
                </tr>
              </slot>
            </tbody>
          </table>
          <table
            class="Table-Break"
            style="border: 1px solid #000; text-align: center; width:50%; "
          >
            <thead style="height: 60px; font-size: 20px; font-weight: 800">
              <tr>
                <th colspan="3">সিদ্ধান্তের বিপক্ষে</th>
              </tr>
            </thead>
            <tbody>
              <tr style="font-size: 15px; font-weight: 800">
                <td style="width: 60px">নং</td>
                <td>নাম</td>
                <td>স্বাক্ষর</td>
              </tr>
              <slot v-for="(memberInfo,memberIndex) in decisionList">
                <tr v-if="memberInfo.decisionType==2">
                  <td >{{++memberIndex |banglaNumber}}</td>
                  <td>{{memberInfo.name}}</td>
                  <td></td>
                </tr>
                <tr v-else>
                  <td>{{++memberIndex |banglaNumber}}</td>
                  <td></td>
                  <td></td>
                </tr>
              </slot>
            </tbody>
          </table>
      </div>
    </div>

    <b-row class="text-center mt-5">
      <div class="mt-5">
        <b-row cols-lg="12">
          <b-col cols="4">
            <b-form-group>
              <b-form-checkbox v-model="isAgree"> সকল শতে মান্য করিলাম :</b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
      </div>
    </b-row>
    <b-row>
      <b-col cols="12" class="d-flex flex-row-reverse">
        <slot v-if="$store.state.userInfo.permissions.includes(27)">
           <div class="printfile nt-5">
            <a href="#" @click="generateReport" > <icon name="print" size="20px" /></a>
          </div>
        </slot>
        <slot v-if="$store.state.userInfo.permissions.includes(27) || $store.state.userInfo.permissions.includes(28)">
          <button type="button" class="btn btn-success" @click="storeDegreeOrder">সেভ করুন</button>
        </slot>
      </b-col>
    </b-row>
  </slot>
</b-modal>

     <!-- PDF Content Here -->
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
              <p class="align-middle">ফরম-১২</p>
            </b-col>
          </b-row>
          <b-row class="text-center">
            <b-col cols="12">
              <p class="align-middle">[ বিধি ১৯ (১) ও ২০(১) দ্রষ্টব্য ]</p>
            </b-col>
          </b-row>
          <b-row class="text-center">
            <b-col cols="12">
              <h5 class="align-middle">ডিক্রী বা আদেশের ফরম</h5>
            </b-col>
          </b-row>
          <b-row class="text-center mt-4">
            <b-col cols="4">
            </b-col>
            <b-col cols="4">
              <p class="caseNo">
                <slot v-if="caseInfos.union_info!=null">
                  {{caseInfos.union_info.bn_name}}
                </slot>
              </p>
            </b-col>
            <b-col cols="4">
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

          <b-row class="DespcriptionPDF mt-2">
            <b-col>
               <p class="">
              আবেদনকারী :<span style="font-weight: 800">
                <slot v-for="applicantInfo in caseInfos.applicant_infos">
                    {{applicantInfo.name}}
                </slot>
              </span>
              বনাম
              <span style="font-weight: 800">
                <slot v-for="oppositorInfo in caseInfos.oppositor_infos">
                    {{oppositorInfo.name}}
                </slot>
              </span> প্রতিবাদী,
              মামলার ধরন <span style="font-weight: 800"> {{caseInfos.caseType}} </span> এর
              <span style="font-weight: 800"> {{caseInfos.caseTitle}}</span> সংক্রান্ত এর
              দাবী ।
            </p>
            </b-col>
          </b-row>
        <b-row class="DespcriptionPDF mt-1">
            <b-col>
               <p class="">
              অদ্য আবেদনপত্রখানি চূরান্ত নিষ্পত্তির জন্য অত্র গ্রাম আদালত সমক্ষে
              উপস্থিত হওয়ায় আমরা সবসম্মতিক্রমে/ <span style="font-weight: 800"> ৫ </span> : <span style="font-weight: 800"> ১ </span>
              জনের সংখ্যাগরিষ্ঠতায় আদেশ প্রদান করিতেছি যে,
            </p>
          </b-col>
        </b-row>
        <b-row class="DespcriptionPDF mt-2">
            <b-col>
              <p class="">
                শর্তাবলী :
            </p>
          </b-col>
        </b-row>

        <b-row class="DespcriptionPDF mt-2" v-for="conditionInfo,conditionIndex in conditions">
            <b-col>
              <p class="">
               <span style="font-weight: 800"> {{++conditionIndex |banglaNumber}} : </span> ‍<span>{{conditionInfo}}</span>
            </p>
          </b-col>
        </b-row>
       
        <b-row class="mt-2" cols-lg="12">
           <b-col cols="6">
              <table
                style="border: .10px solid #000; text-align: center; width: 320px"
              >
                <thead style="height: 30px; font-size: 12px; font-weight: 800">
                  <tr>
                    <th colspan="3">সিদ্ধান্তের পক্ষে</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="width: 20px;">নং</td>
                    <td>নাম</td>
                    <td>স্বাক্ষর</td>
                  </tr>
                  
                 <slot v-for="(memberInfo,memberIndex) in decisionList">
                  <tr v-if="memberInfo.decisionType==1">
                    <td >{{++memberIndex |banglaNumber}}</td>
                    <td>{{memberInfo.name}}</td>
                    <td>...</td>
                  </tr>
                  <tr v-else>
                    <td>{{++memberIndex |banglaNumber}}</td>
                    <td></td>
                    <td>...</td>
                  </tr>
                </slot>
                </tbody>
              </table>
           </b-col>
           <b-col cols="6">
            <table
              style="border: 0.1px solid #000; text-align: center; width: 320px"
            >
              <thead style="height: 30px; font-size: 12px; font-weight: 800">
                <tr>
                  <th colspan="3">সিদ্ধান্তের বিপক্ষে</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="width: 20px;">নং</td>
                  <td>নাম</td>
                  <td>স্বাক্ষর</td>
                </tr>
                <slot v-for="(memberInfo,memberIndex) in decisionList">
                  <tr v-if="memberInfo.decisionType==2">
                    <td >{{++memberIndex |banglaNumber}}</td>
                    <td>{{memberInfo.name}}</td>
                    <td>...</td>
                  </tr>
                  <tr v-else>
                    <td>{{++memberIndex |banglaNumber}}</td>
                    <td></td>
                    <td>...</td>
                  </tr>
                </slot>
              </tbody>
            </table>
           </b-col>
        </b-row>
        <b-row cols="1" cols-sm="2" class="Footer-Size mt-5">
            <b-col style="font-size:6px !important;">
              <div class="underline"></div>
              <br />
              <p class="underlinep">তারিখ: {{date| formatDateBd}}</p>
              <p class="underlinep">সীলমোহর</p>
            </b-col>
            <b-col style="font-size:6px !important;">
              <div class="underline"></div>
              <br />
              <p class="underlinep">গ্রাম আদালত/ইউনিয়ন পরিষদ</p>
              <p class="underlinep">এর চেয়ারম্যানের স্বাক্ষর</p>
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
    this.getChairmanInfo();
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
      // this.getChairmanInfo();
      
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
    async storeDegreeOrder(){

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
        formData.append("agreeNumber",this.agreeNumber);
        formData.append("disAgreeNumber",this.disAgreeNumber);
        formData.append("isAgree",this.isAgree);

        this.conditions.forEach(condition=>{
            formData.append("condition[]",condition);
        });

        this.decisionList.forEach(decisionInfos=>{
            formData.append("nomminatorId[]",decisionInfos.id);
            formData.append("name[]",decisionInfos.name);
            formData.append("type[]",decisionInfos.type);
            formData.append("designation[]",decisionInfos.deisgnation);
            formData.append("decisionType[]",decisionInfos.decisionType);
        });

        let url="staff/store/case/degree/info";

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
    setDecision(){
      this.courtMemberList.forEach((courtMemberInfo,courtMemberIndex)=>{
          if(courtMemberIndex==this.selectedMember){
            this.decisionList.push({
                'id':courtMemberInfo.id,
                'name':courtMemberInfo.name,
                'type':courtMemberInfo.type,
                'designation':courtMemberInfo.deisgnation,
                'decisionType':this.decisionType,
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
    prepareCaseForDegree(dataInfo){
     
      this.caseInfos=dataInfo;
      this.listShow=true;
      this.courtMemberList=[];
      this.decisionList=[];
      if(this.chairmanInfo.msgFlag==true){
        this.courtMemberList.push({
            'id':this.chairmanInfo.chairmanInfo.id,
            'name':this.chairmanInfo.chairmanInfo.name,
            'type':3,
            'designation':this.chairmanInfo.courtDesignation,
        });
      }

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
      if(dataInfo.case_degree!=null){
        let conditions=JSON.parse(dataInfo.case_degree.conditions);
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

        let decisionType=null;

        dataInfo.case_degree.degree_infos.forEach((degreeInfo,index)=>{

           this.courtMemberList.forEach((courtMemberInfo,courtMemberIndex)=>{
              if(courtMemberInfo.id==degreeInfo.nomminatorId){
                 decisionType =(degreeInfo.isAgreed==1) ? 1:2;

                    this.decisionList.push({
                      'id':courtMemberInfo.id,
                      'name':courtMemberInfo.name,
                      'type':courtMemberInfo.type,
                      'designation':courtMemberInfo.deisgnation,
                      'decisionType':decisionType,
                  });

                }
            });
         });

        this.date=dataInfo.case_degree.created_at;
        this.agreeNumber=dataInfo.case_degree.agreeNumber;
        this.disAgreeNumber=dataInfo.case_degree.disAgreeNumber;
        this.isAgree=(dataInfo.case_degree.isAgreed==1)?true:false;

      }
    },
    async getDataList(){
        let token=window.localStorage.getItem("token");
        let config = {
                   headers: {
                      'Authorization': 'Bearer '+token
                  }   
              };
        
        let url="staff/get/case/list/for/degree?page="+this.pageNo+"&numOfData="+this.numOfData+"&status="+this.status+"&searchKey="+this.searchKey+"&unionId="+this.union+"&upazilaId="+this.upazila;

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
.degree-or-order-form {
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
.table td {
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
.crime-place {
  width: 89.3%;
  margin-top: 50px;
  font-size: 12px;
}
.label {
  font-size: 18px;
  text-align: center;
}
.color {
  color: red;
}
.form-select {
  font-size: 18px;
  text-align: center;
  font-weight: 700;
  background-color: rgb(239, 239, 239);
}
.text-center {
  width: 91%;
  font-size: 18px;
  font-weight: 700;
}
.Table-Break {
  float: left;
  margin-left: 100px;
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
.ConditionMain {
  width: 91%;
  float: left;
  margin-bottom: 50px !important;
}
.align-middle {
  border: 0px solid #000;
}
.text-center button {
  float: right;
}
.printfile {
  width: 50px;
  height: 50px;
  background-color: rgb(224, 224, 224);
  color: rgb(0, 97, 0);
  align: center;
  font-size: 25px;
  padding: 5px;
}
//pdf design hare
.pdfrmargin {
    .text-center{
        font-size: 14px !important;
    }
  margin: 50px 50px 50px 50px !important;
  font-size: 14px !important;
}
.boraborSubPDF {
  width: 100%;
  font-size: 14px;
  margin-left: 15px;
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
.TablePDF{
  margin-left: 1px !important;
  position: inherit;
}
.underline {
  width: 250px;
  height: 1px;
  background-color: rgb(34, 34, 34);
  margin: auto;
  text-align: center !important;
  margin-bottom: 0px;
}
.underlinep {
  text-align: center !important;
  font-size: 14px;
  margin-bottom: 0px;
}
</style>
