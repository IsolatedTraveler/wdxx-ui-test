<template>
  <div class="wd-list-box">
    <ul class="wd-list wd-col wd-scroll">
      <list-item v-for="(it,i) in data" ref="item" :key="i" :data="it" :showChild='i===selectedI' v-bind="{showId, valId, value: newVal, multi, index: i}" @selected="selectedEvent" @showChild="showChildEvent">
      </list-item>
    </ul>
    <div class="wd-row wd-btns" v-if="button || multi">
      <button>{{button ? button[0] : '取消'}}</button>
      <button>{{button ? button[1] : '确定'}}</button>
    </div>
  </div>
</template>
<script>
import list from '@m/list.js'
import listItem from './listItem'
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
    },
    split: [String, Array],
    button: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      newVal: []
    }
  },
  computed: {
    oldVal() {
      let v = this.value || ''
      if (this.multi) {
        const split = this.split
        if (split) {
          if (typeof split === 'string') {
            v = v.split(split).map(it => [it])
          } else {
            v = v.split(split[0]).map(it => {
              it = it.split(split[1])
              return [it.shift(), it]
            })
          }
        } else {
          console.warn('多选列表值缺少分割字符')
        }
      }
      return v
    }
  },
  watch: {
    value(v) {
      this.$nextTick(() => {
        this.initVal()
      })
    }
  },
  mounted() {
    this.initVal()
  },
  methods: {
    initVal() {
      if (this.multi) {
        this.newVal = JSON.parse(JSON.stringify(this.oldVal))
      } else {
        this.newVal = this.oldVal
      }
    },
    selectedEvent(it, add, isSelected, index) {
      const v1 = it[this.valId]
      this.judgeParaentIsShow(isSelected, index)
      if (this.multi) {
        const v = [v1, add]
        if (it.$def) {
          this.newVal = v
        } else if (it.$only) {
          if (isSelected) {
            this.newVal = v
          } else {
            this.newVal = []
          }
        } else {
          if (isSelected) {
            this.newVal.push(v)
          } else {
            this.newVal = this.newVal.filter(it => it[0] !== v1)
          }
        }
      } else {
        this.newVal = v1
        this.button || this.$emit('selected', it)
      }
    },
    showChildEvent(i) {
      this.judgeParaentIsShow(true, i)
    }
  }
}
</script>
