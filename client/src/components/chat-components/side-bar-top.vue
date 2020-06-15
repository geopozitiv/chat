<template>
    <div>
        <v-btn 
        color="#363C38"
        block
        depressed
        height="40"
        tile
        class="side_btn"
        @click="show_form ? show_form = false : show_form = true"
        >{{show_form ? "Search":"+ new room"}}</v-btn>
        <div class="form_room_create" v-if="show_form">
            <v-layout class="hide_bottom_form"> 
                <v-col cols="8">
                    <v-text-field
                    label="create new chat"
                    outlined
                    color="#E1CA96"
                    height="20"
                    dense
                    v-model="new_chat_name"
                    ></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-btn 
                    color="#363C38"
                    block
                    depressed
                    height="40"
                    tile
                    :disabled="showNewRoomBtn"
                    class="side_btn"
                    @click.prevent="createNewChat()"
                    >add</v-btn>
                </v-col>
            </v-layout>
        </div>
        <v-layout  v-if="!show_form"> 
            <v-col class="hide_bottom_form">
                <v-text-field
                    label="search"
                    outlined
                    color="#E1CA96"
                    height="20"
                    dense
                    single-line
                    class="search-input"
                    v-model="search"
                    append-icon="search"
                ></v-text-field>
            </v-col>
        </v-layout>
    </div>
</template>

<script>
export default {
     data() {
        return {
            show_form: false,
            new_chat_name: '',
            search: ''
        }
    },
    computed:{
        showNewRoomBtn() {
            if(this.new_chat_name.length < 5) return true
            else return false
         }
    },
    watch: {
        search() {
           this.sendSearch()
        }
    },
    methods: {
        createNewChat() {
            this.$store.dispatch('ROOM_CREATE', {name: this.new_chat_name})
            this.new_chat_name = ''
        },
        sendSearch() {
            this.$store.dispatch('ROOM_SEARCH', this.search)
        }
    }
}
</script>
<style scoped>
    .side_btn  {
        color: #E1CA96
    }
    .hide_bottom_form {
        display: flex;
        justify-content: space-between;
    }
    .search-input {
        margin-right: 10px;
    }
    .search-icon {
        cursor: pointer;
    }
    .hide_bottom_form 
    >>> .v-text-field.v-text-field--enclosed 
    .v-text-field__details {
        display: none !important;
    }

</style>