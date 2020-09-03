<template>
  <svg class="wd-svg-icon"  :viewBox="svg.box" version="1.1" :color="icon.color">
    <path v-for="(d, i) in icon.paths" :key="i" :d="d.d" :fill="d.fill"/>
  </svg>
</template>
<script>
export default {
  name: 'wdIcon',
  props: {
    name: {
      style: String,
      required: true
    },
    color: [String, Array]
  },
  computed: {
    svg() {
      const t = this.name
      try {
        const svg = require(`!xml-loader!../../src/svg/${t}.svg`).svg, attr = svg.$
        return {
          path: svg.path.map(it => {
            return it.$
          }),
          box: attr.viewBox
        }
      } catch (e) {
        console.error(e)
        console.error(`/src/svg/${t}.svg is not exists!`)
        return { attr: {}, path: [] }
      }
    },
    icon() {
      const a = this.svg.path, c = [].concat(this.color)
      let d = 1
      return {
        color: c[0] || 'inhert',
        paths: a.map((it, i) => {
          if (it.fill && it.fill !== '$trasparent') {
            it.fill = c[i + d] || it.fill
          } else {
            d = 0
          }
          return it
        })
      }
    }
  }
}
</script>
