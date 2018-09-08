import Vue from 'vue'
import App from './App'
import router from './router'

// 重置函数
import '@/assets/css/public.less'
// 工具函数
import '@/utils/utils'


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})