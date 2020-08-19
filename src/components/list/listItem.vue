<template>
  <li class="wd-col">
    <div class="wd-row wd-list-item" :class="{'wd-selected': isSelected, 'wd-disabled': disabled}" @click.stop="clickEvent">
      <span class="wd-auto">
        {{data[showId]}}
      </span>
      <slot>
        <i class="wd-icon wd-icon-arrow"></i>
      </slot>
    </div>
      <ul class="wd-list wd-col" v-if="data.child" v-show="isShowChild">
        <wd-list-item v-for="(it,i) in data.child" :key="i" v-bind="{data: it, showId, valId, value, multi, notParent, index: i, showChild: i===selectedI}" @selected="selectedEvent" @showChild="showChildEvent">
        </wd-list-item>
     </ul>
  </li>
</template>
<script>
export default {
  name: 'wdListItem',
  props: {
    showId: {
      type: String,
      default: 'mc'
    },
    valId: {
      type: String,
      default: 'id'
    },
    value: {
      type: [String, Array],
      default: ''
    },
    multi: Boolean,
    data: {
      type: Object,
      require: true
    },
    notParent: Boolean,
    showChild: Boolean,
    index: Number
  },
  data() {
    return {
      isShowChild: false,
      selectedI: '',
      judge: false
    }
  },
  computed: {
    isSelected() {
      const v = this.value, data = this.data || {}, id = data[this.valId] || ''
      let j = false
      j = (this.multi ? this.initMulti : this.initSignle)(v, id, data.$def || data.$only)
      this.initVal(j, true)
      return j
    },
    disabled() {
      return this.data.disabled || (this.data.child && this.notParent)
    }
  },
  watch: {
    showChild(v) {
      this.isShowChild = v
    }
  },
  methods: {
    initMulti(v, id, def) {
      return !!(v.filter(it => {
        return it === id
      })[0] || (!v[0] && def))
    },
    initSignle(v, id) {
      return (v || '') === id
    },
    initVal(j, judge) {
      this.judge !== j && this.$emit('selected', this.data, j, this.index, judge)
      this.judge = j
    },
    init() {
      this.$children.forEach(it => {
        it.init()
      })
      this.isSelected && this.$emit('showChild', this.index, true)
    },
    clickEvent() {
      if (this.multi) {
        this.isShowChild = this.disabled ? !this.isShowChild : !this.isShowChild || !this.isSelected
      } else {
        this.data.child && this.$emit('showChild', this.index)
      }
      !this.disabled && this.$emit('selected', this.data, !this.isSelected, this.index)
    },
    selectedEvent(data, judge, index, init) {
      this.$emit('selected', data, judge, index, init)
    },
    showChildEvent(i, judge) {
      judge && this.$emit('showChild', this.index, true)
      if (this.multi) {
        this.isShowChild = true
      } else {
        this.selectedI = i
      }
    }
  }
}
</script>
