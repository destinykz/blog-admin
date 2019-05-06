<template>
  <div id="article-list">
    <Table
      border
      ref="selection"
      :columns="columns"
      :data="commentList"
      @on-selection-change="selectionChange"
    ></Table>
    <Button type="error" @click="delComment(cids)" style="margin: 10px 0;">批量删除</Button>
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
import { getCommentList, getCommentCount, commentDel } from "@/server/server";
export default {
  created() {
    this.loadCommentList(1);
    this.loadCommentCount();
  },
  data() {
    return {
      cids: [],
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
          title: "内容",
          key: "content"
        },
        {
          title: "日期",
          key: "date"
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
          title: "操作",
          width: 250,
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
                      // this.update_article(params.row.aid);
                    }
                  }
                },
                "对应文章"
              ),
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
                      // this.update_article(params.row.aid);
                    }
                  }
                },
                "对应回复"
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
      pageSize: 0
    };
  },
  methods: {
    // 评论分页
    pageChange(page) {
      this.loadCommentList(page);
    },
    // 加载评论
    loadCommentList(page) {
      getCommentList(page).then(({ d }) => {
        this.commentList = d.commentList;
        this.pageSize = d.pageSize;
      });
    },
    loadCommentCount() {
      getCommentCount().then(({ d }) => {
        this.total = d.total;
      });
    },
    // 删除评论
    delComment(cids) {
      if (!cids || !cids.length) {
        this.$Message.warning("请选择需要删除的评论");
        return;
      }
      console.log(cids);
      this.$Modal.confirm({
        title: "删除确认",
        content: "<p>您确认删除评论吗？</p>",
        onOk: () => {
          commentDel(cids).then(data => {
            if (data.c === 0) window.location.reload();
          });
        }
      });
    },
    // 评论勾选
    selectionChange(selection) {
      this.cids.length = 0;
      selection.forEach(comment => {
        this.cids.push(comment.cid);
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