<template>
  <div class="chat">
    <Header/>
    <Chat/>
  </div>
</template>

<script>
// @ is an alias to /src
import Chat from '@/components/chat.vue'
import Header from '@/components/Header.vue'
import init from '@/util/initChat.js'

export default {
  name: 'home',
  components: {
    Chat,
    Header
  },
  created() {
    init()
  },
  mounted() {
    this.InitChat()
  },
  computed: {
    token() {
      return this.$store.state.token
    }
  },
  methods: {
    async InitChat() {
      await this.$store.dispatch('USER_INFO')
      await this.$store.dispatch('ROOM_ALL')
    }
  }
}
</script>
