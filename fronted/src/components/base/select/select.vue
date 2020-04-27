<template>
  <div :class="{ 'show-option': showOption, 'option-leave': optionLeave, 'select': true }">
    <input
    class="select-input"
    :value="optionList.length > 0 ? optionList[selectedIndex].name : ''"
    type="text"
    readonly="readonly"
    placeholder="暂无选项"
    @blur="closeOption"
    @focus="showOption = true"
    >
    <div class="icon" @click="clickIcon"></div>
    <ul class="option-list">
      <li
      class="option"
      v-for="(data, index) in optionList"
      :key="index"
      :style="{ 'transition-delay': `${index * 0.1}s` }"
      @mousedown="change(index)"
      >
        <span>{{data.name}}</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Select',
  props: {
    optionList: {
      default: () => [],
      type: Array
    },
    targetKey: {
      default: '',
      type: String
    }
  },
  data () {
    return {
      selectedIndex: 0,
      showOption: false,
      optionLeave: false
    }
  },
  methods: {
    clickIcon () {
      if ((this as any).showOption) {
        (this as any).closeOption()
      } else {
        (this as any).showOption = true
      }
    },
    closeOption () {
      (this as any).showOption = false;
      (this as any).optionLeave = true
      setTimeout(() => {
        (this as any).optionLeave = false
      }, 300)
    },
    change (index) {
      if ((this as any).targetKey) {
        (this as any).$emit('input', (this as any).optionList[index][(this as any).targetKey])
      } else {
        (this as any).$emit('input', index)
      }
      (this as any).selectedIndex = index;
      (this as any).showOption = false;
      (this as any).$emit('on-change', index)
    }
  }
}
</script>
<style lang="less" scoped>
@import './select.less';
</style>
