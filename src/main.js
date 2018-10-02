import Vue from 'vue'
import App from './App'
import router from './router/router'

// 重置函数
import '@/assets/css/public.less'
// 工具函数
import '@/utils/utils'
// 接口函数
import '@/server/server'

// markdown编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})