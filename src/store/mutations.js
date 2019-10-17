let fun = []
export default {
  back(state, val) {
    fun.push(state.back)
    state.back = () => {
      state.back = fun.pop() || null
      val && val()
    }
  },
  resetBack(state, val) {
    fun = []
    if (val) {
      state.back = () => {
        state.back = fun.pop() || null
        val && val()
      }
    } else {
      state.back = null
    }
  },
  load(state, val) {
    val ? state.load.push(val) : state.load.pop()
  }
}
