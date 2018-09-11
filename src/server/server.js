import axios from 'axios'
import router from "@/router/router";
const http = axios.create({
    baseURL: 'http://localhost:8001',
    responseType: 'json',
    headers: {
        common: {
            Authorization: window.localStorage.getItem('token') || ''
        }
    },
    transformResponse: [data => {
        if( data.token ) {
            window.localStorage.setItem('username', data.username);
            window.localStorage.setItem('token', data.token);
        }
        return data;
    }]
});

http.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    window.localStorage.removeItem('token');
                    window.localStorage.removeItem('username');
                    router.push({
                        path: '/login',
                        query: { redirect: router.currentrouter.name }
                    })
            }
        }
    }
);
// 检查是否登陆
export const checkLogin = () => {
    return http.post('admin/checkLogin');
}
// 登录
export const login = (username, password) => {
    return http.post('admin/login', {
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