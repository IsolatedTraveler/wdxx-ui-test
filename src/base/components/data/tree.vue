<template>
  <ul class="wd_tree" :class="'wd_tree_'+level">
    <li v-for="(item,i) in data" :key="i" class="wd_flex" :class="{wd_selected: index === i}">
      <div @click.stop="index === i ? index = '' : index =i,parent ? $emit('selected',item) : (item.child || $emit('selected',item))" class="wd_flex wd_tree_item" row :class="'wd_tree_item_'+level+'_'+i">
        <slot :data="item">
          {{item.mc}}
        </slot>
      </div>
      <wd-tree v-if="item.child" v-show="index===i || expand" :expand="expand" :level="level+1" :data="item.child" :showId="showId" :value="value" :id="id" @selected="selected">
        <template slot-scope="item">
          <slot :data="item.data">
            {{item.data.mc}}
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
      type: String,
      default: ''
    },
    showId: {
      type: String,
      default: 'mc'
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
    },
    parent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      index: '' // 被选中数据
    }
  },
  methods: {
    selected(data) {
      console.log(1)
    }
  }
}
</script>
