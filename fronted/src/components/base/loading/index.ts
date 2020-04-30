/* eslint-disable */ 
import loading from './loading.vue'
import Vue from 'vue'
const LoadingConstructor = Vue.extend(loading)

let instance: any
const Loading = function () {
  instance = new LoadingConstructor()
  instance.$mount()
  document.body.appendChild(instance.$el)
  return instance
}
Loading.show = function () {
  Loading()
}

Loading.hide = function () {
  if (instance) {
    instance.$destroy(true)
    instance.$el.parentNode.removeChild(instance.$el)
    instance = null
  }
}
export default Loading
