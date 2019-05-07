<template>
  <article-base-add :articleData="articleData" :type="'edit'"></article-base-add>
</template>
<script>
import articleBaseAdd from "./article.base.add";
import { articleContentByAid } from "@/server/server";
export default {
  components: {
    articleBaseAdd
  },
  data() {
    return {
      articleData: {
        aid: "",
        title: "", // 标题
        preface: "", // 前言
        cover: "", // 文件路径
        tag_id: "", // 标签
        markdownText: "", // 编辑内容
        markdownHtml: "", // 显示内容
        state: 0 // 文章状态
      }
    };
  },
  created() {
    const aid = this.$route.params.aid;
    articleContentByAid(aid).then(({ d: articleInfo }) => {
      for (const key in articleInfo) {
        this.articleData[key] = articleInfo[key];
      }
    });
  }
};
</script>