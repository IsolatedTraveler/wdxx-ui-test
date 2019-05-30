<template>
  <ul class="wd_tree" :class="'wd_tree_'+level">
    <li v-for="(item,i) in data" :key="i" class="wd_flex" :class="'wd_tree_item_'+level+'_'+i">
      <div @click.stop="index === i ? index = '' : index =i,$emit('selected',item)" class="wd_flex wd_tree_item" row :class="{wd_selected: index === i}">
        <slot :data="item">
        </slot>
      </div>
      <wd-tree v-if="item.child" v-show="index===i || expand" :expand="expand " :level="level+1" :data="item.child" :showId="showId" :value="value" :id="id" @selected="$emit('selected')">
        <template slot-scope="item">
          <slot :data="item.data">
          </slot>
        </template>
      </wd-tree>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'WdTree',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: String | Array,
      default() {
        return []
      }
    },
    showId: {
      type: String,
      default: 'xtmc'
    },
    id: {
      type: String,
      default: 'id'
    },
    level: {
      type: Number,
      default: 0
    },
    expand: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      index: '' // 被选中数据
    }
  }
}
</script>
