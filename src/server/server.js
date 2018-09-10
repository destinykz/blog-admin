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
        if( !data ) return;
        if( data.token ) {
            window.localStorage.setItem('token', data.token);
        }
        if( data.code === 0 ) {
            c.msg({
                content: data.msg
            })
        }else if( data.code === 1 ) {
            c.msg({
                type: 'error',
                content: data.msg
            })
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
                    router.push({
                        path: '/login',
                        query: { redirect: router.currentrouter.name }
                    })
            }
        }
        return Promise.reject(error.response)
    }
)
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