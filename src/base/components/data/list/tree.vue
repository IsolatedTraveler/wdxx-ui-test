<template>
  <component class="wd_tree" :is="skin" :data="list" :valId="valId" :showId="showId" :value="val" :icon="icon" :parentDisable="parentDisable" @selected="$emit('selected', $event)"/>
</template>
<script>
import listjs from './list.js'
export default {
  name: 'wdTree',
  components: {
    list() {
      return import('./components/treeList')
    }
  },
  extends: listjs,
  props: {
    value: {
      type: String,
      default: ''
    },
    parentDisable: {
      type: Boolean,
      default: false
    },
    pId: {
      type: String,
      default: 'pid'
    },
    format: {
      type: Boolean,
      default: false
      // 是否格式话  默认格式化
    },
    rootId: {
      type: String,
      default: ''
    },
    skin: {
      type: String,
      default: 'list'
    },
    split: {
      type: String,
      default: ','
    }
  },
  computed: {
    val() {
      return (this.value || '').split(this.split)
    },
    list() {
      let data = this.data
      if (!this.format) {
        let a = {}, id = this.valId, pId = this.pId
        data.forEach(it => {
          let key = it[pId], cid = it[id]
          it.unfold = false
          if (!a[cid]) {
            a[cid] = []
          }
          it.child = a[cid]
          if (a[key]) {
            a[key].push(it)
          } else {
            a[key] = [it]
          }
        })
        data = a[this.rootId]
      }
      return data
    }
  }
}
</script>
