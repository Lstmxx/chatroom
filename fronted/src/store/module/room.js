/* eslint-disable */
import { get } from '@/libs/request'
export default {
  state: {
    selectedRoom: null,
    messageList: {},
    roomList: []
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
    SOCKET_received ({ state, commit }, responseData) {
      console.log(responseData)
      const messageList = state.messageList
      if (!messageList[responseData.roomId]) {
        messageList[responseData.roomId] = []
      }
      messageList[responseData.roomId].push(responseData)
      commit('setMessageList', messageList)
    },
    SOCKET_join_one ({}, responseData) {
      console.log(responseData)
    }
  }
}
