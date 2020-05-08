import axios from 'axios'
import { getToken } from '@/libs/utility/token'

function upLoadFile (data, progressCallback, url) {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data', 'chat-Token': getToken() },
    onUploadProgress: progressCallback
  }
  const baseURL = '/api'
  return axios.post(baseURL + url, data, config)
}

export function upLoad (config, progressCallback) {
  return new Promise((resolve, reject) => {
    upLoadFile(config.payload, progressCallback, config.url).then((response) => {
      resolve(response.data.data)
    }).catch((err) => {
      reject(err)
    })
  })
}
