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
                    <input type="file" id="uploadImg" @change="uploadImg" :value="uploadImgVal">
                </div>
                <div id="imgview" v-show="base64">
                    <i class="uploadImgClose cdl-close fa fa-close" @click="closeUploadImg"></i>
                    <img :src="base64" alt="预览图片">
                </div>
            </div>
            <div class="cdl-form-item">
                <span class="cdl-form-title">文章标签</span>
                <div class="cdl-form-cnt">
                    <select class="cdl-text" v-model="articleData.tag_id">
                        <option v-for="tag in tagList" :key="tag.tid" :value="tag.tid">{{tag.tag_val}}</option>
                    </select>
                </div>
            </div>
            <div class="cdl-form-item">
                <MarkDown @on-save="saveMarkDown" :autoSave="false"></MarkDown>
            </div>
            <div class="cdl-form-item">
                <button type="button" class="cdl-button blue" @click="send">发布</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <!-- <button type="button" class="cdl-button yellow" @click="save">保存至草稿</button> -->
            </div>
        </form>
    </div>
</template>

<script>
    import MarkDown from 'vue-meditor'
    import {addArticle, tagList} from '@/server/server'
    export default {
        components: {
            MarkDown
        },
        data() {
            return {
                uploadImgVal: '', // input[type="file"] 的值
                tagList: [], // 文章标签值
                base64: '', // 图片base64
                articleData: {
                    title: '', // 标题
                    preface: '', // 前言
                    base64: this.base64, // 图片
                    tag_id: 0, // 标签
                    content: '' // 内容
                }
            }
        },
        mounted() {
            tagList()
            .then(data => {
                this.tagList = data.data.tagList;
            })
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
                        _this.base64 = base64;
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
                        type: 'error',
                        content: '仅支持图片格式！'
                    })
                }
            },
            // 关闭图片
            closeUploadImg() {
                this.uploadImgVal = '';
                this.base64 = '';
            },
            // 保存markdown内容
            saveMarkDown(mdCnt) {
                this.articleData.content = mdCnt.htmlValue;
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
                // 文章发布
                this.articleData.base64 = this.base64.replace(/data:image\/png\;base64\,/, '');
                // 发布loading图
                const loading = new c.Loading('正在添加，请耐心等待！')
                addArticle(this.articleData)
                .then(({data}) => {
                    let type = 'success';
                    if( data.code === 1 ) type = 'error';
                    c.msg({
                        type,
                        content: data.msg
                    })
                })
                .catch(err => {
                    c.msg({
                        type: 'error',
                        content: '服务器发生异常！'
                    })
                }).
                finally(() => {
                    // 关闭loading
                    loading.close();
                })
            },
            // 文章保存
            save() {
            }
        }
    }
</script>

<style lang="less">
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
        font-size: 16px;
        right: -16px;
        top: -16px;
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
    .markdown .markdown-content .markdown-preview {
        background-color: @bg !important;
    }
</style>