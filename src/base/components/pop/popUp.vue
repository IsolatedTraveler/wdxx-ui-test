<template>
  <div class="wd_pop wd_flex" v-show="isShow" :class="{wd_show: isShow}">
    <div class="wd_mask" @click.stop="back()"></div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'WdPopUp',
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
