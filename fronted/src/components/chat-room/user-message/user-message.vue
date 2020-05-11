<template>
  <div :class="messageClass">
    <img :src="baseImageUrl + message.user.avatarImage" alt="">
    <div class="message">
      <span class="user-name" v-if="!reverse">{{message.user.name}}</span>
      <span class="message-box">{{message.message}}</span>
      <span class="time">{{time}}</span>
    </div>
  </div>
</template>
<script>
import { baseImageUrl } from '@/web-config/config'
import { normalizeTimeDetail } from '@/libs/utility/time'
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
    }
  },
  computed: {
    messageClass () {
      return this.reverse ? 'user-message reverse' : 'user-message'
    },
    time () {
      return this.message ? normalizeTimeDetail(this.message.time) : ''
    }
  },
  data () {
    return {
      baseImageUrl
    }
  }
}
</script>
<style lang="less" scoped>
@import './user-message.less';
</style>
