import {
  baseGetDetail,
  baseGetList,
  baseLogin,
  baseGetPage,
  upLoadFile,
  baseGetUserInfo,
  baseStore,
  baseLogout,
  baseGet,
  basePost
} from './requestApi'
// import { setToken } from './utility/token'

function checkToken (promiseCallBack, config, resolve, reject) {
  promiseCallBack(config).then((response) => {
    resolve(response.data.data)
  }).catch((err) => {
    reject(err)
  })
}

export function getDetail (config) {
  return new Promise((resolve, reject) => {
    const callBack = baseGetDetail
    checkToken(callBack, config, resolve, reject)
  })
}

export function getList (config) {
  return new Promise((resolve, reject) => {
    const callBack = baseGetList
    checkToken(callBack, config, resolve, reject)
  })
}

export function getPage (config) {
  return new Promise((resolve, reject) => {
    const callBack = baseGetPage
    checkToken(callBack, config, resolve, reject)
  })
}

export function login (config) {
  return new Promise((resolve, reject) => {
    baseLogin(config).then((response) => {
      resolve(response.data.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function upLoad (config, callBack, type) {
  return new Promise((resolve, reject) => {
    upLoadFile(config, callBack, type).then((response) => {
      resolve(response.data.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function getUserInfo () {
  return new Promise((resolve, reject) => {
    baseGetUserInfo().then((response) => {
      console.log(response)
      resolve(response.data.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function store (config) {
  return new Promise((resolve, reject) => {
    baseStore(config).then((response) => {
      reject(response.msg)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function logout () {
  return new Promise((resolve, reject) => {
    baseLogout().then((response) => {
      resolve(response.data.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function post (config) {
  return new Promise((resolve, reject) => {
    const callBack = basePost
    checkToken(callBack, config, resolve, reject)
  })
}

export function get (config) {
  return new Promise((resolve, reject) => {
    const callBack = baseGet
    checkToken(callBack, config, resolve, reject)
  })
}
