<template>
    <nav id="nav-box">
        <ul class="nav-list">
            <li class="nav-item nav-main-item">
                <a href="javascript:;" class="nav-inner nav-main-inner" @click="navClick($event, 1)" :class="{'act': index === 1}">
                    <i class="nav-icon fa fa-book"></i>
                    <span class="nav-text">文章管理</span>
                    <i class="nav-dir-icon fa fa-angle-down"></i>
                </a>
                <ul class="sub-nav">
                    <li class="nav-item nav-sub-item">
                        <a href="javascript:;" class="nav-inner nav-sub-inner">
                            <i class="fa fa-angle-double-right"></i>
                            <span class="nav-text">文章列表</span>
                        </a>
                    </li>
                    <li class="nav-item nav-sub-item">
                        <a href="javascript:;" class="nav-inner nav-sub-inner">
                            <i class="fa fa-angle-double-right"></i>
                            <span class="nav-text">文章添加</span>
                        </a>
                    </li>
                </ul>
            </li>
            <li class="nav-item nav-main-item">
                <a href="javascript:;" class="nav-inner nav-main-inner" @click="navClick($event, 2)" :class="{'act': index === 2}">
                    <i class="nav-icon fa fa-cubes"></i>
                    <span class="nav-text">分类管理</span>
                    <i class="nav-dir-icon fa fa-angle-down"></i>
                </a>
                <ul class="sub-nav">
                    <li class="nav-item nav-sub-item">
                        <a href="javascript:;" class="nav-inner nav-sub-inner">
                            <i class="fa fa-angle-double-right"></i>
                            <span class="nav-text">分类列表</span>
                        </a>
                    </li>
                    <li class="nav-item nav-sub-item">
                        <a href="javascript:;" class="nav-inner nav-sub-inner">
                            <i class="fa fa-angle-double-right"></i>
                            <span class="nav-text">分类添加</span>
                        </a>
                    </li>
                </ul>
            </li>
            <li class="nav-item nav-main-item">
                <a href="javascript:;" class="nav-inner nav-main-inner" @click="navClick($event, 3)" :class="{'act': index === 3}">
                    <i class="fa nav-icon fa-user-circle"></i>
                    <span class="nav-text">用户管理</span>
                </a>
            </li>
            <li class="nav-item nav-main-item">
                <a href="javascript:;" class="nav-inner nav-main-inner" @click="navClick($event, 4)" :class="{'act': index === 4}">
                    <i class="nav-icon fa fa-comments"></i>
                    <span class="nav-text">评论列表</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        data() {
            return {
                index: 1
            }
        },
        methods: {
            navClick(e, index) {
                const target = cdj.parent(e.target, 'nav-main-item');
                const subNav = target.getElementsByClassName('sub-nav')[0];
                if( this.index === index ) this.index = -1;
                else this.index = index;
                if( subNav ) cdj.slideToggle(subNav, 100);
            }
        },
        mounted() {
            const subNav = document.getElementsByClassName('nav-main-item')[this.index - 1].getElementsByClassName('sub-nav')[0];
            cdj.slideDown(subNav, 100);
        }
    }
</script>

<style lang="less">
    #nav-box {
        padding-top: 20px;
    }
    .nav-item {
        box-sizing: border-box;
        color: @color;
        font-size: 13px;
    }
    .nav-inner {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 15px;
        border-left: 0 solid @lineColor;
        transition: .2s;
    }
    .nav-main-inner:hover, .nav-main-inner.act {
        background-color: @primary;
        color: #fff;
    }
    .nav-main-inner span {
        font-weight: normal;
    }
    .nav-icon {
        display: inline-block;
        width: 16px;
        text-align: center;
    }
    .nav-dir-icon {
        position: absolute;
        right: 16px;
        top: 18px;
    }
    .nav-text {
        padding-left: 10px;
    }
    .sub-nav {
        display: none;
        background-color: @bg;
        padding-left: 8px;
    }
    .nav-sub-item {
        transition: transform .4s;
    }
    .nav-sub-item:hover {
        color: @primary;
        transform: translateX(5px);
    }
</style>