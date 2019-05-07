<template>
  <div id="article-list">
    <div class="search-box">
      <Input
        search
        enter-button="搜索"
        autofocus
        placeholder="支持：id/标题/前言/内容"
        @on-search="articleSearch"
      />
    </div>
    <c-list
      ref="cList"
      :primaryID="'aid'"
      :columns="columns"
      :list="articleList"
      :total="total"
      :btns="btns"
      :pageSize="pageSize"
      :batchDelText="batchDelText"
      @pageChange="pageChange"
      @batchDel="batchDelArticle"
    ></c-list>
  </div>
</template>

<script>
import cList from "@/components/c-list";
import {
  articleList as articleListReq,
  getArticleBySearch
} from "@/server/server";
export default {
  props: {
    state: {
      type: Number,
      default: 1
    },
    handle: {
      type: Object,
      default() {
        return {
          title: "操作",
          width: 180,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    icon: "ios-brush"
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
                    size: "small",
                    icon: "md-trash"
                  },
                  on: {
                    click: () => {
                      this.delSingleArticle(params.row.aid);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        };
      }
    },
    batchDelText: {
      type: String
    },
    btns: {
      type: Array
    }
  },
  components: {
    cList
  },
  created() {
    this.loadArticleList(1);
    this.columns.push(this.handle);
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
    articleSearch(searchValue) {
      getArticleBySearch(searchValue, 1, this.state).then(({ d: data }) => {
        this.articleList = data.articleList;
        this.total = data.total;
        this.pageSize = data.pageSize;
      });
    },
    delSingleArticle(aid) {
      this.$Modal.confirm({
        title: "删除确认",
        content: "<p>您确认删除当前文章吗？</p>",
        onOk: () => {
          this.batchDelArticle([aid]);
        }
      });
    },
    // 批量删除文章
    batchDelArticle(aids) {
      this.$emit("batchDelArticle", aids);
    }
  }
};
</script>

<style>
.search-box {
  margin-bottom: 10px;
}
</style>