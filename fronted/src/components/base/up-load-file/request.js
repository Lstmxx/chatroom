import axios from 'axios'

function upLoadFile (payload, progressCallback, url) {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data', 'chat-Token': getToken() },
    onUploadProgress: progressCallback
  }
  const baseURL = '/api'
  return axios.post(baseURL + url, payload, config)
}

export function upLoad (config, callBack) {
  return new Promise((resolve, reject) => {
    upLoadFile(config.payload, callBack, config.url).then((response) => {
      resolve(response.data.data)
    }).catch((err) => {
      reject(err)
    })
  })
}