<template>
 <div>
   <h2>{{username}}</h2>
   <button @click="logout">Log Out</button>

   <div v-if="!this.$store.getters.getIsAuth">
     <!-- For update when isAuth changed -->
   </div>
 </div>
</template>

<script>

export default {
  data : () => ({
    username : process.browser ? localStorage.getItem('username') : ""
  }),
  created(){
    if(process.browser){
      if(!localStorage.getItem("username")){
        this.$router.push({path : "/login"})
      }
    }
  },
  updated(){
    if(!localStorage.getItem("username")){
        this.$router.push({path : "/login"})
      }
  },
  methods:{
    onclick(){
      this.$store.commit('addUser' , { username : "gag" , password : "fuck"})
    },
    logout(){
      localStorage.removeItem("username")
      this.$store.commit("setIsAuth" , false)
    }
  }
}
</script>
