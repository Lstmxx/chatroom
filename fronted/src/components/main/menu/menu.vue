<template>
  <div class="menu-list">
    <div
    class="menu-item"
    v-for="(data, index) in menuList"
    :key="index"
    @click="selectPage(data.routeName, index)"
    @tap="selectPage(data.routeName, index)">
      <span
      :class="{
        'selected': index === selectedIndex,
        'notSelected': index !== selectedIndex }"
      >
      {{data.name}}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Menu',
  data () {
    return {
      selectedIndex: 0,
      menuList: [
        {
          name: '书签',
          routeName: 'notice'
        },
        {
          name: '文章',
          routeName: 'article'
        },
        {
          name: 'CSS-TRICK',
          routeName: 'css-trick'
        },
        {
          name: '关于',
          routeName: 'about'
        }
      ]
    }
  },
  methods: {
    selectPage (routeName, index) {
      this.selectedIndex = index
      this.$emit('turn-to-page', routeName)
    }
  },
  mounted () {
    const routePath = this.$route.path
    this.menuList.every((data, index) => {
      if (routePath.includes(data.routeName)) {
        this.selectedIndex = index
        return false
      }
      return true
    })
  }
}
</script>
<style lang="less" scoped>
@import './menu.less';
</style>
