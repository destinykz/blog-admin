import axios from 'axios'
import router from "@/router/router";
const http = axios.create({
    baseURL: 'http://192.168.1.34:8080/admin',
    responseType: 'json'
});
// 请求拦截器
http.interceptors.request.use(function (config) {
    config.headers.token = window.localStorage.getItem('token') || '';
    return config;
});
// 响应拦截器
http.interceptors.response.use(function (resData) {
    var d = resData.data.d;
    if (resData.status === 200 && resData.data.c === 0) {
        if (d && d.token) {
            window.localStorage.setItem('username', d.username);
            window.localStorage.setItem('token', d.token);
        }
        if (resData.data.m) c.msg({
            type: 'success',
            content: resData.data.m
        });
        return d || [];
    } else {
        c.msg({
            type: 'error',
            content: resData.data.m
        });
    }
}, function (e) {
    // 响应错误直接到登录界面
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
export const articleList = articleData => {
    return http.post('/article/articleList', { articleData });
}
// 通过aid请求文章内容
export const articleContentByAid = aid => {
    return http.post('/article/articleContentByAid', { aid });
}
// 删除文章
export const articleDel = aid => {
    return http.post('/article/articleDel', { aid });
}
// markdown 上传图片
export const uploadImg = formdata => {
    return http.post('/article/uploadImg', formdata);
}
// 查询分类
export const tagList = () => {
    return http.post('/tag/getTagList');
}