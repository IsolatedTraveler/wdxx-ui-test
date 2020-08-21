<template>
  <div class="wd-form-item wd-select wd-row" @click.stop="disabled || (data.length ? (show = true) : $emit('get-data'))">
    <slot>
      <label class="wd-form-label" v-if="label" :class="{'wd-selected': value}">{{label}}</label>
    </slot>
    <div class="wd-row wd-auto wd-wrap" v-if="multi">
      <p class="wd-row" v-for="(it,i) in selectedItems" :key="i">
        {{it[showId]}}
        <span class="wd-icon wd-icon-close"></span>
      </p>
      <input type="text" class="wd-auto" readonly v-bind="{placeholder,order:'1',value: val}">
    </div>
    <input v-else type="text" class="wd-auto" readonly v-bind="{placeholder,order:'1',value: val}">
    <span class="wd-icon wd-icon-arrow"></span>
    <wd-pop :show="show" @show="show=false" shadeClose>
      <wd-list :data="data" ref="list" v-bind="{showId,valId,multi,split,data,value}" @selected="selectedEvent" @cancel="cancel"></wd-list>
    </wd-pop>
  </div>
</template>
<script>
import wdPop from '@c/pop/pop.vue'
import wdList from '@c/list/list.vue'
export default {
  name: 'wdSelect',
  components: {
    wdPop,
    wdList
  },
  props: {
    label: String,
    value: String,
    placeholder: String,
    disabled: Boolean,
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
    split: String
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
    }
  }
}
</script>
