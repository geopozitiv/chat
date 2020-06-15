import axios from 'axios'
import URL from '@/util/Url.js'

export default {
    state: () => ({ 
        rooms: [],
        room_id: '',
        roomPage: {
            page: 1,
            hasNextPage: true
        }
    }),
    getters: { 
        rooms: state => state.rooms,
        room_id: state => state.room_id,  
        roomsHasNextPage: state => state.roomPage.hasNextPage,
     },
    mutations: { 
        ADD_NEW_ROOMS(state, data) {
            state.rooms.push(...data)
        },
        ADD_NEW_ROOM(state, data) {
            state.rooms.unshift(data)
        },
        ADD_ALL_ROOMS(state, data) {
            state.rooms = data
        },
        ADD_ROOM_ID(state, data) {
            state.room_id = data
        },
        ADD_ROOMS_INFO(state, data) {
            state.roomPage.page = data.nextPage
            state.roomPage.hasNextPage = data.hasNextPage
        },
    },
    actions: { 
        ROOM_CREATE({commit},{name}) {
            axios.post(`${URL.host}/api/rooms`, {name})
            .then(res => {
                if(res.data) {
                  commit('ADD_NEW_ROOM', res.data)
                }
            }).catch(err => {
                if(err) return "error"
            })
        },
        ROOM_ALL({commit, state}) {
             if(state.roomPage.hasNextPage) {
              return axios.get(`${URL.host}/api/rooms/all`, {
             params: {
                page: state.roomPage.page,
            }
            })
            .then(res => {
              if(res.data) {
                commit('ADD_NEW_ROOMS', res.data.rooms)
                commit('ADD_ROOMS_INFO', res.data.info)
                return "ok"
            }
    
            }).catch(err => {
              if(err) return "error"
            })
           }
        },
     },
    
  }
