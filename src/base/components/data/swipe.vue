<template>
  <div class="wd_swipe" ref="swipe">
    <div class="wd_swipe_item" v-for="(item,index) in data" :key="index" :class="{wd_selected: i === index,wd_next: next===index}">
      <slot :data="item"></slot>
    </div>
    <div class="wd_swipe_signal wd_flex" row>
      <span v-for="(item,index) in data" :key="index" :class="{wd_selected: i === index}" @click="selected(index)"></span>
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
      next: 1
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
    }
  },
  created() {
    this.start()
  },
  mounted() {
    if (this.len > 1) {
      let elem = this.$refs.swipe
      this.width = elem.clientWidth
      elem.addEventListener('touchstart', (event) => {
        clearInterval(this.time)
        let touch = event.touches[0], elems = elem.getElementsByClassName('wd_swipe_item'), i = this.i, len = this.len
        this.startLeft = touch.pageX
        this.selectElem = elems[i]
        this.nextElem = elems[this.next]
        this.oldElem = elems[(i - 1 + len) % this.len]
      }, false)
      elem.addEventListener('touchmove', (event) => {
        let touch = event.touches[0], offsetLeft = touch.pageX - this.startLeft
        this.offsetLeft = offsetLeft
        this.selectElem.style = `transform: translateX(${offsetLeft}px);transition:unset;`
        if (this.offsetLeft < 0) {
          this.nextElem.style = `transform: translateX(${this.width + offsetLeft}px);transition:unset;`
        } else {
          this.oldElem.style = `transform: translateX(${-this.width + offsetLeft}px);transition:unset;`
        }
      }, false)
      elem.addEventListener('touchend', (event) => {
        let offsetLeft = this.offsetLeft, distinctX = Math.abs(offsetLeft)
        if (distinctX > this.width / 2) {
          this.i = this.next
        }
        this.selectElem.style = ''
        this.oldElem.style = ''
        this.nextElem.style = ''
        this.start()
      }, false)
    }
  },
  methods: {
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
