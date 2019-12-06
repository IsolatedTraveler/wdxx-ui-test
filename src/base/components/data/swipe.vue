<template>
  <div class="wd_swipe" ref="swipe">
    <div class="wd_swipe_item" v-for="(item,index) in data" :key="index" :selected="i === index" :next="next===index">
      <slot :data="item"></slot>
    </div>
    <div class="wd_swipe_signal wd_flex" row>
      <span v-for="(item,index) in data" :key="index" :selected="i === index" @click="selected(index)"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WdSwipe',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    delay: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      i: 0,
      next: 1,
      width: 0
    }
  },
  computed: {
    len() {
      return this.data.length
    }
  },
  watch: {
    i(val) {
      setTimeout(() => {
        this.next = (val + 1) % this.len
      }, 300)
    },
    len(v, o) {
      if (v < 2) {
        let elem = this.$refs.swipe
        elem.removeEventListener('touchstart', this.touchstart, false)
        elem.removeEventListener('touchmove', this.touchmove, false)
        elem.removeEventListener('touchend', this.touchend, false)
        clearInterval(this.time)
      } else if (o < 2) {
        this.init()
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let elem = this.$refs.swipe
      this.width = elem.clientWidth
      elem.addEventListener('touchstart', this.touchstart, false)
      elem.addEventListener('touchmove', this.touchmove, false)
      elem.addEventListener('touchend', this.touchend, false)
      this.start()
    },
    touchstart(event) {
      clearInterval(this.time)
      let touch = event.touches[0], elems = this.$refs.swipe.getElementsByClassName('wd_swipe_item'), i = this.i, len = this.len
      this.startLeft = touch.pageX
      this.selectElem = elems[i]
      this.nextElem = elems[this.next]
      this.oldElem = elems[(i - 1 + len) % this.len]
    },
    touchmove(event) {
      let touch = event.touches[0], offsetLeft = touch.pageX - this.startLeft
      this.offsetLeft = offsetLeft
      this.selectElem.style = `transform: translateX(${offsetLeft}px);transition:unset;`
      if (this.offsetLeft < 0) {
        this.nextElem.style = `transform: translateX(${this.width + offsetLeft}px);transition:unset;`
      } else {
        this.oldElem.style = `transform: translateX(${-this.width + offsetLeft}px);transition:unset;`
      }
    },
    touchend(event) {
      let offsetLeft = this.offsetLeft, distinctX = Math.abs(offsetLeft)
      if (distinctX > this.width / 2) {
        this.i = this.next
      }
      this.selectElem.style = ''
      this.oldElem.style = ''
      this.nextElem.style = ''
      this.start()
    },
    selected(i) {
      clearInterval(this.time)
      this.i = i
      this.start()
    },
    start() {
      clearInterval(this.time)
      this.time = setInterval(() => {
        this.i = this.next
      }, this.delay)
    }
  }
}
</script>
