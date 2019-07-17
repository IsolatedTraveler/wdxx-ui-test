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
    },
    data: {
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
        let rules = this.rules, data = this.data, msg = ''
        if (rules && data) {
          for (let file of this.files) {
            let id = file.componentInstance.isVerify
            if (id && rules[id]) {
              msg = this.validating(data[id], rules[id])
              if (msg) {
                file.componentInstance.msg(msg)
                break
              }
            }
          }
        }
        msg ? reject(new Error()) : resolve()
      })
    },
    validating(val, rules) {
      let judge = false
      for (let rule of rules) {
        if (rule.reg && !rule.reg.test(val)) {
          judge = rule.msg || true
          break
        } else if (rule.name && this.defaultRules[rule.name] && !this.defaultRules[rule.name].reg.test(val)) {
          judge = rule.msg || this.defaultRules[rule.name].msg || true
          break
        }
      }
      return judge
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
