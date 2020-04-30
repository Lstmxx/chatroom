import { getToken, setToken } from '../../libs/utility/token'
import { login, getUserInfo, logout } from '@/libs/request'

export default {
  state: {
    token: getToken(),
    userName: null
  },
  getters: {
    getToken (state) {
      return state.token
    },
    getUserName (state) {
      return state.userName
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setUserName (state, name) {
      state.userName = name
    }
  },
  actions: {
    handleLogin ({ commit }, config) {
      return new Promise((resolve, reject) => {
        login(config).then((responseData) => {
          commit('setToken', responseData.token)
          commit('setUserName', responseData.userName)
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
        logout().then(() => {
          commit('setUserName', null)
          commit('setToken', null)
          resolve()
        }).catch((err) => {
          reject(err)
          console.log(err)
        })
      })
    }
  }
}
