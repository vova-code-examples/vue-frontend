<template>
  <v-container>
    <v-row>
      <v-col>
        <basic></basic>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Basic from '@/components/auth/BasicSignIn.vue'

export default {
  components: { Basic },
  name: 'SignInView'
}
</script>