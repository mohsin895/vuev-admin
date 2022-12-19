<template>
	<div>
	  	<b-row >
	  		<b-col class="mt-2">
	  			<b-card>
	  				<h5>রেজিস্ট্রারকৃত এসএমএস প্রদানের মামলা সমূহ:</h5>

	  		<b-row>

            <b-col cols="4">
                <b-input-group prepend="মামলা নং" class="mb-2 mr-sm-2 mb-sm-0">
                 <input type="text" class="form-control" v-model="searchKey" placeholder="মামলা নং" v-on:keyup.enter="getSummonList()">
                </b-input-group>
            </b-col>
            
        <slot v-if="$store.state.userInfo.permissions.includes(777)">
            <b-col cols="4">
                <b-input-group prepend="জেলা" class="mb-2 mr-sm-2 mb-sm-0">
                  
                    <select v-model="district" class="form-control" @change="getUpazilaList(); getSummonList();">
                        <slot v-for="districtInfo,districtIndex in districtList">
                            <option :value="districtInfo.id">{{districtInfo.bn_name}}</option>
                        </slot>
                    </select>
                
                </b-input-group>
            </b-col>
        </slot>
        <slot v-if="$store.state.userInfo.permissions.includes(999)">
            <b-col cols="4">
                <b-input-group prepend="উপজেলা" class="mb-2 mr-sm-2 mb-sm-0">
                  <slot v-if="$store.state.userInfo.permissions.includes(999)">
                    <select v-model="upazila" class="form-control" @change="getUnionList(); getSummonList();">
                        <slot v-for="upazilaInfo,upazilaIndex in upazilaList">
                            <option :value="upazilaInfo.id">{{upazilaInfo.bn_name}}</option>
                        </slot>
                    </select>
                </slot>
                </b-input-group>
            </b-col>
        </slot>
        <slot v-if="$store.state.userInfo.permissions.includes(888)">
            <b-col cols="4">
                <b-input-group prepend="ইউনিয়ন" class="mb-2 mr-sm-2 mb-sm-0">
                    <select v-model="union" class="form-control" @change="getSummonList()">
                        <slot v-for="unionInfo,unionIndex in unionList">
                            <option :value="unionInfo.id">{{unionInfo.bn_name}}</option>
                        </slot>
                    </select>
                </b-input-group>
            </b-col>
        </slot>
            <b-col>
                <b-button variant="danger" @click="resetForm();getSummonList;">মুছুন</b-button>
                <b-button variant="info" @click="getSummonList" class="ml-4">অনুসন্ধান করুন</b-button>
            </b-col>
            
        </b-row>
	                <table class="table table-borderless caption-top">
	                        <thead>
	                        	
	                            <tr>
	                            <th >মামলার নং: </th>
	                            <th >মামলা গ্রহনের তারিখ: </th>
	                            <th>ইউনিয়ন,উপজেলা,জেলা</th>
	                            <th >নাম: </th>
	                            <th >প্রদানের তারিখ:</th>
	                            <th >বার্তা ধরণ:</th>
	                            <th class="text-center">অ্যাকশন</th>
	                            </tr>
	                        </thead>
	                        <tbody>
	                        <slot v-for="summonInfo,summonIdex in summonList.data">
	                            <tr :class="(summonIdex%2==0) ? 'table-success':''">
	                                <th >{{summonInfo.caseId | banglaNumber}}</th>
	                                <td>
	                                		<slot v-if="summonInfo.case_info!=null">
	                                			{{summonInfo.case_info.acceptDate |formatDateBd}}
	                                		</slot>
	                                </td>
	                                <td>
					                    <slot v-if="summonInfo.case_info!=null">
		                                    <slot v-if="summonInfo.case_info.union_info!=null">
		                                    	<span>{{summonInfo.case_info.union_info.bn_name}}</span>,<br>
		                                    </slot>
		                                </slot>
		                                <slot v-if="summonInfo.case_info!=null">
		                                    <slot v-if="summonInfo.case_info.upazila_info!=null">
		                                    	<span >{{summonInfo.case_info.upazila_info.bn_name}}</span>,<br>
		                                    </slot>
		                                </slot>
		                                <slot v-if="summonInfo.case_info!=null">
		                                    <slot v-if="summonInfo.case_info.district_info!=null">
		                                    	<span >{{summonInfo.case_info.district_info.bn_name}}</span>,<br>
		                                    </slot>
		                                </slot>
		                                <slot v-if="summonInfo.case_info!=null">
		                                    <slot v-if="summonInfo.case_info.division_info!=null">
		                                    	<span >{{summonInfo.case_info.division_info.bn_name}}</span>
		                                    </slot>
		                                </slot>
					                </td>
	                                <td>
	                                		<slot v-if="summonInfo.type==1">
	                                			<slot v-if="summonInfo.applicant_info!=null">
	                                				{{summonInfo.applicant_info.name}}<br>
	                                				(আবেদনকারী)
	                                			</slot>
	                                		</slot>
	                                		<slot v-if="summonInfo.type==2">
	                                			<slot v-if="summonInfo.oppositor_info!=null">
	                                				{{summonInfo.oppositor_info.name}}<br>
	                                				(প্রতিবাদী)
	                                			</slot>
	                                		</slot>
	                                		<slot v-if="summonInfo.type==3">
	                                			<slot v-if="summonInfo.witness_info!=null">
	                                				{{summonInfo.witness_info.name}}<br>
	                                				(স্বাক্ষী)
	                                			</slot>
	                                		</slot>
	                                </td>
	                                <td>{{summonInfo.created_at | formatDateBd}}</td>

	                                <td>
	                                	<slot v-if="summonInfo.isSms==1">
	                                		<icon name="sms" color="blue" size="20px"/> খুদেবার্তা
	                                	</slot>
	                                	<slot v-if="summonInfo.isPrinted==1">
	                                		<icon name="print" color="green" size="20px"/> চিঠি
	                                	</slot>
	                                </td>
	                                <td class="text-center">
	                                <slot v-if="$store.state.userInfo.permissions.includes(9)">
	                                		<a href="#" @click="getSummonDetails(summonInfo.id)" v-b-modal.modal-print> 
	                                			<icon name="eye" size="20px"/>
	                                		</a> 
	                                </slot>
	                                </td>
	                            </tr>
	                         </slot>
	                        </tbody>
	                        <tfoot>
                            <tr>
                                <th colspan="6">
                                    <paginate
                                      :page-count="summonLastPage"
                                      :click-handler="summonByPaginate"
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
	  		</b-col>
	  		<b-col class="mt-2">
	  			<b-card>
		            <p>ফরম-১</p>
		            <p>[বিধি ৩ দ্রষ্টব্য]</p>
		            <h5>মামলার প্রতি সমন</h5>

		            <b-row>
            <b-col cols="4">
                <b-input-group prepend="মামলা নং" class="mb-2 mr-sm-2 mb-sm-0">
                 <input type="text" class="form-control" v-model="searchKey" placeholder="মামলা নং" v-on:keyup.enter="getCaseList()">
                </b-input-group>
            </b-col>
           
        <slot v-if="$store.state.userInfo.permissions.includes(777)">
            <b-col cols="4">
                <b-input-group prepend="জেলা" class="mb-2 mr-sm-2 mb-sm-0">
                  
                    <select v-model="district" class="form-control" @change="getUpazilaList(); getCaseList();">
                        <slot v-for="districtInfo,districtIndex in districtList">
                            <option :value="districtInfo.id">{{districtInfo.bn_name}}</option>
                        </slot>
                    </select>
                
                </b-input-group>
            </b-col>
        </slot>
        <slot v-if="$store.state.userInfo.permissions.includes(999)">
            <b-col cols="4">
                <b-input-group prepend="উপজেলা" class="mb-2 mr-sm-2 mb-sm-0">
                  <slot v-if="$store.state.userInfo.permissions.includes(999)">
                    <select v-model="upazila" class="form-control" @change="getUnionList(); getCaseList();">
                        <slot v-for="upazilaInfo,upazilaIndex in upazilaList">
                            <option :value="upazilaInfo.id">{{upazilaInfo.bn_name}}</option>
                        </slot>
                    </select>
                </slot>
                </b-input-group>
            </b-col>
        </slot>
        <slot v-if="$store.state.userInfo.permissions.includes(888)">
            <b-col cols="4">
                <b-input-group prepend="ইউনিয়ন" class="mb-2 mr-sm-2 mb-sm-0">
                    <select v-model="union" class="form-control" @change="getCaseList()">
                        <slot v-for="unionInfo,unionIndex in unionList">
                            <option :value="unionInfo.id">{{unionInfo.bn_name}}</option>
                        </slot>
                    </select>
                </b-input-group>
            </b-col>
        </slot>
            <b-col>
                <b-button variant="danger" @click="resetForm();getCaseList;">মুছুন</b-button>
                <b-button variant="info" @click="getCaseList" class="ml-4">অনুসন্ধান করুন</b-button>
            </b-col>
            
        </b-row>
		            
		            <table class="table table-borderless caption-top">
		                <thead>
		                	
		                    <tr>
		                    <th >মামলার নং: </th>
		                    <th >মামলা গ্রহনের তারিখ: </th>
		                    <th >আবেদনকারীর নাম: </th>
		                    <th >প্রতিবাদীর নাম: </th>
		                    <th >স্বাক্ষীগণের নাম: </th>
		                    <th >বিরোদের বিষয়বস্তু:</th>
		                    <th class="text-center">অ্যাকশন</th>
		                    </tr>
		                </thead>
		                <tbody>
		                <slot v-for="caseInfo,caseIndex in caseList.data">
		                    <tr :class="(caseIndex%2==0) ? 'table-primary':''"> 
		                        <th >{{caseInfo.id | banglaNumber}}</th>
		                        <td>{{caseInfo.acceptDate | formatDateBd}}</td>
		                        <td>
		                        	<slot v-for="applicantInfo,applicantIndex in caseInfo.applicant_infos">
                                        {{++applicantIndex | banglaNumber}}. {{applicantInfo.name}}<br>
                                    </slot>
		                        </td>
		                        <td>
		                        	<slot v-for="oppositorInfo,oppositorIndex in caseInfo.oppositor_infos">
                                        {{++oppositorIndex | banglaNumber}}. {{oppositorInfo.name}}<br>
                                    </slot>
		                        </td>
		                        <td>
		                        	<slot v-for="witnessInfo,witnessIndex in caseInfo.witness_infos">
                                        {{++witnessIndex | banglaNumber}}. {{witnessInfo.name}}<br>
                                    </slot>
		                        </td>
		                        <td>{{caseInfo.caseTitle}}</td>
		                        <td class="text-center">
		                        <slot v-if="$store.state.userInfo.permissions.includes(8)">
		                        	<a href="#"  @click="getApplicationDetails(caseInfo.id)" v-b-modal.modal-sms> 
		                        		<icon name="eye" size="20px"/>
		                        	</a> 
		                        </slot>
		                        </td>
		                    </tr>
		                 </slot>
		                </tbody>
		                <tfoot>
                            <tr>
                                <th colspan="7">
                                    <paginate
                                      :page-count="caseLastPage"
                                      :click-handler="caseByPaginate"
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
	  		</b-col>
	  	</b-row>
	  	
	  	<!-- Modal sms summon-->
	  	<b-modal id="modal-sms" title="ফরম-১" size="xl" margin="center">
             <!-- select option -->
                <b-row class="text-center">
                        <b-col cols="12">
                            <p class="align-center">ফরম-১</p>
                        </b-col>
                </b-row>
                <b-row class="text-center">
                        <b-col cols="12">
                            <p class="align-middle">[বিধি ৩ দ্রষ্টব্য]</p>
                        </b-col>
                </b-row>
                <b-row class="text-center">
                        <b-col cols="12">
                            <select class="align-middle" v-model="summonType">
                                <option value="1">আবেদনকারীর প্রতি সমন</option>
                                <option value="2">প্রতিবাদীর প্রতি সমন</option>
                                <option value="3">স্বাক্ষী প্রতি সমন</option>
                            </select>
                        </b-col>
                </b-row>
                
            <br><br>
             <!-- crime place -->
             <div class="crime-place">
             	<!-- <pre>{{applicationDetails}}</pre> -->
                        <label for=""><strong>বিরোধের স্থান:</strong></label> <br> <br>
                        <b-row cols="1" cols-sm="4" class="justify-content-md-center" >
                            <b-col>
                                <div class="division">
                                    <div class="label">বিভাগ</div>
                                    <slot v-if="applicationDetails.division_info!=null">
                                    	<span class="form-control">{{applicationDetails.division_info.bn_name}}</span>
                                    </slot>
                                </div>
                            </b-col>
                            <b-col>
                                <div class="district">
                                    <div class="label">জেলা</div>
                                    <slot v-if="applicationDetails.district_info!=null">
                                    	<span class="form-control">{{applicationDetails.district_info.bn_name}}</span>
                                    </slot>
                                </div>
                            </b-col>
                            <b-col>
                                <div class="sub-district">
                                    <div class="label">উপজেলা</div>
                                    <slot v-if="applicationDetails.upazila_info!=null">
                                    	<span class="form-control">{{applicationDetails.upazila_info.bn_name}}</span>
                                    </slot>
                                </div>
                            </b-col>
                            <b-col>
                                <div class="union">
                                    <div class="label">ইউনিয়ন</div>
                                    <slot v-if="applicationDetails.union_info!=null">
                                    	<span class="form-control">{{applicationDetails.union_info.bn_name}}</span>
                                    </slot>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                     <!-- applicants info -->
                     <br> 
                     <p> বরাবর </p> 
                     <p>
                     	<slot v-if="summonType==1">
                     		আবেদনকারী
                     	</slot>
                     	<slot v-if="summonType==2">
                     		প্রতিবাদী
                     	</slot>
                     	<slot v-if="summonType==3">
                     		স্বাক্ষী
                     	</slot>
                     </p> 
                     <span> 
                     	<slot v-if="summonType==1">
                     		<slot v-for="applicantInfo in applicationDetails.applicant_infos">
                     			{{applicantInfo.name}}-{{applicantInfo.phone |banglaNumber}},
                     		</slot>
                     	</slot>
                     	<slot v-if="summonType==2">
                     		<slot v-for="oppositorInfo in applicationDetails.oppositor_infos">
                     			{{oppositorInfo.name}}-{{oppositorInfo.phone |banglaNumber}}
                     		</slot>
                     	</slot>
                     	<slot v-if="summonType==3">
                     		<slot v-for="witnessInfo in applicationDetails.witness_infos">
                     			{{witnessInfo.name}}-{{witnessInfo.phone |banglaNumber}}
                     		</slot>
                     	</slot>
                     </span>
                     <b-row cols="1" cols-sm="3" class="justify-content-md-center" >
                        <b-col col >
                            <span > যেহেতু </span>  
                            <span class="h6">{{applicationDetails.caseType}}</span>
                        </b-col>
                        <b-col col >
                            <span>এর </span>  
                            <span class="h6">{{applicationDetails.caseTitle}}</span>
                        </b-col>
                        <b-col col >
                            <span>সংক্রান্ত অভিযোগ/দাবী সম্পর্কে তাহার আবেদনপত্রের জবাব দেওয়ার</span>
                        </b-col>

                     </b-row> <br>
                    <b-row cols="1" cols-sm="6" >
                        <b-col col lg="6">
                            <span>জন্য আপনার উপস্তিতি প্রয়োজন; সেইহেতু, এতদ্বারা আপনাকে</span>
                        </b-col>
                        <b-col col lg="3">
                        	<input type="date" name="attendDate" class="date" v-model="attendDate">
                            <!-- <b-form-datepicker id="datepicker-valid" :state="true" v-model="attendDate" class="date"></b-form-datepicker> -->
                            <span>তারিখ </span> 
                        </b-col>
                        <b-col col lg="2">
                        	<input type="time" class="time" name="attendTime" v-model="attendTime">
                            <!-- <b-form-timepicker id="timepicker-valid" :state="true" v-model="attendTime" class="time" ></b-form-timepicker> -->
                            <span>টায় </span>
                        </b-col>
                    </b-row> 
                     <b-row cols="1" cols-sm="1" >
                        <b-col>
                            <span>সময় আমার নিকট হাজির হইতে নিদেশ দেওয়া গেল।</span>
                        </b-col>
                    </b-row> <br>
                    <b-row class="text-center">
                        <b-col cols="12">
                        	<slot v-if="$store.state.userInfo.permissions.includes(8)">
                            	<button type="button" class="btn btn-success " @click="sendSummon(applicationDetails.id)"> এসএমএস প্রেরন করুন </button>
                            </slot>
                        </b-col>
                    </b-row>
        </b-modal>


       <!-- Modal print summon-->
        <b-modal id="modal-print" title="ফরম-১" size="xl" margin="center">
        
             <!-- select option -->
                <b-row class="text-center">
                        <b-col cols="12">
                            <p class="align-center">ফরম-১</p>
                        </b-col>
                </b-row>
                <b-row class="text-center">
                        <b-col cols="12">
                            <p class="align-middle">[বিধি ৩ দ্রষ্টব্য]</p>
                        </b-col>
                </b-row>
              
                
            <br><br>
             <!-- crime place -->
             <div class="crime-place">
                    <label for=""><strong>বিরোধের স্থান:</strong></label> <br> <br>
                    <b-row cols="1" cols-sm="4" class="justify-content-md-center" >
                            <b-col>
                                <div class="division">
                                    <div class="label">বিভাগ</div>
                                    <slot v-if="summonDetails.case_info!=null">
	                                    <slot v-if="summonDetails.case_info.division_info!=null">
	                                    	<span class="form-control">{{summonDetails.case_info.division_info.bn_name}}</span>
	                                    </slot>
	                                </slot>
                                </div>
                            </b-col>
                            <b-col>
                                <div class="district">
                                    <div class="label">জেলা</div>
                                    <slot v-if="summonDetails.case_info!=null">
	                                    <slot v-if="summonDetails.case_info.district_info!=null">
	                                    	<span class="form-control">{{summonDetails.case_info.district_info.bn_name}}</span>
	                                    </slot>
	                                </slot>
                                </div>
                            </b-col>
                            <b-col>
                                <div class="sub-district">
                                    <div class="label">উপজেলা</div>
                                    <slot v-if="summonDetails.case_info!=null">
	                                    <slot v-if="summonDetails.case_info.upazila_info!=null">
	                                    	<span class="form-control">{{summonDetails.case_info.upazila_info.bn_name}}</span>
	                                    </slot>
	                                </slot>
                                </div>
                            </b-col>
                            <b-col>
                                <div class="union">
                                    <div class="label">ইউনিয়ন</div>
                                    <slot v-if="summonDetails.case_info!=null">
	                                    <slot v-if="summonDetails.case_info.union_info!=null">
	                                    	<span class="form-control">{{summonDetails.case_info.union_info.bn_name}}</span>
	                                    </slot>
	                                </slot>
                                </div>
                            </b-col>
                        </b-row>
                </div>
                 <!-- applicants info -->
                 <br> 
                 <p> বরাবর </p> 
                 <p>
                 	<slot v-if="summonDetails.type==1">
                 		আবেদনকারী
                 	</slot>
                 	<slot v-if="summonDetails.type==2">
                 		প্রতিবাদী
                 	</slot>
                 	<slot v-if="summonDetails.type==3">
                 		স্বাক্ষী
                 	</slot>
                 </p>
                 <span> 
                 	<slot v-if="summonDetails.type==1">
                 		<slot v-if="summonDetails.applicant_info!=null">
                 			{{summonDetails.applicant_info.name}}-{{summonDetails.applicant_info.phone |banglaNumber}},
                 		</slot>
                 	</slot>
                 	<slot v-if="summonDetails.type==2">
                 		<slot v-if="summonDetails.oppositor_info!=null">
                 			{{summonDetails.oppositor_info.name}}-{{summonDetails.oppositor_info.phone |banglaNumber}}
                 		</slot>
                 	</slot>
                 	<slot v-if="summonDetails.type==3">
                 		<slot v-if="summonDetails.witness_info!=null">
                 			{{summonDetails.witness_info.name}}-{{summonDetails.witness_info.phone |banglaNumber}}
                 		</slot>
                 	</slot>
                 </span>

                  <br> <br>
                 <b-row cols="1" cols-sm="3" class="justify-content-md-center" >
                    <b-col col lg="3">
                        <span> যেহেতু   </span> 
                        <span> 
                            <slot v-if="summonDetails.case_info!=null">
                            	{{summonDetails.case_info.caseType}}
                            </slot>
                        </span>
                    </b-col>
                    <b-col col lg="2">
                        <span>এর</span> 
                        <span> 
                            <slot v-if="summonDetails.case_info!=null">
                            	{{summonDetails.case_info.caseTitle}}
                            </slot>
                        </span>
                    </b-col>
                    <b-col col lg="7"  >
                        <span> সংক্রান্ত অভিযোগ/দাবী সম্পর্কে তাহার আবেদনপত্রের জবাব দেওয়ার</span>
                    </b-col>

                 </b-row> <br>
                <b-row cols="1" cols-sm="6" >
                    <b-col col lg="6">
                        <span> জন্য আপনার উপস্তিতি প্রয়োজন; সেইহেতু, এতদ্বারা আপনাকে</span>
                    </b-col>
                    <b-col col lg="4">
                        <!-- <b-form-datepicker id="datepicker-valid" :state="true" class="date"></b-form-datepicker> -->
                        {{summonDetails.attendDate | formatDateBd}}
                        <span> তারিখ </span> 
                    </b-col>
                    <b-col col lg="2">
                        <!-- <b-form-timepicker id="timepicker-valid" :state="true" class="time" ></b-form-timepicker> -->
                        {{summonDetails.attendDate | formatTimeBd}}
                        <span> টায় </span>
                    </b-col>
                </b-row> 
                 <b-row cols="1" cols-sm="1" >
                    <b-col>
                        <span> সময় আমার নিকট হাজির হইতে নিদেশ দেওয়া গেল।</span>
                    </b-col>
                </b-row> <br> <br> <br> <br> <br> <br> <br>
                <b-row cols="1" cols-sm="2" class="text-center"> 
                    <b-col > 
                        <div class="underline"> </div> <br>
                        <p>তারিখ: {{currentDate() | formatDateBd}} </p>
                        <p>সীলমোহর</p>
                    </b-col>
                    <b-col> 
                        <div class="underline"> </div> <br>
                        <p>গ্রাম আদালত/ইউনিয়ন পরিষদ</p>
                        <p>এর চেয়ারম্যানের স্বাক্ষর</p>
                    </b-col>
                    
                    
                </b-row>
                <div class="printfile">
                	<slot v-if="$store.state.userInfo.permissions.includes(10)">
                		<a href="#" @click="generateReport()"> <icon name="print" size="20px"/></a>
                	</slot>
                </div>
        </b-modal>
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
            <section slot="pdf-content">
                <!-- PDF Content Here -->
                   <b-row class="text-center">
                        <b-col cols="12">
                            <p class="align-center">ফরম-১</p>
                        </b-col>
                </b-row>
                <b-row class="text-center">
                        <b-col cols="12">
                            <p class="align-middle">[বিধি ৩ দ্রষ্টব্য]</p>
                        </b-col>
                </b-row>
                
            <br><br>
             <!-- crime place -->
             <div class="crime-place">
                    <label for=""><strong>বিরোধের স্থান:</strong></label> <br> <br>
                    <b-row cols="1" cols-sm="4" class="justify-content-md-center" >
                            <b-col>
                                <div class="division">
                                    <div class="label">বিভাগ</div>
                                    <slot v-if="summonDetails.case_info!=null">
	                                    <slot v-if="summonDetails.case_info.division_info!=null">
	                                    	<span class="form-control">{{summonDetails.case_info.division_info.bn_name}}</span>
	                                    </slot>
	                                </slot>
                                </div>
                            </b-col>
                            <b-col>
                                <div class="district">
                                    <div class="label">জেলা</div>
                                    <slot v-if="summonDetails.case_info!=null">
	                                    <slot v-if="summonDetails.case_info.district_info!=null">
	                                    	<span class="form-control">{{summonDetails.case_info.district_info.bn_name}}</span>
	                                    </slot>
	                                </slot>
                                </div>
                            </b-col>
                            <b-col>
                                <div class="sub-district">
                                    <div class="label">উপজেলা</div>
                                    <slot v-if="summonDetails.case_info!=null">
	                                    <slot v-if="summonDetails.case_info.upazila_info!=null">
	                                    	<span class="form-control">{{summonDetails.case_info.upazila_info.bn_name}}</span>
	                                    </slot>
	                                </slot>
                                </div>
                            </b-col>
                            <b-col>
                                <div class="union">
                                    <div class="label">ইউনিয়ন</div>
                                    <slot v-if="summonDetails.case_info!=null">
	                                    <slot v-if="summonDetails.case_info.union_info!=null">
	                                    	<span class="form-control">{{summonDetails.case_info.union_info.bn_name}}</span>
	                                    </slot>
	                                </slot>
                                </div>
                            </b-col>
                        </b-row>
                </div>
                 <!-- applicants info -->
                 <br> 
                 <p> বরাবর </p> 
                 <p>
                 	<slot v-if="summonDetails.type==1">
                 		আবেদনকারী
                 	</slot>
                 	<slot v-if="summonDetails.type==2">
                 		প্রতিবাদী
                 	</slot>
                 	<slot v-if="summonDetails.type==3">
                 		স্বাক্ষী
                 	</slot>
                 </p>
                 <span> 
                 	<slot v-if="summonDetails.type==1">
                 		<slot v-if="summonDetails.applicant_info!=null">
                 			{{summonDetails.applicant_info.name}}-{{summonDetails.applicant_info.phone |banglaNumber}},
                 		</slot>
                 	</slot>
                 	<slot v-if="summonDetails.type==2">
                 		<slot v-if="summonDetails.oppositor_info!=null">
                 			{{summonDetails.oppositor_info.name}}-{{summonDetails.oppositor_info.phone |banglaNumber}}
                 		</slot>
                 	</slot>
                 	<slot v-if="summonDetails.type==3">
                 		<slot v-if="summonDetails.witness_info!=null">
                 			{{summonDetails.witness_info.name}}-{{summonDetails.witness_info.phone |banglaNumber}}
                 		</slot>
                 	</slot>
                 </span>

                  <br> <br>
                 <b-row cols="1" cols-sm="3" class="justify-content-md-center" >
                    <b-col col lg="3">
                        <span> যেহেতু   </span> 
                        <span> 
                            <slot v-if="summonDetails.case_info!=null">
                            	{{summonDetails.case_info.caseType}}
                            </slot>
                        </span>
                    </b-col>
                    <b-col col lg="2">
                        <span>এর</span> 
                        <span> 
                            <slot v-if="summonDetails.case_info!=null">
                            	{{summonDetails.case_info.caseTitle}}
                            </slot>
                        </span>
                    </b-col>
                    <b-col col lg="7"  >
                        <span> সংক্রান্ত অভিযোগ/দাবী সম্পর্কে তাহার আবেদনপত্রের জবাব দেওয়ার</span>
                    </b-col>

                 </b-row> <br>
                <b-row cols="1" cols-sm="6" >
                    <b-col col lg="6">
                        <span> জন্য আপনার উপস্তিতি প্রয়োজন; সেইহেতু, এতদ্বারা আপনাকে</span>
                    </b-col>
                    <b-col col lg="4">
                        
                        {{summonDetails.attendDate | formatDateBd}}
                        <span> তারিখ </span> 
                    </b-col>
                    <b-col col lg="2">
                        
                        {{summonDetails.attendDate | formatTimeBd}}
                        <span> টায় </span>
                    </b-col>
                </b-row> 
                 <b-row cols="1" cols-sm="1" >
                    <b-col>
                        <span> সময় আমার নিকট হাজির হইতে নিদেশ দেওয়া গেল।</span>
                    </b-col>
                </b-row> <br> <br> <br> <br> <br> <br> <br>
                <b-row cols="1" cols-sm="2" class="text-center"> 
                    <b-col > 
                        <div class="underline"> </div> <br>
                        <p>তারিখ: {{currentDate() | formatDateBd}} </p>
                        <p>সীলমোহর</p>
                    </b-col>
                    <b-col> 
                        <div class="underline"> </div> <br>
                        <p>গ্রাম আদালত/ইউনিয়ন পরিষদ</p>
                        <p>এর চেয়ারম্যানের স্বাক্ষর</p>
                    </b-col>
                    
                    
                </b-row>
                <!-- PDF Content Here --> 
            </section>
    </vue-html2pdf>
	</div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'
export default{
    components: {
        VueHtml2pdf
    },
   data(){
	   	return{
	   		caseList:[],
	   		summonList:[],
            msgFlag:false,
            errMsgFlag:false,
            msg:'',
            errMsg:'',
            casePageNo:1,
            summonPageNo:1,
            summonNumOfData:10,
            caseNumOfData:5,
            caseNo:'',
            caseLastPage:1,
            summonLastPage:1,
            searchKey:'',
            applicationDetails:[],
            summonDetails:[],
            summonType:1,
            attendDate:'',
            attendTime:'',
            
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
	   	// this.getCaseList();
	   	// this.getSummonList(); 
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
	    this.getCaseList();
	   	this.getSummonList(); 
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
   	async printSummon(){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token
                      }   
                  };
            
            let url="staff/print/summon";
            let formData=new FormData();
            formData.append("dataId",this.summonDetails.id);


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
        this.getSummonList();
   	},
   	async beforeDownload(){},
    onProgress(){},
   	generateReport(){
   		this.printSummon();
   		this.$refs.html2Pdf.generatePdf();
   	},
   	async getSummonDetails(dataId){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token
                      }   
                  };
            
            let url="staff/get/summon/details?dataId="+dataId;

            await this.$http.get(url,config)
             .then(response=>{
                if(response.data.msgFlag==true){
                    this.summonDetails=response.data.dataInfo;
                    this.attendDate=this.summonDetails.attendDate;
                    this.attendTime=this.summonDetails.attendTime;
                }
                if(response.data.errMsgFlag==true)
                    this.$toaster.warning(response.data.errMsg);
             })
             .catch(error=>{console.dir(error)})
             .finally();
    },
    async sendSummon(dataId){
    	if(this.attendDate!=null && this.attendTime!=null){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token
                      }   
                  };
            
            let url="staff/send/summon";
            let formData=new FormData();
            formData.append("caseId",dataId);
            formData.append("attendDate",this.attendDate);
            formData.append("attendTime",this.attendTime);
            formData.append("summonType",this.summonType);

            await this.$http.post(url,formData,config)
             .then(response=>{
                if(response.data.msgFlag==true){
                    this.$toaster.success(response.data.msg);
                    this.getApplicationDetails(dataId);
                    this.getCaseList();
                    this.attendDate=null;
                    this.attendTime=null;
                    this.getSummonList();
                }
                if(response.data.errMsgFlag==true)
                    this.$toaster.warning(response.data.errMsg);
             })
             .catch(error=>{console.dir(error)})
             .finally();
        }
        else{
           if(this.attendDate==null)
            this.$toaster.warning("দয়াকরে মামলার হাজিরা তারিখ ধরণ নির্বাচন করুন।");
        if(this.attendTime==null)
            this.$toaster.warning("দয়াকরে মামলার হাজিরা সময় নির্বাচন করুন।"); 
        }
    },
    async getApplicationDetails(dataId){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token
                      }   
                  };
            
            let url="staff/get/applcation/details?dataId="+dataId;

            await this.$http.get(url,config)
             .then(response=>{
                if(response.data.msgFlag==true){
                    this.applicationDetails=response.data.dataInfo;
                }
                if(response.data.errMsgFlag==true)
                    this.$toaster.warning(response.data.errMsg);
             })
             .catch(error=>{console.dir(error)})
             .finally();
        },
   	async getSummonList(){
   		let token=window.localStorage.getItem("token");
        let config = {
                   headers: {
                      'Authorization': 'Bearer '+token
                  }   
              };
        
        let url="staff/get/summon/list?page="+this.summonPageNo+"&numOfData="+this.summonNumOfData+"&caseId="+this.caseNo+"&unionId="+this.union+"&upazilaId="+this.upazila;

        await this.$http.get(url,config)
         .then(response=>{
            this.summonList=response.data;
            this.summonLastPage=this.summonList.last_page;
         })
         .catch(error=>{console.dir(error)})
         .finally();
   	},
   	async getCaseList(){
   		let token=window.localStorage.getItem("token");
        let config = {
                   headers: {
                      'Authorization': 'Bearer '+token
                  }   
              };
        
        let url="staff/get/case/list?page="+this.casePageNo+"&numOfData="+this.caseNumOfData+"&searchKey="+this.searchKey+"&unionId="+this.union+"&upazilaId="+this.upazila;

        await this.$http.get(url,config)
         .then(response=>{
            this.caseList=response.data;
            this.caseLastPage=this.caseList.last_page;
         })
         .catch(error=>{console.dir(error)})
         .finally();
   	},
   	caseByPaginate(pageIndex){
         this.casePageNo=pageIndex;
         this.getCaseList();
     	},
 	summonByPaginate(pageIndex){
     this.summonPageNo=pageIndex;
     this.getSummonList();
 	},
 	 currentDate() {
      return new Date();
      // const current = new Date();
      // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      // return date;
    }
   }
} 
</script>

<style lang="scss" scoped>



</style>