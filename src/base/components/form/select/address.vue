<template>
  <div class="wd_flex wd_address" row>
    <slot></slot>
    <div class="wd_auto">{{val}}</div>
    <span class="wd_icon wd_arrow"></span>
    <wd-pop mask v-show="show">
      <div class="wd_title"></div>
      <div class="wd_flex" row></div>
      <wd-list></wd-list>
    </wd-pop>
  </div>
</template>
<script>
export default {
  name: 'WdAddress',
  props: {
    value: {
      type: String,
      defalut: ''
    }
  },
  data() {
    return {
      val: '',
      show: false
    }
  }
}
</script>
<style lang="scss">

</style>
