<template>
  <div>
    <!-- 多选 -->
    <wd-select label="多选：" v-model="multiVal" multi :data="data"/>
    <!-- 单选 -->
    <wd-select label="单选：" buttonShow v-model="val" :data="data"/>
    <!-- 单选无值 -->
    <div style="padding: 30px 0;margin: 30px 0">
      <wd-select class="wd_none" label="单选无值" :topShow="false" :valShow="false" buttonShow v-model="val1" :data="data"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Select',
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
                }, {
                  id: 112,
                  mc: '列表112'
                }, {
                  id: 113,
                  mc: '列表113'
                }, {
                  id: 114,
                  mc: '列表114'
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
      ],
      multiVal: [111, 21],
      val: 111,
      val1: ''
    }
  }
}
</script>
<style lang="scss" >
.wd_select{
  min-height: 50px;
  font-size: 15px;
  padding: 0 0.5em;
  &.wd_none{
    .wd_pop{
      top: 210px;
    }
  }
}
</style>
