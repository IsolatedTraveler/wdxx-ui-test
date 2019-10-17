<template>
  <ul class="wd_list wd_tree_list">
    <li v-for="(item,i) in data" :key="i" class="wd_flex" :disabled="item.disabled" :child="!(item.child && item.child.length)">
      <div class="wd_list_item wd_flex" row>
        <span class="wd_auto">
          {{item[showId]}}
        </span>
        <span class="wd_icon" :class="icon"></span>
      </div>
      <wd-tree-list :data="item.child" :valId="valId" :showId="showId" :value="value" :icon="icon" :parentDisable="parentDisable"/>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'WdTreeList',
  props: {
    data: {
      type: Array,
      default() {
        return []
      },
      required: true
    },
    value: {
      type: String || Array,
      default: ''
    },
    showId: {
      type: String,
      default: ''
    },
    valId: {
      type: String,
      default: ''
    },
    parentDisable: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>
