<template>
  <c-list :primaryID="'tid'" :columns="columns" :list="tagList" @delItem="delTag"></c-list>
</template>

<script>
import cList from "@/components/c-list";
import { tagList as tagListReq, tagDel } from "@/server/server";
export default {
  components: {
    cList
  },
  created() {
    this.loadTag();
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
                      this.tagDetail(params.row.tid);
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
    tagDetail(tid) {
      this.$router.push({ name: "tagUpd", params: { tid } });
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
      tagDel(tids).then(data => {
        if (data.c === 0) this.loadTag();
      });
    }
  }
};
</script>

<style lang="css">
</style>