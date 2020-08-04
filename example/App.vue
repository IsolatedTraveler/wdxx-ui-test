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
.App{
}
html{
  font-size: calc(100vw / 320);
}
</style>
