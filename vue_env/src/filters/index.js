import Vue from 'vue'
import Utils from '../utils/util'

const globalFilter = {

  // 字数超出...
  filterTitle(value, len = 9) {
    return Utils.cutString(value, len)
  },

}
// 全局过滤器
Object.keys(globalFilter).forEach(k => Vue.filter(k, globalFilter[k]))

export default globalFilter
