<template>
  <ul class="wd_list">
    <li class="wd_gray wd_list_item" v-show="!data.length">{{placeholder}}</li>
    <li v-for="(item,i) in data" :key="i" class="wd_flex wd_list_item" row @click.stop="$emit('selected', item)">
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
    placeholder: {
      type: String,
      default: ''
    }
  }
}
</script>
