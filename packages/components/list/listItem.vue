<template>
  <li class="wd-col" :class="{'wd-list-parent': data.child}">
    <div class="wd-row wd-list-item" :class="{'wd-selected': isSelected}" @click.stop="clickEvent">
      <span class="wd-auto">
        {{data[showId]}}
      </span>
      <slot>
        <i class="wd-icon wd-icon-arrow"></i>
      </slot>
    </div>
      <ul class="wd-list wd-col" v-if="data.child" v-show="isShowChild">
        <list-item v-for="(it,i) in data.child" :key="i" :data="it" :showChild='i===selectedI' v-bind="{showId, valId, value, multi, index: i}" @selected="selectedEvent" @showChild="showChildEvent">
        </list-item>
     </ul>
  </li>
</template>
<script>
import list from '@m/list.js'
export default {
  name: 'wdListItem',
  mixins: [list],
  props: {
    data: {
      type: Object,
      require: true
    },
    showChild: Boolean,
    index: Number
  },
  data() {
    return {
      add: [],
      isShowChild: false,
      newIsSelected: false
    }
  },
  computed: {
    isSelected() {
      const v = this.value, data = this.data || {}, id = data[this.valId] || ''
      let j = false
      j = (this.multi ? this.initMulti : this.initSignle)(v, id, data.$def)
      return j
    }
  },
  watch: {
    showChild(v) {
      this.isShowChild = v
    },
    isSelected(v) {
      if (this.newIsSelected !== v && this.newIsSelected && !this.isShowChild) {
        this.$emit('showChild', this.index)
      }
    }
  },
  methods: {
    initMulti(v, id, def) {
      return !!(v.filter(it => {
        return it[0] === id
      })[0] || ((!v[0] || !v[0][0]) && def))
    },
    initSignle(v, id) {
      return (v || '') === id
    },
    selectedEvent(it, add, isSelected, index) {
      this.judgeParaentIsShow(isSelected, index)
      this.$emit('selected', it, add, isSelected, this.index)
    },
    clickEvent() {
      this.newIsSelected = !this.newIsSelected
      this.$emit('selected', this.data, this.add, this.newIsSelected, this.index)
    },
    showChildEvent(i) {
      this.judgeParaentIsShow(true, i)
      this.isShowChild = true
      this.$emit('showChild', this.index)
    }
  }
}
</script>
