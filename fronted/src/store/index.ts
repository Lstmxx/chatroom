import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import room from './module/room'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    room
  }
})
