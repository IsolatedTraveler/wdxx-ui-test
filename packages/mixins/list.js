export default {
  props: {
    showId: {
      type: String,
      default: 'mc'
    },
    valId: {
      type: String,
      default: 'id'
    },
    value: {
      type: [String, Array],
      default: ''
    },
    multi: Boolean,
    notParent: Boolean
  },
  data() {
    return {
      selectedI: ''
    }
  }
}
