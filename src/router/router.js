import Vue from 'vue'
import Router from 'vue-router'
// 登录
import login from '@/components/login'
// 登录
import admin from '@/components/admin'
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

import {checkLogin} from '@/server/server'

const router = new Router({
    routes: [
        {
            path: '/login',
            alias: '',
            name: 'login',
            component: login
        },
        {
            path: '/admin',
            name: 'admin',
            component: admin,
            children: [
                {
                    path: 'articleAdd',
                    alias: '',
                    name: 'articleAdd',
                    component: articleAdd
                },
                {
                    path: 'articleList',
                    name: 'articleList',
                    component: articleList
                },
                {
                    path: 'classificationList',
                    name: 'classificationList',
                    component: classificationList
                },
                {
                    path: 'classificationAdd',
                    name: 'classificationAdd',
                    component: classificationAdd
                },
                {
                    path: 'userList',
                    name: 'userList',
                    component: userList
                },
                {
                    path: 'commentList',
                    name: 'commentList',
                    component: commentList
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    if( to.name === 'login' || from.name === 'login' ) next(); 
    else {
        // 验证登录
        checkLogin()
        .then(({data}) => {
            if(data.code === 0) next();
            else {
                next({
                    path: '/login',
                    query: { redirect: to.name }
                });
            }
        });
    }
})

export default router;