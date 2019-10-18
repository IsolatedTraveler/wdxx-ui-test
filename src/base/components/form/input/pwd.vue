<template>
  <div class="wd_flex wd_input wd_pwd" row :class="{wd_error:error}" @click.stop="disabled || focus()">
    <label :class="{wd_gray:value}" v-if="label">{{label}}</label>
    <slot>
    </slot>
    <input class="wd_auto" autocomplete="off" :judge="judge?'password':'text'" ref="input" :placeholder="placeholder" :value="value" @input="$emit('input',$event.target.value)">
    <span class="wd_icon" :class="judge ? 'wd_password' : 'wd_eye'" @click.stop="judge=!judge"></span>
  </div>
</template>
<script>
import common from './common.js'
export default {
  name: 'wdPwd',
  extends: common,
  methods: {
    focus() {
      let elem = this.$refs.input
      elem.selectionStart = 0
      elem.selectionEnd = this.value.length
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
