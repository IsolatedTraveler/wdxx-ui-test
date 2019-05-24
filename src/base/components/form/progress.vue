<template>
  <div class="wd_progress flex">
    <span>{{value | dealNumber}}%</span>
    <div class="wd_bar">
      <div ref="fill" class="fill"></div>
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
    }
  },
  filters: {
    dealNumber(value) {
      return value.toFixed(0)
    }
  },
  watch: {
    value(val) {
      this.$refs.fill.style.width = val + '%'
    }
  },
  mounted() {
    this.$refs.fill.style.transitionDuration = (this.delay / 1000) + 's'
  }
}
</script>
<style>
  .wd_progress{
    width: 100%;
  }
  .wd_bar{
    width: 100%;
    height: 12px;
    border-radius: 6px;
    background: #ccc;
    margin: 0.8em 0;
  }
  .fill{
    background: #177fcb;
    width: 0%;
    height: 100%;
    border-radius: 6px;
    transition-property:width;
  }
</style>
