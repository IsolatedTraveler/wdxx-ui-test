import axios from 'axios'
import qs from 'qs'
import store from '@/store'
let Base64 = require('js-base64').Base64

axios.defaults.timeout = 10000
window.wxAddress = ''
axios.defaults.baseURL = window.ajaxConfig.baseURL
axios.interceptors.request.use(config => {
  store.commit('load', true)
  return config
}, error => {
  store.commit('load', false)
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(response => {
  store.commit('load', false)
  return response
}, error => {
  store.commit('load', false)
  return Promise.reject(error)
})
const fetchExe = function(url, params) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      data: {
        data: params
      },
      transformRequest: [(data) => {
        let ret = qs.stringify(data)
        return ret
      }]
    }).then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}
export function get(url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}
export function fetch(url, params) {
  try {
    params = JSON.stringify(params)
    return fetchExe(url, params)
  } catch (e) {
    e.msg = e.message
    return Promise.reject(e)
  }
}
export function fetchBase64(url, params) {
  try {
    params = Base64.encode(JSON.stringify(params))
    return fetchExe(url, params)
  } catch (e) {
    e.msg = e.message
    return Promise.reject(e)
  }
}
export default {
  fetch,
  fetchBase64,
  get
}
