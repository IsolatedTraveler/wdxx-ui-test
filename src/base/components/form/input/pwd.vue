<template>
  <div class="wd_flex wd_input wd_pwd" row :class="{wd_error:error}" @click.stop="disabled || focus()">
    <slot>
    </slot>
    <label :class="{wd_gray:value}" v-if="label">{{label}}</label>
    <input class="wd_auto" autocomplete="new-password" order1 :type="judge?'text':'password'" ref="input" :placeholder="placeholder" :value="value" @input="$emit('input',$event.target.value)">
    <span class="wd_icon" :class="judge ? 'wd_password' : 'wd_eye'" order2 @click.stop="judge=!pwd && !judge"></span>
  </div>
</template>
<script>
export default {
  name: 'wdPwd',
  props: {
    pwd: {
      type: Boolean,
      default: false
    }
  },
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
