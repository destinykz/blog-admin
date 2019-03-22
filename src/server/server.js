import axios from 'axios'
import router from "@/router/router";
const http = axios.create({
    baseURL: 'http://192.168.1.35:7070/admin',
    responseType: 'json'
});
// 请求拦截器
http.interceptors.request.use(function (config) {
    config.headers.token = window.localStorage.getItem('token') || '';
    return config;
});
// 响应拦截器
http.interceptors.response.use(function (resData) {
    var data = resData.data;
    if (data.c) c.$Message.error(data.m);
    return data;
}, function (e) {
    // 响应错误直接到登录界面
    c.$Message.error('登录超时！');
    router.push({ name: 'login' });
});
// 检查是否登陆
export const checkLogin = () => {
    return http.post('/user/checkLogin');
}
// 登录
export const login = (username, password) => {
    return http.post('/user/login', {
        username,
        password
    })
}
// 添加文章
export const addArticle = articleData => {
    return http.post('/article/articleAdd', { articleData });
}
// 获取文章列表
export const articleList = reqData => {
    return http.post('/article/articleList', reqData);
}
// 通过aid请求文章内容
export const articleContentByAid = aid => {
    return http.post('/article/articleContentByAid', { aid });
}
// 删除文章
export const articleDel = aids => {
    return http.post('/article/articleDel', aids);
}
// markdown 上传图片
export const uploadImg = formdata => {
    return http.post('/article/uploadImg', formdata);
}
// 查询分类
export const tagList = () => {
    return http.post('/tag/getTagList');
}
// 删除标签
export const tagDel = tids => {
    return http.post('/tag/delTag', tids);
}
// 标签图片上传
export const uploadTagImg = formdata => {
    return http.post('/tag/uploadTagImg', formdata);
}
// 标签添加
export const addTag = reqData => {
    return http.post('/tag/tagAdd', reqData);
}
// 标签修改
export const updTag = reqData => {
    return http.post('/tag/tagUpd', reqData);
}
// 获取单个标签信息
export const getTagByTid = tid => {
    return http.post('/tag/getTagByTid', { tid });
}