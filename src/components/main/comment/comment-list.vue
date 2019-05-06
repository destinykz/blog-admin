<template>
<div id="comment-list">
    <c-list :primaryID="'cid'" :columns="columns" :list="commentList" :total="total" :pageSize="pageSize" @pageChange="pageChange" @delItem="delComment">
    </c-list>
    <Modal v-model="replyModal" footer-hide :styles="{position: 'absolute', width: '80%', height: '80%', left: '10%', top: '10%'}" title="回复列表" @on-cancel="cancel">
        <reply-list :cid="nowCid"></reply-list>
    </Modal>
</div>
</template>

<script>
import cList from "@/components/c-list";
import replyList from "./reply-list";
import {
    getCommentList,
    getCommentCount,
    commentDel
} from "@/server/server";
export default {
    components: {
        cList,
        replyList
    },
    created() {
        this.loadCommentList(1);
        this.loadCommentCount();
    },
    data() {
        return {
            columns: [{
                    type: "selection",
                    width: 60,
                    align: "center"
                },
                {
                    type: "index",
                    width: 60,
                    align: "center"
                },
                {
                    title: "内容",
                    key: "content"
                },
                {
                    title: "评论人",
                    key: "user"
                },
                {
                    title: "总赞数",
                    key: "likeCount"
                },
                {
                    title: "ip",
                    key: "uip"
                },
                {
                    title: "城市",
                    key: "city"
                },
                {
                    title: "日期",
                    key: "date"
                },
                {
                    title: "操作",
                    width: 250,
                    align: "center",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button", {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "5px"
                                    },
                                    on: {
                                        click: () => {
                                            this.articleDetail(params.row.aid);
                                        }
                                    }
                                },
                                "对应文章"
                            ),
                            h(
                                "Button", {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "5px"
                                    },
                                    on: {
                                        click: () => {
                                            this.replyShow(params.row.cid);
                                        }
                                    }
                                },
                                "对应回复"
                            ),
                            h(
                                "Button", {
                                    props: {
                                        type: "error",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.delComment([params.row.cid]);
                                        }
                                    }
                                },
                                "删除"
                            )
                        ]);
                    }
                }
            ],
            commentList: [],
            total: 0,
            pageSize: 0,
            nowCid: "",
            replyModal: false
        };
    },
    methods: {
        // 评论分页
        pageChange(page) {
            this.loadCommentList(page);
        },
        // 加载评论
        loadCommentList(page) {
            getCommentList(page).then(({
                d
            }) => {
                this.commentList = d.commentList;
                this.pageSize = d.pageSize;
            });
        },
        loadCommentCount() {
            getCommentCount().then(({
                d
            }) => {
                this.total = d.total;
            });
        },
        // 查看评论对应文章
        articleDetail(aid) {
            this.$router.push({
                name: "articleEdit",
                params: {
                    aid
                }
            });
        },
        // 查看评论对应回复
        replyShow(cid) {
            this.nowCid = cid;
            this.replyModal = true;
        },
        // 删除评论
        delComment(ids) {
            commentDel(ids).then(data => {
                if (data.c === 0) {
                    this.loadCommentList(1);
                    this.loadCommentCount();
                }
            });
        },
        cancel() {}
    }
};
</script>

<style lang="css">
.article-search {
    position: relative;
    margin: 30px;
    padding-right: 86.9px;
    height: 41.2px;
    overflow: hidden;
}

.search-box {
    width: 100%;
    height: 100%;
}

#article-search-btn {
    flex: 5;
    position: absolute;
    vertical-align: top;
    right: 0;
    top: 0;
}
</style>
