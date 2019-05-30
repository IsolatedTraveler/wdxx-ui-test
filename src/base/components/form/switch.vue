<template>
  <span @click="change" class="wd_flex wd_switch" row :style="{height: height}" :selected="value">
    <span ref="switch" class="switch" :style="{fontSize: height}" row></span>
    <slot>
      {{text}}
    </slot>
  </span>
</template>
<script>
export default {
  name: 'WdSwitch',
  props: {
    text: String,
    value: Boolean,
    height: {
      type: String,
      default: '20px'
    }
  },
  methods: {
    change() {
      this.$emit('input', !this.value)
    }
  }
}
</script>
