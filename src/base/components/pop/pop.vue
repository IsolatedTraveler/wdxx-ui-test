<template>
  <div class="wd_pop wd_flex" @click.stop="$emit('close')">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'WdPop',
  props: {
    mask: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
