<template>
  <span @click="change" class="wd_flex wd_switch" row :selected="value">
    <span ref="switch" class="wd-switch" row>
      <span class="wd_remove"></span>
    </span>
    <slot>
    </slot>
  </span>
</template>
<script>
export default {
  name: 'WdSwitch',
  props: {
    value: Boolean
  },
  methods: {
    change() {
      this.$emit('input', !this.value)
    }
  }
}
</script>
