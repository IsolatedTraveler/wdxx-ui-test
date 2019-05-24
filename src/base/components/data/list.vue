<template>
  <ul class="wd_list">
    <li v-for="(item,index) in data" :key="index" @click.stop="$emit('click', item, index)" class="flex" :class="{row: row, col: !row,'selected':val[index]}">
      <slot :data="item">
        <img v-if="item[img]" :src="item[img]"/>
        <span class="auto">{{item[showId] || item}}</span>
        <span v-if="right" :class="type"></span>
      </slot>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'WdList',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    img: {
      type: String,
      default: 'img'
    },
    val: {
      type: Array,
      default() {
        return []
      }
    },
    type: {
      type: String,
      default: 'triangle'
    },
    right: {
      type: Boolean,
      default: true
    },
    row: {
      type: Boolean,
      default: true
    },
    showId: {
      type: String,
      default: 'label'
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
