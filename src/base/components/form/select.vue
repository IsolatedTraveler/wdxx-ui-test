<template>
  <div class="wd_treeSelect" @click.stop="showData">
    <wd-input class="wd_select" :readonly="readonly" mold="triangle" ref="input" :value="valText" :label="label" :placeholder="placeholder" :close="false">
      <slot></slot>
    </wd-input>
    <wd-pop v-if="load" :title="label.replace(/[:：]$/, '')" v-show="show" @close="hide">
      <wd-input class="search" v-model="searchVal" placeholder="请输入检索信息">
        <slot name="search"></slot>
      </wd-input>
      <wd-list class="auto" :val="val" :showId="showId || id" :data="dataList" @click="selected" type='circle' style="background: #fff"/>
    </wd-pop>
  </div>
</template>
<script>
export default {
  name: 'WdSelect',
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
      show: false,
      load: false,
      valText: '',
      judge: false,
      val: [],
      searchVal: ''
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
      return this.$refs.input.validate(rules || this.rules, data)
    },
    showData() {
      this.load = true
      this.show = true
      this.$emit('getData', this.hide)
      this.$store.commit('back', this.hide)
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
