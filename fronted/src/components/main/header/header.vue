<template>
  <div class="header">
    <h1>ChatRoom</h1>
    <span>{{userName}}</span>
  </div>
</template>
<script lang="ts">
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapGetters({
      userName: 'getUserName'
    })
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
@import './header.less';
</style>
