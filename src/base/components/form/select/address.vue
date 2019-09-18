<template>
  <div class="wd_flex wd_address wd_select" :class="{wd_show: show,wd_error: error}" row @click.stop="showPop(),initData()">
    <slot></slot>
    <div class="wd_auto" v-show="val">{{val}}</div>
    <input class="wd_auto" autocomplete="off" v-show="!val" type="text" :placeholder="placeholder" disabled :value="val">
    <span class="wd_icon wd_arrow"></span>
    <wd-pop mask v-show="show" ref="pop" @close="closePop()">
      <div class="wd_flex wd_content" @click.stop="">
        <div v-if="title" class="wd_title">{{title}}</div>
        <wd-nav scroll row :data="vals" :valId="valId" :showId="showId" :value="currentValue" @selected="resetAddress"/>
        <wd-list scroll @selected="selectedAddress" :data="addressData" :value="currentValue" :valId="valId" :showId="showId"/>
      </div>
    </wd-pop>
  </div>
</template>
<script>
export default {
  name: 'WdAddress',
  props: {
    value: {
      type: String,
      defalut: ''
    },
    placeholder: {
      type: String,
      defalut: ''
    },
    title: {
      type: String,
      defalut: ''
    },
    showId: {
      type: String,
      default: 'mc'
    },
    valId: {
      type: String,
      default: 'id'
    },
    sjid: {
      type: String,
      default: 'sjid'
    },
    isVerify: {
      type: String,
      default: ''
    },
    getData: {
      type: Function,
      default: null,
      required: true
    },
    getParents: {
      type: Function,
      default: null,
      required: true
    }
  },
  data() {
    return {
      currentValue: '',
      val: '',
      vals: [],
      currentItem: {},
      show: false,
      lastItem: {hide: true},
      addressData: [],
      error: false
    }
  },
  watch: {
    addressData(val) {
      if (val && val.length) {
        this.lastItem.hide = false
      } else {
        this.lastItem.hide = true
      }
    },
    value(val) {
      if (val !== this.currentValue) {
        this.init()
      }
    }
  },
  mounted() {
    this.lastItem[this.showId] = '请选择'
    this.lastItem[this.valId] = ''
    this.currentItem[this.valId] = this.value || ''
    this.init()
  },
  methods: {
    showPop() {
      if (this.show) {
        this.closePop()
      } else {
        let elem = document.querySelector('.wd_show .wd_pop')
        elem && (this.$store.getters.back())
        this.show = true
        document.body.append(this.$refs.pop)
        this.fun = this.$store.getters.back
      }
    },
    closePop() {
      this.show = false
      this.$store.commit('back', this.fun || null)
    },
    init() {
      if (this.value) {
        this.initVals()
      }
    },
    initVals() {
      this.getParents(this.value).then(res => {
        this.getVal(res)
        this.currentItem = res.pop()
        this.vals = res
        this.currentValue = this.value
      })
    },
    getVal(res) {
      let str = '';
      [].forEach.call(res, item => {
        str += item[this.showId]
      })
      this.val = str
    },
    initData() {
      this.getData(this.currentItem ? this.currentItem[this.sjid] : '').then(res => {
        this.addressData = res
        let val = this.vals.slice(-1)[0] || {}
        if (val[this.valId] !== this.lastItem[this.valId] || val[this.showId] !== this.lastItem[this.showId]) {
          this.vals.push(this.lastItem)
        }
      })
    },
    resetAddress(item, i) {
      this.vals.splice(i, this.vals.length - i - 1)
      this.currentValue = item[this.id] || ''
      this.getData(item[this.sjid]).then(res => {
        this.addressData = res
      })
    },
    selectedAddress(item) {
      item = item || this.currentItem
      this.currentItem = item
      this.vals.splice(-1, 0, item)
      this.currentValue = ''
      this.getData(item[this.valId]).then(res => {
        if (res.length) {
          this.addressData = res
        } else {
          this.closePop()
          this.$emit('input', item[this.valId])
          this.currentValue = item[this.valId]
          this.vals.pop()
          this.getVal(this.vals)
          this.vals.pop()
        }
      })
    },
    msg(msg) {
      this.error = true
      this.$msg.toast(msg, '警告').then(res => {
        this.error = false
        this.refs.input.onfoucs()
      }).catch(e => {
        this.error = false
      })
    }
  }
}
</script>
<style lang="scss">

</style>
