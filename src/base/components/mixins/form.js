export const formBase = {
    props: {
      placeholder: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      isVerify: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        error: false
      }
    },
    methods: {
      msg(msg) {
        this.error = true
        this.$msg.toast(msg, '警告').then(res => {
          this.error = false
          this.refs.input.onfoucs()
        }).catch(e => {
          this.error = false
        })
      }
    }
  }, formInput = {
    data() {
      return {
        judge: false
      }
    }
  }, formSelectBase = {
    props: {
      placeholder: {
        type: String,
        default: '单击选择数据'
      },
      showId: {
        type: String,
        default: 'mc'
      },
      valId: {
        type: String,
        default: 'id'
      }
    },
    data() {
      return {
        old: null
      }
    },
    computed: {
      back() {
        return this.$store.getters.back
      }
    }
  }, formSelect = {
    props: {
      searchPlaceholder: {
        type: String,
        default: '请输入关键字检索'
      },
      dataError: {
        type: String,
        default: '当前选项未获取到数据'
      },
      search: {
        type: Function,
        default: null
      },
      data: {
        type: Array,
        default() {
          return []
        }
      },
      isNull: {
        type: Boolean,
        defalut: false
      }
    },
    data() {
      return {
        val: '',
        searchVal: ''
      }
    },
    computed: {
      datas() {
        if (this.search) {
          return this.search(this.searchVal || '')
        } else {
          return this.data
        }
      }
    },
    watch: {
      value() {
        this.val !== this.old && this.init()
      },
      data() {
        this.init()
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      showPop() {
        if (this.data.length) {
          this.$refs.pop.show()
        } else {
          this.$msg.toast(this.dataError).catch(e => {})
        }
      }
    }
  }
export default {
  formBase,
  formInput,
  formSelectBase,
  formSelect
}
