<template>
  <div id="app" class="main wd_flex">
    <wd-mask id="mask" v-show="load"/>
    <wd-top :title="title">
      <span @click="$refs.pop.show()" class="wd_icon wd_crumb"></span>
      <wd-pop ref='pop' shadeClose>
        <wd-tree class="wd_content wd_auto" scroll :data="menuData" rootId='0' :value="$route.name" format @selected="go"/>
      </wd-pop>
    </wd-top>
    <router-view class="wd_auto wd_flex app_router" scroll/>
  </div>
</template>
<script>
export default {
  name: 'App',
  computed: {
    load() {
      return this.$store.getters.load
    },
    back() {
      return this.$store.getters.back
    },
    title() {
      return this.$route.query.title || '概述'
    }
  },
  data() {
    return {
      menuShow: false,
      menuData: [
        {
          id: 'overview',
          mc: '概述'
        }, {
          id: 'quickstart',
          mc: '快速上手'
        }, {
          id: 'data',
          mc: '数据展示',
          disabled: true,
          child: [
            {
              id: 'list',
              mc: '单级列表'
            },
            {
              id: 'tree',
              mc: '多级列表'
            }
          ]
        }
      ]
    }
  },
  mounted() {
    this.$util.filterScreen(320)
  },
  methods: {
    go(item) {
      this.back()
      this.$router.push({
        name: item.id,
        query: {title: item.mc}
      })
    }
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
        text-align: left;
      }
    }
    >[scroll]{
      overflow-x: hidden;
      width: 100%;
    }
  }
</style>
