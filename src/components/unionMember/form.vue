<template>
    <div class="union-member-create">
        <form @submit.prevent="submitForm()">
            <b-row class="gridrow" cols="1" cols-sm="1" cols-lg="2">
                <b-col>
                    <b-card title="ব্যক্তিগত তথ্য">
                        <div class="mb-3">
                            <label for="name" class="form-label"><strong>নাম:*</strong></label>
                            <input type="text" v-model="form.name" class="form-control" id="name" placeholder="name@example.com" required>
                        </div>
                        <div class="mb-3">
                            <label for="gName" class="form-label"><strong>অভিভাবকের নাম:*</strong></label>
                            <input type="text" v-model="form.gName" class="form-control" id="gName" placeholder="Guardian name" required>
                        </div>
                        <div class="mb-3">
                            <label for="phone" class="form-label"><strong>মোবাইল:*</strong></label>
                            <input type="number" v-model="form.phone" class="form-control" id="phone" placeholder="+8801xxxxxxxxx" required>
                        </div>
                        <div class="mb-3">
                            <label for="address" class="form-label"><strong>ঠিকানা:*</strong></label>
                            <input type="text" v-model="form.address" class="form-control" id="address" placeholder="Enter your address" required>
                        </div>
                        <div class="mb-3">
                            <div v-if="type === 'create'">
                                <label class="form-label"><strong>ছবি:*</strong></label>
                                <input type="file" @change="getImg($event)" class="form-control" id="image" required>
                            </div>
                            <div v-if="type === 'update'">
                                <div class="label-and-image">
                                    <div class="form-label"><strong>ছবি:</strong></div>
                                    <div class="image-view" v-html="memberDetails.image"></div>
                                </div>
                                <input type="file" @change="getImg($event)" class="form-control" id="image">
                            </div>
                        </div>
                    </b-card>
                </b-col>
                <b-col>
                    <b-card title="অতিরিক্ত তথ্য">
                        <div class="mb-3">
                            <label for="wordno" class="form-label"><strong>ওয়ার্ড নম্বর:*</strong></label>
                            <input type="number" v-model="form.wordNo" class="form-control" id="wordno" placeholder="Enter word number" required>
                        </div>
                        <div class="mb-3">
                            <label for="gender" class="form-label"><strong>জেন্ডার:*</strong></label>
                            <select 
                            id="gender"
                            class="form-select"
                            v-model="form.gender" 
                            aria-label="Default select example"
                            required
                            >
                                <option :value="gender"
                                v-for="gender,index in genders" 
                                :key="index"
                                >
                                    {{gender}}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="district" class="form-label"><strong>জেলা:*</strong></label>
                            <input type="text" readonly class="form-control" id="district" v-model="form.district" required>
                        </div>
                        <div class="mb-3">
                            <label for="village" class="form-label"><strong>গ্রাম:*</strong></label>
                            <input type="text" readonly class="form-control" id="village" v-model="form.village" required>
                        </div>
                        <div class="mb-3">
                            <label for="post" class="form-label"><strong>পোস্ট:*</strong></label>
                            <input type="text" readonly class="form-control" id="post" v-model="form.post" required>
                        </div>
                    </b-card>                
                </b-col>
                <b-col>
                    <b-card title="ইউনিয়ন তথ্য">
                        <div class="mb-3">
                            <label for="position" class="form-label"><strong>ইউনিয়ন পদবি:*</strong></label>
                            <select 
                            id="position"
                            class="form-select"
                            v-model="form.upDesignation" 
                            aria-label="Default select example"
                            required
                            >
                                <option :value="desig"
                                v-for="desig,index in upDesignations" 
                                :key="index"
                                >
                                    {{desig}}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="gramAdalotPosition" class="form-label"><strong>গ্রাম আদালত পদবি:*</strong></label>
                            <select 
                            id="gramAdalotPosition"
                            class="form-select"
                            v-model="form.gramAdalotDesignation" 
                            aria-label="Default select example"
                            required
                            >
                                <option :value="desig"
                                v-for="desig,index in gramAdalotDesignations" 
                                :key="index"
                                >
                                    {{desig}}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="union" class="form-label"><strong>ইউনিয়ন:*</strong></label>
                            <input type="text" readonly class="form-control" id="union" v-model="form.union" required>
                        </div>
                        
                    </b-card>                
                </b-col>
            </b-row>
            <div class="button-group">
                <div class="btn btn-danger" @click="$emit('success')">বাতিল করুন</div>
                <button class="btn btn-primary btn-self">
                    <div class="loader" v-if="spinner">
                        <b-spinner small></b-spinner>
                    </div>
                    <div class="button-text" v-else>
                        <span v-if="type === 'create'">সংরক্ষণ করুন</span>
                        <span v-if="type === 'update'">আপডেট করুন</span>
                    </div>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import mixin from '@/plugins/mixin'
export default {
    props: {
        type: {
            type:String,
            default: 'create'
        },
        memberDetails: {
            type: Object,
            required: false
        }
    },
    mixins: [mixin],
    data() {
        return {
            form: {
                upDesignation: 'ইউনিয়ন পরিষদের মেম্বার',
                gramAdalotDesignation: 'আদালত সহকারী',
                gender: 'Male',
                name: null,
                gName: null,
                phone: null,
                address: null,
                image: null,
                wordNo: null,
                district: 'ঢাকা',
                village: 'তেঁতুলঝোড়া',
                post: 'সাভার, ঢাকা',
                union: 'তেঁতুলঝোড়া ইউনিয়ন'

            },
            upDesignations: ['ইউপি সচিব', 'ইউপি চেয়ারম্যান', 'ইউনিয়ন পরিষদের মেম্বার'],
            gramAdalotDesignations: ['বিচারক', 'আদালত সহকারী', 'কোনোটিই না'],
            genders: ['Male', 'Female', 'Common'],
            spinner: false,
        }
    },
    methods: {
        async submitForm() {
            this.spinner = true;
            try {
                let formedData;
                formedData = this.formData(this.form);
                let response = null;
                if (this.type === 'create') {
                    response = await axios.post('/union_members', formedData);
                } else if (this.type === 'update') {
                    response = await axios.post(`/union_members/${this.memberDetails.id}`, formedData);
                }
                this.spinner = false;
                if (response.data.success) {
                    toast.success({
                        position: 'topRight',
                        title: 'Created',
                        message: response.data.message
                    });
                    this.$emit('success');
                } else {
                    toast.error({
                        position: 'topRight',
                        title: 'Failed',
                        message: response.data.message
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },
        checkFormType() {
            if (
            this.type === 'update' && 
            this.memberDetails
            ) {
                this.form.upDesignation = this.memberDetails.union_designation;
                this.form.gramAdalotDesignation = this.memberDetails.adalot_designation;
                this.form.gender = this.memberDetails.gender;
                this.form.name = this.memberDetails.name;
                this.form.gName = this.memberDetails.g_name;
                this.form.phone = this.memberDetails.union_member_phone;
                this.form.address = this.memberDetails.address;
                this.form.wordNo = this.memberDetails.ward_no;
                this.form.district = this.memberDetails.district;
                this.form.village = this.memberDetails.village;
                this.form.post = this.memberDetails.post;
                this.form.union = this.memberDetails.union;
            }
        },
        getImg(event) {
            this.form.image = event.target.files[0];
        },
    },
    mounted() {
        this.checkFormType();
        const allInputList = document.querySelectorAll('input');
        this.checkLang(allInputList);
    }
}
</script>

<style lang="scss" scoped>

</style>