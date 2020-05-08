/* eslint-disable */ 
import previewImage from './preview-image.vue'
import Vue from 'vue'
const PreviewImageConstructor = Vue.extend(previewImage)

let instance: any
const PreviewImage = async function (imageUrl) {
  console.log(imageUrl)
  const img = new Image()
  img.src = imageUrl
  let width: number = 0
  let height: number = 0
  await new Promise((resolve, reject) => {
    img.onload = () => {
      if (img.width > 800 || img.height > 800) {
        if (img.width > img.height) {
          width = 800
          height = 800 / img.width * img.height 
        } else {
          height = 800
          width = 800 / img.height * img.width 
        }
      } else {
        height = img.height
        width = img.width
      }
      if (height !== 0 && width !== 0) {
        resolve()
      } else {
        reject(new Error('···'))
      }
    }
  })
  const option = {
    src: imageUrl,
    height,
    width
  }
  instance = new PreviewImageConstructor({
    data: option
  })
  instance.$mount()
  console.log(instance.$el)
  document.body.appendChild(instance.$el)
  return instance
}

export default PreviewImage
