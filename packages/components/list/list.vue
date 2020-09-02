<template>
  <ul class="wd-list wd-col wd-scroll">
    <li class="wd-row wd-btns wd-abs" v-if="butShow" @click.stop>
      <button @click.stop="$emit('cancel')">{{button ? button[0] : '取消'}}</button>
      <button @click.stop="selected()">{{button ? button[1] : '确定'}}</button>
    </li>
    <list-item v-for="(it,i) in data" ref="item" :key="i" v-bind="{data: it, showId, valId, value: newVal, multi, notParent, index: i, showChild: i===selectedI}" @selected="selectedEvent" @showChild="showChildEvent">
      <slot>
        <i class="wd-icon wd-icon-arrow"></i>
      </slot>
    </list-item>
  </ul>
</template>
<script>
const debounce = require('@u/index.js').debounce
export default {
  name: 'wdList',
  props: {
    split: String,
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
      if (this.multi && typeof v === 'string') {
        const split = this.split
        if (split) {
          v = v.split(split).filter(it => it)
        } else {
          console.error('多选列表值缺少分割字符')
        }
      }
      return v
    },
    butShow() {
      return !!(this.button || this.multi)
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
    this.debounceSelected = debounce(this.selected, 50)
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
      const id = this.valId, v = it[id]
      if (this.multi) {
        if (!init) {
          this.newVal = this.setVal(!it.$def && !it.$only, v, judge)
        }
        this.selectedItems = this.selectedItems.filter(it => it[id] !== v)
        judge && this.selectedItems.push(it)
      } else {
        if (!init) {
          this.newVal = v
        }
        this.selectedItems = [it]
      }
      (init || !this.butShow) && this.debounceSelected(init)
    },
    showChildEvent(i) {
      if (!this.multi) {
        this.selectedI = i
      }
    },
    selected(init) {
      this.$emit('selected', this.split && this.multi ? this.newVal.join(this.split) : this.newVal, this.selectedItems, init)
    }
  }
}
</script>
