<template>
  <div class="chat-room">
    <RoomList @create-room-success="handleCreateJoinRoom" :roomList="roomList"></RoomList>
    <MessageBox v-if="selectedRoom"></MessageBox>
  </div>
</template>
<script>
import RoomList from '@/components/chat-room/room-list'
import MessageBox from '@/components/chat-room/message-box'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ChatRoom',
  components: {
    RoomList,
    MessageBox
  },
  mounted () {
    this.loadRoomList().then((roomList) => {
      const request = {
        roomList: roomList.map(room => room.id),
        userId: this.userId
      }
      console.log(this.userId)
      this.$socket.emit('join_all', request)
    }).catch((err) => {
      console.log(err)
    })
  },
  computed: {
    ...mapGetters({
      roomList: 'getRoomList',
      userId: 'getUserId',
      selectedRoom: 'getSelectedRoom'
    })
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'loadRoomList'
    ]),
    handleCreateJoinRoom (room) {
      const roomList = this.roomList
      roomList.push(room)
      this.$store.commit('setRoomList', roomList)
      const request = {
        roomId: room.id,
        userId: this.userId
      }
      this.$socket.emit('join_one_chat', request)
    }
  }
}
</script>
<style lang="less" scoped>
@import './chat-room.less';
</style>
