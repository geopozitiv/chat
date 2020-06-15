import Vue from 'vue'
import Vuex from 'vuex'
import URL from '@/util/Url.js'
import axios from 'axios'
import search from './modules/search'
import messages from './modules/messages'
import Rooms from './modules/rooms'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    search,
    messages,
    Rooms
  },
  state: {
    token: '',
    user: null,
    socket: {},
  },
  getters: {
    token: state => state.token 
  },
  mutations: {
    ADD_TOKEN(state, data) {
      return state.token = data
    },
    ADD_USER_DATA(state, data) {
      state.user = data
    },
    ADD_SOCKET(state, data) {
      state.socket = data
    },
  },
  actions: {
    USER_SIGNIN({commit}, {email, password}) {
      return axios.post(`${URL.host}/api/users/signin`, {email, password})
      .then(res => { 
        if(res.data) {
          commit('ADD_TOKEN', res.data.token)
          commit('ADD_USER_DATA', res.data.user)
          localStorage.setItem('token', res.data.token);
          if(res.data.token) return "ok"
        }
      }).catch(err => {
        if(err) return "error"
      })
    },
    USER_SIGNUP({commit}, {email, password, name}) {
      return axios.post(`${URL.host}/api/users/signup`, {email, password, name})
      .then(res => {
        if(res.data) {
          commit('ADD_TOKEN', res.data.token)
          commit('ADD_USER_DATA', res.data.user)
          localStorage.setItem('token', res.data.token);
          if(res.data.token) return "ok"
        } 
      }).catch(err => {
        if(err) return "error"
      })
    },
    USER_LOGOUT() {
      return axios.post(`${URL.host}/api/users/logout`)
      .then(res => {
        if(res) {
          localStorage.removeItem('token')
          return "ok"
        } 
      }).catch(err => {
        if(err) return "error"
      })
    },
    USER_INFO({commit, state}) {
      axios.get(`${URL.host}/api/users/me`, {token: state.token})
      .then(res => {
        if(res.data) {
          commit('ADD_USER_DATA', res.data)
        } 
      }).catch(err => {
        if(err) return "error"
      })
    },
    SOCKET_connected({commit}, data) {
      commit('ADD_SOCKET', data)
    },
  }
})
