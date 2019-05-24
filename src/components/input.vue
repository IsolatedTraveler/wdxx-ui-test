<template>
  <div class="wd_flex">
    <wd-input v-model="value" placeholder="this is a test"/>
    <wd-input v-model="value1">
      <label>title：</label>
      <span right class="wd_triangle"></span>
    </wd-input>
    <wd-input v-model="val" type="password" placeholder="this is a test"/>
  </div>
</template>
<script>
export default {
  name: 'CInput',
  data() {
    return {
      value: '',
      value1: '',
      val: ''
    }
  }
}
</script>
<style scoped>
</style>
