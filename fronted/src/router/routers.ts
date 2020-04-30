import { RouteConfig } from 'vue-router'
import Main from '@/views/main'

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login')
  },
  {
    path: '/',
    name: '',
    redirect: '/chat-room',
    component: Main,
    children: [
      {
        path: '/chat-room',
        name: 'ChatRoom',
        component: () => import(/* webpackChunkName: "chat-room" */ '../views/chat-room')
      }
    ]
  }
]
export default routes
