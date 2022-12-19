<template>
  <div id="app">
    <slot v-if="$store.state.token!=null">
      <router-view/>
    </slot>
    <slot v-else>
      <LoginPage/>  
    </slot>
  </div>
</template>
<script>
import LoginPage from './Login';
export default{
  components:{
    LoginPage
  },
  data(){
    return{

    }
  },
  beforeMount(){
    this.checkUserAuth();
  },
  methods:{
    async checkUserAuth(){
      let token=window.localStorage.getItem("token");
           
      let config = {
             headers: {
                'Authorization': 'Bearer '+token
            }   
        };
        // let formData=new FormData();
      await  this.$http.get('/staff/auth/check',config)
         .then(response=>{
            if(response.status==403){
              window.localStorage.setItem("token",null);
              window.localStorage.setItem("userInfo",null);
              // this.$store.commit('storeUserInfo',response.data);
            }
         })
         .catch(error=>{console.dir(error)})
         .finally();
      }
    }
  
}
</script>
<style lang="scss" scoped>

</style>
