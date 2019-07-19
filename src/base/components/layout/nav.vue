<template>
  <div class="wd_flex wd_nav">
    <button class="wd_item" v-for="(item,i) in data" :disabled="item[valId]==value" @click.stop="$emit('selected', item, i)" v-show="!item.hide" :key="i">
      {{item[showId]}}
    </button>
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
    },
    valId: {
      type: String,
      default: 'id'
    },
    value: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss">

</style>
