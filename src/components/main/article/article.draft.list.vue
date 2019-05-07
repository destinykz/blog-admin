<template>
  <div>
    <articleList :state="0" @batchDelArticle="batchDelArticle" ref="articleBaseList"></articleList>
  </div>
</template>

<script>
import { articleDustbin } from "@/server/server";
import articleList from "./article.base.list";
export default {
  components: {
    articleList
  },
  methods: {
    batchDelArticle(aids) {
      articleDustbin(aids).then(data => {
        if (data.c === 0) this.$refs.articleBaseList.loadArticleList(1);
      });
    }
  }
};
</script>