<template>
  <div id="article-list">
    <Table
      border
      ref="selection"
      :columns="columns"
      :data="articleList"
      @on-selection-change="selectionChange"
    ></Table>
    <Button type="error" @click="delArticle(aids)" style="margin: 10px 0;">批量删除</Button>
    <Page
      :total="total"
      :page-size="pageSize"
      show-total
      @on-change="pageChange"
      style="text-align: center;"
    />
  </div>
</template>

<script>
import { articleList as articleListReq, articleDel } from "@/server/server";
export default {
  created() {
    this.loadArticleList(1);
  },
  data() {
    return {
      aids: [],
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
                "查看"
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
      articleListReq({ page }).then(data => {
        this.articleList = data.articleList;
        this.total = data.total;
        this.pageSize = data.pageSize;
      });
    },
    // 删除文章
    delArticle(aids) {
      if (!aids || !aids.length) {
        this.$Message.warning("请选择需要删除的文章");
        return;
      }
      this.$Modal.confirm({
        title: "删除确认",
        content: "<p>您确认删除文章吗？</p>",
        onOk: () => {
          articleDel({ aids }).then(data => {
            window.location.reload();
          });
        },
        onCancel: () => {}
      });
    },
    // 文章勾选
    selectionChange(selection) {
      this.aids.length = 0;
      selection.forEach(article => {
        this.aids.push(article.aid);
      });
    }
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