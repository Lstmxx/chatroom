/* eslint-disable */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/icon/index'
import Loading from '@/components/base/loading/index'
import PreviewImage from '@/components/base/preview-image/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueSocketio from 'vue-socket.io'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype.$Loading = Loading
Vue.prototype.$PreviewImage = PreviewImage

Vue.use(new VueSocketio({
  debug: true,
  connection: 'http://www.chatroom.com/chatroom',
  vuex: {
    store,
    actionPrefix: 'SOCKET_'
  }
}))
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
