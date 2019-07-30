<template>
  <div class="wd_flex wd_input" row :class="{wd_error:error}" @click.stop="disabled || clickEvent()">
    <slot></slot>
    <input class="wd_auto" autocomplete="off" type="text" ref="input" :placeholder="placeholder" :disabled="disabled" :value="value" @blur.stop="judge=false" @input="$emit('input',$event.target.value)">
    <span @click.stop="clearVal" class="wd_icon wd_close" v-show="value && judge"></span>
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
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isVerify: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      judge: false,
      error: false
    }
  },
  methods: {
    clickEvent() {
      this.$refs.input.focus()
      this.judge = true
      this.$emit('click')
    },
    clearVal() {
      alert(1)
      this.$emit('input', '')
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
