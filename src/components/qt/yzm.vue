<template>
  <div class="wd-yzm" @click.stop="getCode">
    <canvas ref="canvas" :width="w" :height="h"></canvas>
  </div>
</template>
<script>
export default {
  name: 'wdYzm',
  props: {
    value: String,
    length: {
      type: Number,
      default: 4
    }
  },
  filters: {
    styleCss(data) {
      return `color:${data.color};font-size:${data.fontSize};padding:${data.padding};transform:${data.transform};`
    }
  },
  data() {
    return {
      bgMin: 200,
      bgMax: 255,
      w: 0,
      h: 0
    }
  },
  mounted() {
    this.w = this.$el.clientWidth
    this.h = this.$el.clientHeight
    this.$nextTick(() => {
      this.getCode()
    })
  },
  methods: {
    getCode() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz0123456789', charsLen = chars.length
      let code = '', len = this.length
      for (;len > 0; len--) {
        code += chars[this.randomNum(0, charsLen)]
      }
      this.$emit('input', code)
      this.drawPic(code)
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    randomColor(min, max) {
      return `rgb(${this.randomNum(min, max)},${this.randomNum(min, max)},${this.randomNum(min, max)})`
    },
    drawPic(code) {
      const canvas = this.$refs.canvas, ctx = canvas.getContext('2d'), w = this.w, h = this.h
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = this.randomColor(this.bgMin, this.bgMax)
      ctx.fillRect(0, 0, w, h)
      this.drawText(ctx, code)
      this.drawLine(ctx)
      this.drawDot(ctx)
      window.ctx = ctx
    },
    drawText(ctx, code) {
      const codeLen = this.length,
        jg = this.w / codeLen,
        fontMax = Math.min(jg * 1.6, this.h - 5),
        fontMin = fontMax / 1.3
      let before = codeLen
      for (let i = 0; i < codeLen; i++) {
        const font = this.randomNum(fontMin, fontMax),
          xMin = before + font / 6 - i,
          xMax = jg * i + font / 6 - i,
          x = this.randomNum(xMin, xMax),
          y = this.randomNum(font, this.h - 10),
          deg = this.randomNum(-30, 30) * Math.PI / 180
        ctx.font = font + 'px simHei'
        ctx.textBaseline = 'alphabetic'
        ctx.fillStyle = this.randomColor(50, 100)
        ctx.translate(x, y)
        ctx.rotate(deg)
        ctx.fillText(code[i], 0, 0)
        ctx.rotate(-deg)
        ctx.translate(-x, -y)
        before = x + font / 2
      }
    },
    drawLine(ctx) {
      let len = this.randomNum(1, 6)
      for (; len > 0; len--) {
        ctx.strokeStyle = this.randomColor(150, 200)
        ctx.beginPath()
        ctx.moveTo(this.randomNum(0, this.w), this.randomNum(0, this.h))
        ctx.lineTo(this.randomNum(0, this.w), this.randomNum(0, this.h))
        ctx.stroke()
      }
    },
    drawDot(ctx) {
      let len = this.randomNum(10, 30)
      for (; len > 0; len--) {
        ctx.fillStyle = this.randomColor(100, 150)
        ctx.beginPath()
        ctx.arc(this.randomNum(0, this.w), this.randomNum(0, this.h), 1, 0, 2 * Math.PI)
        ctx.fill()
      }
    }
  }
}
</script>
