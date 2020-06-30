<template>
  <div class="message-box">
    <div class="room-detail">
      <span>{{selectedRoom.name}}</span>
      <el-button type="success" size="small" @click="copyToClip">复制房间码</el-button>
    </div>
    <div id="messageContent" class="message-content scroll-bar">
      <div v-for="(message, index) in messageList[selectedRoom.id]" :key="index">
        <UserMessage :message="message" :time="message.time || ''" :loading="message.loading || false" :reverse="userId === message.user.id" v-if="message.type !== 'join'" />
        <JoinMessage :message="message" v-else/>
      </div>
    </div>
    <RichText @on-send="sendMessage"/>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import util from '@/libs/utility/util.js'
import UserMessage from '../user-message/index'
import JoinMessage from '../join-message/index'
import RichText from '@/components/base/rich-text/index'
export default {
  name: 'MessageBox',
  components: {
    UserMessage,
    JoinMessage,
    RichText
  },
  computed: {
    ...mapGetters({
      selectedRoom: 'getSelectedRoom',
      userId: 'getUserId',
      userName: 'getUserName',
      messageList: 'getMessageList',
      isUpdate: 'getUpdate',
      avatarImage: 'getAvatarImage'
    })
  },
  watch: {
    selectedRoom () {
      this.setMessageContentScroll()
    },
    isUpdate () {
      if (this.isUpdate) {
        this.$forceUpdate()
        this.updateComplete()
        this.setMessageContentScroll()
      }
    }
  },
  methods: {
    ...mapActions([
      'updateComplete',
      'userInput'
    ]),
    setMessageContentScroll () {
      this.$nextTick(() => {
        const messageContent = document.getElementById('messageContent')
        if (messageContent) {
          if (messageContent.scrollHeight > messageContent.clientHeight) {
            messageContent.scrollTop = messageContent.scrollHeight
          }
        }
      })
    },
    copyToClip () {
      util.copyToClip(this.selectedRoom.room_hash_id)
    },
    sendMessage (message) {
      const messageId = Number(new Date())
      const messageContext = {
        user: {
          id: this.userId,
          name: this.userName,
          avatarImage: this.avatarImage
        },
        roomId: this.selectedRoom.id,
        id: messageId,
        message,
        loading: true,
        type: 'input'
      }
      const request = {
        userId: this.userId,
        roomId: this.selectedRoom.id,
        id: messageId,
        message,
        type: 'input'
      }
      this.userInput(messageContext)
      this.$socket.emit('user_send_message', request)
      this.$socket.emit('test_input', message)
    }
  }
}
</script>
<style lang="less" scoped>
@import './message-box.less';
</style>
