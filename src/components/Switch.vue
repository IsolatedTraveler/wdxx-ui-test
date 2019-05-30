<template>
  <div>
    <wd-switch v-model="val" text="记住密码"/>
    <wd-switch v-model="value" text="记住密码"/>
  </div>
</template>
<script>
export default {
  name: 'CSwitch',
  data() {
    return {
      val: false,
      value: true
    }
  }
}
</script>
<style lang="scss" scoped>
  .wd_switch{
    margin-top: 20px;
  }
</style>
