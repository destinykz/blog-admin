<template>
  <div id="article-add">
    <div class="cdl-form-item">
      <div class="cdl-form-wrap">
        <span class="cdl-form-title">文章标题</span>
        <div class="cdl-form-cnt">
          <Input v-model="articleData.title" placeholder="请输入文章标题"/>
        </div>
      </div>
    </div>
    <div class="cdl-form-item">
      <div class="cdl-form-wrap">
        <span class="cdl-form-title">文章前言</span>
        <div class="cdl-form-cnt">
          <Input v-model="articleData.preface" type="textarea" :rows="4" placeholder="请输入文章前言"/>
        </div>
      </div>
    </div>
    <div class="cdl-form-item">
      <div class="cdl-form-wrap">
        <span class="cdl-form-title">文章图片</span>
        <div class="cdl-form-cnt">
          <label for="uploadImg" class="cdl-button blue">
            <Icon type="md-cloud-upload" :size="18"/>上传文章封面
          </label>
          <input
            type="file"
            accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
            id="uploadImg"
            @change="uploadImg"
            :value="fileVal"
          >
        </div>
      </div>
      <div id="cover" v-show="articleData.cover">
        <i class="uploadImgClose cdl-close fa fa-close" title="移除这张图片" @click="closeUploadImg"></i>
        <img :src="articleData.cover" alt="主图">
      </div>
    </div>
    <div class="cdl-form-item">
      <div class="cdl-form-wrap">
        <span class="cdl-form-title">文章标签</span>
        <div class="cdl-form-cnt">
          <Select v-model="articleData.tag_id">
            <Option v-for="item in tagList" :value="item.tid" :key="item.tid">{{ item.tag_name }}</Option>
          </Select>
        </div>
      </div>
    </div>
    <div class="cdl-form-item">
      <mavon-editor
        ref="md"
        :value="articleData.markdownText"
        @imgAdd="imgAdd"
        :ishljs="true"
        @change="articleSave"
      ></mavon-editor>
    </div>
    <div class="cdl-form-item">
      <div class="cdl-form-wrap">
        <Button type="primary" :size="'large'" @click="send(1)" style="margin-right: 20px;">
          <Icon type="ios-send"/>发布
        </Button>
        <Button type="warning" :size="'large'" @click="send(0)">
          <Icon type="md-book"/>存为草稿
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  addArticle,
  editArticle,
  tagList as tagListReq,
  uploadImg
} from "@/server/server";
export default {
  props: {
    type: {
      type: String
    },
    articleData: {
      type: Object,
      default() {
        return {
          title: "", // 标题
          preface: "", // 前言
          cover: "", // 文件路径
          tag_id: "", // 标签
          markdownText: "", // 编辑内容
          markdownHtml: "", // 显示内容
          state: 1
        };
      }
    }
  },
  data() {
    return {
      fileVal: "", // input[type="file"] 的值
      tagList: [] // 文章标签值
    };
  },
  created() {
    // 获取标签列表
    tagListReq().then(({ d: tagList }) => {
      this.tagList = tagList;
      if (this.type === "add") this.articleData.tag_id = tagList[0].tid;
    });
  },
  methods: {
    // 上传封面图
    uploadImg(e) {
      const loading = new c.Loading("正在上传，请稍后~");
      const file = e.target.files[0];

      const formdata = new FormData();
      formdata.append("image", file);

      uploadImg(formdata)
        .then(({ d: data }) => {
          this.articleData.cover = data.src;
        })
        .finally(() => {
          loading.close();
        });
    },
    // 关闭封面图
    closeUploadImg() {
      this.articleData.cover = "";
      // 清空input file的值
      this.fileVal = "";
    },
    // 文章内容保存
    articleSave(markdownText, markdownHtml) {
      this.articleData.markdownText = markdownText;
      this.articleData.markdownHtml = markdownHtml;
    },
    // markdown 上传图片
    imgAdd(pos, file) {
      const $mavon = this.$refs.md;
      const loading = new c.Loading("正在上传，请稍后~");
      // 创建表单
      const formdata = new FormData();
      formdata.append("image", file);
      uploadImg(formdata)
        .then(data => {
          $mavon.$img2Url(pos, data.src);
        })
        .finally(() => {
          loading.close();
        });
    },
    // 文章发布
    send(state) {
      // 发布loading图
      const loading = new c.Loading(`正在发布，请耐心等待！`);
      this.articleData.state = state;

      // 判断是编辑还是新增
      let reqFn = null;
      if (this.type === "add") reqFn = addArticle;
      if (this.type === "edit") reqFn = editArticle;
      reqFn(this.articleData)
        .then(data => {
          if (data.c === 0)
            this.$router.push({
              name: state
                ? "article/articleMainList"
                : "article/articleDraftList"
            });
        })
        .finally(() => {
          loading.close();
        });
    }
  }
};
</script>
<style lang="less">
.markdown-body img {
  width: 300px !important;
}
</style>