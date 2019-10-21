<template>
  <div class="wd_pop wd_flex" ref="pop" v-show="isShow" scroll :class="{wd_show: isShow}" @click.stop="shadeClose && back()">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'WdPop',
  props: {
    shadeClose: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    back() {
      return this.$store.getters.back
    }
  },
  methods: {
    close() {
      this.isShow = false
    },
    show(fun) {
      let elem = document.querySelector('.wd_show.wd_pop')
      elem && this.back && this.back()
      this.isShow = true
      if (fun) {
        this.$store.commit('back', () => {
          this.close()
          fun()
        })
      } else {
        this.$store.commit('back', this.close)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
