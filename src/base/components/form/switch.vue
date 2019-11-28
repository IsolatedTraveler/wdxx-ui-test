<template>
  <span @click="change" class="wd_flex wd_switch" row :style="{height: height}" :selected="value">
    <span ref="switch" class="switch" :style="{fontSize: height}" row></span>
    <slot>
    </slot>
  </span>
</template>
<script>
export default {
  name: 'WdSwitch',
  props: {
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
