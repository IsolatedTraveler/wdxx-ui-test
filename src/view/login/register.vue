<template>
  <wd-form class="register" :data="data" :rules="rules" ref="form">
    <wd-input v-model="data.tel" isVerify='tel' placeholder="请输入手机号">
      <!-- <icon name="tell" class="icon-svg"/> -->
    </wd-input>
    <wd-input v-model="data.xm" isVerify='xm' placeholder="请输入用户名">
      <!-- <icon name="user" class="icon-svg"/> -->
    </wd-input>
    <wd-input v-model="data.pwd" isVerify='pwd' type='password' placeholder="请输入密码">
      <!-- <icon name="pwd" class="icon-svg"/> -->
    </wd-input>
    <wd-input v-model="data.pwd1" isVerify='pwd1' type='password' placeholder="请再次输入密码">
      <!-- <icon name="pwd" class="icon-svg"/> -->
    </wd-input>
    <wd-input v-model="data.yzm" isVerify='yzm' placeholder="请输入验证码">
      <!-- <icon name="yzm" class="icon-svg"/> -->
      <button class="yzm blue wd_button" :disabled='codeDisabled' @click.stop="sendCode" slot="right">{{fsyzm}}</button>
    </wd-input>
    <wd-grid row>
      <wd-button @click="register" v-html="exist ? '注 &nbsp; 册' : '绑定（有账号）'"></wd-button>
      <wd-button default @click="$emit('change', 'login')" v-html="exist ? '密码登陆' : '绑定（有账号）'"></wd-button>
    </wd-grid>
  </wd-form>
</template>
<script>
export default {
  name: 'Register',
  props: {
    exist: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      data: {
        tel: '',
        xm: '',
        pwd: '',
        pwd1: '',
        yzm: ''
      },
      fsyzm: '点击获取',
      codeDisabled: false,
      rules: {},
      phoneYzm: {
        tel: {
          reg: 'require,phone'
        }
      },
      verifies: {
        xm: {
          reg: 'require'
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
        },
        yzm: {
          reg: 'require',
          rule: [
            {
              reg: /^[\S]{4}$/,
              msg: '验证码长度为4位'
            },
            {
              reg: /^0000$/,
              msg: '验证码不一致'
            }
          ]
        }
      },
      yzm: '1'
    }
  },
  methods: {
    register() {
      this.verifies.pwd1 = this.verifies.pwd
      this.verifies.pwd1.rule.push({reg: new RegExp('^' + this.data.pwd + '$'), msg: '两次密码输入不一致'})
      this.verifies.yzm.rule[1].reg = new RegExp('^' + this.yzm + '$')
      this.rules = Object.assign({}, this.phoneYzm, this.verifies)
      this.rules.pwd1.rule.push({reg: new RegExp(this.data.pwd), msg: '两次密码输入不一致'})
      this.$refs.form.validate().then(res => {
        this.$emit('login', {yhm: this.data.tel, pwd: this.data.pwd, fs: '2'})
      }).catch(e => {})
    },
    sendCode() {
      this.rules = this.phoneYzm
      this.$refs.form.validate().then(res => {
        this.sendingCode()
      }).catch(e => {
      })
    },
    sendingCode() {
      let yzm = Math.floor(Math.random() * 9000) + 1000, params = {
        xxlx: '0001',
        jgid: '70',
        ywlx: '注册',
        ywid: '2',
        sjhm: this.data.tel,
        mbdm: 'SMS_127153253',
        xxnr: {
          'code': yzm
        }
      }
      window.Promise.all([this.query.getSysDate({}), this.query.getTel({tel: this.data.tel})]).then(res => {
        if (res[0].code === '1' && res[1].code === '1' && res[1].data[0] && res[1].data[0].count < 1) {
          let sdpwd = ''
          try {
            sdpwd = new Date(res[0].data[0].sd.replace(/-/g, '/')).getTime().toString()
          } catch (e) {
            this.$msg.toast('验证码发送失败')
            return
          }
          sdpwd = sdpwd.split('')
          sdpwd.splice(12, 0, Math.ceil(Math.random() * 10))
          sdpwd.splice(9, 0, Math.ceil(Math.random() * 10))
          sdpwd.splice(6, 0, Math.ceil(Math.random() * 10))
          sdpwd.splice(3, 0, Math.ceil(Math.random() * 10))
          params.sdpwd = sdpwd.join('')
          params.oid = this.data.tel
          this.api.sendCode(params).then(res => {
            if (res.code === '1') {
              this.yzm = yzm
              this.CountDown()
            } else {
              this.$msg.toast('验证码发送失败')
            }
          }).catch(res => {
            this.$msg.toast('验证码发送失败，网络连接超时')
          })
        } else {
          this.$msg.toast(res[0].code !== '1' ? '验证码发送失败，请重新发送' : '该手机号已注册')
        }
      })
    },
    CountDown() {
      this.fsyzm = '60s'
      this.codeDisabled = true
      var i = 60, timer = setInterval(() => {
        i--
        if (i) {
          this.fsyzm = i + 's'
        } else {
          clearInterval(timer)
          this.fsyzm = '点击获取'
          this.codeDisabled = false
        }
      }, 1000)
    },
    verify() {
    }
  }
}
</script>
