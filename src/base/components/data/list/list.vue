<template>
  <ul class="wd_list" @click.stop="$emit('selected', '')">
    <li v-for="(item,i) in data" :key="i" class="wd_flex wd_list_item" :disabled="item.disabled" :selected="val.indexOf(item[valId])!==-1" @click.stop="item.disabled || $emit('selected', item)">
      <span class="wd_auto">
        {{item[showId]}}
      </span>
      <span class="wd_icon wd_circle wd_right"></span>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'WdList',
  props: {
    data: {
      type: Array,
      default: null,
      required: true
    },
    value: {
      type: String || Array,
      default: ''
    },
    showId: {
      type: String,
      default: 'mc'
    },
    valId: {
      type: String,
      default: 'id'
    }
  },
  computed: {
    val() {
      return this.value || ''
    }
  }
}
</script>
