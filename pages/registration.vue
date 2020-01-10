<template>
  <div>
    <v-card raised light width="400">
      <v-card-title>Registration</v-card-title>
      <v-form class="mx-10">
        <v-text-field v-model="username" label="Username"></v-text-field>
        <v-text-field v-model="password" type="password" label="Password"></v-text-field>
        <v-text-field v-model="confirmPassword" type="password" label="Confirm password"></v-text-field>
      </v-form>
      <v-card-actions>
        <v-spacer />
        <v-btn class="mr-3 mb-3" link to="/login">Login</v-btn>
        <v-btn class="mr-3 mb-3" @click="submit">Register</v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar v-model="hasError" top color="error">
      {{ error }}
      <v-btn text @click="hasError = false">Close</v-btn>
    </v-snackbar>

    <v-snackbar v-model="successSnackbar" top color="success">
      Registration successfully completed!
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      hasError: false,
      error: "",
      successSnackbar: false
    }
  },
  created(){
    if (process.browser) {
      if (localStorage.getItem("username")) {
        this.$router.push({ path: "/" })
        this.$store.commit("setIsAuth", true)
      }
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

      if (this.password.length < 7) {
        this.error = "Password must be at least 8 symbols"
        this.hasError = true
        return
      }

      if (this.password !== this.confirmPassword) {
        this.error = "The passwords do not match"
        this.hasError = true
        return
      }

      this.$store.commit("addUser", {
        username: this.username,
        password: this.password
      })
      this.successSnackbar = true
    }
  }
}
</script>

<style scoped>
</style>