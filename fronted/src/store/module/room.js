/* eslint-disable */
import { get, post } from '@/libs/request'
import { normalizeTimeDetail } from '@/libs/utility/time'
export default {
  state: {
    selectedRoom: null,
    messageList: {},
    roomList: [],
    update: false,
    pageData: {
      page: 1,
      pageSize: 10
    }
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
    },
    getPageData (state) {
      return state.pageData
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
    },
    setPageData (state, pageData) {
      state.pageData = pageData
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
    async handleSetSelectedRoom ({ commit, state }, selectedRoom) {
      commit('setSelectedRoom', selectedRoom)
      const messageList = state.messageList
      await new Promise((resolve, reject) => {
        const config = {
          url: '/room-record/page',
          data: {
            room_id: selectedRoom.id,
            page: 1,
            pageSize: 15
          }
        }
        post(config).then((responseData) => {
          const usrMap = {}
          responseData.userList.forEach(data => {
            usrMap[data.id] = data
          })
          const recordList = responseData.recordList.map(record => {
            return {
              id: '',
              time: normalizeTimeDetail(record.createTime),
              type: 'input',
              roomId: record.roomId,
              message: record.content,
              loading: false,
              user: usrMap[record.userId]
            }
          })
          messageList[selectedRoom.id] = recordList.reverse()
          commit('setMessageList', messageList)
          if (!state.update) {
            commit('setUpdate', true)
          }
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
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
      const j = new Date()
      j.getTimezoneOffset
      responseData.time = new Date(responseData.time)
      responseData.time.setHours(responseData.time.getHours() - responseData.time.getTimezoneOffset() / 60)
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
    },
    SOCKET_test_received ({}, responseData) {
      console.log(responseData)
    }
  }
}
