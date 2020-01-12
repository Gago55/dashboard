<template>
  <v-app>
      <nuxt />
  </v-app>
</template>

<script>
export default {
 created(){
    this.$vuetify.theme.dark = false
  }
}
</script>
