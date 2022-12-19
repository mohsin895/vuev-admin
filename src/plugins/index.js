import Vue from 'vue'
import axios from 'axios';
// import VueAxios from 'vue-axios';
// Vue.use(VueAxios, axios);
import moment from 'moment';
import numeral from "numeral";
import Toaster from 'v-toaster';

import VueEditor  from "vue2-editor";

Vue.component('VueEditor');

import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
Vue.component('v-select', vSelect);

import 'v-toaster/dist/v-toaster.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// svg icons
import icons from "v-svg-icons";
Vue.component("icon", icons);

//ant design 
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);

// toaster
import toastCss from '../../node_modules/izitoast/dist/css/iziToast.min.css';
import toastJs from '../../node_modules/izitoast/dist/js/iziToast';
window.toast = toastJs;

// sweet alert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

// this base url use for all datatables
// window.baseUrl = 'http://127.0.0.1:8000/api/v1';

//vue editor
import Vue2Editor from "vue2-editor";
Vue.use(Vue2Editor);

Vue.use(Toaster, {timeout: 3000});

Vue.config.productionTip = false;

import Paginate from 'vuejs-paginate';
Vue.component('paginate', Paginate);

import VueCarousel from 'vue-carousel';
 
Vue.use(VueCarousel);

import VueLazyload from 'vue-lazyload';
 
// Vue.use(VueLazyload);
 
// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1
});


const base = axios.create({
	baseURL: "http://localhost/villagecourt/public/api/"
  // baseURL: "https://gramadalot.com.bd/max8483/api"

});

Vue.prototype.$http = base;


Vue.filter("statusLabel", function(status) {
    if(status==1)
      return 'Active';
    if(status==2)
      return 'Inactive';
    if(status==0)
      return 'Deleted';
});

Vue.filter("yesNo", function(value) {
  if(value==1)
    return 'Yes';
  else
    return 'No';
});
Vue.filter("oldNew", function(value) {
  if(value==1)
    return 'New';
  else
    return 'Old';
});

Vue.filter("formatNumberWithDecimal", function(value) {
  return numeral(value).format(0.0);
});

Vue.filter("getImageUrl", function(value) {
  // return 'https://picsum.photos'+value;
  return 'http://localhost/villagecourt'+value;
});

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
});

Vue.filter("formatDateBd", function(value) {
  if (value) {
     let date=moment(String(value)).format("DD/MM/YYYY");
     let enDate=String(date);
     let bnDate='';
     for(var i=0;i<enDate.length;i++){
          if(enDate[i]==' ')
            bnDate=bnDate+' ';
          else
            if(enDate[i]==0)
            bnDate=bnDate+'০';
          else
            if(enDate[i]==1)
            bnDate=bnDate+'১';
          else
            if(enDate[i]==2)
            bnDate=bnDate+'২';
          else
            if(enDate[i]==3)
            bnDate=bnDate+'৩';
          else
            if(enDate[i]==4)
            bnDate=bnDate+'৪';
          else
            if(enDate[i]==5)
            bnDate=bnDate+'৫';
          else
            if(enDate[i]==6)
            bnDate=bnDate+'৬';
          else
            if(enDate[i]==7)
            bnDate=bnDate+'৭';
          else
            if(enDate[i]==8)
            bnDate=bnDate+'৮';
          else
            if(enDate[i]==9)
            bnDate=bnDate+'৯';
          else
            if(enDate[i]==' ')
              bnDate=bnDate+' ';
          else
            bnDate=bnDate+enDate[i];
     }
     return bnDate;
     
  }
});
Vue.filter("formatTimeBd", function(value) {
  if (value) {
    // console.dir(value);
     let date=moment(String(value)).format("hh:m A");
     let enDate=String(date);
     let bnDate='';
     for(var i=0;i<enDate.length;i++){
          if(enDate[i]==' ')
            bnDate=bnDate+' ';
          else
            if(enDate[i]==0)
            bnDate=bnDate+'০';
          else
            if(enDate[i]==1)
            bnDate=bnDate+'১';
          else
            if(enDate[i]==2)
            bnDate=bnDate+'২';
          else
            if(enDate[i]==3)
            bnDate=bnDate+'৩';
          else
            if(enDate[i]==4)
            bnDate=bnDate+'৪';
          else
            if(enDate[i]==5)
            bnDate=bnDate+'৫';
          else
            if(enDate[i]==6)
            bnDate=bnDate+'৬';
          else
            if(enDate[i]==7)
            bnDate=bnDate+'৭';
          else
            if(enDate[i]==8)
            bnDate=bnDate+'৮';
          else
            if(enDate[i]==9)
            bnDate=bnDate+'৯';
          else
            if(enDate[i]==' ')
            bnDate=bnDate+' ';
          else
            bnDate=bnDate+enDate[i];
     }
     return bnDate;
     
  }
});

Vue.filter("formatDateTime", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY hh:mm A");
  }
});

Vue.filter("formatTime", function(value) {
  if (value) {
    return moment(String(value)).format("hh:mm A");
  }
});

Vue.filter("formatYear", function(value) {
  if (value) {
    return moment(String(value)).format("YYYY");
  }
});

Vue.filter("formatYearBn", function(value) {
  // if (value) {
  //   return moment(String(value)).format("YYYY");
  // }

  if (value) {
     let date=moment(String(value)).format("YYYY");
     let enDate=String(date);
     let bnDate='';
     for(var i=0;i<enDate.length;i++){
        if(enDate[i]==' ')
            bnDate=bnDate+' ';
          else
          if(enDate[i]==0)
            bnDate=bnDate+'০';
          else
            if(enDate[i]==1)
            bnDate=bnDate+'১';
          else
            if(enDate[i]==2)
            bnDate=bnDate+'২';
          else
            if(enDate[i]==3)
            bnDate=bnDate+'৩';
          else
            if(enDate[i]==4)
            bnDate=bnDate+'৪';
          else
            if(enDate[i]==5)
            bnDate=bnDate+'৫';
          else
            if(enDate[i]==6)
            bnDate=bnDate+'৬';
          else
            if(enDate[i]==7)
            bnDate=bnDate+'৭';
          else
            if(enDate[i]==8)
            bnDate=bnDate+'৮';
          else
            if(enDate[i]==9)
            bnDate=bnDate+'৯';
          else
            if(enDate[i]==' ')
              bnDate=bnDate+' ';
          else
            bnDate=bnDate+enDate[i];
     }
     return bnDate;
     
  }
});

Vue.filter("banglaNumber", function(value) {
  let enValue=String(value);
     let bnValue='';
     for(var i=0;i<enValue.length;i++){
          if(enValue[i]==' ')
            bnValue=bnValue+' ';
          else
          if(enValue[i]==0)
            bnValue=bnValue+'০';
          else
            if(enValue[i]==1)
            bnValue=bnValue+'১';
          else
            if(enValue[i]==2)
            bnValue=bnValue+'২';
          else
            if(enValue[i]==3)
            bnValue=bnValue+'৩';
          else
            if(enValue[i]==4)
            bnValue=bnValue+'৪';
          else
            if(enValue[i]==5)
            bnValue=bnValue+'৫';
          else
            if(enValue[i]==6)
            bnValue=bnValue+'৬';
          else
            if(enValue[i]==7)
            bnValue=bnValue+'৭';
          else
            if(enValue[i]==8)
            bnValue=bnValue+'৮';
          else
            if(enValue[i]==9)
            bnValue=bnValue+'৯';
          else
            bnValue=bnValue+enValue[i];
     }
     return bnValue;
});

export default {};