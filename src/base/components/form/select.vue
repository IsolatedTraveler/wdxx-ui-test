<template>
  <div class="wd_select wd_flex" row @click.stop="showData" :class="{wd_error:error}">
    <slot>
      <label>{{label}}</label>
    </slot>
    <div class="wd_auto" v-if="valShow" :class="{wd_multi: multi}">
      <span v-for="(item,index) in valText" :key="index">{{item}}</span>
       <input class="wd_auto" autocomplete="off" type="text" :placeholder="placeholder">
    </div>
    <span class="wd_icon wd_arrow"></span>
    <div class="wd_pop wd_flex" v-show="show">
      <div class="wd_flex wd_top" row v-if="topShow">
        <div class="left" @click.stop="hide">
          <span class="wd_icon wd_arrow"></span>
        </div>
        <span class="wd_auto">{{label.replace(/[:：]$/, '')}}</span>
      </div>
      <div class="wd_flex wd_input" row @click.stop="">
        <input class="wd_auto" autocomplete="off" type="text" ref="input" @focus.stop="showSearchClear=true" @blur.stop="showSearchClear=false" placeholder="请输入检索码" v-model="searchVal">
        <span @click.stop="clearVal" class="wd_icon wd_close" v-show="searchVal && showSearchClear"></span>
      </div>
      <component :is="multi?'wd-multi':'wd-single'" :left="left" @selected="selected" :right="right" :only="only" ref="tree" :data="data" :parent="parent" :showId="showId" :id="id"/>
    </div>
  </div>
</template>
<script>
import wdSingle from '../data/singleTree'
import wdMulti from '../data/multiTree'
import wdInput from './input'
export default {
  name: 'WdSelect',
  components: {
    wdInput,
    wdSingle,
    wdMulti
  },
  props: {
    valShow: {
      type: Boolean,
      default: true
    },
    topShow: {
      type: Boolean,
      default: true
    },
    buttonShow: {
      type: Boolean,
      default: false
    },
    multi: {
      type: Boolean,
      default: false
    },
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
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isVerify: {
      type: String,
      default: ''
    },
    showId: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    filter: {
      type: Function,
      default: null
    },
    search: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      error: false,
      show: false,
      valText: [],
      val: [],
      searchVal: '',
      showSearchClear: false
    }
  },
  computed: {
    showButton() {
      return this.buttonShow || this.multi
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
  },
  methods: {
    showData() {
      if (!this.showButton && this.show) {
        this.hide()
      } else {
        this.show = true
        this.$emit('getData')
        this.$store.commit('back', this.hide)
      }
    },
    hide() {
      this.show = false
      this.$store.commit('back', null)
    },
    validate(rules) {
      console.log(rules)
      let regs = rules.reg, rule = rules.rule
      if (regs) {
        regs = regs.split(',')
        for (let reg of regs) {
          if (!this.verify(this.defaultRules[reg])) {
            return false
          }
        }
      }
      if (rule) {
        for (let reg of rule) {
          if (!this.verify(reg)) {
            return false
          }
        }
      }
      return true
    },
    verify(rule) {
      let val = this.value || ''
      if (rule.reg.test(val)) {
        return true
      }
      this.error = true
      this.$msg.toast(rule.msg, '警告').then(res => {
        this.error = false
        this.refs.input.onfoucs()
      }).catch(e => {
        this.error = false
      })
      return false
    }
  }
}
</script>
<style lang="scss">
.wd_select{
  .wd_icon{
    font-size: 1.5em;
  }
  >.wd_pop{
    background: #fff;
    .wd_input{
      width: 90%;
      border-radius: 1em;
      border: 1px solid #ccc;
      line-height: 2em;
      height: 2em;
      margin: 0.5em 0;
      input{
        padding: 0 1em;
      }
    }
  }
}
</style>
