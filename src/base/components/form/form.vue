<template>
  <form autocomplete="off">
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: 'WdForm',
  props: {
    data: {
      type: Object,
      default() {
        return null
      }
    },
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
        return item.componentInstance && (item.componentInstance.isVerify || item.componentInstance.rules.reg || item.componentInstance.rules.rule)
      })
    }
  },
  methods: {
    validate() {
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
        setTimeout(this.validating, 0)
      })
    },
    validating() {
      let judge = true
      if (!this.data) {
        console.warn('[wd Warn][Form]data is required for validate to work!')
        judge = false
      } else if (this.files && this.files.length) {
        for (let file of this.files) {
          let id = file.componentInstance.isVerify
          if (id) {
            if (!file.componentInstance.validate(this.rules[id], this.data)) {
              judge = false
              break
            }
          }
        }
      }
      judge ? this.resolve() : this.reject(new Error())
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
