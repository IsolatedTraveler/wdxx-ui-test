const getItem = (name, state) => {
    if (!state[name]) {
      state[name] = JSON.parse(localStorage.getItem(name) || null)
    }
    return state[name]
  }, getTemp = (name, state) => {
    if (!state[name]) {
      state[name] = JSON.parse(sessionStorage.getItem(name) || null)
    }
    return state[name]
  }
export default {
  loginInfo(state) {
    return getItem('loginInfo', state)
  },
  userInfo(state) {
    return getTemp('userInfo', state)
  },
  load(state) {
    return !!state.load.length
  },
  title(state) {
    return state.title
  },
  back(state) {
    return state.back
  },
  openid(state) {
    return (state.userInfo || {}).openid
  }
}
