<template>
  <ul class="wd-list wd-col wd-scroll">
    <list-item v-for="(it,i) in data" :key="i" :data="it" v-bind="{showId, valId, value: val, split}" @selected="select">
    </list-item>
  </ul>
</template>
<script>
import listItem from './listNode'
import { list } from '@m/list.js'
export default {
  name: 'wdList',
  mixins: [list],
  components: {
    listItem
  },
  props: {
    data: {
      type: Array,
      require: true
    }
  },
  computed: {
    val() {
      let v = this.value || ''
      if (this.multi) {
        const split = this.split
        if (split) {
          if (typeof split === 'string') {
            v = v.split(split).map(it => [it])
          } else {
            v = v.split(split[0]).map(it => {
              it = it.split(split[1])
              return it
            })
          }
        } else {
          console.warn('多选列表值缺少分割字符')
        }
      }
      return v
    }
  },
  methods: {
    select(it, judge) {
      if (this.multi) {
        this.newVal = this.$children.filter(it => it.selected)
      } else {
        this.$emit('selected', it[this.valId], it)
      }
    }
  }
}
</script>
