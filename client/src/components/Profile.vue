<template>
  <div class="text-center" v-if="token">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          depressed
          dark
          fab
          width="40"
          height="40"
          v-on="on"
          color="#7e7866"
        >
        <v-icon color="#c8c3b4">person</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title class="logout" @click="logout()">Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
    methods: {
        async logout() {
            const logout = await this.$store.dispatch('USER_LOGOUT');
            if(logout === 'ok') this.$router.go('/')

        }
    },
    computed: {
        token() {
            return this.$store.state.token
        }
    }
}
</script>

<style scoped>
    .logout {
        cursor: pointer;
    }

</style>