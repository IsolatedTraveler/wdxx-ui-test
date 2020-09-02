<template>
  <form class="wd-form wd-col" action="" onsubmit="return false" autocomplete="off">
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
          reg: /^1[3456789]\d{9}$/,
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
      return this.$children.filter(it => {
        return it.isVerify
      })
    },
    scrollElem() {
      let el = this.$el
      el.scrollTop = 1
      while (el.scrollTop === 0 && el.parentElement) {
        el = el.parentElement
        el.scrollTop = 1
      }
      return el
    }
  },
  methods: {
    validate() {
      return new Promise((resolve, reject) => {
        const rules = this.rules
        let msg = ''
        if (rules) {
          for (const el of this.files) {
            const id = el.isVerify, rule = rules[id]
            if (id && rule) {
              msg = this.validating(el.value, rule)
              if (msg) {
                el.msg(msg)
                const elem = el.$el
                this.scrollElem.scrollTop += elem.getBoundingClientRect().top - window.innerHeight / 2
                break
              }
            }
          }
        }
        msg ? reject() : resolve()
      })
    },
    validating(val, rules) {
      const rule = rules.rule
      let regs = rules.reg, msg = false
      if (regs) {
        regs = regs.split(',')
        for (const reg of regs) {
          msg = this.verify(this.defaultRules[reg], val)
          if (msg) {
            return msg
          }
        }
      }
      if (rule) {
        for (const reg of rule) {
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
