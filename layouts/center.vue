<template>
  <v-app>
    <v-row align="center" justify="center">
      <nuxt />
    </v-row>
  </v-app>
</template>

<script>
export default {
  created(){
    this.$vuetify.theme.dark = true
  }
}
</script>
