import {fetch} from './base'
export default {
  fetch,
  login(data) {
    return fetch('rest/commitData/081101/2', data)
  },
  bindUser(data) {
    return fetch('rest/commitData/120102/2', data)
  },
  addSystem(data) {
    return fetch('rest/commitData/120104/2', data)
  },
  delSystem(data) {
    return fetch('rest/commitData/120104/3', data)
  },
  bindAccount(data) {
    return fetch('rest/commitData/081101/3', data)
  },
  alertPwd(data) {
    return fetch('rest/commitData/120104/6', data)
  }
}
