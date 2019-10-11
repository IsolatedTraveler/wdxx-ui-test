<template>
  <form class="wd_form" action="" onsubmit="return false" autocomplete="off">
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: 'WdForm',
  props: {
    rules: {
      type: Object,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      defaultRules: {
        require: {
          reg: /\S{1,}/,
          msg: '必填项不能为空'
        },
        phone: {
          reg: /^1(3\d|4[1,4,5,6,7,8,9]|5[012356789]|66|7[01345678]|8\d|9[89])\d{8}$/,
          msg: '手机号格式不正确'
        },
        IDCard: {
          reg: /(^\d{15}$)|(^\d{17}[\dxX]$)/,
          msg: '身份证号码格式不正确'
        }
      }
    }
  },
  computed: {
    files() {
      return this.$slots.default.filter(item => {
        return item.componentInstance && (item.componentInstance.isVerify)
      })
    }
  },
  methods: {
    validate() {
      return new Promise((resolve, reject) => {
        let rules = this.rules, msg = ''
        if (rules) {
          for (let file of this.files) {
            let el = file.componentInstance, id = el.isVerify, rule = rules[id]
            if (id && rule) {
              msg = this.validating(el.value, rule)
              if (msg) {
                el.msg(msg)
                break
              }
            }
          }
        }
        msg ? reject(new Error()) : resolve()
      })
    },
    validating(val, rules) {
      let regs = rules.reg, rule = rules.rule, msg = false
      if (regs) {
        regs = regs.split(',')
        for (let reg of regs) {
          msg = this.verify(this.defaultRules[reg], val)
          if (msg) {
            return msg
          }
        }
      }
      if (rule) {
        for (let reg of rule) {
          msg = this.verify(reg, val)
          if (msg) {
            return msg
          }
        }
      }
      return msg
    },
    verify(rule, val) {
      return rule.reg.test(val) ? false : rule.msg
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
