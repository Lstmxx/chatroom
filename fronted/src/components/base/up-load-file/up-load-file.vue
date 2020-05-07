<template>
  <div class="up-load-file">
    <div class="image-list" v-if="imageList.length > 0">
      <img v-for="(image, index) in imageList" :src="image" :key="index" alt="">
    </div>
    <div class="add-image">
      <input type="file" @change="fileChange" v-if="multiple" multiple="multiple">
      <input type="file" @change="fileChange" v-else>
    </div>
  </div>
</template>

<script>
import { upLoad } from './request'
export default {
  name: 'UpLoadFile',
  props: {
    maxImageNum: {
      default: 1,
      type: Number
    },
    multiple: {
      default: false,
      type: Boolean
    },
    targetUrl: {
      default: '',
      type: String
    }
  },
  data () {
    return {
      inputFile: null,
      imageList: []
    }
  },
  methods: {
    fileChange (e) {
      console.log(e.target.files)
      const file = e.target.files[0]
      if (!file.type.includes('image')) {
        this.$message({
          message: '？？？图片都不会传是吗',
          type: 'error'
        })
        return
      }
      const reader = new FileReader()
      reader.readAsDataURL(file)
    }
  }
}
</script>

<style lang="less" scoped>
@import './up-load-file.less';
</style>
