<template>
  <div class="wd_flex wd_select wd_select_b" row @click.stop="showPop()" :class="{wd_show: show}">
    <span class="wd_auto wd_text">{{val}}</span>
    <slot>
      <span class="wd_icon wd_arrow"></span>
    </slot>
    <wd-pop-up ref="pop">
      <div class="wd_flex wd_auto wd_content" @click.stop="">
        <wd-search v-if="search" :placeholder="placeholder" v-model="searchVal"/>
        <wd-list scroll class="wd_auto" @selected="selecteVal" :data="datas" :value="value" :valId="valId" :showId="showId"/>
      </div>
    </wd-pop-up>
  </div>
</template>
<script>
export default {
  name: 'WdSelectB',
  props: {
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
    filter: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      val: '',
      valTemp: null,
      show: false,
      searchVal: ''
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
      this.val !== this.valTemp && this.init()
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
      this.$refs.pop.show()
    },
    init() {
      this.val = (this.data.filter(item => {
        return this.value === item[this.valId]
      })[0] || {})[this.showId]
    },
    selecteVal(item) {
      if (item) {
        this.valTemp = item[this.valId]
        this.val = item[this.showId]
        this.$emit('input', item[this.valId])
      }
      this.back()
    }
  }
}
</script>
<style lang="scss">

</style>
