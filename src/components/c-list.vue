<template>
  <div class="c-list">
    <Table
      border
      ref="selection"
      :columns="columns"
      :data="list"
      @on-selection-change="selectionChange"
      :loading="loading"
      :max-height="autoMaxHeight"
    ></Table>
    <div v-if="list.length" class="list-btn-group">
      <Button
        v-for="btn in btns"
        :key="btn.id"
        :type="btn.type"
        @click="btn.fn(ids)"
        style="margin: 10px 0;"
      >
        <Icon :type="btn.icon" size="16" style="margin-top: -2px;"/>
        <span>{{btn.text}}</span>
      </Button>
      <Button type="error" @click="batchDel(ids)" style="margin: 10px 0;">
        <Icon type="md-trash" size="16" style="margin-top: -2px;"/>
        <span>{{batchDelText}}</span>
      </Button>
    </div>
    <Page
      v-if="total"
      :total="total"
      :page-size="pageSize"
      show-total
      @on-change="pageChange"
      style="text-align: center;"
      show-elevator
    />
  </div>
</template>

<script>
export default {
  props: {
    primaryID: {
      trye: String
    },
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 0
    },
    maxHeight: {
      type: Number
    },
    btns: {
      type: Array,
      default() {
        return [];
      }
    },
    batchDelText: {
      type: String,
      default: "批量删除"
    }
  },
  data() {
    return {
      autoMaxHeight: 0,
      loading: true,
      ids: []
    };
  },
  mounted() {
    this.autoMaxHeight = this.maxHeight
      ? this.maxHeight
      : document.getElementById("main").offsetHeight - 180;
  },
  updated() {
    this.loading = false;
  },
  methods: {
    // 评论分页
    pageChange(page) {
      this.loading = true;
      this.$emit("pageChange", page);
    },
    // 批量删除
    batchDel(ids) {
      if (!ids || !ids.length) {
        this.$Message.warning("请选择需要删除的条目！");
        return;
      }
      this.$Modal.confirm({
        title: "删除确认",
        content: "<p>您确认删除吗？</p>",
        onOk: () => {
          this.$emit("batchDel", ids);
        }
      });
    },
    // 评论勾选
    selectionChange(selection) {
      this.ids.length = 0;
      selection.forEach(item => {
        this.ids.push(item[this.primaryID]);
      });
    }
  }
};
</script>
