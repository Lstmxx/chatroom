<template>
  <div class="message-box">
    <div class="room-detail">
      <span>{{selectedRoom.name}}</span>
      <el-button type="success" size="small" @click="copyToClip">复制房间码</el-button>
    </div>
    <div class="message-content scroll-bar">
      <div v-for="(message, index) in messageList[selectedRoom.id]" :key="index">
        <UserMessage :message="message" :reverse="userId === message.user.id" v-if="message.type !== 'join'" />
        <JoinMessage :message="message" v-else/>
      </div>
    </div>
    <div class="message-input">
      <textarea
      class="input"
      v-model="message"
      placeholder="输入点啥吧"
      rows="3" />
      <el-button type="success" class="send-button" size="small" @click="sendMessage" :disabled="!message">发送</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import util from '@/libs/utility/util.js'
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
      messageList: 'getMessageList',
      isUpdate: 'getUpdate'
    })
  },
  watch: {
    isUpdate () {
      if (this.isUpdate) {
        this.$forceUpdate()
        this.updateComplete()
      }
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    ...mapActions([
      'updateComplete'
    ]),
    copyToClip () {
      util.copyToClip(this.selectedRoom.room_hash_id)
    },
    sendMessage () {
      if (this.message === '') {
        this.$message({
          showClose: true,
          message: '不可以发空哦',
          type: 'warning'
        })
        return
      }
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
