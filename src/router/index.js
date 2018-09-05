import Vue from 'vue'
import Router from 'vue-router'
// 文章添加
import articleAdd from '@/components/main/article-add'
// 文章列表
import articleList from '@/components/main/article-list'

Vue.use(Router) 

export default new Router({
  routes: [
    {
      path: '/',
      name: 'articleAdd',
      component: articleAdd
    },
    {
      path: '/articleList',
      name: 'articleList',
      component: articleList
    }
  ]
})
