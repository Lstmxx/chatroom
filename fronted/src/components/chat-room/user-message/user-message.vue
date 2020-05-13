<template>
  <div :class="messageClass">
    <img class="head-img" :src="baseImageUrl + message.user.avatarImage" alt="">
    <div class="message img">
      <span class="user-name" v-if="!reverse">{{message.user.name}}</span>
      <div class="content" id="">
        <svg class="message-loading" width="26" height="26" viewBox="0 0 104 104" v-if="loading">
          <circle class="path" id="circle" cx="52" cy="52" r="50" fill="none" stroke-width="4"/>
        </svg>
        <div class="user-message-box" v-html="message.message"></div>
      </div>
      <span class="time" v-if="time">{{time}}</span>
    </div>
  </div>
</template>
<script>
import { baseImageUrl } from '@/web-config/config'
export default {
  name: 'UserMessage',
  props: {
    message: {
      default: () => { return {} },
      type: Object
    },
    reverse: {
      default: false,
      type: Boolean
    },
    time: {
      default: '',
      type: String
    },
    loading: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    messageClass () {
      return this.reverse ? 'user-message reverse' : 'user-message'
    }
  },
  data () {
    return {
      baseImageUrl
    }
  }
}
</script>
<style lang="less">
@import './user-message.less';
</style>
