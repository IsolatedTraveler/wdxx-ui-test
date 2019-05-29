
const setItem = (name, val, state) => {
    state[name] = val
    localStorage.setItem(name, JSON.stringify(val || ''))
  }, setTemp = (name, val, state) => {
    state[name] = val
    sessionStorage.setItem(name, JSON.stringify(val || ''))
  }
export default {
  loginInfo(state, val) {
    setItem('loginInfo', val, state)
  },
  userInfo(state, val) {
    setTemp('userInfo', val, state)
  },
  load(state, val) {
    val ? state.load.push(val) : state.load.pop()
  },
  title(state, val) {
    state.title = val
  },
  back(state, val) {
    state.back = val
  },
  openid(state, val) {
    let data = state.userInfo || {}
    data.openid = val
    this.commit('userInfo', data)
  }
}
