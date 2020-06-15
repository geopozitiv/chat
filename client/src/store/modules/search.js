import axios from 'axios'
import URL from '@/util/Url.js'

export default {
    state: () => ({ 
        search: {
            docs: [],
            searchText: '',
            info: {
              nextPage: 1,
              hasNextPage: true,
            }
          },
     }),
    getters: { 
       searchList: state => state.search.docs,
       searchText: state => state.search.searchText,
     },
    mutations: { 
        ADD_SEARCH(state, data) {
            return state.search.docs = data
        },
        ADD_SEARCH_LOAD_MORE(state, data) {
            return state.search.docs.push(...data)
        },
        ADD_SEARCH_INFO(state, data) {
            return state.search.info = data
        },
        ADD_SEARCH_TEXT(state, data) {
            return state.search.searchText = data
        },
     },
    actions: { 
        ROOM_SEARCH({commit}, data = '') {

            commit('ADD_SEARCH_TEXT', data)
    
            axios.get(`${URL.host}/api/rooms/all`, {
              params: {
                page: 1,
                search: data
              }
            })
            .then(res => {
              if(res.data) {
                commit('ADD_SEARCH', res.data.rooms)
                commit('ADD_SEARCH_INFO', res.data.info)
              }
    
            }).catch(err => {
              if(err) return "error"
            })
        },
        ROOM_SEARCH_LOAD_MORE({commit, state}) {
          const nextPage = state.search.info.nextPage
          const searchPage = nextPage ? nextPage : ''
          const searchText = state.search.searchText
    
          if(nextPage) {
            return axios.get(`${URL.host}/api/rooms/all`, {
              params: {
                page: searchPage,
                search: searchText
              }
            })
            .then(res => {
              if(res.data) {
                commit('ADD_SEARCH_LOAD_MORE', res.data.rooms)
                commit('ADD_SEARCH_INFO', res.data.info)
                return "ok"
              }
    
            }).catch(err => {
              if(err) return "error"
            })
          } else { return "ok"}
        },
     }

  }
