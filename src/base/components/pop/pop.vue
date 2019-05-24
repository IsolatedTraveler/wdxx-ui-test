<template>
  <div class="wd_pop flex">
    <wd-mask v-if="mask" @close="close" :shape="shape"/>
    <wd-top v-if="top" :title="title" :close="close"/>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'WdPop',
  props: {
    title: {
      type: String,
      default: ''
    },
    top: {
      type: Boolean,
      default: true
    },
    mask: {
      type: Boolean,
      default: false
    },
    shape: {
      type: String,
      default: ''
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
