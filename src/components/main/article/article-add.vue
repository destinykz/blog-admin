<template>
    <div id="article-add">
        <div class="cdl-form-item">
            <div class="cdl-form-wrap">
                <span class="cdl-form-title">文章标题</span>
                <div class="cdl-form-cnt">
                    <input type="text" class="cdl-text" autofocus maxlength="50" placeholder="请输入文章标题" v-model="articleData.title">
                </div>
            </div>
        </div>
        <div class="cdl-form-item">
            <div class="cdl-form-wrap">
                <span class="cdl-form-title">文章前言</span>
                <div class="cdl-form-cnt">
                    <textarea class="cdl-area" placeholder="请输入文章前言"  maxlength="500" v-model="articleData.preface"></textarea>
                </div>
            </div>
        </div>
        <div class="cdl-form-item">
            <div class="cdl-form-wrap">
                <span class="cdl-form-title">文章图片</span>
                <div class="cdl-form-cnt">
                    <label for="uploadImg" class="cdl-button blue"><i class="fa fa-upload"></i>&nbsp;&nbsp;上传文章封面</label>
                    <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" multiple="multiple" id="uploadImg" @change="uploadImg" :value="fileVal" />
                </div>
                <div id="imgview" v-show="articleData.cover">
                    <i class="uploadImgClose cdl-close fa fa-close" title="移除这张图片" @click="closeUploadImg"></i>
                    <img :src="articleData.cover" alt="主图">
                </div>
            </div>
        </div>
        <div class="cdl-form-item">
            <div class="cdl-form-wrap">
                <span class="cdl-form-title">文章标签</span>
                <div class="cdl-form-cnt">
                    <select class="cdl-text" v-model="articleData.tag_id">
                        <option v-for="tag in tagList" :key="tag.tid" :value="tag.tid">{{tag.tag_val}}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="cdl-form-item">
            <div class="cdl-form-wrap">
                <mavon-editor ref="md" @imgAdd="imgAdd" :ishljs="true" @change="articleSave" @navigationToggle="navigationToggle"></mavon-editor>
            </div>
        </div>
        <div class="cdl-form-item">
            <div class="cdl-form-wrap">
                <button type="button" class="cdl-button blue" @click="send">发布</button>
            </div>
        </div>
    </div>
</template>
<script>
    import {addArticle, tagList, uploadImg} from '@/server/server'
    export default {
        data() {
            return {
                fileVal: '', // input[type="file"] 的值
                tagList: [], // 文章标签值
                articleData: {
                    title: '', // 标题
                    preface: '', // 前言
                    cover: '', // 图片
                    tag_id: 0, // 标签
                    content: '' // 内容
                }
            }
        },
        beforeCreate() {
            tagList().then((data) => {
                if(data && data.data.tagList) this.tagList = data.data.tagList;
            })
        },
        methods: {
            // 上传封面图
            uploadImg(e) {
                const loading = new c.Loading('正在上传...');
                const file = e.target.files[0];

                const formdata = new FormData();
                formdata.append('image', file);

                uploadImg(formdata).then(({data}) => {  
                    // 保存图片地址
                    this.articleData.cover = data.url;
                })
                .finally(() => {
                    loading.close();
                })

            },
            // 关闭封面图
            closeUploadImg() {
                this.articleData.cover = '';
                // 清空input file的值
                this.fileVal = '';
            },
            // 文章内容保存
            articleSave(markdownText, markdownHtml) {
                this.articleData.content = markdownHtml;
            },
            // markdown 上传图片
            imgAdd(pos, file) {
                const $mavon = this.$refs.md;
                const loading = new c.Loading('正在上传，请稍后~');
                // 创建表单
                const formdata = new FormData();
                formdata.append('image', file);
                uploadImg(formdata).then(({data}) => {
                    $mavon.$img2Url(pos, data.url);
                })
                .finally(() => {
                    loading.close();
                });
            },
            // 文章发布
            send() {
                if( this.articleData.title.trim() === '' ) {
                    c.msg({
                        type: 'error',
                        content: '请填写文章标题！'
                    });
                    return;
                }
                if( this.articleData.preface.trim() === '' ) {
                    c.msg({
                        type: 'error',
                        content: '请填写文章前言！'
                    });
                    return;
                }
                if( !this.articleData.tag_id ) {
                    c.msg({
                        type: 'error',
                        content: '请选择文章标签！'
                    });
                    return;
                }
                if( this.articleData.content.trim() === '' ) {
                    c.msg({
                        type: 'error',
                        content: '请填写文章内容！'
                    });
                    return;
                }
                // 发布loading图
                const loading = new c.Loading('正在添加，请耐心等待！')
                addArticle(this.articleData)
                .then(({data}) => {
                    c.msg({
                        content: data.msg
                    });
                    this.$router.push({ name: 'articleList' });
                })
                .finally(() => {
                    loading.close();
                });
            },
            navigationToggle(a, b) {
                console.log(b);
            }
        }
    }
</script>
<style lang="less">
    #article-add {
        padding-left: 30px;
        padding-right: 30px;
    }
    .cdl-form-item {
        position: relative;
        margin-top: 40px;
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
        font-size: 20px;
        right: -18px;
        top: -18px;
        color: @color;
    }
    .markdown-body img {
        width: 300px !important;
    }
</style>