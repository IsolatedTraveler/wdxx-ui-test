<template>
  <div class="wd_treeSelect" @click.stop="showData">
    <wd-input class="wd_select" :readonly="readonly" :disabled="disabled" mold="triangle" ref="input" :value="valText" :label="label" :placeholder="placeholder" :close="false"/>
    <wd-pop v-if="load" :top="false" :mask="true" @close="hide" v-show="show">
      <div class="title">{{label.replace(/[:：]$/, '')}}</div>
      <div class="flex row list">
        <span v-for="(item,index) in showVal" @click.stop="selectedVal(item, index)" :class="{selected:index===selectedIndex}" :key="index">{{item[showId]}}</span>
      </div>
      <wd-list :val="val" :showId="showId || id" :data="data" @click="selected" type='circle' style="background: #fff"/>
    </wd-pop>
  </div>
</template>
<script>
export default {
  name: 'WdTreeSelect',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default() {
        return []
      }
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    close: {
      type: Boolean,
      default: true
    },
    isVerify: {
      type: String,
      default: ''
    },
    rules: {
      type: Object,
      default() {
        return {
          reg: '',
          rule: null
        }
      }
    },
    showId: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false,
      load: false,
      valText: '',
      val: [],
      showVal: [],
      selectedIndex: 0,
      selectVal: ''
    }
  },
  watch: {
    data(val) {
      this.val = []
      if (this.selectedVal !== undefined && this.selectedVal !== null) {
        for (let index in val) {
          let item = val[index]
          if (item[this.id] === this.selectVal) {
            this.select(item, index)
            break
          }
        }
      }
      if (!val.length) {
        this.hide(true)
      }
    },
    list(val) {
      this.showVal = [].concat(this.list)
      this.initVal()
    }
  },
  created() {
    this.showVal = [].concat(this.list)
    this.initVal()
  },
  methods: {
    initVal() {
      let item = {}
      item[this.showId] = '请选择'
      this.showVal.push(item)
    },
    validate(rules, data) {
      return this.$refs.input.validate(rules || this.rules, data)
    },
    showData() {
      this.$emit('getData', this.showVal.length > 1 ? this.showVal.slice(-2)[0] : '')
      if (this.value) {
        this.selectedIndex = this.showVal.length - 1
      }
      this.load = true
      this.show = true
      this.$store.commit('back', this.hide)
    },
    hide(judge) {
      if (judge) {
        this.showVal.pop()
        let data = this.showVal.slice(-1)[0]
        this.valText = data[this.showId]
        this.$emit('input', data[this.id])
      }
      this.show = false
      this.$store.commit('back', null)
    },
    select(data, index) {
      let val = []
      val[index] = true
      this.val = val
    },
    selected(data, index) {
      this.$emit('getData', data)
      this.showVal.splice(this.selectedIndex, this.showVal.length - this.selectedIndex, data)
      this.initVal()
      this.selectVal = data[this.id]
      this.selectedIndex = this.showVal.length - 1
    },
    selectedVal(data, index) {
      this.$emit('getData', this.showVal[index - 1])
      this.selectedIndex = index
      this.selectVal = data[this.id]
    }
  }
}
</script>
<style lang="scss">
</style>
