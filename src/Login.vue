<template>
  <b-container class="bv-example-row">
  <b-row class="mt-4">
    <b-col></b-col>
    <b-col>
      <div>
        <b-card class="">
          <div class="">
            <form>
              <p class="h4 text-center mb-4">Log in</p>
              <label for="defaultFormLoginEmailEx" class="grey-text">Your Username</label>
              <input type="email"  class="form-control" v-model="userName" placeholder="Your Username" />
              <br />
              <label for="defaultFormLoginPasswordEx" class="grey-text">Your password</label>
              <input type="password" id="defaultFormLoginPasswordEx" class="form-control" placeholder="Password" v-model="password" />
              <div class="text-center mt-4">
                <a href="#" class="btn btn-info" @click="login">Login</a>
              </div>
            </form>
          </div>
        </b-card>
      </div>
    </b-col>
    <b-col></b-col>
  </b-row>
</b-container>
</template>
<script>
export default{
  data(){
    return{
      userName:null,
      password:null,
    }
  },
  methods:{
    async login(){
      let formData=new FormData();
      formData.append("userName",this.userName);
      formData.append("password",this.password);
    await  this.$http.post("/login",formData)
        .then(response=>{
          if(response.data.msgFlag==true){
              window.localStorage.setItem("token",response.data.token);
              window.localStorage.setItem("userInfo",response.data.userInfo);
              this.$store.commit('storeUserInfo',response.data);
              this.$router.push({name:'Dashboard'});
          }
          else{
            this.$toaster.warning(response.data.errMsg);
            window.localStorage.setItem("token",null);
            window.localStorage.setItem("userInfo",null);
            this.$store.commit('storeUserInfo',response.data);
          }
        })
        .catch(error=>{console.dir(error)})
        .finally();
    }
  }
}
</script>