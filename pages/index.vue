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
        <!-- <cryptoChart :dateRange="date" fromCurrency="BTC" toCurrency="USD" toCurrencySymbol="$" /> -->
        <lineChart :dateRange="date" fromCurrency="BTC" toCurrency="USD" color="#0000ff"/>
      </v-col>
      <v-col cols="4">
        <barChart :dateRange="date" fromCurrency="ETH" toCurrency="EUR"/>
      </v-col>
      <v-col cols="4">
        <lineChart :dateRange="date" fromCurrency="XRP" toCurrency="AMD" color="#ffff85" fill/>
      </v-col>
    </v-row>
</div>

<div class="mx-5 hidden-md-and-up">
        <lineChart class="mb-5" :dateRange="date" fromCurrency="BTC" toCurrency="USD" color="#0000ff" />
        <barChart class="mb-5" :dateRange="date" fromCurrency="ETH" toCurrency="EUR" />
        <lineChart class="mb-5" :dateRange="date" fromCurrency="XRP" toCurrency="AMD"  color="#ffff85" fill/>
</div>

  </div>
</template>

<script>
import barChart from "@/components/barChart"
import lineChart from "@/components/lineChart"
import { mapState } from "vuex"

export default {
  components: { barChart,lineChart },
  data: () => ({
    username: process.browser ? localStorage.getItem("username") : "",
    menu: false,
    date: ["2020-01-01", "2020-01-10"]
  }),
  computed: {
    ...mapState(["isAuth"])
  },
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
  watch:{
    isAuth(value){
      if (!value) {
        this.$router.push({ path: "/login" })
      }
    } 
  },
  methods: {
    logout() {
      localStorage.removeItem("username")
      this.$store.commit("setIsAuth", false)
    }
  }
}
</script>
