<template>
  <div class="up-load-file">
    <div class="image-list" v-if="imageList.length > 0">
      <div class="image-wrap"  v-for="(image, index) in imageList" :key="index">
        <img :src="image.base64Path" alt="">
        <div class="image-option">
          <span class="preview-button" @click="previewImage(image.base64Path)">查看大图</span>
          <div class="delete-image" @click="deleteImage(index)"></div>
        </div>
      </div>
    </div>
    <div class="add-image" v-if="imageList.length < maxImageNum">
      <input type="file" @change="fileChange" v-if="multiple" multiple="multiple">
      <input type="file" @change="fileChange" v-else>
    </div>
  </div>
</template>

<script>
// import { upLoad } from './request'
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
    },
    type: {
      default: ''
    }
  },
  data () {
    return {
      inputFile: null,
      imageList: [],
      preview: false
    }
  },
  methods: {
    previewImage (base64Path) {
      this.$PreviewImage(base64Path)
    },
    // upLoadFile (payload) {
    //   const config = {
    //     url: this.targetUrl,
    //     payload
    //   }
    //   const progressCallback = (e) => {
    //     console.log(e)
    //   }
    //   upLoad(config, progressCallback).then((responseData) => {
    //     console.log(responseData)
    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // },
    async fileChange (e) {
      if (e.target.files.length === 0) {
        return
      }
      const fileList = e.target.files
      const imageFilelist = []
      fileList.forEach(data => {
        if (data.type.includes('image')) {
          imageFilelist.push(data)
        }
      })
      if (imageFilelist.length === 0) {
        this.$message({
          message: '？？？图片都不会传是吗',
          type: 'error'
        })
        return
      }
      for (let i = 0; i < imageFilelist.length; i++) {
        await new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(imageFilelist[i])
          reader.onload = (readerFile) => {
            if (readerFile.target.result) {
              this.imageList.push({
                base64Path: readerFile.target.result,
                name: imageFilelist[i].name
              })
              resolve()
            } else {
              reject(new Error('what'))
            }
            // const payload = new FormData()
            // const bolb = new Blob([readerFile.target.result])
            // console.log(bolb)
            // payload.append('image', bolb, file.name)
            // console.log(payload)
            // this.upLoadFile(payload)
          }
        })
      }
      this.$emit('on-change', this.imageList)
    },
    deleteImage (index) {
      this.imageList.splice(index, 1)
      this.$emit('on-change', this.imageList)
    }
  }
}
</script>

<style lang="less" scoped>
@import './up-load-file.less';
</style>
