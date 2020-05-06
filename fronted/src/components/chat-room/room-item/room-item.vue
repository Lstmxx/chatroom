<template>
  <div class="room-item" @click="selectRoom">
    <img class="avatar-image" :src="avatarImage" alt="">
    <div class="content">
      <span class="room-name">{{roomData.name}}</span>
      <span></span>
    </div>
  </div>
</template>
<script>
import { baseImageUrl } from '@/web-config/config'
export default {
  name: 'RoomItem',
  props: {
    roomData: {
      default: () => { return {} },
      type: Object
    }
  },
  computed: {
    avatarImage () {
      return this.roomData ? baseImageUrl + this.roomData.avatar_image : ''
    }
  },
  data () {
    return {
    }
  },
  methods: {
    selectRoom () {
      this.$emit('on-select', this.roomData)
    }
  }
}
</script>
<style lang="less" scoped>
@import './room-item.less';
</style>
