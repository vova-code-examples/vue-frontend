<template>
    <v-container fill-height fluid>
      <v-container class="d-flex justify-center">
  
      <div class="d-flex flex-column mb-6">
          <h1 class="display-4">Demo Frontend</h1>
        <v-form fast-fail @submit.prevent="signIn">
            <v-text-field v-model="username" label="Username" :rules="usernameRules"/>
            <v-text-field type="password" v-model="password" label="Password" :rules="passwordRules"/>
            <v-btn type="submit" block class="mt-2">Sign In</v-btn>
        </v-form>
      </div>
      </v-container>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "basic-sign-in",
    data: () => ({
      username: '',
      usernameRules: [
        value => {
          if (value?.length >= 3) return true
          return 'First name must be at least 3 characters.'
        },
      ],
      password: '',
      passwordRules: [
        value => {
          if (value?.length > 0) return true
          return 'Password is required.'
        },
      ],
    }),

    methods: {
        signIn() {
            let signInPayload = {
                "username": this.username,
                "password": this.password
            }
            this.$store.dispatch("signIn", signInPayload).then(() =>{
              this.$router.push({ name: 'main'})
            })
        }
    },
  }
</script>