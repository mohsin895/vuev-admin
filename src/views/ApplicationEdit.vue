<template>
	<div class="card">
		<div class="card-body">
				
	 <div class="create-application">
        <form @submit.prevent="goNextPage()">
                <div class="page-one" v-if="currentPage === 1">
                <h3>আবেদন ফরম-১</h3>
                <!-- Applicant form -->
                <div class="applicants">
                    <div 
                    class="applicant-form"
                    v-for="(applicant,index) in form.applicants"
                    :key="index"
                    >
                        <h5 class="info-title">আবেদনকারীর তথ্য- {{(index + 1).toLocaleString('bn-bd')}}</h5>
                        <b-row cols="1" cols-lg="2">
                            <b-col>
                                <div class="applicant">
                                    <div class="mb-3">
                                        <label :for="'name'+(index+1)" class="form-label"><strong>আবেদনকারীর নাম:*</strong></label>
                                        <input type="text" v-model="applicant.name" class="form-control" :id="'name'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'f_name'+(index+1)" class="form-label"><strong>আবেদনকারীর পিতার নাম:*</strong></label>
                                        <input type="text" v-model="applicant.pName" class="form-control" :id="'f_name'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'m_name'+(index+1)" class="form-label"><strong>আবেদনকারীর মাতার নাম:*</strong></label>
                                        <input type="text" v-model="applicant.mName" class="form-control" :id="'m_name'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'s_name'+(index+1)" class="form-label"><strong>আবেদনকারীর স্বামী / স্ত্রীর নাম:*</strong></label>
                                        <input type="text" v-model="applicant.sName" class="form-control" :id="'s_name'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'a_nid'+(index+1)" class="form-label"><strong>আবেদনকারীর জাতীয় পরিচয় পত্র নং:*</strong></label>
                                        <input type="text" v-model="applicant.aNID" class="form-control" :id="'a_nid'+(index+1)" maxlength="17"  required >
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'a_mobile'+(index+1)" class="form-label"><strong>আবেদনকারীর মোবাইল নং:*</strong></label>
                                        <input type="text" v-model="applicant.aMobile" class="form-control" :id="'a_mobile'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'a_gender'+(index+1)" class="form-label"><strong>আবেদনকারীর লিঙ্গ:*</strong></label>
                                        <select class="form-control" v-model="applicant.aGender" :id="'a_gender'+(index+1)">
                                            <option value="1">পুরুষ</option>
                                            <option value="2">মহিলা</option>
                                            <option value="3">হিজরা</option>
                                        </select>
                                    </div>
                                </div>
                            </b-col>
                            <b-col v-if="index==0">
                                <div class="image-and-add-more-part">
                                    <div class="image-showing-div">
                                        <div class="default">
                                            <img 
                                            :id="'showImg'+ (index + 1)" 
                                            :src="applicant.aImage" 
                                            alt="default-img"
                                            >
                                        </div>
                                    </div>
                                    <label :for="'file'+(index+1)">
                                        <div class="upload-file">Choose File..</div>
                                        <input 
                                        class="hide"
                                        :id="'file'+(index+1)" 
                                        @change="setImgFile($event, index, 'aImage')" 
                                        type="file"
                                        >
                                    </label>
                                    <div class="add-more">
                                        <p> আরো আবেদনকারী যোগ করুন : </p>
                                        <div class="add-icon" @click="addApplicant('applicant')">
                                            <b-icon icon="plus" scale="2"/>
                                        </div>
                                    </div>
                                </div>
                            </b-col>

                            <b-col v-else>
                                <div class="image-and-add-more-part">
                                    <div class="image-showing-div">
                                        
                                    </div>
                                    <label >
                                        
                                    </label>
                                    <div class="add-more" >
                                        <p>  আবেদনকারী বাতিল করুন : </p>
                                        <div class="add-icon" style="color:#fff; background-color:red;"  @click="removeApplicant(index)">
                                            <b-icon icon="x" scale="2"/>
                                        </div>
                                    </div>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                </div>
                <!-- Opponent form -->
                <div class="opponents adalot-margin-top">
                    <div 
                    class="opponent-form"
                    v-for="(opponent,index) in form.opponents"
                    :key="index"
                    >
                        <h5 class="info-title">প্রতিবাদীর তথ্য- {{(index + 1).toLocaleString('bn-bd')}}</h5>
                        <b-row cols="1" cols-lg="2">
                            <b-col>
                                <div class="opponent">
                                    <div class="mb-3">
                                        <label :for="'o_name'+(index+1)" class="form-label"><strong>প্রতিবাদীর নাম:*</strong></label>
                                        <input type="text" v-model="opponent.name" class="form-control" :id="'o_name'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'o_f_name'+(index+1)" class="form-label"><strong>প্রতিবাদীর পিতার নাম:*</strong></label>
                                        <input type="text" v-model="opponent.pName" class="form-control" :id="'o_f_name'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'o_m_name'+(index+1)" class="form-label"><strong>প্রতিবাদীর মাতার নাম:*</strong></label>
                                        <input type="text" v-model="opponent.mName" class="form-control" :id="'o_m_name'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'o_s_name'+(index+1)" class="form-label"><strong>প্রতিবাদীর স্বামী / স্ত্রীর নাম:*</strong></label>
                                        <input type="text" v-model="opponent.sName" class="form-control" :id="'o_s_name'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'o_nid'+(index+1)" class="form-label"><strong>প্রতিবাদীর জাতীয় পরিচয় পত্র নং:*</strong></label>
                                        <input type="text" v-model="opponent.oNID" class="form-control" :id="'o_nid'+(index+1)" maxlength="17" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'o_mobile'+(index+1)" class="form-label"><strong>প্রতিবাদীর মোবাইল নং:*</strong></label>
                                        <input type="text" v-model="opponent.oMobile" class="form-control" :id="'o_mobile'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'o_gender'+(index+1)" class="form-label"><strong>প্রতিবাদীর লিঙ্গ:*</strong></label>
                                        <select class="form-control" v-model="opponent.oGender" :id="'o_gender'+(index+1)">
                                            <option value="1">পুরুষ</option>
                                            <option value="2">মহিলা</option>
                                            <option value="3">হিজরা</option>
                                        </select>
                                    </div>
                                </div>
                            </b-col>
                            <b-col v-if="index==0">
                                <div class="image-and-add-more-part">
                                    <div class="add-more add-more-btn-without-image-part">
                                        <p> আরো প্রতিবাদী যোগ করুন : </p>
                                        <div class="add-icon" @click="addApplicant('opponent')">
                                            <b-icon icon="plus" scale="2"/>
                                        </div>
                                    </div>
                                </div>
                            </b-col>

                            <b-col v-else>
                                <div class="image-and-add-more-part">
                                    <div class="image-showing-div">
                                        
                                    </div>
                                    <label >
                                        
                                    </label>
                                    <div class="add-more" >
                                        <p>  প্রতিবাদী বাতিল করুন : </p>
                                        <div class="add-icon" style="color:#fff; background-color:red;"  @click="removeOppositor(index)">
                                            <b-icon icon="x" scale="2"/>
                                        </div>
                                    </div>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                </div>
                <div class="form-check info-title">
                    <input class="form-check-input" type="checkbox" v-model="witnessForm" id="gridCheck">
                    <label class="form-check-label" for="gridCheck">
                        প্রয়োজনের ত্বাগিদে স্বাক্ষী যোগ করুন
                    </label>
                </div>
                <!-- Witness form -->
                <div class="witnesses" v-if="witnessForm">
                    <div 
                    class="witness-form"
                    v-for="(witness,index) in form.witnesses"
                    :key="index"
                    >
                        <h5 class="info-title">স্বাক্ষীর তথ্য- {{(index + 1).toLocaleString('bn-bd')}}</h5>
                        <b-row cols="1" cols-lg="2">
                            <b-col>
                                <div class="witness">
                                    <div class="mb-3">
                                        <label :for="'w_name'+(index+1)" class="form-label"><strong>স্বাক্ষীর নাম:*</strong></label>
                                        <input type="text" v-model="witness.name" class="form-control" :id="'w_name'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'w_f_name'+(index+1)" class="form-label"><strong>স্বাক্ষীর পিতার নাম:*</strong></label>
                                        <input type="text" v-model="witness.pName" class="form-control" :id="'w_f_name'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'w_m_name'+(index+1)" class="form-label"><strong>স্বাক্ষীর মাতার নাম:*</strong></label>
                                        <input type="text" v-model="witness.mName" class="form-control" :id="'w_m_name'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'w_s_name'+(index+1)" class="form-label"><strong>স্বাক্ষীর স্বামী / স্ত্রীর নাম:*</strong></label>
                                        <input type="text" v-model="witness.sName" class="form-control" :id="'w_s_name'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'w_nid'+(index+1)" class="form-label"><strong>স্বাক্ষীর জাতীয় পরিচয় পত্র নং:*</strong></label>
                                        <input type="text" v-model="witness.wNID" class="form-control" :id="'w_nid'+(index+1)" maxlength="17" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'w_mobile'+(index+1)" class="form-label"><strong>স্বাক্ষীর মোবাইল নং:*</strong></label>
                                        <input type="text" v-model="witness.wMobile" class="form-control" :id="'w_mobile'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'w_gender'+(index+1)" class="form-label"><strong>স্বাক্ষীর লিঙ্গ:*</strong></label>
                                        <select class="form-control" v-model="witness.wGender" :id="'w_gender'+(index+1)">
                                            <option value="1">পুরুষ</option>
                                            <option value="2">মহিলা</option>
                                            <option value="3">হিজরা</option>
                                        </select>
                                    </div>
                                </div>
                            </b-col>
                            <b-col v-if="index==0">
                                <div class="image-and-add-more-part">
                                    <div class="add-more add-more-btn-without-image-part">
                                        <p> আরো স্বাক্ষী যোগ করুন : </p>
                                        <div class="add-icon" @click="addApplicant('witness')">
                                            <b-icon icon="plus" scale="2"/>
                                        </div>
                                    </div>
                                </div>
                            </b-col>

                            <b-col v-else>
                                <div class="image-and-add-more-part">
                                    <div class="add-more add-more-btn-without-image-part">
                                        <p>  স্বাক্ষী বাতিল করুন : </p>
                                        <div class="add-icon" style="color:#fff; background-color:red;"  @click="removeWitnesses(index)">
                                            <b-icon icon="x" scale="2"/>
                                        </div>
                                    </div>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                </div>
                <!-- crime content -->
                <div class="crime-content adalot-margin-top">
                    <h5 class="info-title">বিরোধের বিষয় বস্তু :</h5>
                    <!-- crime place -->
                    <div class="crime-place">
                        <label for=""><strong>বিরোধের স্থান:</strong></label>
                        <b-row cols="1" cols-sm="5">
                            <b-col>
                                <div class="division">
                                    <div class="label">বিভাগ</div>
                                    <v-select :options="divisionList" :reduce="divisionList => divisionList.id" label="bn_name" v-model="form.division" @input="filterDistrictList">
                                        <template v-slot:option="option">
                                            {{option.bn_name}}
                                        </template>
                                     </v-select>
                                </div>
                            </b-col>
                            <b-col>
                                <div class="district">
                                    <div class="label">জেলা</div>
                                    <v-select :options="districtList" :reduce="districtList => districtList.id" label="bn_name" v-model="form.district" @input="filterUpazilaList">
                                        <template v-slot:option="option">
                                            {{option.bn_name}}
                                        </template>
                                     </v-select>
                                </div>
                            </b-col>
                            <b-col>
                                <div class="sub-district">
                                    <div class="label">উপজেলা</div>
                                    <v-select :options="upazilaList" :reduce="upazilaList => upazilaList.id" label="bn_name" v-model="form.upazila" @input="filterUnionList">
                                        <template v-slot:option="option">
                                            {{option.bn_name}}
                                        </template>
                                     </v-select>
                                </div>
                            </b-col>
                            <b-col>
                                <div class="union">
                                    <div class="label">ইউনিয়ন</div>
                                    <v-select :options="unionList" :reduce="unionList => unionList.id" label="bn_name" v-model="form.union" @input="getMemberListByUnion" >
                                        <template v-slot:option="option">
                                            {{option.bn_name}}
                                        </template>
                                     </v-select>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                    <!-- crime title -->
                    <div class="crimte-title adalot-margin-top">
                        <b-row>
                            <b-col lg="8">
                                <div class="mb-3">
                                    <label for="crimeTitle" class="form-label"><strong>বিরোধের শিরোনাম:*</strong></label>
                                    <input type="text" v-model="form.crimeTitle" class="form-control" id="crimeTitle" required>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                    <!-- crime description -->
                    <div class="crime-details">
                        <label for=""><strong>বিরোধের বিবরন:*</strong></label>
                        <TextEditor class="editor-background" v-model="form.crimeDescription"/>
                    </div>
                    <!-- provement document images  -->
                    <div class="provement-images adalot-margin-top">
                        <label for=""><strong>প্রমাণ সমুহের সংযুক্তি নথি:*</strong></label>
                        <label for="provementImage">
                            <input 
                            type="file" 
                            class="hide" 
                            id="provementImage"
                            @change="addProvementImages($event)"
                            >
                            <div class="add-image-btn">
                                <b-icon icon="plus" scale="2"/>
                            </div>
                        </label>
                        <div 
                        class="default-provement-images"
                        v-if="!provementImagesUrl.length"
                        >

                            <img
                            src="@/assets/images/default.png" 
                            alt="default-img"
                            >

                            <!-- <b-icon style="color:#fff;background-color:red;margin-left: -35px;font-size: 18px;margin-top: 16px;cursor: pointer;" icon="x" scale="2" v-on:onclick="removeEvidence(index)"/> -->
                        </div>
                        <div 
                        class="provent-images"
                        v-if="provementImagesUrl.length"
                        >
                        <slot v-for="(image, index) in provementImagesUrl">
                            <img
                            
                            :key="index"
                            :src="image" 
                            alt="default-img"
                            >
                            <a href="#" @click="removeEvidence(index); return false;">
                                <b-icon style="color:#fff;background-color:red;margin-left: -35px;font-size: 18px;margin-top: 16px;cursor: pointer;" icon="x" scale="2" />
                            </a>
                        </slot>
                        </div>
                    </div>
                    <!-- wanted salve -->
                    <div class="salve">
                        <div class="mb-3">
                            <label for="salve" class="form-label"><strong>আবেদনকারীর প্রত্যাশিত প্রতিকার:*</strong></label>
                            <textarea class="form-control" v-model="form.wantedSalve" id="salve" rows="3" required></textarea>
                        </div>
                    </div>
                </div>
                <div class="button-group">
                    <button class="btn-global-success btn-sm btn-primary">পরবতীতে যান</button>
                </div>
            </div>
        </form>
        <form @submit.prevent>
            <!-- <div class="page-two" > -->
            <div class="page-two" v-if="currentPage === 2">
                <h3>আবেদনকারীর মনোনয়ন ফরম -১</h3>
                <p>সবিনয়ে আপনার অবগতির জন্য জানাইতেছি যে, <br>
                আবেদনকারী <strong class="h5">{{form.applicants[0].name}}</strong> বনাম প্রতিবাদী <strong class="h5">{{form.opponents[0].name}}</strong> ধরন
                <strong class="h5">{{form.crimeTitle}}</strong>
                সংক্রান্ত বিরোধের প্রেক্ষিতে গঠিতব্য গ্রাম আদালতে আমার পক্ষে নিম্নেবণিত ব্যক্তিগনকে সদস্য হিসেবে 
                মনোনীত করিলাম
                </p>
                <!-- <b-row>
                    <b-col class="text-center h6">
                        <input type="checkbox" v-model="interestedToAddNomminator" id="interestedToAddNomminator"> 
                        <label for="interestedToAddNomminator">গ্রাম আদালতের সদস্য মনোনয়ন করুন।</label>
                    </b-col>
                </b-row> -->
                <b-row cols="1" cols-lg="2" v-if="interestedToAddNomminator">
                    <b-col>
                        <h6>ইউনিয়ন পরিষদের সদস্য</h6>
                        <div class="mb-3">
                            <label for="member_name" class="form-label"><strong>নাম:*</strong></label>
                            <!-- <input type="text" v-model="form.unionMember.name" class="form-control" id="member_name" required> -->
                         <v-select :options="memberList" :reduce="memberList => memberList.id" label="name" v-model="form.unionMember.id" @input="setMemberSelected">
                            <template v-slot:option="option">
                                {{option.name}}
                            </template>
                         </v-select>
                         <input type="hidden" v-model="form.unionMember.name">
                        </div>
                        <div class="mb-3">
                            <label for="m_g_name" class="form-label"><strong>পিতা/স্বামী:*</strong></label>
                            <input type="text" v-model="form.unionMember.g_name" class="form-control" id="m_g_name" required>
                        </div>
                        <div class="mb-3">
                            <label for="m_village" class="form-label"><strong>গ্রাম:*</strong></label>
                            <input type="text" v-model="form.unionMember.village" class="form-control" id="m_village" required>
                        </div>
                        <div class="mb-3">
                            <label for="m_ward" class="form-label"><strong>ওয়াড নং:*</strong></label>
                            <!-- <input type="text" v-model="form.unionMember.wardNo" class="form-control" id="m_ward" required> -->
                            <select class="form-control" required v-model="form.unionMember.wardNo">
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
                            <input type="text" v-model="form.unionMember.post" class="form-control" id="m_post" required>
                        </div>
                        <div class="mb-3">
                            <label for="m_union" class="form-label"><strong>ইউনিয়ন:*</strong></label>
                            <input type="text" v-model="form.unionMember.union" class="form-control" id="m_union" required>
                        </div>
                        <div class="mb-3">
                            <label for="m_district" class="form-label"><strong>জেলা:*</strong></label>
                            <input type="text" v-model="form.unionMember.district" class="form-control" id="m_district" required>
                        </div>
                    </b-col>
                    <b-col>
                        <h6>স্থানীয় ব্যক্তি</h6>
                        <div class="mb-3">
                            <label for="local_member_name" class="form-label"><strong>নাম:*</strong></label>
                            <input type="text" v-model="form.localPerson.name" class="form-control" id="local_member_name" required>
                        </div>
                        <div class="mb-3">
                            <label for="local_m_g_name" class="form-label"><strong>পিতা/স্বামী:*</strong></label>
                            <input type="text" v-model="form.localPerson.g_name" class="form-control" id="local_m_g_name" required>
                        </div>
                        <div class="mb-3">
                            <label for="local_m_village" class="form-label"><strong>গ্রাম:*</strong></label>
                            <input type="text" v-model="form.localPerson.village" class="form-control" id="local_m_village" required>
                        </div>
                        <div class="mb-3">
                            <label for="local_m_ward" class="form-label"><strong>ওয়াড নং:*</strong></label>
                            <!-- <input type="text" v-model="form.localPerson.wardNo" class="form-control" id="local_m_ward" required> -->
                            <select class="form-control" required v-model="form.localPerson.wardNo">
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
                            <input type="text" v-model="form.localPerson.post" class="form-control" id="local_m_post" required>
                        </div>
                        <div class="mb-3">
                            <label for="local_m_union" class="form-label"><strong>ইউনিয়ন:*</strong></label>
                            <!-- <input type="text" v-model="form.localPerson.union" class="form-control" id="local_m_union" required> -->

                            <v-select :options="unionList" :reduce="unionList => unionList.id" label="bn_name" v-model="form.localPerson.union" >
                                <template v-slot:option="option">
                                    {{option.bn_name}}
                                </template>
                             </v-select>
                        </div>
                        <div class="mb-3">
                            <label for="local_m_district" class="form-label"><strong>জেলা:*</strong></label>
                            <!-- <input type="text" v-model="form.localPerson.district" class="form-control" id="local_m_district" required> -->
                            <v-select :options="districtList" :reduce="districtList => districtList.id" label="bn_name" v-model="form.localPerson.district" >
                            <template v-slot:option="option">
                                {{option.bn_name}}
                            </template>
                         </v-select>
                        </div>                        
                    </b-col>
                </b-row>
                <div class="button-group">
                    <a class="btn-global-danger btn-sm btn-warning" @click="backPreviousPage()">পিছনে যান</a>
                    <button class="btn-global-success btn-sm btn-primary" :disabled="countDown>0" @click="submitForm">সাবমিট করুন</button>
                </div>
            </div>
        </form>
        <!-- ovinandon application success -->
        <div class="ovinandon" v-if="currentPage === 3">
            <p>আপনার মামলা নং : <span class="text-red">{{caseId | banglaNumber}}</span></p>
            <p>
                প্রিয় আবেদনকারী,<br>
                আপনাকে <span class="text-green">অভিনন্দন </span>। আপনার আবেদনটি গ্রহন করা হয়েছে।
                আপনাকে পরবতী নিদেশনা এসএমএস এর মাধ্যমে জানিয়ে দেওয়া হবে।
            </p>
        </div>
    </div>
		</div>
	</div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
    components: {
        'TextEditor': VueEditor
    },
    data() {
        return {
            countDown:0,
            currentPage: 1,
            caseId:null,
            form: {
                applicants: [
                    // prefix 'a' means applicant
                    
                ],
                opponents: [
                    // prefix 'o' means opponent
                    
                ],
                witnesses: [
                    // prefix 'w' means witness
                    
                ],
                provementImages: [],
                place: null,
                crimeTitle: null,
                crimeDescription: null,
                wantedSalve: null,
                unionMember: {
                   
                },
                localPerson: {
                   
                },

                union:null,
                upazila:null,
                district:null,
                division:null,
            },
            
            witnessForm: false,
            provementImagesUrl: [],
            districtList:[],
            memberList:[],
            unionList:[],
            divisionList:[],
            finalDistrictList:[],
            finalMemberList:[],
            finalUnionList:[],
            finalDivisionList:[],
            finalUpazilaList:[],
            upazilaList:[],
            interestedToAddNomminator:false,
        }
        
    },
    beforeMount(){
    	// this.getCaseInfo();
        this.getDivisionList();    
    },
    mounted(){
        this.getCaseInfo();
    },
    methods: {
        getImageFile(url){
            console.log(file_get_contents(url));
            var oReq = new XMLHttpRequest();

            oReq.onload = function(e) {
            var blobData = oReq.response; // not responseText

            // JavaScript file-like object
            var image=new Blob([blobData],{ type: "image/jpeg"});
            // console.dir(image);
            return image;

            
            }
            oReq.open("GET", url, true);
            oReq.responseType = "blob";
            oReq.send();

            // var blob = new Blob([blobData], { type: "image/jpeg"});
            //  var img = new Image();
            // return img.src = "https://www.google.com/images/srpr/logo4w.png";
        // this.$http.get(url)
        //  then(res => res.blob()) // Gets the response and returns it as a blob
        //   .then(blob => {
        //         let objectURL = URL.createObjectURL(blob);
        //         // let myImage = new Image();
        //         // myImage.src = objectURL;
        //         // return myImage;
        //         return objectURL;
        //         // document.getElementById('myImg').appendChild(myImage)
        //     });
        },
    	processApplicationData(caseInfo){
            // this.form=[];
    		this.form.crimeTitle=caseInfo.caseTitle;
            this.form.crimeDescription=caseInfo.caseDetails;
            this.form.wantedSalve=caseInfo.expectation;

            this.form.division=caseInfo.divisionId;
            this.form.district=caseInfo.districtId;
            this.form.upazila=caseInfo.upazilaId;
            this.form.union=caseInfo.unionId;

            this.filterDistrictList();
            this.filterUpazilaList();
            this.filterUnionList();

            caseInfo.applicant_infos.forEach((dataInfo,index)=>{
               let data={};
                if(index==0){
               
                // const imageDisplay = document.getElementById('showImg'+ (currentIndex + 1));
                // imageDisplay.src = URL.createObjectURL(dataInfo.photo);
                 data={
                        name:dataInfo.name,
                        pName:dataInfo.fName,
                        mName:dataInfo.mName,
                        sName:dataInfo.sName,
                        aNID:dataInfo.nid,
                        aMobile:dataInfo.phone,
                        aImage:dataInfo.photo,
                        aGender:dataInfo.gender
                    };
                }
                else{
                   data={
                        name:dataInfo.name,
                        pName:dataInfo.fName,
                        mName:dataInfo.mName,
                        sName:dataInfo.sName,
                        aNID:dataInfo.nid,
                        aMobile:dataInfo.phone,
                        aGender:dataInfo.gender
                    }; 
                }
                
                this.form.applicants.push(data);
            });

            caseInfo.oppositor_infos.forEach((dataInfo,index)=>{
               let data={};
                 data={
                        name:dataInfo.name,
                        pName:dataInfo.fName,
                        mName:dataInfo.mName,
                        sName:dataInfo.sName,
                        oNID:dataInfo.nid,
                        oMobile:dataInfo.phone,
                        oGender:dataInfo.gender
                };
                
                
                this.form.opponents.push(data);
            });

            caseInfo.witness_infos.forEach((dataInfo,index)=>{
               let data={};
                 data={
                        name:dataInfo.name,
                        pName:dataInfo.fName,
                        mName:dataInfo.mName,
                        sName:dataInfo.sName,
                        wNID:dataInfo.nid,
                        wMobile:dataInfo.phone,
                        wGender:dataInfo.gender
                };    
                
                this.form.witnesses.push(data);
            });

            if(caseInfo.witness_infos.length>0)
                this.witnessForm=true;
            else
                this.witnessForm=false;

            caseInfo.evidence_infos.forEach((dataInfo,index)=>{
                this.provementImagesUrl.push(dataInfo.photo);
                this.form.provementImages.push(dataInfo.photo);
            });

            // if(caseInfo.applicant_nominators.length>0)
            //     this.interestedToAddNomminator=true;
            // else
            //     this.interestedToAddNomminator=false;

            
    	},
    	async getCaseInfo(){
    		let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token
                      }   
                  };

            let dataId=this.$route.params.dataId;
            
            let url="staff/get/applcation/details?dataId="+dataId;

            await this.$http.get(url,config)
             .then(response=>{
                if(response.data.msgFlag==true){
                    this.processApplicationData(response.data.dataInfo);
                }
                if(response.data.errMsgFlag==true)
                    this.$toaster.warning(response.data.errMsg);
             })
             .catch(error=>{})
             .finally();
    	},
        submitFormValidation(){
            let flag=true;
            this.form.applicants.forEach(dataInfo=>{
                // console.dir(dataInfo.aNID.length);
                if(dataInfo.aNID.length!=17 && dataInfo.aNID.length!=13 && dataInfo.aNID.length!=10){
                    toast.error({
                        position: 'topRight',
                        title: "বৈধ এনআইডি নম্বর লিখুন",
                    });
                    flag=false;
                    return false;
                }

            });
            this.form.opponents.forEach(dataInfo=>{
                if(dataInfo.oNID.length!=17 && dataInfo.oNID.length!=13 && dataInfo.oNID.length!=10){
                    toast.error({
                        position: 'topRight',
                        title: "বৈধ এনআইডি নম্বর লিখুন",
                    });
                    flag=false;
                    return false; 
                }

            });
        if(this.witnessForm){
                this.form.witnesses.forEach(dataInfo=>{
                    if(dataInfo.wNID.length!=17 && dataInfo.wNID.length!=13 && dataInfo.wNID.length!=10){
                        toast.error({
                            position: 'topRight',
                            title: "বৈধ এনআইডি নম্বর লিখুন",
                        });
                        flag=false;
                        return false; 
                    }
                });
            }
            this.form.applicants.forEach(dataInfo=>{
                if(/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(dataInfo.aMobile)){
                }
                else{
                    toast.error({
                        position: 'topRight',
                        title: "বৈধ ফোন নম্বর লিখুন",
                    });
                    flag=false;
                    return false; 
                }
            });
            this.form.opponents.forEach(dataInfo=>{
                if(/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(dataInfo.oMobile)){
                }
                else{
                    toast.error({
                        position: 'topRight',
                        title: "বৈধ ফোন নম্বর লিখুন",
                    });
                    flag=false;
                    return false; 
                }
            });
        if(this.witnessForm){
            this.form.witnesses.forEach(dataInfo=>{
                if(/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(dataInfo.wMobile)){
                }
                else{
                    toast.error({
                        position: 'topRight',
                        title: "বৈধ ফোন নম্বর লিখুন",
                    });
                    flag=false;
                    return false; 
                }
            });
        }

            return flag;
        },
        resetApiData(){
            this.districtList=[];
            this.upazilaList=[];
            this.unionList=[];
            this.memberList=[];
            // this.districtList=[];
        },
         countDownTimer() {
                if(this.countDown > 0) {
                  if(this.countDown%10==0)
                    toast.error({
                        position: 'topRight',
                        title: "আপনার আবেদন জমা হচ্ছে। অনুগ্রহ করে অপেক্ষা করুন।",
                    });
                    setTimeout(() => {
                        this.countDown -= 1
                        this.countDownTimer()
                    }, 1000)
                }
         },
        removeEvidence(index){
            // console.dir(index);
            this.provementImagesUrl.splice(index,1);
            this.form.provementImages.splice(index,1);
            
        },
        removeWitnesses(index){
            this.form.witnesses.splice(index,1);
        },
        removeOppositor(index){
            this.form.opponents.splice(index,1);
        },
        removeApplicant(index){
            this.form.applicants.splice(index,1);
        },
        resetApplicationForm(){
            
            this.form={
                applicants: [
                   
                ],
                opponents: [
                   
                ],
                witnesses: [
                   
                ],
                provementImages: [],
                place: null,
                crimeTitle: null,
                crimeDescription: null,
                wantedSalve: null,
                unionMember: {
                   
                },
                localPerson: {
                   
                },

                union:null,
                upazila:null,
                district:null,
                division:null,
            };
            
            this.witnessForm=false;
            this.provementImagesUrl=[];
            
            this.interestedToAddNomminator=false;
        },
        filterDistrictList(){
            this.districtList=[];
        
            let url="frontend/get/active/district/list?division="+this.form.division;

             this.$http.get(url)
             .then(response=>{
                this.finalDistrictList=response.data;
                this.districtList=response.data;
             })
             .catch(error=>{})
             .finally();
        },
        filterUpazilaList(){
            this.upazilaList=[];
            

            let url="frontend/get/active/upazila/list?district="+this.form.district;

             this.$http.get(url)
             .then(response=>{
                this.finalUpazilaList=response.data;
                this.upazilaList=response.data;
             })
             .catch(error=>{})
             .finally();
        },
        filterUnionList(){
            this.unionList=[];

            let url="frontend/get/active/union/list?upazila="+this.form.upazila;

             this.$http.get(url)
             .then(response=>{
                this.finalUnionList=response.data;
                this.unionList=response.data;
             })
             .catch(error=>{})
             .finally();
        },
        setMemberSelected(){
            this.memberList.forEach(memberInfo=>{
                if(this.form.unionMember.id==memberInfo.id){
                    this.form.unionMember.name=memberInfo.name;
                    this.form.unionMember.g_name=memberInfo.guardian;
                    this.form.unionMember.village=memberInfo.village;
                    this.form.unionMember.wardNo=memberInfo.wordNo;
                    this.form.unionMember.post=memberInfo.postOffice;
                    this.form.unionMember.union=memberInfo.union_info.bn_name;
                    this.form.unionMember.district=memberInfo.district_info.bn_name;
                }
            })
        },
         getUnionList(){

            let url="frontend/get/active/union/list";

             this.$http.get(url)
             .then(response=>{
                this.finalUnionList=response.data;
                this.unionList=response.data;
             })
             .catch(error=>{})
             .finally();
        },
         getUpazilaList(){

            let url="frontend/get/active/upazila/list";

             this.$http.get(url)
             .then(response=>{
                this.finalUpazilaList=response.data;
                this.upazilaList=response.data;
             })
             .catch(error=>{})
             .finally();
        },
         getDistrictList(){

            let url="frontend/get/active/district/list";

             this.$http.get(url)
             .then(response=>{
                this.finalDistrictList=response.data;
                this.districtList=response.data;
             })
             .catch(error=>{})
             .finally();
        },
         getDivisionList(){

            let url="frontend/get/active/division/list";

             this.$http.get(url)
             .then(response=>{
                this.finalDivisionList=response.data;
                this.divisionList=response.data;
             })
             .catch(error=>{})
             .finally();
        },
         getMemberList(){

            let url="frontend/get/active/member/list";

             this.$http.get(url)
             .then(response=>{
                this.memberList=response.data;
             })
             .catch(error=>{})
             .finally();
        },

         getMemberListByUnion(){

            let url="frontend/get/active/member/list?union="+this.form.union;

             this.$http.get(url)
             .then(response=>{
                this.memberList=response.data;
             })
             .catch(error=>{})
             .finally();
        },
        async submitForm() {
            
            if(this.submitFormValidation()){
                

                let dataId=this.$route.params.dataId;

                this.countDown=20;
                this.countDownTimer();
                let formData=new FormData();

                formData.append("caseTitle",this.form.crimeTitle);
                formData.append("caseDetails",this.form.crimeDescription);
                formData.append("expectation",this.form.wantedSalve);
               
               this.form.applicants.forEach((dataInfo,index)=>{
                    formData.append("applicantName[]",dataInfo.name);
                    formData.append("applicantFatherName[]",dataInfo.pName);
                    formData.append("applicantMotherName[]",dataInfo.mName);
                    formData.append("applicantGuardianName[]",dataInfo.sName);
                    formData.append("applicantNidNo[]",dataInfo.aNID);
                    formData.append("applicantPhone[]",dataInfo.aMobile);
                    formData.append("applicantGender[]",dataInfo.aGender);
                    if(index==0)
                        formData.append("applicantPhoto",dataInfo.aImage);
               });

               this.form.opponents.forEach(dataInfo=>{
                    formData.append("oppositorName[]",dataInfo.name);
                    formData.append("oppositorFatherName[]",dataInfo.pName);
                    formData.append("oppositorMotherName[]",dataInfo.mName);
                    formData.append("oppositorGuardianName[]",dataInfo.sName);
                    formData.append("oppositorNidNo[]",dataInfo.oNID);
                    // formData.append("oppositorPhoto[]",dataInfo.oImage);
                    formData.append("oppositorPhone[]",dataInfo.oMobile);
                    formData.append("oppositorGender[]",dataInfo.oGender);
               });

               this.form.witnesses.forEach(dataInfo=>{
                    formData.append("witnessName[]",dataInfo.name);
                    formData.append("witnessFatherName[]",dataInfo.pName);
                    formData.append("witnessMotherName[]",dataInfo.mName);
                    formData.append("witnessGuardianName[]",dataInfo.sName);
                    formData.append("witnessNidNo[]",dataInfo.wNID);
                    formData.append("witnessPhone[]",dataInfo.wMobile);
                    formData.append("witnessGender[]",dataInfo.wGender);
               });

               this.form.provementImages.forEach(photo=>{
                    formData.append("evidence[]",photo);
               });

               if(this.interestedToAddNomminator==true){
                   formData.append("localNomminatorName",this.form.localPerson.name);
                   formData.append("localNomminatorGuardian",this.form.localPerson.g_name);
                   formData.append("localNomminatorVillage",this.form.localPerson.village);
                   formData.append("localNomminatorWardNo",this.form.localPerson.wardNo);
                   formData.append("localNomminatorPostOffice",this.form.localPerson.post);
                   formData.append("localNomminatorUnion",this.form.localPerson.union);
                   formData.append("localNomminatorDistrict",this.form.localPerson.district);

                   formData.append("unionNomminatorId",this.form.unionMember.id);
                   formData.append("unionNomminatorName",this.form.unionMember.name);
                   formData.append("unionNomminatorGuardian",this.form.unionMember.g_name);
                   formData.append("unionNomminatorVillage",this.form.unionMember.village);
                   formData.append("unionNomminatorWardNo",this.form.unionMember.wardNo);
                   formData.append("unionNomminatorPostOffice",this.form.unionMember.post);
                   formData.append("unionNomminatorUnion",this.form.unionMember.union);
                   formData.append("unionNomminatorDistrict",this.form.unionMember.district);
               }

               formData.append("division",this.form.division);
               formData.append("upazila",this.form.upazila);
               formData.append("district",this.form.district);
               formData.append("union",this.form.union);
               formData.append("dataId",dataId);

               let token=window.localStorage.getItem("token");

                let config = {
                           headers: {
                              'Content-Type': 'multipart/form-data',
                              'Authorization': 'Bearer '+token
                          }   
                      };
                
                let url="staff/update/applcation/details";

                await this.$http.post(url,formData,config)
                 .then(response=>{
                    if(response.data.msgFlag==true){
                       
                        this.currentPage=3;
                        this.caseId=response.data.caseId;
                        toast.success({
                            position: 'topRight',
                            title: response.data.msg,
                        });
                        this.countDown=0;
                        this.resetApplicationForm();
                        this.getCaseInfo();
                    }
                    if(response.data.errMsgFlag==true){
                       
                        toast.error({
                            position: 'topRight',
                            title: response.data.errMsg,
                        });
                        this.countDown=0;
                    }
                 })
                 .catch(error=>{})
                 .finally();

             }
            else{
                return false;
            }
            
            
        },
        setImgFile(event, currentIndex, applicantType) {
            // console.dir(currentIndex+1);
            const imageDisplay = document.getElementById('showImg'+ (currentIndex + 1));
           console.log()
            if (event.target.files[0]) {
                
            const file= event.target.files[0];
            let Extension = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
           
            if ( !(Extension == "png" || Extension == "bmp" || Extension == "jpeg" || Extension == "jpg")) {
                    toast.error({
                        position: 'topRight',
                        title: 'ছবি *JPG*/ *PNG* ফরমেট হতে হবে',
                    });
                    return false;
                } else {
                    // imageDisplay.src = '';
                    imageDisplay.src = URL.createObjectURL(event.target.files[0]);
                }
                if (applicantType === 'aImage') {
                    this.form.applicants[currentIndex].aImage = event.target.files[0];
                }
            }
            
        },
        addProvementImages(event) {
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
                    this.provementImagesUrl.push(imgUrl);
                    this.form.provementImages.push(file);
                }
            }

            
        },
        setCrimePlace() {
           
        },
        addApplicant(applicant) {
            if (applicant === 'applicant') {
                const lastID = this.form.applicants[this.form.applicants.length - 1].id;
                let obj = {
                    id: parseInt(lastID, 10) + 1,
                    name: null,
                    pName: null,
                    mName: null,
                    sName: null,
                    aNID: null,
                    aMobile: null,
                    aImage: null,
                } 
                this.form.applicants.push(obj);         
            } else if (applicant === 'opponent') {
                const lastID = this.form.opponents[this.form.opponents.length - 1].id;
                let obj = {
                    id: parseInt(lastID, 10) + 1,
                    name: null,
                    pName: null,
                    mName: null,
                    sName: null,
                    oNID: null,
                    oMobile: null
                } 
                this.form.opponents.push(obj);         
            } else if (applicant === 'witness') {
                const lastID = this.form.witnesses[this.form.witnesses.length - 1].id;
                let obj = {
                    id: parseInt(lastID, 10) + 1,
                    name: null,
                    pName: null,
                    mName: null,
                    sName: null,
                    wNID: null,
                    wMobile: null
                } 
                this.form.witnesses.push(obj);         
            }
        },
        goNextPage() {
            this.currentPage = 2;
            window.scrollTo({top : 0, behavior : 'smooth'});
        },
        backPreviousPage() {
            this.currentPage = 1;
            window.scrollTo({top : 0, behavior : 'smooth'});
        }
    },
   
}
</script>

<style lang="scss" scoped>
    .image-showing-div {
        width: 150px;
        height: 150px;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        .default {
            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
    }
    .image-and-add-more-part {
        width: min-content;
        margin: auto;
        .upload-file {
            width: 150px;
            border-radius: 10px;
            background: #918f8f;
            color: white;
            padding: 0 10px;
            margin-top: 5px;
        }
        .add-more {
            width: 250px;
            margin: 10px 0;
            display: flex;
            justify-content: space-between;
            .add-icon {
                width: 25px;
                height: 25px;
                background: #098009;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                cursor: pointer;
            }
        }
        .add-more-btn-without-image-part {
            margin-top: 166px;
        }
    }

    .hide {
        display: none;
    }
    h3 {
        text-align: center;
    }
    .info-title {
        display: flex;
        justify-content: center;
        column-gap: 10px;
        padding: 0;
        margin: 5px 0 0 0;
    }
    .editor-background {
        background-color: white !important;
    }
    .add-image-btn {
        width: 25px;
        height: 25px;
        background: #098009;
        display: inline-flex;
        margin-left: 10px;
        justify-content: center;
        align-items: center;
        color: white;
        cursor: pointer;        
    }
    .default-provement-images,
    .provent-images {
        display: flex;
        flex-flow: row wrap;
        gap: 20px;
        margin: 10px 0;
        img {
            display: block;
            width: 100px;
            height: 100px;
            object-fit: contain;
        }
    }
    .ovinandon {
        margin: 80px 0 250px 0;
        p {
            font-size: 1.1rem;
            font-weight: bold;
        }
    }
    @media (max-width: 991px) {
        .image-and-add-more-part {
            .add-more-btn-without-image-part {
                margin-top: 0px;
            }
        }
    }
</style>
