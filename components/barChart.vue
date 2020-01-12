<template>
  <v-card class="px-2 pb-2" style="border-radius:15px">
    <v-card-title>{{fromCurrency}} → {{toCurrency}}</v-card-title>
    <canvas ref="canvas"></canvas>
  </v-card>
</template>

<script>
import { Bar } from "vue-chartjs"
import chartMixin from "@/mixins/chartMixin"

export default {
  extends: Bar,
  mixins:[chartMixin],
  props: {
    dateRange: {
      type: Array,
      required: true
    },
    fromCurrency: {
      type: String,
      required: true
    },
    toCurrency: {
      type: String,
      required: true
    },
    color:{
        type:String,
        default:"#f87979"
    }
  }
}
</script>

<style>
</style>