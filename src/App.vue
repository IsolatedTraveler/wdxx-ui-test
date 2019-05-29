<template>
  <div id="app" :class="{pc: $judgeMobile}">
    <wd-mask v-show="load" shape="loading"/>
    <router-view class="wd_flex content"/>
  </div>
</template>
<script>
export default {
  name: 'App',
  computed: {
    load() {
      return this.$store.getters.load
    },
    user() {
      return this.$store.getters.userInfo
    }
  }
}
</script>
<style lang='scss'>
</style>
