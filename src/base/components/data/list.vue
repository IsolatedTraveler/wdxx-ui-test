<template>
  <ul class="wd_list">
    <li v-for="(item,i) in listData" :key="i" class="wd_flex">
      <div class="wd_flex wd_list_item" row :class="{wd_selected:item.selected}" @click.stop="$emit('selected', item.selected ?item : '')">
        <slot :data="item">
          <span v-if="left" class="wd_icon" left></span>
          <span class="wd_auto">
            {{item[showId]}}
          </span>
          <span v-if="right" class="wd_icon" right></span>
        </slot>
      </div>
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
    showId: {
      type: String,
      default: 'mc'
    },
    id: {
      type: String,
      default: 'id'
    },
    left: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    listData() {
      return this.data
    }
  },
  methods: {
    rest(val) {
      this.index = val
    }
  }
}
</script>
