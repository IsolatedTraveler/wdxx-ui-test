<template>
  <ul class="wd_list" :class="'wd_list_'+level">
    <li v-for="(item,i) in data" :key="i" class="wd_flex">
      <div class="wd_flex wd_list_item" row :class="{wd_parent: item.child,wd_child: !item.child, wd_selected: (parent || !item.child) && (index[i] === true || index[i] ==='1') }" @click.stop="select(i,item)">
        <span v-if="left" class="wd_icon" left></span>
        <span class="wd_auto">
          <slot :data="item">
            {{item[showId]}}
          </slot>
        </span>
        <span v-if="right" class="wd_icon" @click.stop="only?select(i,item):onlySelect(i, item)" right></span>
      </div>
      <wd-multi-tree v-if="item.child" :left="left" :right="right" :only="only" :parent="parent" :level="level+1" @getParent="getParent(i, ...$event)" :ref="'list'+i" :data="item.child" :showId="showId" :id="id">
        <template slot-scope="item">
          <slot :data="item.data">
            <span>{{item.data[showId]}}</span>
          </slot>
        </template>
      </wd-multi-tree>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'WdMultiTree',
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
    left: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
    parent: {
      type: Boolean,
      default: false
    },
    only: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      index: [],
      backups: []
    }
  },
  methods: {
    init(val) {
      let id = this.id, index = [], a = [], b = []
      this.data.map((item, i) => {
        let a = false
        if (val.indexOf(item[id]) !== -1) {
          if (this.parent || !item.child) {
            a = item.child ? '1' : true
          } else {
            console.warn('[wdxx-ui Warn][Tree] value is not include parent level!')
          }
        }
        if (item.child) {
          let b = this.$refs['list' + i][0].init(val)
          if (b === true) {
            a = a ? true : '3'
          } else if (b) {
            a = a ? '4' : '2'
          }
        }
        index[i] = a
      })
      this.index = index
      this.backups = index
      a = index.filter(item => item)
      b = a.filter(i => {
        return i === true
      })
      return b.length === this.data.length ? true : a.length
    },
    onlySelect(i, item) {
      let index = [].concat(this.index), a = index[i]
      if (a === true) {
        a = item.child ? '3' : false
      } else if (a === '3') {
        a = true
      } else if (a === '1') {
        a = false
      } else if (a === '4') {
        a = '2'
      } else if (a === '2') {
        a = '4'
      } else {
        a = '1'
      }
      index[i] = a
      this.index = index
      this.setParent()
    },
    select(i, item) {
      let index = [].concat(this.index)
      index[i] = index[i] !== true
      this.index = index
      item.child && this.$refs['list' + i][0].selectedAll(index[i])
      this.setParent()
    },
    selectedAll(judge) {
      let index = []
      this.data.map((item, i) => {
        if (this.parent || !item.child) {
          index[i] = judge
        }
        item.child && this.$refs['list' + i][0].selectedAll(judge)
      })
      this.index = index
    },
    setParent() {
      let a = this.index, b = a.filter(item => item), c = b.filter(item => {
        return item === true
      })
      this.$emit('getParent', [c.length === this.data.length, b.length])
    },
    getParent(i, judge, val) {
      let index = [].concat(this.index), a = index[i]
      if (judge) {
        index[i] = (a === '1' || a === '4') ? true : '3'
      } else {
        if (val) {
          index[i] = (a === '1' || a === '4' || a === true) ? '4' : '2'
        } else {
          index[i] = (a === '1' || a === '4' || a === true) ? '1' : false
        }
      }
      this.index = index
      this.setParent()
    },
    getValue(a) {
      let data = this.data, vals = this.index
      vals.forEach((i, k) => {
        let item = data[k]
        if (i === true || i === '1' || i === '4') {
          a.push(item)
        }
        if (item.child) {
          a = this.$refs['list' + k][0].getValue(a)
        }
      })
      this.backups = this.index
      return a
    },
    reset() {
      this.index = this.backups
      let elems = this.$refs, keys = Object.keys(elems)
      keys.forEach(i => {
        elems[i][0].reset()
      })
    }
  }
}
</script>
