import axios from 'axios'
import URL from '@/util/Url.js'

export default {
    state: () => ({ 
        messages: [], 
        messagesPageInfo: {},
     }),
    getters: { 
       messages: state => state.messages, 
       messagesCurrentPage: state => state.messagesPageInfo.currentPage,
       messagesLastPage: state => state.messagesPageInfo.totalPages,
       messagesHasNextPage: state => state.messagesPageInfo.hasNextPage
     },
    mutations: { 
        ADD_MESSAGE(state, data) {
           state.messages.push(data)
        },
        ADD_MESSAGES_PAGE_INFO(state, data) {
           state.messagesPageInfo = data
        },
        ADD_MESSAGES(state, data) {
            state.messages = data
          },
        ADD_MORE_MESSAGES(state, data) {
           state.messages.unshift(...data)
        },
     },
    actions: {
        SOCKET_MessageToRoom({commit}, data) {
            commit('ADD_MESSAGE', data)
        }, 
        ROOM_MESSAGES({commit},{id}) {
            axios.get(`${URL.host}/api/rooms/messages`, {params:{id, page: 1}})
            .then(res => {
                if(res.data) {
                commit('ADD_ROOM_ID', id, { root: true })
                commit('ADD_MESSAGES', res.data.messages)
                commit('ADD_MESSAGES_PAGE_INFO', res.data.info)
                }
            }).catch(err => {
                if(err) return "error"
            })
        },
        LOAD_MORE_MESSAGES({commit, state, rootGetters}) {
            if(state.messagesPageInfo.nextPage) {
              return axios.get(`${URL.host}/api/rooms/messages`, {
                params: { 
                    id: rootGetters.room_id, 
                    page: state.messagesPageInfo.nextPage
              }})
              .then(res => {
                commit('ADD_MORE_MESSAGES', res.data.messages)
                commit('ADD_MESSAGES_PAGE_INFO', res.data.info)
                return "ok"
              }).catch(err => {
                console.log(err)
                return ''
              })
            }
          }
     },

  }