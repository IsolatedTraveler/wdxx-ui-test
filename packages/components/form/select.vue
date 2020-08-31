<template>
  <div class="wd-form-item wd-select wd-row" @click.stop="disabled || (data.length ? (show = true) : $emit('get-data'))" :class="{'wd-error': error}">
    <slot>
      <label class="wd-form-label" v-if="label" :class="{'wd-selected': value}">{{label}}</label>
    </slot>
    <div class="wd-row wd-auto wd-wrap wd-input" v-if="multi" order="1">
      <p class="wd-row" v-for="(it,i) in selectedItems" :key="i" @click.stop="del(it)" :def="it.$def">
        {{it[showId]}}
        <span class="wd-icon wd-icon-close" v-if="!it.$def"></span>
      </p>
      <input type="text" class="wd-auto" readonly v-bind="{placeholder,value: val}">
    </div>
    <input v-else type="text" class="wd-auto" readonly v-bind="{placeholder,order:'1',value: val}">
    <span class="wd-icon wd-icon-arrow" order="2"></span>
    <wd-pop :show="show" @show="show=false" shadeClose>
      <wd-list :data="data" ref="list" v-bind="{showId,valId,multi,split,data,value,notParent}" @selected="selectedEvent" @cancel="cancel"></wd-list>
    </wd-pop>
  </div>
</template>
<script>
export default {
  name: 'wdSelect',
  props: {
    title: String,
    data: Array,
    search: Boolean,
    showId: {
      type: String,
      default: 'mc'
    },
    valId: {
      type: String,
      default: 'id'
    },
    multi: Boolean,
    split: String,
    notParent: Boolean
  },
  data() {
    return {
      show: false,
      selectedItems: []
    }
  },
  computed: {
    val() {
      return this.selectedItems[0] ? this.multi ? ' ' : this.selectedItems[0][this.showId] : ''
    }
  },
  methods: {
    selectedEvent(val, its, init) {
      this.selectedItems = its
      if (!init) {
        this.$emit('input', val)
        this.cancel()
      }
    },
    cancel() {
      this.show = false
    },
    del(it) {
      this.$emit('input', this.value.split(this.split).filter(v => it[this.valId] !== v).join(this.split))
    }
  }
}
</script>
