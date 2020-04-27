import { getToken, setToken } from '../../libs/utility/token'
import { login, getUserInfo, logout } from '@/libs/request'

export default {
  state: {
    token: getToken(),
    userName: null,
    role: null
  },
  getters: {
    getToken (state) {
      return state.token
    },
    getUserName (state) {
      return state.userName
    },
    getRole (state) {
      return state.role
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setUserName (state, name) {
      state.userName = name
    },
    setRole (state, role) {
      state.role = role
    }
  },
  actions: {
    handleLogin ({ commit }, config) {
      return new Promise((resolve, reject) => {
        login(config).then((responseData) => {
          commit('setToken', responseData.token)
          commit('setUserName', responseData.userName)
          commit('role', responseData.role)
          resolve(responseData)
        }).catch((err) => {
          reject(err)
          console.log(err)
        })
      })
    },
    loadUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then((responseData) => {
          commit('setToken', getToken())
          commit('setUserName', responseData.userInfo.name)
          commit('role', responseData.userInfo.role)
          resolve(responseData)
        }).catch((err) => {
          commit('setToken', null)
          reject(err)
          console.log(err)
        })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then((responseData) => {
          commit('setUserName', null)
          commit('setToken', null)
          commit('role', null)
          resolve()
        }).catch((err) => {
          reject(err)
          console.log(err)
        })
      })
    }
  }
}
