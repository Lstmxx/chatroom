<template>
  <svg class="svg-icon">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    color: {
      type: String
    }
  },
  computed: {
    iconName () {
      return `#${this.iconClass}`
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
@import './svg-icon.less';
</style>
