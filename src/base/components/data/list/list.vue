<template>
  <ul class="wd_list">
    <li v-for="(item,i) in data" :key="i" class="wd_flex wd_list_item" row @click.stop="selected(item,i)" after :disabled="item.disabled" :selected="value.indexOf(item[valId])!==-1">
      <span class="wd_auto">
        {{item[showId]}}
      </span>
      <span class="wd_icon" :class="icon"></span>
    </li>
  </ul>
</template>
<script>
import list from './common.js'
export default {
  name: 'WdList',
  extends: list,
  methods: {
    selected(item, i) {
      if (!item.disabled) {
        this.$emit('selected', item)
      }
    }
  }
}
</script>
