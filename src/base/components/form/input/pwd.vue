<template>
  <div class="wd_flex wd_input wd_pwd" row :class="{wd_error:error}" @click.stop="focus()">
    <label :class="{wd_gray:value}" v-if="label">{{label}}</label>
    <slot>
    </slot>
    <input class="wd_auto" autocomplete="off" :type="type?'password':'text'" ref="input" :placeholder="placeholder" :value="value" @input="$emit('input',$event.target.value)">
    <span class="wd_icon" :class="type ? 'wd_password' : 'wd_eye'" @click.stop="type=!type"></span>
  </div>
</template>
<script>
export default {
  name: 'wdPwd',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    isVerify: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      type: true,
      error: false
    }
  },
  methods: {
    focus() {
      let elem = this.$refs.input
      elem.selectionStart = 0
      elem.selectionEnd = this.value.length
    },
    msg(msg) {
      this.error = true
      this.$msg.toast(msg, '警告').then(res => {
        this.error = false
        this.refs.input.onfoucs()
      }).catch(e => {
        this.error = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
