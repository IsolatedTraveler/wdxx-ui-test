<template>
  <div>
    <span class="comment">默认样式</span>
    <wd-switch v-model="value" content="记住密码"/>
    <span class="comment">更改默认颜色</span>
    <wd-switch v-model="val" content="记住密码" :color="color"/>
  </div>
</template>
<script>
export default {
  name: 'Switch',
  data() {
    return {
      value: true,
      color: ['red', 'blue'],
      val: false
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
