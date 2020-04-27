<template>
  <div >
    <div class="text" v-for="key in 6" :key="key">
      <span>hello</span>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import debounce from '@/hooks/debounce'
export default {
  setup () {
    const count = {
      name: 'helo',
      j: ref(0),
      g: ref('hello')
    }
    const add = function (a, b) {
      console.log(this)
    }
    const { cancel, run } = debounce(add, 1000)
    const doubleCount = computed(() => count.j.value * 2)
    watch(() => count.j.value, val => {
      console.log(val)
    })
    return {
      count,
      doubleCount,
      cancel,
      run
    }
  }
}
</script>

<style lang="less" scoped>
.test{
  display: flex;
  flex-direction: column;
  // color: red;
}
.text{
  color: red;
}
.text:nth-child(3n + 0){
  color: blue;
}
.text:nth-child(3n + 1){
  color: green;
}
</style>
