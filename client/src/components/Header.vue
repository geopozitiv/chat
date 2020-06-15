<template>
<div>
  <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      color="#626C66"
      v-if="token"
      class="navigation"
  >
    <sideBar/>
  </v-navigation-drawer>
  <div class="header">
    <v-row>
        <v-col cols="4" sm="4" md="2" lg="2" xl="2" class="logo-inner">
            <v-app-bar-nav-icon 
              @click.stop="drawer = !drawer" 
              class="nav-icon"
              v-if="token"
            ></v-app-bar-nav-icon>
            <img class="logo" src="@/assets/img/logo.png" alt="">
        </v-col>
         <v-col cols="5" sm="5" md="9" lg="9" xl="9"></v-col>
         <v-col cols="3" sm="3" md="1" lg="1" xl="1" class="profile-inner"><Profile/></v-col>
    </v-row>
  </div>
</div>
</template>
<script>
import Profile from './Profile.vue'
import sideBar from './chat-components/side-bar'
import {mapGetters} from 'vuex'

export default {
   components: {
     Profile,
     sideBar
   },
   data() {
    return {
      drawer: false,
    }
  },
  computed: {
      ...mapGetters([
        'token',
      ])
  }
}
</script>

<style scoped>
    .header {
        background: #918B76;
    }
    .logo-inner {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .profile-inner {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 30px;
    }
    .logo {
        height: 30px;
        padding-left: 20px;
    }
    .nav-icon {
      display: none;
      margin-left: 15px;
    }
    .navigation {
      display: none;
    }
    @media only screen and (max-width: 959px) {
      .side_bar {
        display: none;
      }
      .logo {
        height: 22px;
      }
      .nav-icon,
      .navigation {
        display: block;
      }
    }
</style>