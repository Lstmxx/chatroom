<template>
  <div class="preview-image" @click="close">
    <img :src="src" alt="" :style="{ 'height': height + 'px', 'width': width + 'px' }">
  </div>
</template>
<script>
export default {
  name: 'PreviewImage',
  data () {
    return {
      src: '',
      height: '',
      width: ''
    }
  },
  methods: {
    close () {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>
<style lang="less" scoped>
@import './preview-image.less';
</style>
