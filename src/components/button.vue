<template>
  <div class="wd_flex test">
    <wd-button @click="a=1">默认按钮样式</wd-button>
    <span>{{a}}</span>
    <wd-button default @click="b=2">default属性按钮样式</wd-button>
    <span>{{b}}</span>
    <wd-button blank @click="c=3">blank属性按钮样式</wd-button>
    <span>{{c}}</span>
    <wd-button disabled @click="d=4">禁止按钮样式</wd-button>
    <span>{{d}}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      a: 0,
      b: 0,
      c: 0,
      d: 0
    }
  }
}
</script>
<style lang="scss" scoped>
.wd_button{
  width: 50%;
  height: 35px;
  margin: 20px 0 0;
}
</style>
