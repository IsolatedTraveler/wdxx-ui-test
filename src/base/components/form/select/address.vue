<template>
  <div class="wd_flex wd_address wd_select" :class="{wd_error: error, wd_gray:disabled}" row @click.stop="disabled || $refs.pop.show()">
    <slot>
    </slot>
    <label :class="{wd_gray:val}" v-if="label">{{label}}</label>
    <div class="wd_auto" v-show="val">{{val}}</div>
    <input class="wd_auto" autocomplete="off" v-show="!val" type="text" :placeholder="placeholder" :value="val">
    <span class="wd_icon wd_icon_arrow"></span>
    <wd-pop ref="pop" :shadeClose="shadeClose">
      <div class="wd_flex wd_content" @click.stop="">
        <div v-if="label" class="wd_label">{{label.replace(/[:：]/, '')}}</div>
        <wd-nav scroll row :data="vals" :valId="valId" :showId="showId" :value="old" @input="resetAddress"/>
        <wd-list scroll @selected="selectedAddress" :data="addressData" :value="old" :valId="valId" :showId="showId"/>
      </div>
    </wd-pop>
  </div>
</template>
<script>
export default {
  name: 'WdAddress',
  props: {
    sjid: {
      type: String,
      default: 'sjid'
    },
    shadeClose: {
      type: Boolean,
      default: false
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
      vals: []
    }
  },
  computed: {
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
    }
  }
}
</script>
<style lang="scss">

</style>
