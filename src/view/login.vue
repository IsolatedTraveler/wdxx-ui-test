<template>
  <div class="loginReg">
    <div class="wd_auto wd_flex top">
      <!-- <img src="../../static/img/login/logo.png"> -->
    </div>
    <component class="wd_flex common" :is="active" @change="changePage" @login="commitData"></component>
    <div class="wd_auto wd_flex bottom">
      <p>技术支持：万达信息股份有限公司</p>
      <p>© 2017 WONDERS INFORMATION CO., LTD. ALL RIGHTS RESERVED</p>
    </div>
  </div>
</template>
<script>
import md5 from 'md5'
import login from './login/login'
import register from './login/register'
export default {
  name: 'LoginPage',
  components: {
    login,
    register
  },
  data() {
    return {
      active: 'login'
    }
  },
  methods: {
    changePage(name) {
      console.log(name)
      this.active = name
    },
    commitData(data) {
      let pwd = data.pwd
      if (data.pwd) {
        data.pwd = md5(pwd)
      }
      this.commit.login(data).then(res => {
        if (res.code === '1') {
          data.pwd && this.$store.commit('loginInfo', {yhm: data.yhm, pwd: pwd})
          this.$store.commit('userInfo', res.data || '')
          this.$router.push({
            name: 'home'
          })
        } else {
          if (data.pwd) {
            this.$msg.toast(data.lx === '1' ? '账号或密码错误' : res.msg)
          } else {
            this.$router.push({
              name: 'bindThird',
              query: {
                origin: data.origin
              }
            })
          }
        }
      }).catch(e => {
        this.$msg.toast('登录失败，网络连接超时')
      })
    }
  }
}
</script>
