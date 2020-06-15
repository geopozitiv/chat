<template>
<div class="chat-room">
  <Header/>
 <v-container >
  <v-row>
  <v-col cols="5">
     <h1>Sign in</h1>
    <div class="login">
      <Login/>
    </div>
  </v-col>
  <v-col cols="1">
  </v-col>
  <v-col cols="5">
     <h1>Sign up</h1>
    <div class="login">
      <Register/>
    </div>
  </v-col>
  </v-row>
  </v-container>
</div>
</template>

<script>
import Login from '@/components/login-form.vue'
import Register from '@/components/register-form.vue'
import Header from '@/components/Header.vue'

export default {
  components: {
    Login,
    Register,
    Header
  },

}
</script>
<style scoped>
   .chat-room {
        background: #E1CA96;
        height: 100%;
    }
</style>