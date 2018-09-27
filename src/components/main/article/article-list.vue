<template>
    <div id="article-list">
        <div class="cdl-form-search">
            <div class="cdl-form-wrap">
                <span class="cdl-form-title">文章搜索</span>
                <div class="cdl-form-cnt">
                    <input type="text" placeholder="请输入文章相关内容" autofocus="autofocus" class="cdl-text">
                </div>
            </div>
            <button class="cdl-button blue" id="article-search-btn"><i class="fa fa-search"></i> 搜索</button>
        </div>
        <Table></Table>
    </div>
</template>

<script>
    import Table from '../../table/table';
    export default {
        components: {
            Table
        }
    }
</script>

<style lang="css">
    .cdl-form-search {
        position: relative;
        box-sizing: border-box;
        padding-right: 90px;
        margin: 30px;
    }
    #article-search-btn {
        position: absolute;
        right: 0;
        top: 0;
    }
</style>