import Vue from 'vue';
import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client"
import store from '@/store';
import axios from 'axios'

export default function init() {
    const token = localStorage.getItem('token');
    if(token) {
        store.commit('ADD_TOKEN', token);

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        Vue.use(new VueSocketIO({
            debug: false,
            connection: SocketIO('wss://chat-node-is-server.herokuapp.com', {
            query: {
                token: token
            }
            }),
            vuex: {
                store,
                actionPrefix: 'SOCKET_',
            },
        }))
        }
}

