import Vue from 'vue'
import Router from 'vue-router'
// 登录
import login from '@/components/login'
// 登录
import admin from '@/components/admin'
// 文章列表
import articleMainList from '@/components/main/article/article.main.list'
// 文章草稿
import articleDraftList from '@/components/main/article/article.draft.list'
// 文章添加
import articleAdd from '@/components/main/article/article.add'
// 文章修改
import articleEdit from '@/components/main/article/article.edit'
// 分类列表
import tagList from '@/components/main/tag/tag-list'
// 分类添加
import tagAdd from '@/components/main/tag/tag-add'
// 分类修改
import tagUpd from '@/components/main/tag/tag-upd'
// 用户列表
import userList from '@/components/main/user/user-list'
// 评论列表
import commentList from '@/components/main/comment/comment-list'

Vue.use(Router)

const router = new Router({
    mode: 'history',
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
                    name: 'article/articleAdd',
                    component: articleAdd
                },
                {
                    path: 'articleEdit/:aid',
                    alias: '',
                    name: 'articleEdit',
                    component: articleEdit
                },
                {
                    path: 'articleList',
                    name: 'article/articleMainList',
                    component: articleMainList
                },
                {
                    path: 'articleDraft',
                    name: 'article/articleDraftList',
                    component: articleDraftList
                },
                {
                    path: 'tagList',
                    name: 'tag/tagList',
                    component: tagList
                },
                {
                    path: 'tagUpd/:tid',
                    alias: '',
                    name: 'tag/tagUpd',
                    component: tagUpd
                },
                {
                    path: 'tagAdd',
                    name: 'tag/tagAdd',
                    component: tagAdd
                },
                {
                    path: 'userList',
                    name: 'userList',
                    component: userList
                },
                {
                    path: 'commentList',
                    name: 'comment/commentList',
                    component: commentList
                }
            ]
        }
    ]
});
export default router;