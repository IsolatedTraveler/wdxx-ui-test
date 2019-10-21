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
      type: Array,
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
    icon: {
      type: String,
      default: 'wd_arrow'
    }
  }
}
