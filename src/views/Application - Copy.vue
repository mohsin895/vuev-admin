<template>
    <div>

        <b-row>
            <b-col>
                <b-input-group prepend="মামলা নং" class="mb-2 mr-sm-2 mb-sm-0">
                 <input type="text" class="form-control" v-model="searchKey" placeholder="মামলা নং" v-on:keyup.enter="getDataList()">
                </b-input-group>
            </b-col>
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

    <div class="applications-table">
        <div 
        class="table-info"
        v-if="currentStage === 1" 
        >
            <div 
            class="table-wrapper"
            >
                <table 
                class="table table-bordered table-hover table-striped dataTable no-footer" 
                id="example"
                >
                    <thead>
                    <tr>
                        <th>মামলার নম্বর</th>
                        <th>মামলা গ্রহণের তারিখ</th>
                        <th>আবেদনকারীর নাম</th>
                        <th>প্রতিবাদীর নাম</th>
                        <th>সাক্ষীগণের নাম</th>
                        <th>বিরোধের বিষয়বস্তু</th>
                        <th>অপশনস</th>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div 
        class="update" 
        v-if="currentStage === 2"
        >
            <ApplicationEdit/>
        </div>
        <div 
        class="view" 
        v-if="currentStage === 3"
        >
            <ApplicationView/>
        </div>
    </div>
    </div>
</template>

<script>
//Datatable components
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

//self componenets
import ApplicationEdit from '@/components/application/update.vue'
import ApplicationView from '@/components/application/read.vue'
export default {
    components: {
        ApplicationEdit,
        ApplicationView
    },
    data() {
        return {
            currentStage: 1,
        }
    },
    mounted() {
        // initialize data tables
        this.getDataTables();
    },
    watch: {
        $route() {
            const currentHash = this.$route.hash;
            const currentBtn = this.checkCurrentBtn(currentHash);
            if (currentBtn === 'edit') {
                const currentInfo = this.getCurrentInfo(currentHash);
                this.currentStage = 2;
            } else if (currentBtn === 'view') {
                const currentInfo = this.getCurrentInfo(currentHash);
                this.currentStage = 3;
            } else if (currentBtn === 'delete') {
                const currentInfo = this.getCurrentInfo(currentHash);
            }
        }
    },
    methods: {
        getDataTables() {
            $(document).ready( async function () {
                await $('#example').DataTable({
                    processing: true,
                    serverSide: true,
                    "language": {
                        processing: '<img src="https://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-23.jpg">' 
                    },
                    ajax: {
                        "url": `${baseUrl}/applications`,
                        "dataSrc": function(json) {
                            window.tableInfo = [];
                            const currentArray = json.data;
                            const arrayLength = currentArray.length;
                            for (let index = 0; index < arrayLength; index++) {
                                const element = currentArray[index];
                                tableInfo.push(element);
                            }
                            return json.data;
                        }
                    },
                    "columns": [
                        {'data': 'case_no'},
                        {'data': 'accepted_date'},
                        {'data': 'applicants_name'},
                        {'data': 'oppositions_name'},
                        {'data': 'witnesses_name'},
                        {'data': 'subject'},
                        {'data': 'actions'},
                    ]
                });
            });
        },
        getCurrentInfo(hashInfo) {
            const currentBtn = this.checkCurrentBtn(hashInfo);
            if (currentBtn === 'edit') {
                const currentId = parseInt(hashInfo.substr(8));
                const currentObj = tableInfo.find((item) => item.id === currentId);
                return currentObj;
            } else if (currentBtn === 'view') {
                const currentId = parseInt(hashInfo.substr(8));
                const currentObj = tableInfo.find((item) => item.id === currentId);
                return currentObj;                
            } else if (currentBtn === 'delete') {
                const currentId = parseInt(hashInfo.substr(10));
                const currentObj = tableInfo.find((item) => item.id === currentId);
                return currentObj;
            }
        },
        checkCurrentBtn(hashInfo) {
            const editButton = hashInfo.includes('editBtn');
            const viewButton = hashInfo.includes('viewBtn');
            const deleteButton = hashInfo.includes('deleteBtn');
            if (editButton) {
                return 'edit'
            } else if (viewButton) {
                return 'view'
            } else if (deleteButton) {
                return 'delete'
            }
        },
        reHydrateTable() {
            $('#example').DataTable().destroy();
            this.getDataTables();
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
