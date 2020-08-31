<template>
  <div class="wd-pop" v-show="show" @click.stop="shadeClose && closePage()">
    <slot>
    </slot>
  </div>
</template>
<script>
import { guid } from '@u/index.js'
export default {
  name: 'wd-pop',
  props: {
    show: Boolean,
    shadeClose: Boolean,
    notOnly: Boolean
  },
  data() {
    return {
      showVal: false
    }
  },
  computed: {
    key() {
      return guid()
    }
  },
  watch: {
    show(v) {
      if (v !== this.showVal) {
        this.showVal = v
        v ? this.bind() : this.closePage()
      }
    }
  },
  mounted() {
    [].forEach.call(this.$el.children, (el) => {
      el.addEventListener('click', e => e.stopPropagation())
    })
    this.showVal = this.show
    this.show && this.bind()
  },
  methods: {
    bind() {
      history.$wdPopOpen({ only: !this.notOnly, key: this.key })
      window.addEventListener('wd-popstate', this.close, false)
    },
    unbind() {
      window.removeEventListener('wd-popstate', this.close, false)
    },
    close(e) {
      const lx = e.eventLx
      if (lx === 'back' && e.keys.indexOf(this.key) !== -1) {
        this.showVal = false
        this.$emit('show', false)
      } else if (lx === 'close') {
        this.showVal = false
        this.$emit('show', false)
      } else {
        console.warn('未能识别的后退来源')
      }
    },
    closePage() {
      history.$wdPopClose(this.key, this.show)
    }
  }
}
</script>
