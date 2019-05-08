import Vue from 'vue'
import App from './App'
import router from './router/router'

// 重置函数
import '@/assets/css/public.less'
// 工具函数
import '@/utils/utils'
// 接口函数
import '@/server/server'

import 'iview/dist/styles/iview.css';

// markdown编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

import { Menu, Submenu, MenuGroup, MenuItem, Button, Input, Select, Option, Table, Modal, Icon, Message, Page, Breadcrumb, BreadcrumbItem } from 'iview'
Vue.component('Menu', Menu);
Vue.component('Submenu', Submenu);
Vue.component('MenuGroup', MenuGroup);
Vue.component('MenuItem', MenuItem);
Vue.component('Button', Button);
Vue.component('Input', Input);
Vue.component('Select', Select);
Vue.component('Option', Option);
Vue.component('Table', Table);
Vue.component('Modal', Modal);
Vue.component('Icon', Icon);
Vue.component('Page', Page);
Vue.component('Breadcrumb', Breadcrumb);
Vue.component('BreadcrumbItem', BreadcrumbItem);
Vue.prototype.$Message = Message;
c.$Message = Message;
Vue.prototype.$Modal = Modal;

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})