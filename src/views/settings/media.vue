<template>
    <div class="media">
        <!-- <MediaForm/> -->
       <div class="create-button">
            <button 
            class="btn btn-primary" 
            @click="currentStage = 4"
            v-if="currentStage === 1"
            >
                নতুন যোগ করুন
            </button>
        </div>
        <div class="create-member" v-if="currentStage === 4">
            <MediaForm 
            @success="closeCreateComponent()"
            />
        </div>
        <div class="table-info">
            <div 
            class="table-wrapper"
            v-if="currentStage === 1"
            >
                <table 
                class="table table-bordered table-hover table-striped dataTable no-footer"
                id="media"
                >
                    <thead>
                    <tr>
                        <th>শিরোনাম</th>
                        <th>উদ্দেশ্য</th>
                        <th>ছবি</th>
                        <th>অপশনস</th>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div 
        class="update-member"
        v-if="currentStage === 2"
        >
            <MediaForm 
            type="update"
            :mediaDetails="currentInfo"
            @success="closeCreateComponent()"
            />
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
import MediaForm from '@/components/media/form.vue'
export default {
    components: {
        MediaForm
    },
data() {
        return {
            currentStage: 1,
            currentInfo: null,
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
                this.currentInfo = this.getCurrentInfo(currentHash);
                this.currentStage = 2;
            } else if (currentBtn === 'view') {
                const currentInfo = this.getCurrentInfo(currentHash);
                this.currentStage = 3;
            } else if (currentBtn === 'delete') {
                const currentInfo = this.getCurrentInfo(currentHash);
                // Use sweetalert2
                this.$swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        let formdata = new FormData();
                        formdata.append('_method', 'DELETE');
                        axios.post(`/media/${currentInfo.id}`,formdata).then(res => {
                            this.closeCreateComponent();
                            if (res.data.success) {
                                this.$swal.fire(
                                'Deleted!',
                                `${res.data.message}`,
                                'success'
                                )
                            }
                        });
                        
                    }
                })
            }
        }
    },
    methods: {
        getDataTables() {
            $(document).ready( async function () {
                await $('#media').DataTable({
                    processing: true,
                    serverSide: true,
                    "language": {
                        processing: '<img src="https://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-23.jpg">' 
                    },
                    ajax: {
                        "url": `${baseUrl}/media`,
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
                        {'data': 'title'},
                        {'data': 'status'},
                        {'data': 'image'},
                        {'data': 'actions'}
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
            $('#media').DataTable().destroy();
            this.getDataTables();
        },
        closeCreateComponent() {
            this.currentStage = 1;
            this.reHydrateTable();
            if (this.$route.hash) {
                window.history.back();
            }
        },
    }
}
</script>

<style lang="scss" scoped>

</style>