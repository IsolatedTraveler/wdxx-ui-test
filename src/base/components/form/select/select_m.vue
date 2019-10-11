<template>
  <div class="wd_flex wd_select wd_select_m" :class="{wd_error:error}" row @click.stop="disabled || showPop()">
    <label :class="{wd_gray:val.length}">{{label}}</label>
    <span class="wd_auto wd_flex wd_val" row :class="{wd_gray:!value}">
      {{val.length ? '' : data.length ? '单击选择数据' : '当前选项未获取到数据'}}
      <span v-for="(it,i) in val" :key="i" class="wd_item3">
        {{it[showId]}}
      </span>
    </span>
    <span class="wd_icon wd_arrow"></span>
    <slot>
    </slot>
    <wd-pop-up ref='pop' @close="closePop">
      <div class="wd_flex wd_auto wd_content" @click.stop="">
        <wd-search v-if="search" :placeholder="placeholder" v-model="searchVal"/>
        <wd-list scroll class="wd_auto" @selected="selecteVal" :data="datas" :value="old" :valId="valId" :showId="showId"/>
        <div class="wd_flex wd_btn" row>
          <button class="wd_button" warn @click.stop="cancel">取消</button>
          <button class="wd_button" @click.stop="submit">确定</button>
        </div>
      </div>
    </wd-pop-up>
  </div>
</template>
<script>
export default {
  name: 'WdSelectMulti',
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
    split: {
      type: String,
      default: ','
    }
  },
  data() {
    return {
      val: [],
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
    msg(msg) {
      this.error = true
      this.$msg.toast(msg, '警告').then(res => {
        this.error = false
        this.refs.input.onfoucs()
      }).catch(e => {
        this.error = false
      })
    },
    cancel() {
      this.old = this.value || ''
      this.oldVal = [].concat(this.val)
      this.closePop()
    },
    submit() {
      this.val = this.oldVal
      this.$emit('input', this.old)
      this.closePop()
    }
  }
}
</script>
<style lang="scss">

</style>
