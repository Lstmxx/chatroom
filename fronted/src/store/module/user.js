import { getToken, setToken } from '../../libs/utility/token'
import { login, getUserInfo, logout } from '@/libs/request'

export default {
  state: {
    token: getToken(),
    userName: null,
    userId: null,
    avatarImage: null
  },
  getters: {
    getToken (state) {
      return state.token
    },
    getUserName (state) {
      return state.userName
    },
    getUserId (state) {
      return state.userId
    },
    getAvatarImage (state) {
      return state.avatarImage
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
    setUserId (state, userId) {
      state.userId = userId
    },
    setAvatarImage (state, avatarImage) {
      state.avatarImage = avatarImage
    }
  },
  actions: {
    handleLogin ({ commit }, config) {
      return new Promise((resolve, reject) => {
        login(config).then((responseData) => {
          commit('setToken', responseData.token)
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
          commit('setUserId', responseData.userInfo.userId)
          commit('setAvatarImage', responseData.userInfo.avatar_image)
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
