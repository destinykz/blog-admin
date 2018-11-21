import axios from 'axios'
import router from "@/router/router";
const http = axios.create({
    baseURL: 'http://192.168.1.35:1111/admin',
    responseType: 'json',
    transformResponse: [data => {
        if (data.token) {
            window.localStorage.setItem('username', data.username);
            window.localStorage.setItem('token', data.token);
        }
        return data;
    }]
});
// 请求前
http.interceptors.request.use(function (config) {
    config.headers.token = window.localStorage.getItem('token') || '';
    return config;
});
// 请求后
http.interceptors.response.use(
    response => {
        return response
    },
    err => {
        if (err.response.status === 401) {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('username');
            c.msg({
                type: 'error',
                content: err.response.data.msg
            });
            router.push({
                name: 'login',
                query: { redirect: router.history.current.name }
            });
        } else {
            c.msg({
                type: 'error',
                content: '服务器发生异常！'
            });
        }
    }
);

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