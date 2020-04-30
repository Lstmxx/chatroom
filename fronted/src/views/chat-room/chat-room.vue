<template>
  <div class="chat-room">
    <RoomList @create-room-success="loadRoomList" :roomList="roomList"></RoomList>
    <MessageBox></MessageBox>
  </div>
</template>
<script>
import RoomList from '@/components/chat-room/room-list'
import MessageBox from '@/components/chat-room/message-box'
import { get } from '@/libs/request'
export default {
  name: 'ChatRoom',
  components: {
    RoomList,
    MessageBox
  },
  data () {
    return {
      selectedRoom: '',
      roomList: []
    }
  },
  methods: {
    loadRoomList () {
      const config = {
        url: '/room/list'
      }
      get(config).then((responseData) => {
        this.roomList = responseData.roomList
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import './chat-room.less';
</style>
