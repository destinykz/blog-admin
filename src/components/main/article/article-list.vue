<template>
    <div id="article-list">
        <div class="article-search clear">
            <div class="search-box">
              <div class="cdl-form-wrap">
                  <span class="cdl-form-title">文章搜索</span>
                  <div class="cdl-form-cnt">
                      <input type="text" placeholder="请输入文章相关内容" class="cdl-text" v-focus>
                  </div>
              </div>
            </div>
            <button id="article-search-btn" class="cdl-button medium blue"><i class="fa fa-search"></i> 搜索</button>
        </div>
        <cdl-table :data="articleList">
            <cdl-table-column slot="thead" label="ID"></cdl-table-column>
            <cdl-table-column slot="thead" label="文章标题"></cdl-table-column>
            <cdl-table-column slot="thead" label="类型"></cdl-table-column>
            <cdl-table-column slot="thead" label="发布日期"></cdl-table-column>
            <cdl-table-column slot="thead" label="操作"></cdl-table-column>
            <template slot-scope="handle">
                <button class="cdl-button blue mini" @click="update_article(handle.row.aid)">修改</button>
                <button class="cdl-button red mini" @click="delete_article(handle.row.aid)">删除</button>
            </template>
        </cdl-table>
    </div>
</template>

<script>
import cdlTable from "../../table/table";
import cdlTableColumn from "../../table/table-column";
import { articleList as articleListReq, articleDel } from "@/server/server";
export default {
  components: {
    cdlTable,
    cdlTableColumn
  },
  beforeCreate() {
    articleListReq().then(({ data }) => {
      data.articleList.map(article_item => {
        article_item.date = c.formattedDate(article_item.date);
      });
      if (data.code === 0) this.articleList = data.articleList;
    });
  },
  data() {
    return {
      articleList: []
    };
  },
  methods: {
    update_article(aid) {
      this.$router.push({ name: "articleEdit", params: { aid } });
    },
    delete_article(aid) {
      articleDel(aid).then(({data}) => {
        if(data.code  === 0) {
          c.msg({
            content: data.msg
          })
        } else {
          c.msg({
            type: 'error',
            content: data.msg
          })
        }
      })
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