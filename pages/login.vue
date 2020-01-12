<template>
  <div>
    <v-card raised light width="400">
      <v-card-title>Login</v-card-title>
      <v-form class="mx-10">
        <v-text-field v-model="username" label="Username"></v-text-field>
        <v-text-field v-model="password" type="password" label="Password"></v-text-field>
      </v-form>
      <v-card-actions>
        <v-spacer />
        <v-btn class="mr-3 mb-3" link to="/registration">Sign Up</v-btn>
        <v-btn class="mr-3 mb-3" color="green" style="color:white" @click="submit">Login</v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar v-model="hasError" top color="error">
      {{ error }}
      <v-btn text @click="hasError = false">Close</v-btn>
    </v-snackbar>

    <v-snackbar v-model="loginError" top color="error" :timeout="0">
      Login or Password is incorrect
      <v-btn text @click="closeLoginErrorWarning">Close</v-btn>
    </v-snackbar>

  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  layout : "center" ,
  data() {
    return {
      username: "",
      password: "",
      hasError: false,
      error: ""
    }
  },
  created() {
    if (process.browser) {
      if (localStorage.getItem("username")) {
        this.$router.push({ path: "/" })
        this.$store.commit("setIsAuth", true)
      }
    }
  },
  computed: {
    ...mapState(["isAuth", "loginError"])
  },
  watch:{
    isAuth(value){
      if(value)
        this.$router.push({ path: "/" })
    }
  },
  methods: {
    submit() {
      if (!this.username) {
        this.error = "Username is required"
        this.hasError = true
        return
      }

      if (!this.password) {
        this.error = "Password is required"
        this.hasError = true
        return
      }

      this.$store.dispatch("login", {
        username: this.username,
        password: this.password
      })
    },
    closeLoginErrorWarning() {
      this.$store.commit("setLoginError", false)
    }
  }
}
</script>

<style scoped>
</style>