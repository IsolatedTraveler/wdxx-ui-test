<template>
  <div class="wd_flex wd_input wd_search" row>
    <input class="wd_auto" autocomplete="off" type="text" ref="input" :placeholder="placeholder" :value="value" @input="setVal">
    <span class="wd_icon wd_search"></span>
  </div>
</template>
<script>
export default {
  name: 'WdSearch',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  created() {
    this.setVal = this.$util.debounce(this.setValue, 500)
  },
  methods: {
    setValue(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
