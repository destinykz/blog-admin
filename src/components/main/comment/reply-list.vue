<template>
  <div id="reply-list">
    <c-list
      :primaryID="'rid'"
      :columns="columns"
      :list="replyList"
      :max-height="500"
      :total="total"
      :pageSize="pageSize"
      @pageChange="pageChange"
      @batchDel="delReply"
    ></c-list>
  </div>
</template>

<script>
import cList from "@/components/c-list";
import { getReplyList, getReplyCount, replyDel } from "@/server/server";
export default {
  components: {
    cList
  },
  props: {
    cid: {
      type: String
    }
  },
  created() {
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
          title: "内容",
          key: "content"
        },
        {
          title: "回复人",
          key: "user"
        },
        {
          title: "评论人",
          key: "toUser"
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
          width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.delReply([params.row.rid]);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      replyList: [],
      total: 0,
      pageSize: 0
    };
  },
  watch: {
    cid(newCid) {
      this.loadReplyList(newCid, 1);
      this.loadReplyCount(newCid);
    }
  },
  methods: {
    // 回复分页
    pageChange(page) {
      this.loadReplyList(this.cid, page);
    },
    // 加载回复
    loadReplyList(page) {
      getReplyList(this.cid, page).then(({ d }) => {
        this.replyList = d.replyList;
        this.pageSize = d.pageSize;
      });
    },
    loadReplyCount() {
      getReplyCount(this.cid).then(({ d }) => {
        this.total = d.total;
      });
    },
    // 删除回复
    delReply(rids) {
      replyDel(rids).then(data => {
        if (data.c === 0) this.loadReplyList(1);
      });
    }
  }
};
</script>

<style lang="css">
</style>