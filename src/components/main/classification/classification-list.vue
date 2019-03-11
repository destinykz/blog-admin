<template>
  <div id="tag-list">
    <Table
      border
      ref="selection"
      :columns="columns"
      :data="tagList"
      @on-selection-change="selectionChange"
    ></Table>
    <Button type="error" @click="delTag(tids)" style="margin: 10px 0;">批量删除</Button>
  </div>
</template>

<script>
import { tagList as tagListReq, tagDel } from "@/server/server";
export default {
  created() {
    this.loadTag();
  },
  data() {
    return {
      tids: [],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "ID",
          key: "tid"
        },
        {
          title: "名称",
          key: "tag_name"
        },
        {
          title: "操作",
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
                      this.update_tag(params.row.tid);
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
                      this.delTag([params.row.tid]);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      tagList: []
    };
  },
  methods: {
    // 修改标签
    update_tag(tid) {
      this.$router.push({ name: "classificationUpd", params: { tid } });
    },
    // 加载标签表格
    loadTag() {
      tagListReq().then(({ d: tagList }) => {
        this.tagList = tagList;
      });
    },
    // 删除文章
    delTag(tids) {
      if (!tids || !tids.length) {
        this.$Message.warning("请选择需要删除的标签");
        return;
      }
      this.$Modal.confirm({
        title: "删除确认",
        content: "<p>您确认删除标签吗？</p>",
        onOk: () => {
          tagDel({ tids }).then(() => {
            window.location.reload();
          });
        },
        onCancel: () => {}
      });
    },
    // 文章勾选
    selectionChange(selection) {
      this.tids.length = 0;
      selection.forEach(tag => {
        this.tids.push(tag.tid);
      });
    }
  }
};
</script>

<style lang="css">
</style>