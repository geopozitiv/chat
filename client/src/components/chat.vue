<template>
  <div >
      <v-layout class="chat">
        <v-col cols="12" sm="4" md="4" lg="3" xl="3" class="side_bar_left">
          <sideBar/>
        </v-col>
        <v-col class="chat-room" cols="12" sm="12" md="8" lg="9" xl="9">
        <chatRoom/>
        <Input/>
        </v-col>
      </v-layout>
  </div>
</template>

<script>
import sideBar from './chat-components/side-bar'
import chatRoom from './chat-components/chat-room'
import Input from './chat-components/chat-input.vue'

export default {
   name: 'chat',
   components: {
    sideBar,
    chatRoom,
    Input
  },
}
</script>

<style scoped>
    .chat {
      height: calc(100vh - 64px);
    }
    .chat-room {
        background: #E1CA96;
    }
    .side_bar_left {
        padding: 0;
        background: #626C66;
    }
    .chat-room {
      position: relative;
      padding: 0;

    }
    @media only screen and (max-width: 959px) {
      .side_bar_left {
        display: none;
      }
    }
  
     
</style>
