<template>
  <ul class="wd_list wd_tree_list">
    <li v-for="(item,i) in data" :key="i" class="wd_flex" :child="!judge(item)" :parent="judge(item)" @click.stop="selected(item,i)" after>
      <div class="wd_list_item wd_flex" row :disabled="item.disabled" :unfold="unfold[i]" :selected="value.indexOf(item[valId])!==-1">
        <span class="wd_auto wd_text">
          {{item[showId]}}
        </span>
        <span class="wd_icon" :class="icon"></span>
      </div>
      <wd-tree-list v-if="judge(item)" v-show="unfold[i]" :data="item.child" :valId="valId" :showId="showId" :value="value" :icon="icon" :parentDisable="parentDisable" @selected="$emit('selected',$event)"/>
    </li>
  </ul>
</template>
<script>
import list from '../../../mixins/list'
export default {
  name: 'WdTreeList',
  mixins: [list],
  props: {
    parentDisable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      unfold: []
    }
  },
  methods: {
    judge(it) {
      return (it.child || '').length
    },
    selected(item, i) {
      this.$set(this.unfold, i, !this.unfold[i])
      if (!item.disabled && (!this.judge(item) || this.parentDisable)) {
        this.$emit('selected', item)
      }
    }
  }
}
</script>
