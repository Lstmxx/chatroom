import { ref, getCurrentInstance } from 'vue'
export default function debounce (fn, wait) {
  const timer = ref(null)
  const { ctx } = getCurrentInstance()
  const cancel = () => timer.value && clearTimeout(timer.value)
  const run = (...args) => {
    cancel()
    timer.value = setTimeout(() => {
      fn.apply(ctx, [...args])
    }, wait)
  }
  return {
    cancel,
    run
  }
}
