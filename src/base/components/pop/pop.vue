<template>
  <div class="wd_pop wd_flex">
    <div v-if="mask" class="wd_mask" @click.stop="$emit('close')"></div>
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
