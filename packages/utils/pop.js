let his = [], judge = false
const e = new CustomEvent('wd-popstate', { bubbles: false, cancelable: true })
function popClose(lx, keys) {
  e.eventLx = lx
  e.keys = keys
  dispatchEvent(e)
}
function popBack(a) {
  const keys = []
  while (a < 0 && his.length) {
    keys.push(his.shift().key)
    a++
  }
  if (keys.length) {
    popClose('back', keys)
  }
  if (!his.length) {
    history.$wdGo()
  } else {
    judge = false
  }
}
function popForward(a) {
  if (his.length) {
    his = []
    popClose('close')
    a === -1 || history.$wdGo(-1)
  } else {
    judge = false
  }
  a === -1 || history.$wdGo(a)
}
function selfWatchEvent(oldEvent, lx) {
  return function(a) {
    judge = true
    if (lx === 'go') {
      a = a || 0
      a > -1 ? popForward(a) : popBack(a)
    } else if (lx === 'back') {
      popBack(-1)
    } else if (lx === 'replace' || lx === 'push') {
      popForward(-1)
      return oldEvent && oldEvent.apply(this, arguments)
    }
  }
}
window.addEventListener('popstate', function() {
  if (judge) {
    judge = false
  } else if (his.length) {
    popClose('back', [his.shift().key])
    if (his.length) {
      history.$wdPushState('wd-pop', '')
    }
  }
})
history.$wdPopOpen = function(it) {
  if (history.state !== 'wd-pop') {
    history.$wdPushState('wd-pop', '')
  }
  if (it.only && his.length) {
    popClose('back', [his.shift().key])
  }
  his.unshift(it)
}
history.$wdPopClose = function(key, show) {
  his = his.filter(it => {
    if (it.key === key) {
      show && popClose('back', [key])
      return false
    } else {
      return true
    }
  })
  if (!his.length) {
    judge = true
    history.$wdGo(-1)
  }
}
history.$wdPushState = history.pushState
history.$wdGo = history.go
history.back = selfWatchEvent(history.back, 'back')
history.go = selfWatchEvent(history.go, 'go')
history.pushState = selfWatchEvent(history.pushState, 'push')
history.replaceState = selfWatchEvent(history.replaceState, 'replace')
