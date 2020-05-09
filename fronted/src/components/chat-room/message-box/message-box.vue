<template>
  <div class="message-box">
    <div class="message-content">
      <div v-for="(message, index) in messageList[selectedRoom.id]" :key="index">
        <UserMessage :message="message" :reverse="userId === message.id" v-if="message.type !== 'join'" />
        <JoinMessage :message="message" v-else/>
      </div>
    </div>
    <div class="message-input">
      <textarea
      class="input"
      v-model="message"
      placeholder="打字总会吧？"
      rows="3" />
      <el-button type="success" class="send-button" size="small" @click="sendMessage">发送</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import UserMessage from '../user-message/index'
import JoinMessage from '../join-message/index'
export default {
  name: 'MessageBox',
  components: {
    UserMessage,
    JoinMessage
  },
  computed: {
    ...mapGetters({
      selectedRoom: 'getSelectedRoom',
      userId: 'getUserId',
      messageList: 'getMessageList'
    })
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    sendMessage () {
      const request = {
        userId: this.userId,
        roomId: this.selectedRoom.id,
        message: this.message,
        type: 'input'
      }
      this.$socket.emit('user_send_message', request)
      this.message = ''
    }
  }
}
</script>
<style lang="less" scoped>
@import './message-box.less';
</style>
