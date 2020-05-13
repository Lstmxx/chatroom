import Vue from 'vue'
import SvgIcon from '../../components/base/svg-icon/svg-icon.vue'// svg组件

// register globally
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./', true, /\.svg$/)
console.log(req.keys())
requireAll(req)
