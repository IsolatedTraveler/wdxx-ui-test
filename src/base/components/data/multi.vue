<template>
  <ul class="wd_list" :class="'wd_list_'+level">
    <li v-for="(item,i) in data" :key="i" class="wd_flex">
      <div class="wd_flex wd_list_item" row :class="{wd_parent: item.child,wd_child: !item.child, wd_selected: (parent || !item.child) && index[i] && index[i] ===true && index[i] === '1'}" @click.stop="select(i,item)">
        <span v-if="left" class="wd_icon" left></span>
        <span class="wd_auto">
          <slot :data="item">
            {{item[showId]}}
          </slot>
        </span>
        <span v-if="right" class="wd_icon" right></span>
      </div>
      <wd-multi v-if="item.child" :left="left" :right="right" :only="only" :parent="parent" :level="level+1" @getParent="getParent(i, ...$event)" :ref="'list'+i" :data="item.child" :showId="showId" :id="id">
        <template slot-scope="item">
          <slot :data="item.data">
            <span>{{item.data[showId]}}</span>
          </slot>
        </template>
      </wd-multi>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'WdMulti',
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
      let id = this.id, index = []
      this.data.map((item, i) => {
        if (val.indexOf(item[id]) !== -1) {
          if (this.parent || !item.child) {
            index[i] = '1'
          } else {
            console.warn('./wdxx-ui/components/data/multi.vue项目初始化值不能包含子项目，加上parent属性以解决该问题')
          }
        }
        item.child && this.$refs['list' + i][0].init(val)
      })
      this.index = index
      this.backups = index
    },
    select(i, item, judge) {
      let index = [].concat(this.index), a = index[i]
      if (this.parent && !this.only && item.child) {
        if (a === '1' || a === '3') {
          index[i] = true
        } else if (a) {
          index[i] = false
        } else {
          index[i] = '1'
        }
      } else {
        index[i] = !index[i]
      }
      this.index = index
      item.child && this.$refs['list' + i][0].selectedAll(index[i] === true)
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
      let index = this.index.filter(item => item)
      this.$emit('getParent', [index.length === this.data.length, index.length])
    },
    getParent(i, judge, val) {
      let index = [].concat(this.index)
      if (this.only) {
        if (judge) {
          index[i] = true
        } else {
          index[i] = val ? '2' : false
        }
      } else {
        if (judge) {
          index[i] = '3'
        } else {
          index[i] = val ? '2' : false
        }
      }
      this.index = index
      this.setParent()
    },
    getValue() {
      new Promise((resolve, reject) => {
        let d = [], exe = [], data = this.data
        this.index.forEach(i => {
          if (i) {
            let item = data[i]
            (i === true || i === '1') && d.push(item)
            item.child && exe.push(this.$refs['list' + i][0].getValue())
          }
        })
        if (exe.length) {
          Promise.all(exe).then(res => {
            d.concat(...res)
            resolve(d)
          })
        } else {
          resolve(d)
        }
      })
    }
  }
}
</script>
