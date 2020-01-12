<template>
  <v-card class="px-2 pb-2" style="border-radius:15px">
    <v-card-title>{{fromCurrency}} → {{toCurrency}}</v-card-title>
    <canvas ref="canvas"></canvas>
  </v-card>
</template>

<script>
import { Line } from "vue-chartjs"
import chartMixin from '@/mixins/chartMixin'

export default {
  extends: Line,
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
    },
    fill:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style>
</style>