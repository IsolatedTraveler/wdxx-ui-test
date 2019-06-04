<template>
  <ul class="wd_list" :class="'wd_list_'+level">
    <li v-for="(item,i) in data" :key="i" class="wd_flex">
      <div class="wd_flex wd_list_item" row :class="{wd_parent: item.child,wd_child: !item.child,wd_selected: judge && index === i}" @click.stop="select(i,item)">
        <span v-if="left" class="wd_icon" left></span>
        <span class="wd_auto">
          <slot :data="item">
            {{item[showId]}}
          </slot>
        </span>
        <span v-if="right" class="wd_icon" right></span>
      </div>
      <wd-single v-if="item.child" :left="left" :right="right" :level="level+1" :parent="parent" :judge="judge && order===i" :ref="'list'+i" :data="item.child" :showId="showId" :id="id" @selected="selected(i, $event)">
        <template slot-scope="item">
          <slot :data="item.data">
            <span>{{item.data[showId]}}</span>
          </slot>
        </template>
      </wd-single>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'WdSingle',
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
    level: {
      type: Number,
      default: 0
    },
    judge: {
      type: Boolean,
      default: true
    },
    parent: {
      type: Boolean,
      default: false
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
  data() {
    return {
      index: '',
      order: '' // 选中的父路径
    }
  },
  methods: {
    init(val) {
      let id = this.id
      this.data.map((item, i) => {
        if (val === item[id]) {
          if (this.parent || !item.child) {
            this.index = i
            this.$emit('selected', item)
          } else {
            console.warn('./wdxx-ui/components/data/single.vue项目初始化值不能包含子项目，加上parent属性以解决该问题')
          }
        }
        item.child && this.$refs['list' + i][0].init(val)
      })
    },
    select(i, item) {
      if (this.parent || !item.child) {
        if (this.judge && this.index === i) {
          this.index = ''
          item = null
        } else {
          this.index = i
          this.order = ''
        }
        this.$emit('selected', item)
      }
    },
    selected(i, item) {
      this.order = i
      this.index = ''
      this.$emit('selected', item)
    }
  }
}
</script>
