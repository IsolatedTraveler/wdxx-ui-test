<template>
<div scroll>
  <div class="fg">多选树插件不可选父路径</div>
  <wd-tree :data="data" :value="[2,1]" multi @selected="getVal">
  </wd-tree>
  <div class="fg">多选树插件可选父路径可单选父路径</div>
  <wd-tree :data="data" parent :value="[2,111]" multi @selected="getVal">
  </wd-tree>
  <div class="fg">多选树插件可选父路径可单选父路径</div>
  <wd-tree :data="data" parent multi @selected="getVal">
  </wd-tree>
  <div class="fg">多选树插件可选父路径不可单选父路径</div>
  <wd-tree :data="data" parent :value="[2,1]" only multi @selected="getVal">
  </wd-tree>
  <div class="fg">单选树插件不可选父路径</div>
  <wd-tree :data="data" :value='2' @selected="getVal">
  </wd-tree>
  <div class="fg">单选树插件可选父路径</div>
  <wd-tree :data="data" :value="2" parent @selected="getVal">
  </wd-tree>
</div>
</template>
<script>
export default {
  name: 'Tree',
  data() {
    return {
      data: [
        {
          id: 1,
          mc: '列表1',
          child: [
            {
              id: 11,
              mc: '列表11',
              child: [
                {
                  id: 111,
                  mc: '列表111'
                },
                {
                  id: 112,
                  mc: '列表112'
                },
                {
                  id: 113,
                  mc: '列表113'
                }
              ]
            }
          ]
        }, {
          id: 2,
          mc: '列表2',
          child: [
            {
              id: 21,
              mc: '列表21'
            }
          ]
        }
      ]
    }
  },
  methods: {
    getVal(data) {
      console.log(data)
    }
  }
}
</script>
<style lang="scss" scoped>
.fg{
  width: 100%;
  text-align: center;
  border: 1px dotted #ccc;
  font-size: 15px;
  line-height: 30px;
  height: 32px;
}
</style>
