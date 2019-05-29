import {fetch, get} from './base'
export default {
  fetch,
  get,
  address(data) {
    return fetch('', data)
  },
  getSystem(data) {
    return fetch('rest/queryDataBySql/120104/3', data)
  },
  getSystemByQhdm(data) {
    return fetch('rest/queryDataBySql/120104/2', data)
  },
  getQhdm(data) {
    return fetch('rest/queryDataBySql/120104/1', data)
  },
  getVersion(data) {
    return get(window.updateURL + 'version.json?version=' + Math.random(), data)
  },
  getOpenid(data) {
    return get(`http://mobile.wonderscd.com/rest/h5payopenid?code=${data.code}&jgid=70`)
  },
  getSysDate(data) {
    return fetch('rest/queryDataBySql/000000/1', data)
  },
  getTel(data) {
    return fetch('rest/queryDataBySql/081101/3', data)
  }
}
