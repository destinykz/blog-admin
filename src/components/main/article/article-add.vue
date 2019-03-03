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
            <i class="fa fa-upload"></i>&nbsp;&nbsp;上传文章封面
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
            <Option v-for="item in tagList" :value="item.tid" :key="item.tid">{{ item.tag_val }}</Option>
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
        <button type="button" class="cdl-button blue" @click="send">{{send_btn_text}}</button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  addArticle,
  tagList as tagListReq,
  uploadImg,
  articleContentByAid
} from "@/server/server";
export default {
  data() {
    return {
      fileVal: "", // input[type="file"] 的值
      tagList: [], // 文章标签值
      articleData: {
        aid: "",
        title: "", // 标题
        preface: "", // 前言
        cover: "", // 文件路径
        tag_id: "Canberra", // 标签
        markdownText: "", // 编辑内容
        markdownHtml: "" // 显示内容
      },
      send_btn_text: "发布"
    };
  },
  beforeCreate() {
    // 获取文章所有标签
    tagListReq().then(tagList => {
      this.tagList = tagList;
    });
  },
  created() {
    // 如果为更改状态，获取aid
    const aid = this.$route.params.aid;
    this.articleData.aid = aid;
    if (aid) {
      this.send_btn_text = "修改";
      // 通过aid请求文章内容
      articleContentByAid(aid).then(data => {
        const articleData = this.articleData;
        for (const key in articleData) {
          articleData[key] = data[key];
        }
      });
    }
  },
  watch: {
    $route(to, from) {
      for (const key in this.articleData) {
        this.articleData[key] = "";
      }
      if (to.name === "articleAdd") this.send_btn_text = "添加";
    }
  },
  methods: {
    // 上传封面图
    uploadImg(e) {
      const loading = new c.Loading("正在上传，请稍后~");
      const file = e.target.files[0];

      const formdata = new FormData();
      formdata.append("image", file);

      uploadImg(formdata)
        .then(data => {
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
    send() {
      // 发布loading图
      const loading = new c.Loading(`正在${this.send_btn_text}，请耐心等待！`);
      addArticle(this.articleData)
        .then(data => {
          console.log(data);
          this.$router.push({ name: "articleList" });
        })
        .finally(() => {
          loading.close();
        });
    }
  }
};
</script>
<style lang="less">
.cdl-form-item {
  position: relative;
  &:not(:first-child) {
    padding-top: 40px;
  }
}
#cover {
  display: inline-block;
  position: relative;
  margin-top: 30px;
}
#cover img {
  display: block;
  width: 200px;
}
#cover .uploadImgClose {
  position: absolute;
  font-size: 20px;
  right: -18px;
  top: -18px;
  color: @color;
}
.markdown-body img {
  width: 300px !important;
}
</style>