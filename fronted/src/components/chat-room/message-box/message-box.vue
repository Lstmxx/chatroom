<template>
  <div class="message-box">
    <div class="message-content">
      <upLoadFile />
    </div>
    <div class="message-input">
      <textarea
      class="input"
      v-model="message"
      placeholder=""
      rows="3" />
      <el-button type="success" class="send-button" size="small" @click="sendMessage">发送</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import upLoadFile from '@/components/base/up-load-file'
export default {
  name: 'MessageBox',
  components: {
    upLoadFile
  },
  computed: {
    ...mapGetters({
      selectedRoom: 'getSelectedRoom'
    })
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    sendMessage () {
      this.$socket.emit('user_send_message', { roomId: this.selectedRoom.id, message: this.message })
      this.message = ''
    }
  }
}
</script>
<style lang="less" scoped>
@import './message-box.less';
</style>
