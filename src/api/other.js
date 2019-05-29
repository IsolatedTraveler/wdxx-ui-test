import {fetchBase64, get} from './base'
let secret = '154d9ca1eaf2a10b4ead19da66691f97'
export default {
  // 获取手机验证码
  sendCode(data) {
    return fetchBase64('http://mobile.wonderscd.com/hisapi/rest/sendSmsWx', data)
  },
  getOpenid(data) {
    return get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${data.appid}&secret=${secret}&code=${data.code}&grant_type=authorization_code`)
  }
}
