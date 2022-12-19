import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let userInfo = window.localStorage.getItem("userInfo");
let token = window.localStorage.getItem("token");

const store = new Vuex.Store({
    state: {
    
    userInfo: userInfo ? JSON.parse(userInfo) : [],
    token: token ? token : null,
    selectedRolePermission:{
                roleId:null,
                permissionList:[],
         },

  },
  mutations: {
    storeSelectedRolePermission(state,data){state.selectedRolePermission=data;},
      storeUserInfo(state,datas) { 
        state.userInfo=datas.userInfo;
        state.token=datas.token;
        window.localStorage.removeItem("token");
        window.localStorage.setItem("token", state.token);
        window.localStorage.removeItem("userInfo");
        window.localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      },
      logout(state){
        state.userInfo=null;
        state.token=null;
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("userInfo");
      } 
  }
})


export default store;