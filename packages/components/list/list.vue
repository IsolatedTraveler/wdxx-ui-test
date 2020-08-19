<template>
  <div class="wd-list-box wd-col">
    <ul class="wd-list wd-col wd-auto wd-scroll">
      <list-item v-for="(it,i) in data" ref="item" :key="i" v-bind="{data: it, showId, valId, value: newVal, multi, notParent, index: i, showChild: i===selectedI}" @selected="selectedEvent" @showChild="showChildEvent">
      </list-item>
    </ul>
    <div class="wd-row wd-btns" v-if="button || multi">
      <button>{{button ? button[0] : '取消'}}</button>
      <button @click.stop="$emit('selected', newVal)">{{button ? button[1] : '确定'}}</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'wdList',
  props: {
    split: {
      type: String,
      defalut: ','
    },
    button: {
      type: Array,
      default: null
    },
    data: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      newVal: [],
      selectedItems: []
    }
  },
  computed: {
    oldVal() {
      let v = this.value || ''
      if (this.multi) {
        const split = this.split
        if (split) {
          v = v.split(split).filter(it => it)
        } else {
          console.error('多选列表值缺少分割字符')
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
  created() {
    this.initVal()
  },
  mounted() {
    setTimeout(() => {
      this.init()
    }, 200)
  },
  methods: {
    init() {
      this.$children.forEach(it => {
        it.init()
      })
    },
    initVal() {
      if (this.multi) {
        this.newVal = JSON.parse(JSON.stringify(this.oldVal))
      } else {
        this.newVal = this.oldVal
      }
    },
    setVal(def, v, judge) {
      let val = []
      if (def) {
        val = this.newVal.filter(it => it !== v)
      }
      judge && val.push(v)
      return val
    },
    selectedEvent(it, judge, i, init) {
      const v = it[this.valId]
      if (this.multi) {
        if (!init) {
          this.newVal = this.setVal(!it.$def && !it.$only, v, judge)
        }
        this.selectedItems.filter(it => it[this.showId] !== v)
        judge && this.selectedItems.push(it)
      } else {
        if (!init) {
          this.newVal = v
        }
        this.selectedItems = [it]
        this.button || this.$emit('selected', v, it)
      }
    },
    showChildEvent(i) {
      if (!this.multi) {
        this.selectedI = i
      }
    }
  }
}
</script>
