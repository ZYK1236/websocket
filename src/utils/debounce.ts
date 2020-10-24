export default {
  timer: null,
  count: null,
  debounce: function (fn, delay) {
    let gap = delay / 3
    let i = 0
    this.count = setInterval(() => {
      i += 1
    }, gap)
    this.timer = setTimeout(() => {
      if (i === 3) {
        fn()
        clearTimeout(this.timer)
        clearInterval(this.count)
      }
    }, delay)
  },
  clearTime: function () {
    clearInterval(this.count)
    clearTimeout(this.timer)
  }
}
