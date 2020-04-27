const debounce = (func, time, type, ctx) => {
  let timer, lastCall, rtn
  // 防抖函数
  if (type === 1) {
    rtn = (...params) => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(ctx, params)
      }, time)
    }
  } else if (type === 2) { //  节流函数
    rtn = (...params) => {
      const now = new Date().getTime()
      if (lastCall && now - lastCall < time) {
        return null
      }
      lastCall = now
      func.apply(ctx, params)
    }
  } else if (type === 3) { //  立即执行防抖函数
    rtn = (...params) => {
      if (timer) clearTimeout(timer)
      let callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, time)
      if (callNow) func.apply(ctx, params)
    }
  }
  return rtn
}

export default {
  name: 'Debounce',
  abstract: true,
  props: {
    time: {
      type: Number,
      default: 800
    },
    type: {
      type: Number,
      default: 1
    },
    events: {
      type: String,
      default: 'click'
    }
  },
  created () {
    this.eventsKeys = this.events.split(',')
    this.originMap = {}
    this.debouncedMap = {}
  },
  render (h) {
    console.log(this.$slots)
    const vNode = this.$slots.default[0]
    this.eventsKeys.forEach(event => {
      const target = vNode.data.on[key]
      if (target === this.originMap[key] && this.debouncedMap[key]) {
        vNode.data.on[key] = this.debouncedMap[key]
      } else if (target) {
        this.originMap = target
        this.debouncedMap[key] = debounce(target, this.time, this.type, vNode)
        vNode.data.on[key] = this.debouncedMap[key]
      }
    })
    return vNode
  }
}
