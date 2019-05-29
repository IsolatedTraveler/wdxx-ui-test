<template>
  <div class="wd_flex wd_input" row :class="{wd_error:error}" @click.stop="clickEvent">
    <slot>
      <label>{{label}}</label>
    </slot>
    <input class="wd_auto" :autocomplete="pwd?'new-password':'off'" :type="typeVal || type" ref="input" :placeholder="placeholder" :readonly="readonly" :disabled="disabled" :value="value" @blur.stop="judge=false" @input="commit($event.target.value)">
    <span v-if="close && eye" @click.stop="clearVal" class="wd_icon" @mousedown.stop="stopPrevent" v-show="value && judge" :class="pwd ? typeVal ? 'wd_password' : 'wd_eye' : 'wd_close'"></span>
  </div>
</template>
<script>
export default {
  name: 'WdInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    close: {
      type: Boolean,
      default: true
    },
    isVerify: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      judge: false,
      error: false,
      defaultRules: {
        require: {
          reg: /\S{1,}/,
          msg: '必填项不能为空'
        },
        phone: {
          reg: /^1(3\d|4[1,4,5,6,7,8,9]|5[012356789]|66|7[01345678]|8\d|9[89])\d{8}$/,
          msg: '手机号格式不正确'
        }
      },
      typeVal: '',
      eye: true
    }
  },
  computed: {
    pwd() {
      return this.type === 'password'
    }
  },
  methods: {
    clickEvent() {
      if (!(this.readonly || this.disabled)) {
        if (this.pwd) {
          this.onFocus()
        }
        this.$refs.input.focus()
        this.judge = true
        this.$emit('click')
      }
    },
    onFocus() {
      this.eye = false
      this.$refs.input.selectionStart = 0
      this.$refs.input.selectionEnd = this.value.length
      return false
    },
    commit(val) {
      this.$emit('input', val)
      this.eye = true
    },
    clearVal() {
      if (this.pwd) {
        this.typeVal = this.typeVal ? '' : 'text'
      } else {
        this.$emit('input', '')
      }
    },
    stopPrevent(e) {
      e.preventDefault()
      return false
    },
    validate(rules, data) {
      let regs = rules.reg, rule = rules.rule
      if (regs) {
        regs = regs.split(',')
        for (let reg of regs) {
          if (!this.verify(this.defaultRules[reg])) {
            return false
          }
        }
      }
      if (rule) {
        for (let reg of rule) {
          if (!this.verify(reg)) {
            return false
          }
        }
      }
      return true
    },
    verify(rule, data) {
      let val = this.value || ''
      if (rule.reg.test(val)) {
        return true
      }
      this.error = true
      this.$msg.toast(rule.msg, '警告').then(res => {
        this.error = false
        this.refs.input.onfoucs()
      }).catch(e => {
        this.error = false
      })
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
