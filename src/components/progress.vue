<template>
  <div>
    <wd-progress :value="val" :delay="1000"/>
    <wd-progress :text="false" :value="val1" :delay="1000"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      val: 0,
      val1: 0
    }
  },
  mounted() {
    this.val = 100
    this.val1 = 50
  }
}
</script>
<style lang="scss" scoped>
</style>
