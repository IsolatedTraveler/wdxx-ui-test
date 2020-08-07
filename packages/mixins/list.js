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
    accordion: Boolean,
    multi: Boolean
  },
  data() {
    return {
      selectedI: ''
    }
  },
  methods: {
    judgeParaentIsShow(isSelected, index) {
      if (this.accordion) {
        if (isSelected) {
          this.selectedI = index
        } else {
          this.selectedI = ''
        }
      }
    }
  }
}
