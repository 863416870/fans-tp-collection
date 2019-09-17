import '@babel/polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'


import router from '@/router'
import store from '@/store'
import App from '@/App.vue'

// 样式重置
import 'assets/styles/index.less'

Vue.config.productionTip = false

Vue.use(ElementUI)

const AppInstance = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

// 设置 App 实例
window.App = AppInstance
