<template>
  <div>
    <v-app-bar dark>
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer />
      <span class="mr-3">{{username}}</span>
      <v-btn @click="logout">Log Out</v-btn>
    </v-app-bar>

    <v-row align="center" justify="center">
      <cryptoChart class="mt-5"/>
    </v-row>

    <div v-if="!this.$store.getters.getIsAuth">
      <!-- For update when isAuth changed -->
    </div>
  </div>
</template>

<script>
import cryptoChart from "@/components/cryptoChart"

export default {
  components:{
    cryptoChart
  },
  data: () => ({
    username: process.browser ? localStorage.getItem("username") : "" ,

  }),
  created() {
    if (process.browser) {
      if (!localStorage.getItem("username")) {
        this.$router.push({ path: "/login" });
      }
    }
  },
  updated() {
    if (!this.$store.getters.getIsAuth) {
      this.$router.push({ path: "/login" });
    }
  },
  methods: {
    onclick() {
      this.$store.commit("addUser", { username: "gag", password: "fuck" });
    },
    logout() {
      localStorage.removeItem("username");
      this.$store.commit("setIsAuth", false);
    },
    
  }
};
</script>
