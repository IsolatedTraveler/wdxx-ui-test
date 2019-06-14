<template>
  <div v-show="show" class="wd_mask wd_flex" @click.stop="$emit('close')">
    <div :class="shape">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WdMask',
  props: {
    shape: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: true
    }
  }
}
</script>
