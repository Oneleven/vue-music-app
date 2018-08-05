export function shuffle (arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = Math.floor(Math.random() * _arr.length)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function throtool (func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    } else {
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }
}