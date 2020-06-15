<template>
<div class="chat-room" >
    <button class="btn-bottom" :class="btnIsVisible" @click="scrollToBottom">
        <v-icon>expand_more</v-icon>
    </button>
    <div class="chat-room_info" v-if="room_id && !messages.length">Write first message</div>
    <div class="chat-room_info" v-if="!room_id">Select room</div>
    <div class="messages-inner" ref="list">
        <loading  v-if="!loadingMessage && messagesHasNextPage" />
        <div v-for="(item, index) in messages" :key="index" class="message-inner">
            <div class="messages-top">
               {{item.user.name}}
               {{dateFormat(item.createdAt)}}
            </div>
           <div class="messages" :class="userMessage(item.user._id)"> 
               {{item.text}}
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import formatDate from '@/util/formatDate'
import loading from './loading'

export default {
    data() {
        return {
            loadingMessage: true,
            isVisible: false,
            initalScrollheight : 0,
            scrollTop: 0,
        }
    },
    components: {
        loading,
    },
    mounted() {
        this.scrollToBottom();
        this.$refs.list.addEventListener("wheel", this.handleScroll);
        this.$refs.list.addEventListener("DOMMouseScroll", this.handleScroll);
    },
    watch: {
        room_id(val) {
            if(val) {
                this.scrollToBottom();
                this.initalScrollheight = 0
            }
        },
        messages(val) {
            if(!this.isVisible && val) {
                this.scrollToEnd();
             }
        }
    },
    computed: {
        messages() {
            return this.$store.state.messages
        },
        userId() {
            return this.$store.state.user._id
        },
        btnIsVisible() {
            return { 'is-visible': this.isVisible }
        },
        ...mapGetters([
            'messages',
            'room_id',
            'messagesLastPage',
            'messagesCurrentPage',
            'messagesHasNextPage',
        ])
    },
    methods: {
        userMessage(id) {
            return id === this.userId ? 'user-message' : ''
        },
        dateFormat(date) {
            return formatDate(date)
        },
        positionScroll() {
            return this.$refs.list.scrollTop = this.$refs.list.scrollHeight - this.initalScrollheight
        },
        scrollToEnd() {
            const ul = this.$refs.list;
            this.$nextTick(() => {
                ul.scrollTo({
                    top: ul.scrollHeight,
                    behavior: 'smooth',
                });
            })
        },
        scrollToBottom() {
            this.scrollToEnd();
            this.isVisible = false
        },
        loadMore () {
            this.loadingMessage = false;
            let list = this.$refs.list
            this.initalScrollheight = list.scrollHeight

            this.$store.dispatch('LOAD_MORE_MESSAGES')
            .then(res => {
                if(res) {
                    this.loadingMessage = true;
                    this.positionScroll()
                }
            })
        },
        handleScroll(e) {
            const list = this.$refs.list;
            const delta = e.wheelDelta || -e.detail;
            if(list.scrollTop + list.clientHeight <= list.scrollHeight - 50) {
                this.isVisible = true;
            } else {
                this.isVisible = false;
                this.resetCount;
            }
            if(this.messagesHasNextPage) {
                if(delta > 0 && list.scrollTop <= 50) {
                    if (this.loadingMessage) {
                        this.loadMore();
                    }
                }
            }

        },
    }
}
</script>

<style scoped>
    .messages {
        padding: 12px;
        background: #626C66;
        display: flex;
        color: #E1CA96;
        width: max-content;
        max-width: 90%;
        border-top-right-radius: 8px;
        border-bottom-left-radius: 8px;
    }
    .messages-top {
        margin-top: 12px;
        font-size: 12px;
        color: #626C66;
    }
    .user-message {
       background: #918B76;
       color: #000;
    }
    .messages-inner {
        display: flex; 
        overflow-y: scroll;
        height: calc(100vh - 150px);
        padding-left: 15px;
        position: relative;
        overflow-x: hidden;
        scrollbar-width: none;
        flex-grow: 999;
        flex-direction: column;
        justify-content: flex-start;
        transition: all 0.5s;
    }
    .chat-room {
      display: flex;
    }
    .chat-room_info {
        width: 100%;
        padding-left: 15px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        color: #bfad82;
    }
    .messages-inner::-webkit-scrollbar {
        width: 0px;
        background: transparent;
    }
    .messages-inner::-webkit-scrollbar-track,
    .messages-inner::-webkit-scrollbar-thumb {
        background-color: transparent
    }
    .btn-bottom {
        position: absolute;
        z-index: 3;
        bottom: 0px;
        right: 24px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #626C66;
        display: flex;
        justify-content: center;
        align-items: center;
        outline: 0;
        opacity: 0;
        box-shadow: 0px 2px 4px rgba(2, 13, 42, 0.4);
        visibility: hidden;
        transition: all .3s ease;
    }
    .btn-bottom.is-visible {
        opacity: 1;
        visibility: visible;
    }
    .btn-bottom:active {
        background: #626C66;
        outline: 0;
    }
    .btn-bottom:hover {
        background: #626C66;
    }
    .btn-bottom .v-icon {
        color: #E1CA96;
        font-size: 34px;
    }
    .btn-bottom__count {
        position: absolute;
        top: -5%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #d1f2d2;
        border: 2px solid #FFFFFF;
        font-size: 12px;
        color: #2E8330;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 20px;
        min-height: 20px;
        border-radius: 50px;
        padding: 0px 4px;
    }

</style>