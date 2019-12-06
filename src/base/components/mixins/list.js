export default {
  props: {
    data: {
      type: Array,
      default() {
        return []
      },
      required: true
    },
    value: {
      type: String | Array,
      default() {
        return []
      }
    },
    showId: {
      type: String,
      default: 'mc'
    },
    valId: {
      type: String,
      default: 'id'
    },
    placeholder: {
      type: String,
      default: '请输入关键字检索'
    },
    icon: {
      type: String,
      default: 'wd_icon_arrow'
    },
    split: {
      type: String,
      default: ','
    }
  },
  computed: {
    val() {
      let a = this.value
      if (typeof a === 'string') {
        a = (a || '').split(this.split)
      }
      return a
    }
  }
}
