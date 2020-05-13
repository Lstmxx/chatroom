<template>
  <div class="rich-text">
    <div class="tools">
      <svg-icon iconClass="表情" style="cursor: pointer;"></svg-icon>
    </div>
    <div
    id="richText"
    class="rich-text-input scroll-bar"
    contenteditable="true"
    @input="handleInput"
    @paste="handlePaste">
    </div>
    <el-button type="success" class="send-button" size="small" @click="sendMessage" :disabled="!message">发送</el-button>
  </div>
</template>
<script>
export default {
  name: 'RichText',
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async handlePaste (e) {
      const rT = document.getElementById('richText')
      if (!(e.clipboardData && e.clipboardData.items)) {
        return
      }
      const cbd = e.clipboardData.items
      for (let i = 0; i < cbd.length; i++) {
        const item = cbd[i]
        if (item.kind !== 'file') {
          continue
        }
        const reader = new FileReader()
        reader.readAsDataURL(item.getAsFile())
        await new Promise((resolve, reject) => {
          reader.onload = (event) => {
            if (event.target.result) {
              rT.innerHTML += `<img src="${event.target.result}">`
              resolve()
            } else {
              reject(new Error('error'))
            }
          }
        })
      }
      this.message = rT.innerHTML
    },
    handleInput (e) {
      this.message = e.target.innerHTML
      console.log(this.message)
    },
    sendMessage () {
      if (this.message === '') {
        this.$message({
          showClose: true,
          message: '不可以发空哦',
          type: 'warning'
        })
        return
      }
      this.$emit('on-send', this.message)
      const input = document.getElementById('richText')
      input.innerHTML = ''
      this.message = ''
    }
  }
}
</script>
<style lang="less">
@import './rich-text.less';
</style>
