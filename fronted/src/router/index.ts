import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/libs/utility/token'
import routes from './routers'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const token = getToken()
  if (!token && to.name !== 'Login') {
    next({
      name: 'Login'
    })
  } else if (!token && to.name === 'Login') {
    next()
  } else if (token && to.name === 'Login') {
    next({
      name: 'Login'
    })
  } else if (token) {
    try {
      await store.dispatch('loadUserInfo')
      next()
    } catch (error) {
      next({
        name: 'Login'
      })
    }
  }
})

export default router
