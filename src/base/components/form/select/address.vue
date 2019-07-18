<template>
  <div class="wd_flex wd_address" row @click.stop="show=!show">
    <slot></slot>
    <input class="wd_auto" autocomplete="off" type="text" :placeholder="placeholder" disabled :value="val">
    <span class="wd_icon wd_arrow"></span>
    <wd-pop mask v-show="show" @close="show=!show">
      <div class="wd_flex wd_content" @click.stop="">
        <div v-if="title" class="wd_title">{{title}}</div>
        <wd-nav row :data="vals" :showId="showId"/>
        <wd-list></wd-list>
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
    }
  },
  data() {
    return {
      val: '',
      vals: [],
      show: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.value) {

      } else {
        let item = {}
        item[this.showId] = '请选择'
        this.vals = [item]
      }
    }
  }
}
</script>
<style lang="scss">

</style>
