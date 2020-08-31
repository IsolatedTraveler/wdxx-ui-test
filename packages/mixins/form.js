export default {
  props: {
    label: String,
    value: String,
    placeholder: String,
    disabled: Boolean,
    isVerify: String
  },
  data() {
    return {
      error: false
    }
  },
  methods: {
    msg(msg) {
      this.error = true
      this.$msg.toast(msg).then(res => {
        this.error = false
        this.refs.input.onfoucs()
      }).catch(e => {
        this.error = false
      })
    }
  }
}
