<template>
  <div class="flex top row">
    <div class="left" @click.stop="back">
      <span class="triangle"></span>
    </div>
    <span class="auto">{{title}}</span>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'WdTop',
  props: {
    title: {
      type: String,
      default: ''
    },
    close: {
      type: Function,
      default: null
    }
  },
  methods: {
    back() {
      this.close ? this.close() : this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
  .top{
    width: 100%;
    padding: 25px 8px 0;
    box-sizing: border-box;
    text-align: center;
    background: linear-gradient(to right, #5c8bff, #9a95f3);
    color: #fff;
    font-size: 15px;
    line-height: 30px;
    .triangle{
      width: 10px;
      height: 10px;
      transform: rotate(225deg);
      border-color: #fff;
      border-width: 2px;
    }
    .left{
      width: 30px;
      height: 30px;
      line-height: 30px;
    }
  }
</style>
