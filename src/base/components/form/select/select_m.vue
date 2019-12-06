<template>
  <div class="wd_flex wd_select wd_select_m" :class="{wd_error:error}" row @click.stop="disabled || showPop()">
    <slot>
    </slot>
    <label :class="{wd_gray:val.length}">{{label}}</label>
    <span class="wd_auto wd_flex wd_val" row :class="{wd_gray:!value}">
      {{val.length ? '' : data.length ? placeholder : dataError}}
      <span v-for="(it,i) in val" :key="i" class="wd_item3">
        {{it[showId]}}
      </span>
    </span>
    <span class="wd_icon wd_icon_arrow"></span>
    <wd-pop ref='pop'>
      <div class="wd_flex wd_auto wd_content" @click.stop="">
        <wd-search v-if="search" :placeholder="searchPlaceholder" v-model="searchVal"/>
        <wd-list scroll class="wd_auto" @selected="selecteVal" :data="datas" :value="old" :valId="valId" :showId="showId"/>
        <div class="wd_flex wd_btn" row>
          <button class="wd_button" warn @click.stop="cancel">取消</button>
          <button class="wd_button" @click.stop="submit">确定</button>
        </div>
      </div>
    </wd-pop>
  </div>
</template>
<script>
export default {
  name: 'WdSelectMulti',
  props: {
    split: {
      type: String,
      default: ','
    }
  },
  methods: {
    init() {
      let value = this.value || '', val = value + this.split, split = this.split, id = this.valId
      this.val = this.data.filter(item => {
        return val.indexOf(item[id] + split) !== -1
      })
      this.oldVal = [].concat(this.val)
      this.old = value
    },
    selecteVal(item) {
      if (item) {
        let id = item[this.valId], split = this.split, value = this.old
        if (value) {
          value += ','
        }
        if (value.indexOf(id) === -1) {
          value += id
          this.oldVal.push(item)
        } else {
          value = value.replace(id + split, '')
          value = value.replace(new RegExp(split + '$'), '')
          this.oldVal = this.oldVal.filter(it => {
            return it[this.valId] === id
          })
        }
        this.old = value
      }
    },
    cancel() {
      this.old = this.value || ''
      this.oldVal = [].concat(this.val)
      this.back()
    },
    submit() {
      this.val = this.oldVal
      this.$emit('input', this.old)
      this.back()
    }
  }
}
</script>
<style lang="scss">

</style>
