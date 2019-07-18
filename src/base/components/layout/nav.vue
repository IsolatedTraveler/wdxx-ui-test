<template>
  <div class="wd_flex wd_nav">
    <span class="wd_item" v-for="(item,i) in data" :key="i">
      {{item[showId]}}
    </span>
  </div>
</template>
<script>
export default {
  name: 'WdNav',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    showId: {
      type: String,
      default: 'mc'
    }
  }
}
</script>
<style lang="scss">

</style>
