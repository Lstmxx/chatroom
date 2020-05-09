<template>
  <div class="header">
    <h1>ChatRoom</h1>
    <div class="user-info">
      <img :src="baseImageUrl + avatarImage" alt="">
      <span>{{userName}}</span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { baseImageUrl } from '@/web-config/config'
export default {
  name: 'Header',
  computed: {
    ...mapGetters({
      userName: 'getUserName',
      avatarImage: 'getAvatarImage'
    })
  },
  data () {
    return {
      baseImageUrl
    }
  }
}
</script>
<style lang="less" scoped>
@import './header.less';
</style>
