<template>
  <div class="wd_flex test">
    <wd-input v-model="value" label="账户：" placeholder="带标题输入框"/>
    <wd-input v-model="value1" placeholder="带图标标题输入框">
      <span class="wd_icon wd_user icon"></span>
    </wd-input>
    <wd-input v-model="val" type="password" placeholder="密码格式">
      <span class="wd_icon wd_pwd icon"></span>
    </wd-input>
    <wd-input v-model="val1" placeholder="左右两侧加上自定义图标布局">
      <span class="wd_icon wd_pwd icon"></span>
      <span right class="wd_icon wd_user icon"></span>
    </wd-input>
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
<style lang="scss" scoped>
.test{
  font-size: 14px;
  padding: 0 30px;
}
.icon{
  color: #5A8BFF;
  font-size: 20px;
  margin-right: 8px;
}
[right]{
  margin-left: 8px;
  margin-right: 0;
}
</style>
