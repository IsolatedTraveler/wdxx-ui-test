<template>
  <div class="wd_flex test">
    <wd-input v-model="value" label="账户：" placeholder="带标题输入框"/>
    <wd-input v-model="value1" placeholder="自定义除input框样式">
      <span class="wd_icon wd_user icon"></span>
    </wd-input>
    <wd-pwd v-model="val1" disabled placeholder="自定义除input框样式">
      <span class="wd_icon wd_pwd icon"></span>
      <span order='1' class="wd_icon wd_user icon"></span>
      <span order='2' class="wd_icon wd_wx icon"></span>
      <span order='3' class="wd_icon wd_tel icon"></span>
    </wd-pwd>
  </div>
</template>
<script>
export default {
  name: 'CInput',
  data() {
    return {
      value: '',
      value1: '',
      val: '',
      val1: ''
    }
  }
}
</script>
<style lang="scss" scope>
</style>
