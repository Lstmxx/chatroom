<template>
  <div class="loading">
    <div class="context">
      <ul class="animate">
        <li v-for="index in 6" :key="index" :style="{ 'animation-delay': `${index * 0.1}s` }"></li>
      </ul>
      <!-- <span>{{ context }}</span> -->
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Loading',
  props: {
    context: {
      default: '加载中',
      type: String
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
@import './loading.less';
</style>
