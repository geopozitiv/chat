<template>

    <div class="input-container dark" v-if="room_id">
        <div class="input-container__field">
            <v-textarea
                data-vv-name="message"
                label="write text"
                rows="1"
                auto-grow
                color="#E1CA96"
                hide-details=""
                outlined
                dense
                class="input-main"
                v-model.trim="message"
                @keydown="onSendHandler($event)"
                ></v-textarea>
        </div>
        <div class="input-container__action">
            <v-icon class="input-container__icon" size="32" @click.prevent="send">double_arrow</v-icon>
        </div>
    </div>

</template>
<script>
import {mapGetters} from 'vuex'

export default {
    data() {
        return {
            message: ''
        }
    },
    computed: {
        isMacintosh() {
            return navigator.platform.indexOf('Mac') > -1
        },

        ...mapGetters([
            'room_id',
        ])
    },
    methods: {
        onSendHandler(e) {
            let isMac = this.isMacintosh;
            let isPc = !isMac;
            if(isPc) {
                if(e.ctrlKey && (e.keyCode == 13 || e.keyCode == 10)) {
                    this.send()

                }
            }
            if(isMac) {
                if (e.metaKey && (e.keyCode == 13 || e.keyCode == 10)) {
                    this.send()
                }
            }
        },
        resetInputs() {
            this.message = ''
        },
        send () {
            if(this.message) {
                const message = this.message.toString()
                this.$socket.emit('sendMessage', {message, id:this.room_id})
                this.resetInputs();
            }
        }
    }
}
</script>

<style scoped>
    .input-container {
        display: flex;
        position: fixed;
        bottom: 0;
        width: 75%;
        transition: box-shadow 450ms;
    }
    .input-container__field {
        flex: 1 1 auto
    }
    .input-container.dark {
        background-color: #918b76;
        padding: 18px 16px;
        padding-right: 54px;
        box-shadow: 0px -2px 20px rgba(#010B27, 1);
    }
           
    .input-container.dark .input-container__action {
        right: 16px;
        bottom: 23px;
    }
                
    .input-container__action {
        position: absolute;
        bottom: 27px;
        right: 25px;
        display: flex;
        align-items: center;
    }                   
    .input-container__action .v-icon:hover {
        cursor: pointer
    }
    .input-main >>> .v-text-field__slot {
         max-height: 130px;
         overflow-y: scroll;
         scrollbar-width: none;
    }
    .input-main >>> .v-text-field__slot::-webkit-scrollbar {
        width: 0px;
        background: transparent;
    }      
    .input-container.dark >>> 
    .v-text-field > 
    .v-input__control > 
    .v-input__slot > 
    .v-text-field__slot {
        position: initial;
    }
   .input-container.dark >>> .v-label.v-label--active {
        top: 8px;
        font-size: 14px;
        background: #918b76;
        border-radius: 5px;
    }  
    .input-container.dark >>>
    .v-text-field--outlined.v-input--dense 
    .v-label {
        left: 15px !important;
    }
    .input-main >>> 
    .v-text-field__slot::-webkit-scrollbar-track,
    .input-main >>>
    .v-text-field__slot::-webkit-scrollbar-thumb {
        background-color: transparent;
    }
    .v-text-field--enclosed {
        caret-color: #020D2A!important;
    }
    @media only screen and (max-width: 1263px) {
      .input-container {
         width: 67%;
      }
    }
    @media only screen and (max-width: 959px) {
      .input-container {
         width: 100%;
      }
    }
               
</style>