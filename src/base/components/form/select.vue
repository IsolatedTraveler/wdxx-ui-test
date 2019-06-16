<template>
  <div class="wd_select wd_flex" ref="select" row @click.stop="showData" :class="{wd_error:error}">
    <slot>
      <label>{{label}}</label>
    </slot>
    <div class="wd_auto wd_flex" row wrap v-if="valShow" :class="{wd_multi: multi}">
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
      <component :is="multi?'wd-multi':'wd-single'" class="wd_auto" scroll :left="left" @selected="selected" :right="right" :only="only" ref="tree" :data="data" :parent="parent" :showId="showId" :id="id"/>
      <div v-if="showButton" class="wd_flex wd_buttons" row>
        <button class="wd_button" @click.stop="cancel" default>取消</button>
        <button class="wd_button" @click.stop="submit" >确定</button>
      </div>
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
    left: {
      type: String,
      default: ''
    },
    right: {
      type: String,
      default: ''
    },
    only: {
      type: Boolean,
      default: false
    },
    parent: {
      type: Boolean,
      default: false
    },
    showId: {
      type: String,
      default: 'mc'
    },
    id: {
      type: String,
      default: 'id'
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: String | Array,
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
      val: [],
      searchVal: '',
      showSearchClear: false
    }
  },
  computed: {
    showButton() {
      return this.buttonShow || this.multi
    },
    valText() {
      return this.val.map(item => item[this.showId])
    }
  },
  mounted() {
    this.init()
    if (!this.valShow) {
      let elem = this.$refs.select
      console.log(elem)
    }
  },
  methods: {
    init(val) {
      val = val || this.value
      if (this.data.length && val && (!this.multi || val.length)) {
        this.$refs.tree.init(val)
      }
      this.backup = val
      this.multi && (this.val = this.$refs.tree.getValue([]))
    },
    cancel() {
      this.hide()
      if (this.multi) {
        this.$refs.tree.reset()
      } else {
        if (this.val[this.id] !== this.value) {
          this.$refs.tree.init(this.backup[0])
        }
      }
    },
    submit() {
      this.hide()
      if (this.multi) {
        let res = this.$refs.tree.getValue([])
        this.backup = res
        this.$emit('input', res.map(item => { return item[this.id] }))
      } else {
        this.backup = this.val[0]
        this.$emit('input', (this.val[0] || {})[this.id])
      }
    },
    selected(data) {
      if (this.showButton) {
        this.val = [data]
      } else {
        this.val = [data]
        this.$emit('input', data[this.id])
        this.hide()
      }
    },
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
    .wd_buttons{
      width: 100%;
      justify-content: space-around;
    }
    .wd_button{
      width: 45%;
      height: 35px;
      margin: 0.5em 0;
    }
  }
}
</style>
