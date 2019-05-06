<template>
  <div id="article-list">
    <div class="search-box">
      <Input search enter-button="搜索" autofocus placeholder="支持：标题/前言/内容" @on-search="articleSearch" />
    </div>
    <c-list
      ref="cList"
      :primaryID="'aid'"
      :columns="columns"
      :list="articleList"
      :total="total"
      :pageSize="pageSize"
      @pageChange="pageChange"
      @delItem="delArticle"
    ></c-list>
  </div>
</template>

<script>
import cList from "@/components/c-list";
import { articleList as articleListReq, articleDel, getArticleBySearch } from "@/server/server";
export default {
  props: {
    state: {
      type: Number,
      default: 1
    }
  },
  components: {
    cList
  },
  created() {
    this.loadArticleList(1);
  },
  data() {
    return {
      columns: [
        {
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
          title: "ID",
          key: "aid"
        },
        {
          title: "标题",
          key: "title"
        },
        {
          title: "日期",
          key: "date"
        },
        {
          title: "标签",
          key: "tag_name"
        },
        {
          title: "操作",
          width: 150,
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
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.update_article(params.row.aid);
                    }
                  }
                },
                "编辑"
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
                      this.delArticle([params.row.aid]);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      articleList: [],
      total: 0,
      pageSize: 0
    };
  },
  methods: {
    // 修改文章
    update_article(aid) {
      this.$router.push({ name: "articleEdit", params: { aid } });
    },
    // 文章分页
    pageChange(page) {
      this.loadArticleList(page);
    },
    // 加载文章
    loadArticleList(page) {
      articleListReq(page, this.state).then(({ d: data }) => {
        this.articleList = data.articleList;
        this.total = data.total;
        this.pageSize = data.pageSize;
      });
    },
    // 文章搜索
    articleSearch(searchValue){
      getArticleBySearch(searchValue, 1, this.state).then(({ d: data }) => {
        this.articleList = data.articleList;
        this.total = data.total;
        this.pageSize = data.pageSize;
      });
    },
    // 删除文章
    delArticle(aids) {
      articleDel(aids).then(data => {
        if (data.c === 0) this.loadArticleList(1);
      });
    }
  }
};
</script>

<style>
  .search-box {
    margin-bottom: 10px;
  }
</style>