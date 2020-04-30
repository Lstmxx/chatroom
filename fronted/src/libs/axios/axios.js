import axios from 'axios'
import { baseURL } from '../../web-config/config'
import { getToken } from '../utility/token'
import { Message } from 'element-ui'

const showStatus = (status) => {
  let message = ''
  // 这一坨代码可以使用策略模式进行优化
  switch (status) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      break
    case 403:
      message = '拒绝访问(403)'
      break
    case 404:
      message = '请求出错(404)'
      break
    case 408:
      message = '请求超时(408)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    case 501:
      message = '服务未实现(501)'
      break
    case 502:
      message = '网络错误(502)'
      break
    case 503:
      message = '服务不可用(503)'
      break
    case 504:
      message = '网络超时(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = `连接出错(${status})!`
  }
  return `${message}，请检查网络或联系管理员！`
}

const service = axios.create({
  baseURL: baseURL,
  timeout: 6000,
  responseType: 'application/json',
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  },
  transformRequest: [function (data) {
    data = JSON.stringify(data)
    return data
  }],
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    if (typeof data === 'string' && data.startsWith('{')) {
      data = JSON.parse(data)
    }
    return data
  }],
  withCredentials: true
})

service.interceptors.request.use((config) => {
  config.headers.common['chat-Token'] = getToken()
  return config
}, (error) => {
  error.data = {}
  error.data.msg = '服务器异常，请联系管理员！'
  return Promise.resolve(error)
})

service.interceptors.response.use((response) => {
  console.log(response)
  let status = response.status
  const data = response.data
  if (status < 200 || status >= 300) {
    response.message = showStatus(status)
    return Promise.reject(new Error(response.message || 'Error'))
  } else if (data.status < 200 || data.status >= 300) {
    status = data.status
    response.message = showStatus(status)
    return Promise.reject(new Error(response.message || 'Error'))
  } else {
    return { status, data, msg: '成功' }
  }
}, (error) => {
  // console.log(error)
  if (error.message.includes('timeout') || error.response.status.toString()[0] === '5') {
    Message.error('请检查网络')
    error.timeout = true
  }
  return Promise.reject(error)
})

export default service
