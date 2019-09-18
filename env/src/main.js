import '@babel/polyfill'
import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import App from '@/App.vue'
import router from '@/router'
import store from './store'

// 样式重置
import 'assets/styles/index.scss' // global css
import '@/icons' // icon
// import 'assets/styles/realize/element-variables.scss'

Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint no-unused-vars: 0 */
const AppInstance = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 设置 App 实例
window.App = AppInstance
