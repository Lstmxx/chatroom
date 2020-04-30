<template>
  <div class="main">
    <Header></Header>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
    </router-view>
  </div>
</template>
<script>
import Header from '@/components/main/header'
export default {
  name: 'Main',
  components: {
    Header
  },
  data () {
    return {
    }
  },
  mounted () {
    console.log(Header)
  }
}
</script>
<style lang="less" scoped>
@import './main.less';
</style>
