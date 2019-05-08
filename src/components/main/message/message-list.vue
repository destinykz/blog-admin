<template>
  <div id="message-list">
    <c-list
      primaryID="mid"
      :columns="columns"
      :list="messageList"
      :total="total"
      :pageSize="pageSize"
      @pageChange="pageChange"
      @batchDel="batchDelMessage"
    ></c-list>
    <Modal
      v-model="replyModal"
      footer-hide
      :styles="{position: 'absolute', width: '80%', height: '80%', left: '10%', top: '10%'}"
      title="回复列表"
      @on-cancel="cancel"
    >
      <reply-list :mid="nowMid"></reply-list>
    </Modal>
  </div>
</template>

<script>
import cList from "@/components/c-list";
import replyList from "./reply-list";
import { getMessageList, getMessageCount, messageDel } from "@/server/server";
export default {
  components: {
    cList,
    replyList
  },
  created() {
    this.loadMessageList(1);
    this.loadMessageCount();
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
          title: "留言人",
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
          width: 180,
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
                      this.replyShow(params.row.mid);
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
                      this.singleDelMessage(params.row.mid);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      messageList: [],
      total: 0,
      pageSize: 0,
      nowMid: "",
      replyModal: false
    };
  },
  methods: {
    // 留言分页
    pageChange(page) {
      this.loadMessageList(page);
    },
    // 加载留言
    loadMessageList(page) {
      getMessageList(page).then(({ d }) => {
        this.messageList = d.messageList;
        this.pageSize = d.pageSize;
      });
    },
    loadMessageCount() {
      getMessageCount().then(({ d }) => {
        this.total = d.total;
      });
    },
    // 查看留言对应回复
    replyShow(mid) {
      this.nowMid = mid;
      this.replyModal = true;
    },
    // 单个删除留言
    singleDelMessage(mid) {
      this.$Modal.confirm({
        title: "删除确认",
        content: "<p>您确认当前留言吗？</p>",
        onOk: () => {
          this.batchDelMessage([mid]);
        }
      });
    },
    // 删除留言
    batchDelMessage(mids) {
      messageDel(mids).then(data => {
        if (data.c === 0) {
          this.loadMessageList(1);
          this.loadMessageCount();
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
