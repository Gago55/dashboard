<template>
  <div>
    <v-app-bar dark>
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer />
      <span class="mr-3">{{username}}</span>
      <v-btn @click="logout">Log Out</v-btn>
    </v-app-bar>

    <v-row align="center" justify="center">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
      >
        <template v-slot:activator="{ on }">
          <div class="mt-2">
            <v-text-field v-model="date" label="Pick Range" readonly v-on="on"></v-text-field>
          </div>
        </template>
        <v-date-picker v-model="date" no-title range>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
    </v-row>

    <v-row align="center" justify="center">
      <cryptoChart class="mt-5" :dateRange="date" fromCurrency="BTC" toCurrency="USD" toCurrencySymbol="$" />
      <cryptoChart class="mt-5" :dateRange="date" fromCurrency="ETH" toCurrency="EUR" toCurrencySymbol="€" fill round/>
      <cryptoChart class="mt-5" :dateRange="date" fromCurrency="XRP" toCurrency="AMD" toCurrencySymbol="֏" round />
    </v-row>

    <div v-if="!this.$store.getters.getIsAuth">
      <!-- For update when isAuth changed -->
    </div>
  </div>
</template>

<script>
import cryptoChart from "@/components/cryptoChart";

export default {
  components: {
    cryptoChart
  },
  data: () => ({
    username: process.browser ? localStorage.getItem("username") : "",
    menu: false,
    date: ["2020-01-01", "2020-01-10"]
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
    }
  }
};
</script>
