export default {
  back(state) {
    return state.back
  },
  load(state) {
    return !!state.load.length
  }
}
