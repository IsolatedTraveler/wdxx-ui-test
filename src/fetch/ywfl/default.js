import {fetch} from '../base'
export default {
  getTree(data) {
    return fetch('rest/queryDataBySql/080000/1', data)
  }
}
