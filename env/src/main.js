import '@babel/polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'

import App from '@/App.vue'
import router from '@/router'
import store from './store'

// import '@/assets/styles/index.less' // eslint-disable-line
// import '@/assets/styles/realize/element-variables.less'

Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint no-unused-vars: 0 */
const AppInstance = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

// 设置 App 实例
window.App = AppInstance
