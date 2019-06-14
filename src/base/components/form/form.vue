<template>
  <form class="wd_form" action="" onsubmit="return false" autocomplete="off">
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: 'WdForm',
  props: {
    rules: {
      type: Object,
      default() {
        return null
      }
    }
  },
  computed: {
    files() {
      return this.$slots.default.filter(item => {
        return item.componentInstance && (item.componentInstance.isVerify)
      })
    }
  },
  methods: {
    validate() {
      return new Promise((resolve, reject) => {
        this.$store.commit('load', true)
        this.resolve = resolve
        this.reject = reject
        setTimeout(this.validating, 0)
      })
    },
    validating() {
      let judge = true
      if (this.files && this.files.length) {
        for (let file of this.files) {
          let id = file.componentInstance.isVerify
          if (id) {
            if (!file.componentInstance.validate(this.rules[id])) {
              judge = false
              break
            }
          }
        }
      }
      judge ? this.resolve() : this.reject(new Error())
      this.$store.commit('load')
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
