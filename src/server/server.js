
import axios from 'axios'
import router from "@/router/router";
const http = axios.create({
    baseURL: '/admin',
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
    else if (data.m) c.$Message.success(data.m);
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
// 添加文章
export const editArticle = articleData => {
    return http.post('/article/articleEdit', { articleData });
}
// 获取文章列表
export const articleList = (page, state) => {
    return http.get(`/article/articleList?page=${page}&state=${state}`);
}
// 通过aid请求文章内容
export const articleContentByAid = aid => {
    return http.get(`/article/articleContentByAid?aid=${aid}`);
}
// 搜索文章
export const getArticleBySearch = (searchValue = '', page = 1, state) => {
    return http.get(`/article/getArticleBySearch?searchValue=${searchValue}&page=${page}&state=${state}`);
}
// 文章垃圾箱
export const articleDustbin = aids => {
    return http.post('/article/articleDustbin', { aids });
}
// 恢复至草稿箱
export const articleRecovery = aids => {
    return http.post('/article/articleRecovery', { aids });
}
// 彻底删除文章
export const articleDel = aids => {
    return http.post('/article/articleDel', { aids });
}
// markdown 上传图片
export const uploadImg = formdata => {
    return http.post('/article/uploadImg', formdata);
}
// 查询分类
export const tagList = () => {
    return http.get('/tag/getTagList');
}
// 删除标签
export const tagDel = tids => {
    return http.post('/tag/delTag', { tids });
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
    return http.get(`/tag/getTagByTid?tid=${tid}`);
}
// 评论列表
export const getCommentList = page => {
    return http.get(`/comment/getCommentList?page=${page}`);
}
// 评论总数
export const getCommentCount = () => {
    return http.get('/comment/getCommentCount');
}
// 评论删除
export const commentDel = cids => {
    return http.post('/comment/commentDel', { cids });
}
// 回复列表
export const getReplyList = (cid, page) => {
    return http.get(`/comment/getReplyList?cid=${cid}&page=${page}`);
}
// 回复总数
export const getReplyCount = cid => {
    return http.get(`/comment/getReplyCount?cid=${cid}`);
}
// 回复删除
export const replyDel = rids => {
    return http.post('/comment/replyDel', { rids });
}
// 留言列表
export const getMessageList = page => {
    return http.get(`/message/getMessageList?page=${page}`);
}
// 留言总数
export const getMessageCount = () => {
    return http.get('/message/getMessageCount');
}
// 留言删除
export const messageDel = mids => {
    return http.post('/message/messageDel', { mids });
}
// 回复列表
export const getMReplyList = (mid, page) => {
    return http.get(`/message/getMReplyList?mid=${mid}&page=${page}`);
}
// 回复总数
export const getMReplyCount = mid => {
    return http.get(`/message/getMReplyCount?mid=${mid}`);
}
// 回复删除
export const MReplyDel = rids => {
    return http.post('/message/MReplyDel', { rids });
}