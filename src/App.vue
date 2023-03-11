<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <bottom-navigation v-if="isLoggedIn"></bottom-navigation>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"/>
    </v-overlay>
    <v-dialog v-model="errorMessageDialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ errorMessage }}
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeErrorMessage()">
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>    
  </v-app>
</template>


<script>
import AuthService from "@/services/AuthService"
import BottomNavigation from '@/components/BottomNavigation.vue'

export default {
  name: 'App',
  components: { BottomNavigation },

  data: () => ({
    active: true,
   
  }),
  computed: {
    isLoggedIn(){
      return AuthService.isLoggedIn();
    },
    isLoading(){
      return this.$store.getters.isLoading
    },
    errorMessageDialog(){
      return this.$store.getters.errorMessage != null
    },
    errorMessage(){
      return this.$store.getters.errorMessage
    },

  },
  methods:{
      closeErrorMessage(){
        this.$store.commit('clearErrorMessage')
      }
    }  
};
</script>
