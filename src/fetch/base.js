import axios from 'axios'
import qs from 'qs'
import store from '@/store'
let Base64 = require('js-base64').Base64
axios.defaults.timeout = 100000
axios.defaults.baseURL = 'http://172.16.110.40:8080/testapi/'
axios.interceptors.request.use(config => {
  store.commit('load', true)
  return config
}, error => {
  store.commit('load', false)
  return Promise.reject(error)
})

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

export function fetch(url, params) {
  try {
    params.datasource_sjly = '05'
    params = Object.assign(params)
    return fetchExe(url, JSON.stringify(params))
  } catch (e) {
    return Promise.reject(e)
  }
}

export function fetchBase64(url, params) {
  params.datasource_sjly = '05'
  params = Base64.encode(JSON.stringify(params))
  return fetchExe(url, params)
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

export function getPrintHtml(printurl) {
  let data = {
    base64: btoa(encodeURI(printurl += '&random=' + new Date().getTime()))
  }
  return fetch(window.config.baseConfig.getPageDomUrl + '/rest/getPageDom', data).then(res => {
    if (res.code === '1') {
      res.data = Base64.decode(res.data)
      return res
    } else {
      return res
    }
  })
}

export default {
  fetch,
  get,
  fetchBase64,
  getPrintHtml
}
