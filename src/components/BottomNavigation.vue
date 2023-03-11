<template>
  <v-bottom-navigation>
    <v-btn :to="{name: 'main'}"><span>Main</span><v-icon>mdi-hexagon-multiple-outline</v-icon></v-btn>
    <v-btn :to="{name: 'cities'}"><span>Cities</span><v-icon>mdi-city-variant-outline</v-icon></v-btn>
    <v-btn v-on:click="logout"><span>Logout</span><v-icon>mdi-logout</v-icon></v-btn>

  </v-bottom-navigation>
</template>

<script>
  export default {
    data: () => ({ value: 1 }),


    methods: {
      logout(){
        this.$store.dispatch('logout').then(()=>{ this.$router.push({ name: 'auth'}) })
      },
    }
  }
</script>