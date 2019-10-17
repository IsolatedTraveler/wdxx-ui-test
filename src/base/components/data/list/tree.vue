<template>
  <component class="wd_tree" :is="skin" :data="list" :valId="valId" :showId="showId" :value="val" :icon="icon" :parentDisable="parentDisable"/>
</template>
<script>
import list from './components/treeList'
export default {
  name: 'wdTree',
  components: {
    list
  },
  props: {
    data: Array,
    default() {
      return []
    },
    value: {
      type: String || [],
      default: ''
    },
    valId: {
      type: String,
      default: 'id'
    },
    showId: {
      type: String,
      default: 'mc'
    },
    parentDisable: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: 'wd_arrow'
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
    }
  },
  computed: {
    val() {
      return this.value || ''
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
  },
  methods: {
    selected(item, i) {
      if (!item.diabled && (!item.child || !this.parentDisable)) {

      }
    }
  }
}
</script>
