<template>
  <div id="app">
    <wd-mask id="mask" v-show="load" shape="loading"/>
    <wd-top :title="title">
      <span @click="menuShow=!menuShow" class="wd_icon wd_crumb"></span>
    </wd-top>
    <div class="wd_auto">
      <wd-tree :data="menuData" v-show="menuShow" />
      <router-view class="wd_flex app_router"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  computed: {
    load() {
      return this.$store.getters.load
    },
    title() {
      return this.$store.getters.title || 'wdxx-ui-text'
    }
  },
  data() {
    return {
      menuShow: false,
      menuData: [
      ]
    }
  }
}
</script>
<style lang='scss'>
.app_router{
  width: 100%;
  height: 100%;
}
#mask{
  z-index: 999;
}
</style>
