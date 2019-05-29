<template>
  <div class="login">
    <wd-form :data="data" :rules="rules" ref="form">
      <span v-if="$judgeMobile" class="title">用户登录</span>
      <wd-input v-model="data.yhm" isVerify='yhm' placeholder="请输入手机号">
        <span class="wd_icon icon wd_user"></span>
      </wd-input>
      <wd-input v-model="data.pwd" isVerify='pwd' type='password' placeholder="请输入密码">
        <span class="wd_icon icon wd_pwd"></span>
      </wd-input>
      <wd-grid row>
        <wd-button @click="login" v-html="exist ? '登 &nbsp; 录' : '绑定（有账号）'"></wd-button>
        <wd-button default @click="$emit('change', 'register')" v-html="exist ? '注 &nbsp; 册' : '添加（无账号）'"></wd-button>
      </wd-grid>
    </wd-form>
    <div class="loginThird wd_flex" v-if="exist">
      <span class='font'>第三方快速登录/注册</span>
      <wd-button blank @click="loginByWx"><span class="wd_icon wd_wx"></span>微信</wd-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  props: {
    exist: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      data: {
        yhm: '',
        pwd: ''
      },
      rules: {
        yhm: {
          reg: 'require,phone'
        },
        pwd: {
          reg: 'require',
          rule: [
            {
              reg: /[\s\S]{8,16}/,
              msg: '密码长度为8-16位'
            },
            {
              reg: /^[a-zA-Z]/,
              msg: '密码以字母开头'
            }
          ]
        }
      }
    }
  },
  computed: {
    loginInfo() {
      return this.$store.getters.loginInfo || {}
    },
    yhm() {
      return this.data.yhm
    }
  },
  created() {
    this.data = Object.assign({}, this.data, this.loginInfo)
  },
  methods: {
    login() {
      this.$refs.form.validate().then(res => {
        this.$emit('login', {fs: '1', yhm: this.data.yhm, pwd: this.data.pwd})
      }).catch(e => {})
    },
    loginByWx() {
      this.cordova.wx('Login').then(data => {
        this.api.getOpenid(data).then(res => {
          this.$emit('login', {origin: '1', fs: '1', yhm: res.openid})
          this.$store.commit('openid', res.openid)
        })
      })
    }
  }
}
</script>
