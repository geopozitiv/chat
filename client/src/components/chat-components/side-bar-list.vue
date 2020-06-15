<template>
    <div class="room_inner" ref="list">
        <v-layout 
        class="room_list" 
        :class="room_id === item.id ? 'selected' : ''"
        v-for="(item, index) in roomsList" 
        :key="index"
        @click="getRoom(item.id)"
        > 
            <v-col cols="10">
                {{item.name}}
            </v-col>
            <v-col cols="2" class="room_list_more_info">
                <!-- you can add here some info... -->
                <!-- {{item.info}} -->
            </v-col>
        </v-layout>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
     data() {
        return {
            scrollListPagination: true
        }
    },
    computed:{
        roomsList() {
            if(this.searchText.length) return this.searchList
            if(this.rooms) {
                return this.rooms
            }else { 
                return []
            }   
        },
        ...mapGetters([
            'room_id',
            'roomsHasNextPage',
            'searchList',
            'searchText',
            'rooms'
        ])
    },
    mounted() {
       this.$refs.list.addEventListener("DOMMouseScroll", this.handleScroll);
    },
    methods: {
        async getAllRooms() {
            await this.$store.dispatch('ROOM_ALL')
        },
        async getRoom(id) {
            this.$socket.emit('connectToRoom', {data: '', id})
            await this.$store.dispatch('ROOM_MESSAGES', {id})
        },
        loadMore () {
            this.scrollListPagination = false;
            if(this.searchText.length) {
                return this.$store.dispatch('ROOM_SEARCH_LOAD_MORE')
                .then(res => {
                    if(res) {
                        this.scrollListPagination = true;
                    }
                })
            }
            if(this.roomsHasNextPage) {
                this.$store.dispatch('ROOM_ALL')
                .then(res => {
                    if(res) {
                        this.scrollListPagination = true;
                    }
                })
            }
        },
        handleScroll(e) {
            const list = this.$refs.list;
            const delta = e.detail;
            if (list.scrollTop + list.clientHeight >= list.scrollHeight - 200 && delta > 0) {
                if (this.scrollListPagination) {
                    this.loadMore();
                }
            }
        },

    }
}
</script>
<style scoped>
    .room_list  {
        color: #E1CA96;
        border-top: 1px solid #E1CA96;
        background-color: rgb(54, 60, 56);
        transition: all 0.5s ease;
        max-height: 50px;
    }
    .room_list:hover {
        cursor: pointer;
        background: rgb(35, 38, 37);
        box-shadow: 0 0 12px rgb(58, 60, 59);
    }
    .room_list_more_info {
        text-align: right;
    }
    .selected {
        background: rgb(35, 38, 37);
    }
    .room_inner {
        display: flex;
        overflow-y: scroll;
        height: calc(100vh - 173px);
        padding-left: 0;
        position: relative;
        overflow-x: hidden;
        scrollbar-width: none;
        flex-grow: 999;
        flex-direction: column;
        justify-content: flex-start;
        transition: all 0.5s;
    }
    .room_inner::-webkit-scrollbar {
        width: 0px;
        background: transparent;
    }
    .room_inner::-webkit-scrollbar-track,
    .room_inner::-webkit-scrollbar-thumb {
        background-color: transparent
    }
</style>