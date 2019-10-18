<template>
  <div class="wd_flex wd_address wd_select" :class="{wd_error: error}" row @click.stop="$refs.pop.show()">
    <slot></slot>
    <div class="wd_auto" v-show="val">{{val}}</div>
    <input class="wd_auto" autocomplete="off" v-show="!val" type="text" :placeholder="placeholder" disabled :value="val">
    <span class="wd_icon wd_arrow"></span>
    <wd-pop-up mask ref="pop">
      <div class="wd_flex wd_content" @click.stop="">
        <div v-if="title" class="wd_title">{{title}}</div>
        <wd-nav scroll row :data="vals" :valId="valId" :showId="showId" :value="old" @input="resetAddress"/>
        <wd-list scroll @selected="selectedAddress" :data="addressData" :value="old" :valId="valId" :showId="showId"/>
      </div>
    </wd-pop-up>
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
      lastItem: {},
      addressData: [],
      vals: [],
      old: '',
      error: false
    }
  },
  computed: {
    back() {
      return this.$store.getters.back
    },
    val() {
      let val = this.vals.map(item => {
        return item[this.showId]
      })
      return val.join('')
    }
  },
  watch: {
    value(v) {
      v !== this.old && this.init()
    }
  },
  mounted() {
    this.lastItem[this.showId] = '请选择'
    this.lastItem[this.valId] = ''
    this.vals.push(this.lastItem)
    this.value && this.init()
  },
  methods: {
    init() {
      this.vals = [this.lastItem]
      if (this.value) {
        this.initVals()
      } else {
        this.initData()
      }
    },
    initVals() {
      this.getParents(this.value).then(res => {
        let val = res.pop()
        val.id = this.value
        res.push(val)
        this.vals = res
        this.old = this.value
        this.initData(val.sjid)
      })
    },
    initData(sjid, judge) {
      this.getData(sjid || '').then(res => {
        if (res.length) {
          this.addressData = res
          if (judge) {
            this.old = this.lastItem[this.valId]
            this.vals.push(this.lastItem)
          }
        } else {
          this.old = sjid
          this.$emit('input', sjid)
          this.back()
        }
      })
    },
    resetAddress(val, i) {
      this.vals = this.vals.slice(0, i + 1)
      this.old = val
      this.initData(this.vals.slice(-1)[0].sjid)
    },
    selectedAddress(item) {
      this.vals.pop()
      this.vals.push(item)
      this.initData(item.id, true)
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
