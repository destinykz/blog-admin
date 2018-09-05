import Vue from 'vue'
import App from './App'
import router from './router'

// 重置函数
import '@/assets/css/reset.css'
// 工具函数
import '@/utils'

import '@/assets/css/style.less'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})