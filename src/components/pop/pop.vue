<template>
  <div class="wd-pop" v-show="show" @click.stop="closePage">
    <div class="wd-col wd-content" @click.stop>
      <slot>
      </slot>
    </div>
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
  computed: {
    key() {
      return guid()
    }
  },
  watch: {
    show(v) {
      v ? this.bind() : this.unbind()
    }
  },
  mounted() {
    this.show && this.bind()
  },
  methods: {
    bind() {
      history.onWdPopstate({ only: !this.notOnly, key: this.key })
      window.addEventListener('wd-popstate', this.close, false)
    },
    unbind() {
      window.removeEventListener('wd-popstate', this.close, false)
    },
    close(e) {
      const lx = e.eventLx
      if (lx === 'back') {
        e.keys.indexOf(this.key) !== -1 && this.$emit('show', false)
      } else if (lx === 'close') {
        this.$emit('show', false)
      } else {
        console.warn('未能识别的后退来源')
      }
    },
    closePage() {
      this.shadeClose && history.onWdPopClose(this.key)
    }
  }
}
</script>
<style lang="scss">
.wd-pop{
  justify-content: flex-start;
}
</style>
