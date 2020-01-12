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

<div class="mx-5 hidden-sm-and-down">
    <v-row align="center" justify="center">
      <v-col cols="4">
        <cryptoChart :dateRange="date" fromCurrency="BTC" toCurrency="USD" toCurrencySymbol="$" />
      </v-col>
      <v-col cols="4">
        <barChart :dateRange="date" fromCurrency="ETH" toCurrency="EUR"/>
      </v-col>
      <v-col cols="4">
        <lineChart :dateRange="date" fromCurrency="XRP" toCurrency="AMD" color="#ffff00"/>
      </v-col>
    </v-row>
</div>

<div class="mx-5 hidden-md-and-up">
        <cryptoChart class="mb-5" :dateRange="date" fromCurrency="BTC" toCurrency="USD" toCurrencySymbol="$" />
        <barChart class="mb-5" :dateRange="date" fromCurrency="ETH" toCurrency="EUR" />
        <lineChart class="mb-5" :dateRange="date" fromCurrency="XRP" toCurrency="AMD"  color="#ffff00"/>
</div>

    <div v-if="!this.$store.getters.getIsAuth">
      <!-- For update when isAuth changed -->
    </div>
  </div>
</template>

<script>
import cryptoChart from "@/components/cryptoChart";
import barChart from "@/components/barChart";
import lineChart from "@/components/lineChart";

export default {
  components: {
    cryptoChart,barChart,lineChart
  },
  data: () => ({
    username: process.browser ? localStorage.getItem("username") : "",
    menu: false,
    date: ["2020-01-01", "2020-01-10"]
  }),
  created() {
    if (process.browser) {
      if (!localStorage.getItem("username")) {
        this.$router.push({ path: "/login" })
      }
      else{
        this.$store.commit("setIsAuth" , true)
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
