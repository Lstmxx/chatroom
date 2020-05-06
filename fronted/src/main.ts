/* eslint-disable */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Loading from '@/components/base/loading/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueSocketio from 'vue-socket.io'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype.$Loading = Loading

Vue.use(new VueSocketio({
  debug: true,
  connection: 'http://www.chatroom.com/chatroom',
  vuex: {
    store,
    acitonPrefix: 'SOCKET_'
  }
}))
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
