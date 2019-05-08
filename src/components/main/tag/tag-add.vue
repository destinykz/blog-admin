<template>
  <div id="article-add">
    <div class="cdl-form-item">
      <div class="cdl-form-wrap">
        <span class="cdl-form-title">标签名称</span>
        <div class="cdl-form-cnt">
          <Input v-model="tagName" placeholder="请输入标签名称"/>
        </div>
      </div>
    </div>
    <div class="cdl-form-item">
      <div class="cdl-form-wrap">
        <span class="cdl-form-title">标签图片</span>
        <div class="cdl-form-cnt">
          <label for="uploadImg" class="cdl-button blue">
            <Icon type="md-cloud-upload" :size="18"/>上传标签图片
          </label>
          <input
            type="file"
            accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
            id="uploadImg"
            @change="uploadImg"
            :value="tagImg"
          >
        </div>
      </div>
      <div id="cover" v-show="tagImgSrc">
        <i class="uploadImgClose cdl-close fa fa-close" title="移除这张图片" @click="closeUploadImg"></i>
        <img :src="tagImgSrc" alt="主图">
      </div>
    </div>
    <div class="cdl-form-item">
      <div class="cdl-form-wrap">
        <Button
          type="primary"
          :size="'large'"
          @click="send"
          :disabled="btnLoading"
          :loading="btnLoading"
        >创建</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { uploadTagImg, addTag, getTagByTid } from "@/server/server";
export default {
  data() {
    return {
      tagName: "",
      tagImg: "",
      tagImgSrc: "",
      btnLoading: false
    };
  },
  methods: {
    // 上传标签图
    uploadImg(e) {
      const loading = new c.Loading("正在上传，请稍后~");
      const file = e.target.files[0];

      const formdata = new FormData();
      formdata.append("image", file);

      uploadTagImg(formdata)
        .then(data => {
          this.tagImgSrc = data.d.src;
        })
        .finally(() => {
          loading.close();
        });
    },
    closeUploadImg() {
      this.tagImgSrc = "";
      // 清空input file的值
      this.tagImg = "";
    },
    // 创建标签
    send() {
      this.btnLoading = true;
      addTag({ tagName: this.tagName, tagImgSrc: this.tagImgSrc })
        .then(data => {
          if (data.c === 0) this.$router.push({ path: "tagList" });
        })
        .finally(() => {
          this.btnLoading = false;
        });
    }
  }
};
</script>
<style lang="less">
</style>