/* eslint-disable */
export default {
  state: {
    selectedRoom: null,
    messageList: {}
  },
  getters: {
    getSelectedRoom (state) {
      return state.selectedRoom
    }
  },
  mutations: {
    setSelectedRoom (state, selectedRoom) {
      state.selectedRoom = selectedRoom
    }
  },
  actions: {
    handleSetSelectedRoom ({ commit }, selectedRoom) {
      console.log(selectedRoom)
      commit('setSelectedRoom', selectedRoom)
    },
    SOCKET_received ({}, reponseData) {
      console.log(reponseData)
    },
    SOCKET_join_one ({}, responseData) {
      console.log(responseData)
    }
  }
}
