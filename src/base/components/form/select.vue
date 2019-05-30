<template>
  <div class="wd_select wd_flex" :class="{wd_error:error}">
    <div class="wd_flex wd_input" row @click.stop="disabled || showData()">
      <slot>
        <label>{{label}}</label>
      </slot>
      <input class="wd_auto" ref="input" :placeholder="placeholder" disabled v-model="valText">
      <span class="wd_icon wd_arrow"></span>
    </div>
    <div class="wd_pop wd_content" v-if="load" v-show="show">
       <div class="wd_flex wd_top" row v-if="label">
        <span class="wd_icon wd_arrow" @click.stop="back" right></span>
        <span class="wd_auto">{{label.replace(/[:：]$/, '')}}</span>
      </div>
      <div class="wd_flex wd_input wd_search" row v-if="search">
        <input class="wd_auto" ref="search" :placeholder="searchPlaceholder" v-model="searchVal">
        <span v-show="searchVal && judge" class="wd_icon wd_close"></span>
      </div>
      <tree :data="data" v-model="value" :showId="showId" :id="id"/>
    </div>
  </div>
</template>
<script>
import tree from '../data/tree'
export default {
  name: 'WdSelect',
  components: {
    tree
  },
  props: {
    data: {// 列表数据
      type: Array,
      default() {
        return []
      }
    },
    value: {// 选中值
      type: String,
      default: ''
    },
    label: {// 选择框标题
      type: String,
      default: ''
    },
    placeholder: {// 选项提示信息
      type: String,
      default: ''
    },
    searchPlaceholder: {// 检索提示信息
      type: String,
      default: '请输入检索数据进行检索'
    },
    disabled: {// 是否可操作
      type: Boolean,
      default: false
    },
    showId: {// 数据展示id
      type: String,
      default: 'mc'
    },
    id: {// 赋值id
      type: String,
      default: 'id'
    },
    filter: {// 自定义过滤规则
      type: Function,
      default: null
    },
    search: {// 是否开启检索功能
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      valText: '', // 选中值对应展示的数据
      error: false, // 表单验证成功与否
      load: true, // 是否加载列表数据
      show: true, // 是否显示列表数据
      searchVal: '', // 检索数据
      judge: false, // 检索框是否获取到焦点
      val: []
    }
  },
  computed: {
    dataList() {
      return this.data.filter((item) => {
        return this.filter ? this.filter(item, this.searchVal) : true
      })
    }
  },
  watch: {
    dataList(val) {
      this.init()
    },
    value() {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      let data = this.dataList
      this.valText = ''
      this.val = []
      if (this.value && data.length) {
        for (let index in data) {
          let item = data[index]
          if (item[this.id] === this.value) {
            this.valText = item[this.showId || this.id]
            this.val[index] = true
            break
          }
        }
        if (!this.val.length) {
          this.$emit('input', '')
        }
      }
    },
    validate(rules, data) {
      return this.$refs.input.validate(rules, data)
    },
    showData() {
      this.load = true
      if (this.show) {
        this.hide()
      } else {
        this.show = true
        this.$emit('getData', this.hide)
        this.$store.commit('back', this.hide)
      }
    },
    hide() {
      this.show = false
      this.$store.commit('back', null)
    },
    selected(data, index) {
      let judge = !this.val[index], val = []
      if (judge) {
        this.valText = data[this.showId || this.id]
        this.$emit('input', data[this.id])
      } else {
        this.valText = ''
        this.$emit('input', '')
      }
      val[index] = judge
      this.val = val
      this.hide()
    }
  }
}
</script>
<style>
</style>
