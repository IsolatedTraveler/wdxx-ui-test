<template>
  <div class="wd_progress wd_flex">
    <span v-if="text">{{val | dealNumber}}%</span>
    <div class="wd_bar">
      <div ref="fill" class="wd_fill"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WdProgress',
  props: {
    value: {
      type: Number,
      default: 0
    },
    delay: {
      type: Number,
      default: 200
    },
    text: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    sj() {
      return this.delay / 200
    }
  },
  data() {
    return {
      val: 0,
      timer: null
    }
  },
  filters: {
    dealNumber(val) {
      return val.toFixed(0)
    }
  },
  watch: {
    value(val) {
      let a = this.sj, b = (val - this.val) / a
      clearInterval(this.timer)
      a--
      this.val += b
      this.$refs.fill.style.width = this.val + '%'
      this.timer = setInterval(() => {
        a--
        if (a < 1) {
          this.val = val
          clearInterval(this.timer)
        } else {
          this.val += b
        }
        this.$refs.fill.style.width = this.val + '%'
      }, 200)
    }
  }
}
</script>
