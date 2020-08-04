const item = {
    data() {
      return {
        selected: false
      }
    },
    computed: {
      isSelected() {
        const v = this.value, data = this.data || {}, id = data[this.valId] || ''
        let j = false
        j = (this.multi ? this.initMulti : this.initSignle)(v, id, data.$def)
        return j
      }
    },
    watch: {
      isSelected(v) {
        this.selected = v
      }
    },
    mounted() {
      this.selected = this.isSelected
    },
    methods: {
      initMulti(v, id, def) {
        return v.filter(it => {
          return it[0] === id
        })[0] || ((!v[0] || !v[0][0]) && def)
      },
      initSignle(v, id) {
        return (v[0] || '') === id
      }
    }
  }, list = {
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
      split: [String, Array]
    }
  }
module.exports.default = module.exports = {
  item,
  list
}
