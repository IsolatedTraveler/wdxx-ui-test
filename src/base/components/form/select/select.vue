<template>
  <div class="wd_flex wd_select" :class="{wd_error:error}" row @click.stop="disabled || showPop()">
    <slot>
    </slot>
    <label :class="{wd_gray:val}" v-if="label">{{label}}</label>
    <span class="wd_text wd_auto" :class="{wd_gray:!val}">{{val ? val : data.length ? '单击选择数据' : '当前选项未获取到数据'}}</span>
    <span class="wd_icon wd_arrow"></span>
    <wd-pop-up ref='pop' @close="closePop">
      <div class="wd_flex wd_auto wd_content" @click.stop="">
        <wd-search v-if="search" :placeholder="placeholder" v-model="searchVal"/>
        <wd-list scroll class="wd_auto" @selected="selecteVal" :data="datas" :value="value" :valId="valId" :showId="showId"/>
      </div>
    </wd-pop-up>
  </div>
</template>
<script>
export default {
  name: 'WdSelect',
  props: {
    label: {
      type: String,
      defalut: ''
    },
    value: {
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
    placeholder: {
      type: String,
      default: '请输入关键字检索'
    },
    dataError: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
    isVerify: {
      type: String,
      default: ''
    },
    filter: {
      type: Function,
      default: null
    },
    isNull: {
      type: Boolean,
      defalut: false
    }
  },
  data() {
    return {
      val: '',
      old: null,
      searchVal: '',
      error: false
    }
  },
  computed: {
    datas() {
      if (this.filter) {
        return this.data.filter(item => {
          return this.filter(item, this.searchVal || '')
        })
      } else {
        return this.data
      }
    },
    back() {
      return this.$store.getters.back
    }
  },
  watch: {
    value(val) {
      this.val !== this.old && this.init()
    },
    data(val) {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    showPop() {
      if (this.data.length) {
        this.$refs.pop.show()
      } else {
        this.$msg.toast(this.dataError || '当前选项未获取到数据').catch(e => {})
      }
    },
    closePop() {
      this.back()
    },
    init() {
      this.val = (this.data.filter(item => {
        return this.value === item[this.valId]
      })[0] || {})[this.showId]
    },
    selecteVal(item) {
      if (item) {
        let id = item[this.valId], val = item[this.showId]
        if (id === this.value && !this.isNull) {
          id = ''
          val = ''
        }
        this.val = val
        this.old = id
        this.$emit('input', id)
      }
      this.closePop()
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
