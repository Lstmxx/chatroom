<template>
  <div class="join-message">
    <img :src="baseImageUrl + message.user.avatarImage" alt="">
    <span>{{message.user.userName}} 加入</span>
  </div>
</template>
<script>
import { baseImageUrl } from '@/web-config/config'
export default {
  name: 'JoinMessage',
  props: {
    message: {
      default: () => { return {} },
      type: Object
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
@import './join-message.less';
</style>
