<template>
    <div class="media-form">
        <form @submit.prevent="submitForm()">
            <b-row class="gridrow" cols="1" cols-sm="1" cols-lg="2">
                <b-col>
                    <b-card title="মিডিয়ার তথ্য">
                        <div class="mb-3">
                            <label for="title" class="form-label"><strong>শিরোনাম:*</strong></label>
                            <input type="text" v-model="form.title" class="form-control" id="title" placeholder="Enter title" required>
                        </div>
                        <div class="mb-3">
                            <label for="link" class="form-label"><strong>লিংক:</strong></label>
                            <input type="text" v-model="form.link" class="form-control" id="link" placeholder="name@example.com">
                        </div>
                        <div class="mb-3">
                            <label for="status" class="form-label"><strong>উদ্দেশ্য:*</strong></label>
                            <select 
                            id="status"
                            class="form-select"
                            v-model="form.status" 
                            aria-label="Default select example"
                            required
                            >
                                <option :value="status"
                                v-for="status,index in statuses" 
                                :key="index"
                                >
                                    {{status}}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <div v-if="type === 'create'">
                                <label class="form-label"><strong>ছবি:*</strong></label>
                                <input type="file" @change="getImg($event)" class="form-control" id="image" required>
                            </div>
                            <div v-if="type === 'update'">
                                <div class="label-and-image">
                                    <div class="form-label"><strong>ছবি:</strong></div>
                                    <div class="image-view" v-html="mediaDetails.image"></div>
                                </div>
                                <input type="file" @change="getImg($event)" class="form-control" id="image">
                            </div>
                        </div>
                    </b-card>
                </b-col>
                <b-col>
                    <b-card title="বিস্তারিত তথ্য">
                        <VueEditor v-model="form.description"/>
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
import { VueEditor } from "vue2-editor";
import mixin from '@/plugins/mixin';
export default {
    props: {
        type: {
            type:String,
            default: 'create'
        },
        mediaDetails: {
            type: Object,
            required: false
        }
    },
    mixins: [mixin],
    components: {
        VueEditor
    },
    data() {
        return {
            form: {
                title: null,
                link: null,
                status: 'স্লাইডার',
                image: null,
                description: null,
            },
            spinner: false,
            statuses: ['স্লাইডার', 'নতুন পোস্ট']
        }
    },
    methods: {
        async submitForm() {
            this.spinner = true;
            try {
                let formedData;
                //cal self created global method
                formedData = this.formData(this.form);
                let response = null;
                if (this.type === 'create') {
                    response = await axios.post('/media', formedData);
                } else if (this.type === 'update') {
                    response = await axios.post(`/media/${this.mediaDetails.id}`, formedData);
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
            this.mediaDetails
            ) {
                this.form.title = this.mediaDetails.title;
                this.form.status = this.mediaDetails.status;
                this.form.link = this.mediaDetails.link;
                this.form.description = this.mediaDetails.description;
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