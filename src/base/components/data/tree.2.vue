<template>
  <ul class="wd_tree" :class="'wd_tree_'+level">
    <li v-for="(item,i) in data" :key="i" class="wd_flex">
      <div @click.stop="select(i,item)" class="wd_flex wd_tree_item" row :class="{wd_parent: item.child,wd_child: !item.child,wd_selected: (parent || !item.child) && multi ? index[i] : (judge && index === i)}">
        <span class="wd_icon" ></span>
        <span class="wd_auto">
          <slot :data="item">
            {{item[showId]}}
          </slot>
        </span>
        <span class="wd_icon" right></span>
      </div>
      <wd-tree :ref="'tree'+i" v-if="item.child" :all="all" :judge="multi || judge && order === i" :multi="multi" :parent="parent" :level="level+1" :id="id" :showId="showId" :value="value" :data="item.child" @selected="selected(i,$event)">
        <template slot-scope="item">
          <slot :data="item.data">
            <span>{{item.data.mc}}</span>
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
    parent: {
      type: Boolean,
      default: false
    },
    multi: {
      type: Boolean,
      default: false
    },
    judge: {
      type: Boolean,
      default: true
    },
    all: { // 是否可选中所有子项目
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: 'arrow'
    }
  },
  data() {
    return {
      index: '', // 被选中数据
      order: '', // 单选被选中的父路径
      vals: [] // 多选时被选中的子项目数据
    }
  },
  mounted() {
    this.$attrs.child || this.init()
  },
  methods: {
    init() {
      if (this.multi) {
        this.initMulti()
      } else {
        this.initSingle()
      }
    },
    initMulti() {
      let id = this.id, val = this.value, index = []
      this.data.map((item, i) => {
        if (val.indexOf(item[id]) !== -1) {
          index[i] = true
        }
      })
      this.index = index
    },
    initSingle() {
      let id = this.id, val = this.value
      this.data.map((item, i) => {
        if (val === item[id]) {
          this.index = i
        }
      })
    },
    selectedAll(judge) {
      return new Promise((resolve, reject) => {
        let data = this.data, index = []
        data.forEach((item, i) => {
          index[i] = judge
          item.child && this.$refs['tree' + i][0].selectedAll(judge)
        })
        resolve(this.index.length === this.data.length)
        this.index = index
      })
    },
    select(i, item) {
      if (this.parent) {
        if (this.multi) {
          this.setMultiData(i, item)
        } else {
          this.setSingleData(i, item)
        }
      } else if (!item.child) {
        this.setData(i, item)
      } else if (this.multi) {
        this.setMultiData(i, item)
      }
    },
    setData(i, item) {
      if (this.multi) {
        this.setMultiData(i, item)
      } else {
        this.setSingleData(i, item)
      }
    },
    setMultiData(i, item) {
      let index = [].concat(this.index)
      index[i] = !index[i]
      this.index = index
      item.child && this.all && this.$refs['tree' + i][0].selectedAll(this.index[i])
      index.filter(item => item)
      this.parent || this.$emit('selected', index.length === this.data.length)
    },
    setSingleData(i, item) {
      if (this.index === i && this.judge) {
        this.index = ''
        item = null
      } else {
        this.index = i
      }
      this.$emit('selected', item)
    },
    selected(i, data) {
      let multi = this.multi
      if (multi) {
        let index = [].concat(this.index), judge = index.length === this.data.length
        index[i] = data
        this.index = index
        index.filter(item => item)
        judge !== (index.length === this.data.length) && this.$emit('selected', !judge)
      } else {
        this.order = i
        this.$emit('selected', data)
      }
    }
  }
}
</script>
