import service from './axios/axios'
import axios from 'axios'
import { getToken } from './utility/token'

export function baseGetDetail (config) {
  const request = {
    url: config.url + '/' + config.data.id,
    method: 'GET'
  }
  return service.request(request)
}

export function baseGetList (config) {
  const request = {
    url: config.url + '/list',
    data: config.data,
    method: 'POST'
  }
  return service.request(request)
}

export function baseGetPage (config) {
  const request = {
    url: config.url + '/page',
    data: config.data,
    method: 'POST'
  }
  return service.request(request)
}

export function baseLogin (config) {
  const request = {
    url: config.url,
    method: 'POST',
    data: config.data
  }
  return service.request(request)
}

export function getServiceToken () {
  const config = {
    url: '/get-token',
    method: 'POST'
  }
  return service.request(config)
}

export function upLoadFile (payload, progressCallback, type) {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data', 'Lstmxx-Token': getToken() },
    onUploadProgress: progressCallback
  }
  const baseURL = process.env.NODE_ENV === 'development' ? 'http://www.myblog.com/api' : ''
  return axios.post(baseURL + '/up-load/' + type, payload, config)
}

export function baseGetUserInfo () {
  const config = {
    url: '/user-info',
    method: 'POST'
  }
  return service.request(config)
}

export function baseStore (config) {
  const request = {
    url: config.url + '/store',
    method: 'POST',
    data: config.data
  }
  return service.request(request)
}

export function baseLogout () {
  const request = {
    url: '/logout',
    method: 'GET'
  }
  return service.request(request)
}

export function baseGet (config) {
  const request = {
    url: config.url,
    params: config.data,
    method: 'GET'
  }
  return service.request(request)
}

export function basePost (config) {
  const request = {
    url: config.url,
    data: config.data,
    method: 'POST'
  }
  return service.request(request)
}
