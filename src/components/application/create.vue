<template>
    <div class="create-application">
        <form @submit.prevent="submitForm()">
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
                                        <input type="number" v-model="applicant.aNID" class="form-control" :id="'a_nid'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'a_mobile'+(index+1)" class="form-label"><strong>আবেদনকারীর মোবাইল নং:*</strong></label>
                                        <input type="number" v-model="applicant.aMobile" class="form-control" :id="'a_mobile'+(index+1)" required>
                                    </div>
                                </div>
                            </b-col>
                            <b-col>
                                <div class="image-and-add-more-part">
                                    <div class="image-showing-div">
                                        <div class="default">
                                            <img 
                                            :id="'showImg'+ (index + 1)" 
                                            src="@/assets/images/default.png" 
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
                                        <label :for="'o_name'+(index+1)" class="form-label"><strong>আবেদনকারীর নাম:*</strong></label>
                                        <input type="text" v-model="opponent.name" class="form-control" :id="'o_name'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'o_f_name'+(index+1)" class="form-label"><strong>আবেদনকারীর পিতার নাম:*</strong></label>
                                        <input type="text" v-model="opponent.pName" class="form-control" :id="'o_f_name'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'o_m_name'+(index+1)" class="form-label"><strong>আবেদনকারীর মাতার নাম:*</strong></label>
                                        <input type="text" v-model="opponent.mName" class="form-control" :id="'o_m_name'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'o_s_name'+(index+1)" class="form-label"><strong>আবেদনকারীর স্বামী / স্ত্রীর নাম:*</strong></label>
                                        <input type="text" v-model="opponent.sName" class="form-control" :id="'o_s_name'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'o_nid'+(index+1)" class="form-label"><strong>আবেদনকারীর জাতীয় পরিচয় পত্র নং:*</strong></label>
                                        <input type="number" v-model="opponent.oNID" class="form-control" :id="'o_nid'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'o_mobile'+(index+1)" class="form-label"><strong>আবেদনকারীর মোবাইল নং:*</strong></label>
                                        <input type="number" v-model="opponent.oMobile" class="form-control" :id="'o_mobile'+(index+1)" required>
                                    </div>
                                </div>
                            </b-col>
                            <b-col>
                                <div class="image-and-add-more-part">
                                    <div class="add-more add-more-btn-without-image-part">
                                        <p> আরো আবেদনকারী যোগ করুন : </p>
                                        <div class="add-icon" @click="addApplicant('opponent')">
                                            <b-icon icon="plus" scale="2"/>
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
                                        <label :for="'w_name'+(index+1)" class="form-label"><strong>আবেদনকারীর নাম:*</strong></label>
                                        <input type="text" v-model="witness.name" class="form-control" :id="'w_name'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'w_f_name'+(index+1)" class="form-label"><strong>আবেদনকারীর পিতার নাম:*</strong></label>
                                        <input type="text" v-model="witness.pName" class="form-control" :id="'w_f_name'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'w_m_name'+(index+1)" class="form-label"><strong>আবেদনকারীর মাতার নাম:*</strong></label>
                                        <input type="text" v-model="witness.mName" class="form-control" :id="'w_m_name'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'w_s_name'+(index+1)" class="form-label"><strong>আবেদনকারীর স্বামী / স্ত্রীর নাম:*</strong></label>
                                        <input type="text" v-model="witness.sName" class="form-control" :id="'w_s_name'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'w_nid'+(index+1)" class="form-label"><strong>আবেদনকারীর জাতীয় পরিচয় পত্র নং:*</strong></label>
                                        <input type="number" v-model="witness.wNID" class="form-control" :id="'w_nid'+(index+1)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label :for="'w_mobile'+(index+1)" class="form-label"><strong>আবেদনকারীর মোবাইল নং:*</strong></label>
                                        <input type="number" v-model="witness.wMobile" class="form-control" :id="'w_mobile'+(index+1)" required>
                                    </div>
                                </div>
                            </b-col>
                            <b-col>
                                <div class="image-and-add-more-part">
                                    <div class="add-more add-more-btn-without-image-part">
                                        <p> আরো আবেদনকারী যোগ করুন : </p>
                                        <div class="add-icon" @click="addApplicant('witness')">
                                            <b-icon icon="plus" scale="2"/>
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
                                    <select class="form-select" ref="division" aria-label="Default select example">
                                        <option selected>ঢাকা</option>
                                    </select>
                                </div>
                            </b-col>
                            <b-col>
                                <div class="district">
                                    <div class="label">জেলা</div>
                                    <select class="form-select" ref="district" aria-label="Default select example">
                                        <option selected>ঢাকা</option>
                                    </select>
                                </div>
                            </b-col>
                            <b-col>
                                <div class="sub-district">
                                    <div class="label">উপজেলা</div>
                                    <select class="form-select" ref="subdistrict" aria-label="Default select example">
                                        <option selected>সাভার</option>
                                    </select>
                                </div>
                            </b-col>
                            <b-col>
                                <div class="union">
                                    <div class="label">ইউনিয়ন</div>
                                    <select class="form-select" ref="union" aria-label="Default select example">
                                        <option selected>তেঁতুলঝোড়া</option>
                                    </select>
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
                        </div>
                        <div 
                        class="provent-images"
                        v-else
                        >
                            <img
                            v-for="(image, index) in provementImagesUrl"
                            :key="index"
                            :src="image" 
                            alt="default-img"
                            >
                        </div>
                    </div>
                    <!-- wanted salve -->
                    <div class="salve">
                        <div class="mb-3">
                            <label for="salve" class="form-label"><strong>আবেদনকারীর প্রত্যাশিত প্রতিকার:*</strong></label>
                            <textarea class="form-control" v-model="form.wantedSalve" id="salve" rows="3"></textarea>
                        </div>
                    </div>
                </div>
                <div class="button-group">
                    <a class="btn btn-primary" @click="currentPage = 2">পরবতীতে যান</a>
                </div>
            </div>
            <div class="page-two" v-if="currentPage === 2">
                <h3>আবেদনকারীর মনোনয়ন ফরম -১</h3>
                <p>সবিনয়ে আপনার অবগতির জন্য জানাইতেছি যে, <br>
                আবেদনকারী <input v-model="form.applicants[0].name" type="text" readonly> বনাম প্রতিবাদী <input type="text" readonly v-model="form.opponents[0].name"> ধরন
                <input type="text" readonly v-model="form.crimeTitle"> 
                সংক্রান্ত বিরোধের প্রেক্ষিতে গঠিতব্য গ্রাম আদালতে আমার পক্ষে নিম্নেবণিত ব্যক্তিগনকে সদস্য হিসেবে 
                মনোনীত করিলাম
                </p>
                <b-row cols="1" cols-lg="2">
                    <b-col>
                        <h6>ইউনিয়ন পরিষদের সদস্য</h6>
                        <div class="mb-3">
                            <label for="member_name" class="form-label"><strong>নাম:*</strong></label>
                            <input type="text" v-model="form.unionMember.name" class="form-control" id="member_name" required>
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
                            <input type="number" v-model="form.unionMember.wardNo" class="form-control" id="m_ward" required>
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
                            <input type="text" v-model="form.unionMember.name" class="form-control" id="local_member_name" required>
                        </div>
                        <div class="mb-3">
                            <label for="local_m_g_name" class="form-label"><strong>পিতা/স্বামী:*</strong></label>
                            <input type="text" v-model="form.unionMember.g_name" class="form-control" id="local_m_g_name" required>
                        </div>
                        <div class="mb-3">
                            <label for="local_m_village" class="form-label"><strong>গ্রাম:*</strong></label>
                            <input type="text" v-model="form.unionMember.village" class="form-control" id="local_m_village" required>
                        </div>
                        <div class="mb-3">
                            <label for="local_m_ward" class="form-label"><strong>ওয়াড নং:*</strong></label>
                            <input type="number" v-model="form.unionMember.wardNo" class="form-control" id="local_m_ward" required>
                        </div>
                        <div class="mb-3">
                            <label for="local_m_post" class="form-label"><strong>ডাকঘর:*</strong></label>
                            <input type="text" v-model="form.unionMember.post" class="form-control" id="local_m_post" required>
                        </div>
                        <div class="mb-3">
                            <label for="local_m_union" class="form-label"><strong>ইউনিয়ন:*</strong></label>
                            <input type="text" v-model="form.unionMember.union" class="form-control" id="local_m_union" required>
                        </div>
                        <div class="mb-3">
                            <label for="local_m_district" class="form-label"><strong>জেলা:*</strong></label>
                            <input type="text" v-model="form.unionMember.district" class="form-control" id="local_m_district" required>
                        </div>                        
                    </b-col>
                </b-row>
                <div class="button-group">
                    <a class="btn btn-danger" @click="currentPage = 1">পিছনে যান</a>
                    <button class="btn btn-primary">সাবমিট করুন</button>
                </div>
            </div>
        </form>
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
            currentPage: 1,
            form: {
                applicants: [
                    // prefix 'a' means applicant
                    {
                        id: 1,
                        name: null,
                        pName: null,
                        mName: null,
                        sName: null,
                        aNID: null,
                        aMobile: null,
                        aImage: null,
                    }
                ],
                opponents: [
                    // prefix 'o' means opponent
                    {
                        id: 1,
                        name: null,
                        pName: null,
                        mName: null,
                        sName: null,
                        oNID: null,
                        oMobile: null
                    }
                ],
                witnesses: [
                    // prefix 'w' means witness
                    {
                        id: 1,
                        name: null,
                        pName: null,
                        mName: null,
                        sName: null,
                        wNID: null,
                        wMobile: null
                    }
                ],
                provementImages: [],
                place: null,
                crimeTitle: null,
                crimeDescription: null,
                wantedSalve: null,
                unionMember: {
                    name: null,
                    g_name: null,
                    village: null,
                    wardNo: null,
                    post: null,
                    union: null,
                    district: null,
                },
                localPerson: {
                    name: null,
                    g_name: null,
                    village: null,
                    wardNo: null,
                    post: null,
                    union: null,
                    district: null,
                },
            },
            witnessForm: false,
            provementImagesUrl: []
        }
    },
    methods: {
        submitForm() {
            console.log(this.form);
        },
        setImgFile(event, currentIndex, applicantType) {
            const imageDisplay = document.getElementById('showImg'+ (currentIndex + 1));
            // showing selected image
            if (event.target.files[0]) {
                const currentFile = event.target.files[0];
                const isCurrentFilePng = currentFile.type.includes('png');
                const isCurrentFileJpg = currentFile.type.includes('jpg');
                if (!(isCurrentFilePng || isCurrentFileJpg)) {
                    toast.error({
                        position: 'topRight',
                        title: 'ছবি *JPG*/ *PNG* ফরমেট হতে হবে',
                    });
                    return false;
                } else {
                    imageDisplay.src = URL.createObjectURL(event.target.files[0]);
                }
                if (applicantType === 'aImage') {
                    this.applicants[currentIndex].aImage = event.target.files[0];
                }
            }
            
        },
        addProvementImages(event) {
            const imgFile = event.target.files[0];
            if (imgFile) {
                const isCurrentFilePng = imgFile.type.includes('png');
                const isCurrentFileJpg = imgFile.type.includes('jpg');
                if (!(isCurrentFilePng || isCurrentFileJpg)) {
                    toast.error({
                        position: 'topRight',
                        title: 'ছবি *JPG*/ *PNG* ফরমেট হতে হবে',
                    });
                    return false;
                } else {
                    const imgUrl = URL.createObjectURL(imgFile);
                    this.provementImagesUrl.push(imgUrl);
                    this.form.provementImages.push(imgFile);
                }
            }
        },
        setCrimePlace() {
            const place = {
                division: this.$refs.division.value,
                district: this.$refs.district.value,
                subdistrict: this.$refs.subdistrict.value,
                union: this.$refs.union.value,
            }
            this.form.place = JSON.stringify(place);
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
    },
    mounted() {
        this.setCrimePlace();
    }
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
    @media (max-width: 991px) {
        .image-and-add-more-part {
            .add-more-btn-without-image-part {
                margin-top: 0px;
            }
        }
    }
</style>
