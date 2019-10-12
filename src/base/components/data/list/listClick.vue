<template>
  <ul class="wd_list">
    <li v-for="(item,i) in data" :key="i" class="wd_flex wd_list_item" :class="{wd_selected: value === item[valId]}" row @click.stop="$emit('selected', item)">
      <slot :data="item">
        <span class="wd_auto wd_text">
          {{item[showId]}}
        </span>
      </slot>
      <span class="wd_icon wd_arrow"></span>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'WdListClick',
  props: {
    data: {
      type: Array,
      default: null,
      required: true
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
