<template>
  <div class="wd-form-item wd-select" @click.stop="disabled && (data.length ? (show = true) : $emit('get-data'))">
    <slot>
      <label class="wd-form-label" v-if="label" :class="{'wd-selected': value}">{{label}}</label>
    </slot>
    <div class="wd-row wd-auto" :class="{'wd-wrap': multi}">
      <p class="wd-row" v-for="(it,i) in selectedItems" :key="i">
        {{it[showId]}}
        <span class="wd-icon wd-icon-close"></span>
      </p>
      <input type="text" class="wd-auto" readonly v-bind="{placeholder,order:'1',value: val}">
    </div>
    <span class="wd-icon wd-icon-arrow"></span>
    <wd-pop :show="show" @show="show=false">
      <wd-list :data="data" v-bind="{showId,valId,multi,split,data,accordion,value}"></wd-list>
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
    accordion: Boolean,
    multi: Boolean,
    split: [String, Array]
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    val() {
      return ''
    },
    selectedItems() {
      return this.$refs.list ? this.$refs.list.newVal : ''
    }
  }
}
</script>
