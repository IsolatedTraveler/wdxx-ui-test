<template>
  <div>
    <!-- 多选 -->
    <wd-select label="多选：" v-model="multiVal" multi :data="data"/>
    <!-- 单选 -->
    <wd-select label="单选：" buttonShow v-model="val" :data="data"/>
    <!-- 单选无值 -->
    <div class="wd_flex none" row >
      <wd-select ref="a" class="wd_none" label="单选无值" :topShow="false" :valShow="false" buttonShow v-model="val1" :data="data"/>
      <wd-select ref="b" class="wd_none" label="多选无值" multi :topShow="false" :valShow="false" buttonShow :value="val2" @input="getValue" :data="data"/>
    </div>
    <div class="val">
      <span v-show="val1Text">{{val1Text}}</span>
      <span v-for="(item,index) in val2Text" :key="index">{{item}}</span>
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
      val1: '',
      val1Text: '',
      val2: [112],
      val2Text: []
    }
  },
  watch: {
    val1() {
      this.val1Text = this.$refs.a.valText[0]
    }
  },
  mounted() {
    this.val2Text = this.$refs.b.valText
  },
  methods: {
    getValue(item) {
      this.val2 = item
      this.val2Text = this.$refs.b.valText
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
.none{
  .wd_select{
    width: auto;
  }
}
.val{
  span{
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 5px;
    padding: 0 5px;
  }
}
</style>
