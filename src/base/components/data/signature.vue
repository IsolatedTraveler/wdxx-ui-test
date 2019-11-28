<template>
  <div class="wd_signature wd_flex">
    <p class="wd_title blank">手写签名</p>
    <canvas class="wd_auto" :style="{background: bg}" ref="ctx"></canvas>
    <div class="wd_btn wd_flex" row>
      <button class="wd_button" @click.stop="clear()" warn>清除</button>
      <button class="wd_button" @click.stop="confirm()" default>确认</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WdSignature',
  props: {
    value: {
      type: String,
      default: ''
    },
    bg: {
      type: String,
      default: '#fff'
    },
    color: {
      type: String,
      default: 'red'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let elem = this.$refs.ctx
      this.ctx = elem.getContext('2d')
      elem.addEventListener('touchstart', (e) => {
        e.preventDefault()
        if (!this.y) {
          this.y = elem.offsetTop
          this.x = elem.offsetLeft
          this.initCtx()
        }
        this.start = this.getXY(e.touches[0])
      })
      elem.addEventListener('touchmove', (e) => {
        e.preventDefault()
        this.draw(this.getXY(e.touches[0]))
      })
      elem.addEventListener('touchend', (e) => {
        e.preventDefault()
      })
    },
    getXY(x) {
      return {x: x.pageX - this.x, y: x.pageY - this.y}
    },
    draw(point) {
      let ctx = this.ctx
      ctx.beginPath()
      ctx.moveTo(this.start.x, this.start.y)
      ctx.lineTo(point.x, point.y)
      this.start = point
      ctx.stroke()
    },
    confirm() {
      this.$emit('input', this.$refs.ctx.toDataURL('image/jpeg', 0.5))
      this.$store.getters.back()
    },
    clear() {
      this.$emit('input', '')
      this.initCtx()
      this.$store.getters.back()
    },
    initCtx() {
      let ctx = this.ctx, elem = this.$refs.ctx
      elem.width = elem.clientWidth
      elem.height = elem.clientHeight
      ctx.fillStyle = this.bg
      ctx.fillRect(0, 0, elem.clientWidth, elem.clientHeight)
      if (this.value) {
        let img = new Image()
        img.src = this.value
        ctx.drawImage(img, 0, 0, elem.width, elem.height)
      }
      ctx.lineWidth = '2'
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.fillStyle = this.color
    }
  }
}
</script>
<style lang="scss">
.wd_signature{
  width: 100%;
  canvas{
    width: 310px;
    margin: 5px;
    overflow: hidden;
  }
}
</style>
