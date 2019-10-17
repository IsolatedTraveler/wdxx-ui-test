<template>
  <div id="app" class="main">
    <wd-mask id="mask" v-show="load"/>
    <wd-top :title="title">
      <span @click="$refs.pop.show()" class="wd_icon wd_crumb"></span>
      <wd-pop ref='pop' shadeClose>
        <wd-tree class="wd_content wd_auto" scroll :data="menuData" rootId='0' showId='name'>
        </wd-tree>
      </wd-pop>
    </wd-top>
    <div class="wd_auto">
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
  },
  mounted() {
    this.$util.filterScreen(320)
    this.api.default.getTree({}).then(res => {
      this.menuData = res.data
    })
  }
}
</script>
<style lang='scss'>
  .main{
    .wd_top{
      .wd_crumb{
        padding: 0 0.2em;
      }
      .wd_tree{
        margin-top: 3em;
        width: 60%;
        align-self: flex-end;
        color: #333;
      }
    }
  }
</style>
