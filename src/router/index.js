import Vue from 'vue'
import Router from 'vue-router'
// 文章列表
import articleList from '@/components/main/article/article-list'
// 文章添加
import articleAdd from '@/components/main/article/article-add'
// 分类列表
import classificationList from '@/components/main/classification/classification-list'
// 分类添加
import classificationAdd from '@/components/main/classification/classification-add'
// 用户列表
import userList from '@/components/main/user/user-list'
// 评论列表
import commentList from '@/components/main/comment/comment-list'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '',
            alias: '/articleList',
            name: 'articleList',
            component: articleList
        },
        {
            path: '/articleAdd',
            name: 'articleAdd',
            component: articleAdd
        },
        {
            path: '/classificationList',
            name: 'classificationList',
            component: classificationList
        },
        {
            path: '/classificationAdd',
            name: 'classificationAdd',
            component: classificationAdd
        },
        {
            path: '/classificationAdd',
            name: 'classificationAdd',
            component: classificationAdd
        },
        {
            path: '/userList',
            name: 'userList',
            component: userList
        },
        {
            path: '/commentList',
            name: 'commentList',
            component: commentList
        }
    ]
})
