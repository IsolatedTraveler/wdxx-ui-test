<template>
  <span @click="change" class="flex row" :style="'color:'+_color+';'">
    <span ref="switch" class="wd_switch" :class="{'selected':value}"></span>
    <slot>
      {{content}}
    </slot>
  </span>
</template>
<script>
export default {
  name: 'WdSwitch',
  props: {
    content: String,
    value: Boolean,
    color: {
      default() {
        return ['#ccc', '#fff']
      }
    }
  },
  mounted() {
    let elem = this.$refs.switch, hei = elem.offsetHeight
    elem.style.width = hei * 1.6 + 'px'
  },
  computed: {
    _color() {
      return this.color[this.value ? 1 : 0]
    }
  },
  methods: {
    change() {
      this.$emit('input', !this.value)
    }
  }
}
</script>
<style>
</style>
