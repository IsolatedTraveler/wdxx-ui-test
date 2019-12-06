<template>
  <div class="wd_flex wd_select" :class="{wd_error:error}" row @click.stop="disabled || showPop()">
    <slot>
    </slot>
    <label :class="{wd_gray:val}" v-if="label">{{label}}</label>
    <span class="wd_text wd_auto" order='1' :class="{wd_gray:!val}">{{val ? val : data.length ? placeholder : dataError}}</span>
    <span class="wd_icon wd_icon_arrow" order="2"></span>
    <wd-pop ref='pop'>
      <div class="wd_flex wd_auto wd_content" @click.stop="">
        <wd-search v-if="search" :placeholder="searchPlaceholder" v-model="searchVal"/>
        <wd-list scroll class="wd_auto" @selected="selecteVal" :data="datas" icon="wd_right wd_circle" :value="value" :valId="valId" :showId="showId"/>
      </div>
    </wd-pop>
  </div>
</template>
<script>
export default {
  name: 'WdSelect',
  methods: {
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
      this.back()
    }
  }
}
</script>
<style lang="scss">

</style>
