<template>
  <div class="user-message">
    <img :src="baseImageUrl + message.user.avatarImage" alt="">
    <span>{{message.message}}</span>
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
