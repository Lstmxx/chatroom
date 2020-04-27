<template>
  <div :class="`button ${size}`" @click="onClick">
    <span>{{text}}</span>
  </div>
</template>
<script>
export default {
  name: 'Button',
  props: {
    text: {
      default: '',
      type: String
    },
    size: {
      default: 'normal',
      type: String
    }
  },
  methods: {
    onClick () {
      this.$emit('on-click')
    }
  }
}
</script>
<style lang="less" scoped>
@import './button.less';
</style>
