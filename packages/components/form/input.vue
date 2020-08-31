<template>
  <div class="wd-form-item wd-select wd-row" :class="{'wd-error': error}">
    <slot>
      <label class="wd-form-label" v-if="label" :class="{'wd-selected': value}">{{label}}</label>
    </slot>
    <input class="wd-auto" ref="input" @input="$emit('input',$event.target.value)" v-bind="{value, placeholder, readonly: disabled, type: type1}" v-on="event">
    <span class="wd-icon" :class="iconVal" @mousedown="change" order="2"></span>
    <span v-if="unit" class="wd-unit" order="2">{{unit}}</span>
  </div>
</template>
<script>
export default {
  name: 'wdInput',
  props: {
    type: String,
    unit: String
  },
  data() {
    return {
      type1: '',
      focus: false
    }
  },
  computed: {
    event() {
      return this.type === 'password' ? { focus: (e) => { e.target.select() } } : { focus: (e) => { this.focus = true }, blur: (e) => { this.focus = false } }
    },
    iconVal() {
      const a = {
        'wd-hide': !this.value
      }
      if (this.type === 'password') {
        a[this.type1 === 'password' ? 'wd-icon-password' : 'wd-icon-eye'] = true
      } else {
        a['wd-hide'] = !this.value || !this.focus
        a['wd-icon-close'] = true
      }
      return a
    }
  },
  mounted() {
    this.type1 = this.type
  },
  methods: {
    change(e) {
      if (this.type === 'password') {
        this.type1 = this.type1 === 'password' ? 'text' : 'password'
      } else {
        this.$emit('input', '')
      }
      e.preventDefault()
    }
  }
}
</script>
