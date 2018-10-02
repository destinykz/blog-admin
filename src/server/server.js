import axios from 'axios'
import router from "@/router/router";
const http = axios.create({
    baseURL: 'http://localhost:1111',
    responseType: 'json',
    transformResponse: [data => {
        if( data.token ) {
            window.localStorage.setItem('uid', data.uid);
            window.localStorage.setItem('username', data.username);
            window.localStorage.setItem('token', data.token);
        }
        return data;
    }]
});
// 请求前
http.interceptors.request.use(function (config) {
    config.headers.token = window.localStorage.getItem('token') || '';
    config.headers.uid = window.localStorage.getItem('uid') || '';
    return config;
});
// 请求后
http.interceptors.response.use(
    response => {
        return response
    },
    err => {
        if( err.response.status === 401 ) {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('uid');
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
    return http.post('user/checkLogin');
}
// 登录
export const login = (username, password) => {
    return http.post('user/login', {
        username,
        password
    })
}
// 添加文章
export const addArticle = articleData => {
    return http.post('admin/articleAdd', {articleData});
}
// 查询列表值
export const tagList = () => {
    return http.post('admin/getTagList');
}
// markdown 上传图片
export const uploadImg = formdata => {
    return axios({
        url: 'http://localhost:1111/admin/uploadImg',
        method: 'post',
        data: formdata,
        headers: {
            'Content-Type': 'multipart/form-data',
            uid: window.localStorage.getItem('uid'),
            token: window.localStorage.getItem('token')
        },
    });
}