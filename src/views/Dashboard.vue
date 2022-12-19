<template>
    <div class="dahsboard">
    
    <slot v-if="$store.state.userInfo.permissions.includes(2)">
    <b-card
      header="সংক্ষিপ্ত তথ্য"
      header-tag="header"
      class="p-2"
    >
      <b-card-text>
        <b-row>
            <b-col cols="4">
                <b-input-group prepend="শুরু তারিখ" class="mb-2 mr-sm-2 mb-sm-0">
                  <input type="date" name="startDate" v-model="startDate" class="form-control" placeholder="শুরু তারিখ" @input="getCardInfos">
                </b-input-group>
            </b-col>
            <b-col cols="4">
                <b-input-group prepend="শেষ তারিখ" class="mb-2 mr-sm-2 mb-sm-0">
                  <input type="date" name="endDate" v-model="endDate" class="form-control" placeholder="শেষ তারিখ" @input="getCardInfos">
                </b-input-group>
            </b-col>
        <slot v-if="$store.state.userInfo.permissions.includes(777)">
            <b-col cols="4">
                <b-input-group prepend="জেলা" class="mb-2 mr-sm-2 mb-sm-0">
                  
                    <select v-model="district" class="form-control" @change="getUpazilaList(); getCardInfos();">
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
                    <select v-model="upazila" class="form-control" @change="getUnionList(); getCardInfos();">
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
                    <select v-model="union" class="form-control" @change="getCardInfos()">
                        <slot v-for="unionInfo,unionIndex in unionList">
                            <option :value="unionInfo.id">{{unionInfo.bn_name}}</option>
                        </slot>
                    </select>
                </b-input-group>
            </b-col>
        </slot>
            <b-col cols="4">
                <b-button variant="danger" @click="resetForm();getCardInfos;">মুছুন</b-button>
                <b-button variant="info" @click="getCardInfos" class="ml-4">অনুসন্ধান করুন</b-button>
            </b-col>
            
        </b-row>
        <hr style="font-weight:bolder">
        <b-row class="mt-5">
            <b-col>
                <b-card bg-variant="info" text-variant="black" header="মোট আবেদন" class="text-center h3">
                <b-card-text>
                    <h1>{{cardInfo.totalApplication | banglaNumber}} টি</h1>
                </b-card-text>
              </b-card>
            </b-col>
            <b-col>
                <b-card bg-variant="success" text-variant="black" header="গৃহীত মামলা" class="text-center h3">
                <b-card-text class="text-light">
                    <h1>{{cardInfo.totalAcceptedCase | banglaNumber}} টি</h1>
                </b-card-text>
              </b-card>
            </b-col>
             <b-col>
                <b-card bg-variant="warning" text-variant="black" header="বিচারাধীন মামলা" class="text-center h3">
                <b-card-text>
                    <h1>{{cardInfo.totalPendingCase | banglaNumber}} টি</h1>
                </b-card-text>
              </b-card>
            </b-col>
            <b-col>
                <b-card bg-variant="danger" text-variant="black" header="খারিজ মামলা" class="text-center h3">
                <b-card-text>
                    <h1>{{cardInfo.totalRejectedCase | banglaNumber}} টি</h1>
                </b-card-text>
              </b-card>
            </b-col>

        </b-row>
      </b-card-text>
    </b-card>
</slot>

<slot v-if="$store.state.userInfo.permissions.includes(3)">
    <b-card
      header="গ্রাফ তথ্য"
      header-tag="header"
      class="p-2 mt-4"
    >
    <b-card-text>
       <b-row>
            <b-col cols="4">
                <b-input-group prepend="শুরু তারিখ" class="mb-2 mr-sm-2 mb-sm-0">
                  <input type="date" name="startDate" v-model="startDate" class="form-control" placeholder="শুরু তারিখ" @input="getGraphInfos">
                </b-input-group>
            </b-col>
            <b-col cols="4">
                <b-input-group prepend="শেষ তারিখ" class="mb-2 mr-sm-2 mb-sm-0">
                  <input type="date" name="endDate" v-model="endDate" class="form-control" placeholder="শেষ তারিখ" @input="getGraphInfos">
                </b-input-group>
            </b-col>
        <slot v-if="$store.state.userInfo.permissions.includes(777)">
            <b-col cols="4">
                <b-input-group prepend="জেলা" class="mb-2 mr-sm-2 mb-sm-0">
                  
                    <select v-model="district" class="form-control" @change="getUpazilaList(); getGraphInfos();">
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
                    <select v-model="upazila" class="form-control" @change="getUnionList(); getGraphInfos();">
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
                    <select v-model="union" class="form-control" @change="getGraphInfos()">
                        <slot v-for="unionInfo,unionIndex in unionList">
                            <option :value="unionInfo.id">{{unionInfo.bn_name}}</option>
                        </slot>
                    </select>
                </b-input-group>
            </b-col>
        </slot>
            <b-col cols="4">
                <b-button variant="danger" @click="resetForm();getCardInfos;">মুছুন</b-button>
                <b-button variant="info" @click="getCardInfos" class="ml-4">অনুসন্ধান করুন</b-button>
            </b-col>
            
        </b-row>
        <hr style="font-weight:bolder">
        <b-row >
            <b-col>
                <b-card  class="text-center">
                <b-card-text >
                      <GChart :type="comboChart" :data="comboChartData" :options="comboChartOptions" />
                </b-card-text>
              </b-card>
            </b-col>
            <b-col>
                <b-card  class="text-center">
                <b-card-text >
                      <GChart :type="pieChart" :data="pieChartData" :options="pieChartOptions"  />
                </b-card-text>
              </b-card>
            </b-col>
            
        </b-row>
        <b-row class="mt-2">
            <b-col>
                <b-card  class="text-center">
                <b-card-text >
                      <GChart :type="lineChart" :data="lineChartData" :options="lineChartOptions" />
                </b-card-text>
              </b-card>
            </b-col>
            <b-col>
                <b-card  class="text-center">
                <b-card-text >
                       <GChart :type="columnChart" :data="columnChartData" :options="columnChartOptions" />
                </b-card-text>
              </b-card>
            </b-col>
        </b-row>
    </b-card-text>
    </b-card>
</slot>
    </div>
</template>
<script>
import { GChart } from 'vue-google-charts/legacy'

// import { chartType, chartData, chartOptions } from './GoogleChartData';

export default {
  components:{GChart},
  data () {
    return {

    districtList:[],
    upazilaList:[],
    unionList:[],
    district:'',
    upazila:'',
    union:'',

    cardInfo:[],
    startDate:'',
    endDate:'',

      comboChart:'ComboChart',
      comboChartData:[
              [
                'Month',
                'Bolivia',
                'Ecuador',
                'Madagascar',
                'Papua New Guinea',
                'Rwanda',
                'Average',
              ],
              ['2004/05', 165, 938, 522, 998, 450, 614.6],
              ['2005/06', 135, 1120, 599, 1268, 288, 682],
              ['2006/07', 157, 1167, 587, 807, 397, 623],
              ['2007/08', 139, 1110, 615, 968, 215, 609.4],
              ['2008/09', 136, 691, 629, 1026, 366, 569.6],
        ],

        comboChartOptions:{
              title: 'Monthly Coffee Production by Country',
              vAxis: { title: 'Cups' },
              hAxis: { title: 'Month' },
              seriesType: 'bars',
              series: { 5: { type: 'line' } },
              width: 700,
              height: 400,
        },


      lineChart:'LineChart',
      lineChartData:[
              ['Year', 'Sales', 'Expenses'],
              ['2004', 1000, 400],
              ['2005', 1170, 460],
              ['2006', 660, 1120],
              ['2007', 1030, 540],
        ],

        lineChartOptions:{
              title: 'Company Performance',
              curveType: 'function',
              legend: { position: 'bottom' },
              width: 700,
              height: 400,
        },


        pieChart:'PieChart',

        pieChartData:[
              ['Task', 'Hours per Day'],
              ['Work', 11],
              ['Eat', 2],
              ['Commute', 2],
              ['Watch TV', 2],
              ['Sleep', 7],
        ],

        pieChartOptions:{
              title: 'My Daily Activities',
              width: 700,
              height: 400,
        },


        columnChart:'ColumnChart',

        columnChartData:[
              ['Year', 'Sales', 'Expenses', 'Profit'],
              ['2014', 1000, 400, 200],
              ['2015', 1170, 460, 250],
              ['2016', 660, 1120, 300],
              ['2017', 1030, 540, 350],
              ['2014', 1000, 400, 200],
              ['2015', 100, 460, 250],
              ['2016', 660, 1120, 300],
              ['2017', 1030, 540, 350],
            ],

        columnChartOptions:{
          chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
          },
          width: 700,
          height: 400,
        },

    }
  },
  beforeMount(){
    // this.getCardInfos();
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

    this.getCardInfos();
    
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
    },
    async getCardInfos(){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token
                      }   
                  };
            
            let url="staff/dashboard/get/card/infos?startDate="+this.startDate+"&endDate="+this.endDate+"&upazilaId="+this.upazila+"&unionId="+this.union+"&districtId="+this.district;

            await this.$http.get(url,config)
             .then(response=>{
                    this.cardInfo=response.data;
             })
             .catch(error=>{
                (error.response.status==401) ? this.$store.commit("logout"):console.log(error);
             })
             .finally();
    },
    async getGraphInfos(){
            let token=window.localStorage.getItem("token");
            let config = {
                       headers: {
                          'Authorization': 'Bearer '+token
                      }   
                  };
            
            let url="staff/dashboard/get/graph/infos?startDate="+this.startDate+"&endDate="+this.endDate+"&upazilaId="+this.upazila+"&unionId="+this.union+"&districtId="+this.district;

            await this.$http.get(url,config)
             .then(response=>{
                    this.cardInfo=response.data;
             })
             .catch(error=>{
                (error.response.status==401) ? this.$store.commit("logout"):console.log(error);
             })
             .finally();
    },
    
  }
}

</script>
