<template>
  <article-list
    :handle="handle"
    :state="-1"
    batchDelText="批量彻底删除"
    :btns="btns"
    ref="articleBaseList"
    @batchDelArticle="batchDelArticle"
  ></article-list>
</template>

<script>
import articleList from "./article.base.list";
import { articleDel } from "@/server/server";
export default {
  components: {
    articleList
  },
  data() {
    return {
      handle: {
        title: "操作",
        width: 220,
        align: "center",
        render: (h, params) => {
          return h("div", [
            h(
              "Button",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                style: {
                  marginRight: "10px"
                },
                on: {
                  click: () => {
                    returnShis.singleReturnArticle(params.row.aid);
                  }
                }
              },
              "恢复至草稿箱"
            ),
            h(
              "Button",
              {
                props: {
                  type: "error",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.singleDelArticle(params.row.aid);
                  }
                }
              },
              "彻底删除"
            )
          ]);
        }
      },
      btns: [
        {
          id: 1,
          type: "success",
          fn: aids => {
            this.batchReturnArticle(aids);
          },
          icon: "md-return-left",
          text: "批量恢复至草稿箱"
        }
      ]
    };
  },
  methods: {
    // 彻底删除单个文章
    singleDelArticle(aid) {
      this.$Modal.confirm({
        title: "删除确认",
        content: "<p>您确认删除当前文章吗？</p>",
        onOk: () => {
          this.batchDelArticle([aid]);
        }
      });
    },
    // 批量彻底删除文章
    batchDelArticle(aids) {
      articleDel(aids).then(data => {
        if (data.c === 0) this.$refs.articleBaseList.loadArticleList(1);
      });
    },
    // 单个恢复至草稿箱
    singleReturnArticle(aid) {
      console.log(aid);
    },
    // 批量恢复至草稿箱
    batchReturnArticle(aids) {
      console.log(aids);
    }
  }
};
</script>