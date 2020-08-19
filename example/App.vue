<template>
  <div class="App">
    <router-view class="wd-auto wd-col"></router-view>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
html{
  font-size: calc(100vw / 320);
}
.App{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
