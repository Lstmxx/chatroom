/* eslint-disable */
import { get } from '@/libs/request'
import { normalizeTimeDetail } from '@/libs/utility/time'
export default {
  state: {
    selectedRoom: null,
    messageList: {},
    roomList: [],
    update: false
  },
  getters: {
    getSelectedRoom (state) {
      return state.selectedRoom
    },
    getRoomList (state) {
      return state.roomList
    },
    getMessageList (state) {
      return state.messageList
    },
    getUpdate (state) {
      return state.update
    }
  },
  mutations: {
    setSelectedRoom (state, selectedRoom) {
      state.selectedRoom = selectedRoom
    },
    setRoomList (state, roomList) {
      state.roomList = roomList
    },
    setMessageList (state, messageList) {
      state.messageList = messageList
    },
    setUpdate (state, update) {
      state.update = update
    }
  },
  actions: {
    loadRoomList ({ commit }) {
      return new Promise((resolve, reject) => {
        const config = {
          url: '/room/list'
        }
        get(config).then((responseData) => {
          commit('setRoomList', responseData.roomList)
          resolve(responseData.roomList)
        }).catch((err) => {
          reject(err)
          console.log(err)
        })
      })
    },
    handleSetSelectedRoom ({ commit }, selectedRoom) {
      console.log(selectedRoom)
      commit('setSelectedRoom', selectedRoom)
    },
    updateComplete ({ commit }) {
      commit('setUpdate', false)
    },
    userInput ({ commit, state }, inputData) {
      const messageList = state.messageList
      if (!messageList[inputData.roomId]) {
        messageList[inputData.roomId] = []
      }
      messageList[inputData.roomId].push(inputData)
      commit('setUpdate', true)
      commit('setMessageList', messageList)
    },
    SOCKET_received ({ state, rootState, commit }, responseData) {
      const messageList = state.messageList
      const user = rootState.user
      console.log(user)
      responseData.time = normalizeTimeDetail(responseData.time)
      if (user.userId === responseData.user.id && responseData.type !== 'join') {
        for (let i = messageList[responseData.roomId].length - 1; i > 0; i--) {
          if (messageList[responseData.roomId][i].user.id === user.userId && responseData.id === messageList[responseData.roomId][i].id) {
            messageList[responseData.roomId][i].loading = false
            messageList[responseData.roomId][i].time = responseData.time
            break
          }
        }
        if (!state.update) {
          commit('setUpdate', true)
        }
      } else {
        if (!messageList[responseData.roomId]) {
          messageList[responseData.roomId] = []
        }
        messageList[responseData.roomId].push(responseData)
        if (!state.update) {
          commit('setUpdate', state.selectedRoom ? responseData.roomId === state.selectedRoom.id : false)
        }
      }
      commit('setMessageList', messageList)
    },
    SOCKET_join_one ({}, responseData) {
      console.log(responseData)
    }
  }
}
