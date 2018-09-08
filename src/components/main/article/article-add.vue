<template>
    <div id="article-add">
        <form action="">
            <div class="cdl-form-item">
                <span class="cdl-form-title">文章标题</span>
                <div class="cdl-form-cnt">
                    <input type="text" class="cdl-text" placeholder="请输入文章标题" autofocus="true" v-model="articleData.title">
                </div>
            </div>
            <div class="cdl-form-item">
                <span class="cdl-form-title">文章前言</span>
                <div class="cdl-form-cnt">
                    <textarea class="cdl-area" placeholder="请输入文章前言" v-model="articleData.preface"></textarea>
                </div>
            </div>
            <div class="cdl-form-item">
                <span class="cdl-form-title">文章图片</span>
                <div class="cdl-form-cnt">
                    <label for="uploadImg" class="cdl-button blue"><i class="fa fa-upload"></i>&nbsp;&nbsp;上传主图</label>
                    <input type="file" id="uploadImg" @change="uploadImg" :value="src" >
                </div>
                <div id="imgview" v-if="uploadImgShow">
                    <i class="uploadImgClose cdl-close fa fa-close" @click="closeUploadImg"></i>
                    <img :src="articleData.base64" alt="预览图片">
                </div>
            </div>
            <div class="cdl-form-item">
                <span class="cdl-form-title">文章标签</span>
                <div class="cdl-form-cnt">
                    <select class="cdl-text" v-model="articleData.tag">
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="Vue">Vue</option>
                        <option value="Webpack">Webpack</option>
                    </select>
                </div>
            </div>
            <div class="cdl-form-item">
                <MarkDown @on-save="saveMarkDown" :autoSave="false"></MarkDown>
            </div>
            <div class="cdl-form-item">
                <button type="button" class="cdl-button blue" @click="send">发布</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="button" class="cdl-button yellow" @click="save">保存至草稿</button>
            </div>
        </form>
    </div>
</template>

<script>
    import MarkDown from 'vue-meditor'
    import request from '../../../../../request'
    export default {
        components: {
            MarkDown
        },
        data() {
            return {
                uploadImgShow: false,
                src: '',
                articleData: {
                    title: '', // 标题
                    preface: '', // 前言
                    base64: '', // 图片
                    tag: '', // 标签
                    content: '' // 内容
                }
            }
        },
        methods: {
            // 上传图片
            uploadImg(e) {
                const _this = this;
                const file = e.target.files[0];
                // 如果是图片
                if( file.type.match(/image\/(png|jpg|gif|jpeg)$/) ) {
                    c.compress(file, 200)
                    .then(base64 => {
                        _this.uploadImgShow = true;
                        _this.articleData.base64 = base64;
                    })
                    .catch(() => {
                        c.msg({
                            type: 'error',
                            content: '您的浏览器版本不支持压缩，请更换为现代浏览器！'
                        })
                    })
                } else {
                    this.closeUploadImg();
                    c.msg({
                        type: 'danger',
                        content: '请上传图片！'
                    })
                }
            },
            // 关闭图片
            closeUploadImg() {
                this.src = '';
                this.articleData.base64 = '';
                this.uploadImgShow = false;
            },
            // 保存markdown内容
            saveMarkDown(mdCnt) {
                this.articleData.content = mdCnt.htmlValue;
            },
            // 文章发布
            send() {
                c.axios.post(`/blog${request.addArticle}`, this.articleData)
                .then(data => {
                    c.msg({
                        type: 'success',
                        content: data.data.msg
                    })
                })
            },
            // 文章保存
            save() {

            }
        }
    }
</script>

<style lang="less">
    @formTitleW: 70px;
    .cdl-form-item {
        position: relative;
        min-height: 40px;
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid @darkBg;
    }
    .cdl-form-title {
        position: absolute;
        height: 100%;
        line-height: 40px;
        left: 0;
        top: 0;
        width: @formTitleW;
        box-sizing: border-box;
        font-size: 14px;
        color: @color;
    }
    .cdl-form-cnt {
        padding-left: @formTitleW;
    }
    #imgview {
        display: inline-block;
        position: relative;
        margin-top: 20px;
    }
    #imgview img {
        display: block;
        width: 200px;
    }
    #imgview .uploadImgClose {
        position: absolute;
        font-size: 12px;
        right: -10px;
        top: -10px;
        color: @black;
    }
    .markdown {
        background: none !important;
    }
    .markdown .markdown-toolbars {
        height: 40px !important;
        box-shadow: none !important;
        border-bottom: none !important;
        color: @color !important;
    }
</style>