<template>
  <div class="wd_flex wd_input" row :class="{wd_error:error}" @click.stop="clickEvent()">
    <slot>
    </slot>
    <label :class="{wd_gray:value}" v-if="label">{{label}}</label>
    <input class="wd_auto" autocomplete="off" order='1' type="text" ref="input" :placeholder="placeholder" :disabled="disabled" :value="value" @blur.stop="blur" @input="$emit('input',$event.target.value)">
    <span @click.stop="$emit('input','')" order='2' class="wd_icon wd_close" v-show="value && judge"></span>
  </div>
</template>
<script>
export default {
  name: 'WdInput',
  methods: {
    blur() {
      setTimeout(() => {
        this.judge = false
      }, 100)
    },
    clickEvent() {
      if (!this.disabled) {
        this.$refs.input.focus()
        this.judge = true
      }
      this.$emit('clickEvent')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
