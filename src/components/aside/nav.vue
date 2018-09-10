<template>
    <nav id="nav-box">
        <ul class="nav-list">
            <li class="nav-item nav-main-item" :class="{'act': index === 1}">
                <a href="javascript:;" class="nav-inner nav-main-inner" @click="navSlide">
                    <i class="nav-icon fa fa-book"></i>
                    <span class="nav-text">文章管理</span>
                    <i class="nav-dir-icon fa fa-angle-down"></i>
                </a>
                <ul class="sub-nav">
                    <router-link
                        class="nav-item nav-sub-item"
                        to="/admin/articleAdd"
                        tag="li"
                        @click.native="navClick($event, 1)"
                        active-class="act">
                        <a href="javascript:;" class="nav-inner nav-sub-inner">
                            <i class="fa fa-angle-double-right"></i>
                            <span class="nav-text">文章添加</span>
                        </a>
                    </router-link>
                    <router-link
                        class="nav-item nav-sub-item"
                        to="/admin/articleList"
                        tag="li"
                        @click.native="navClick($event, 1)"
                        active-class="act">
                        <a href="javascript:;" class="nav-inner nav-sub-inner">
                            <i class="fa fa-angle-double-right"></i>
                            <span class="nav-text">文章列表</span>
                        </a>
                    </router-link>
                </ul>
            </li>
            <li class="nav-item nav-main-item" :class="{'act': index === 2}">
                <a href="javascript:;" class="nav-inner nav-main-inner" @click="navSlide">
                    <i class="nav-icon fa fa-cubes"></i>
                    <span class="nav-text">分类管理</span>
                    <i class="nav-dir-icon fa fa-angle-down"></i>
                </a>
                <ul class="sub-nav">
                    <router-link
                        class="nav-item nav-sub-item"
                        to="/admin/classificationList"
                        tag="li"
                        @click.native="navClick($event, 2)"
                        active-class="act">
                        <a href="javascript:;" class="nav-inner nav-sub-inner">
                            <i class="fa fa-angle-double-right"></i>
                            <span class="nav-text">分类列表</span>
                        </a>
                    </router-link>
                    <router-link
                        class="nav-item nav-sub-item"
                        to="/admin/classificationAdd"
                        tag="li"
                        @click.native="navClick($event, 2)"
                        active-class="act">
                        <a href="javascript:;" class="nav-inner nav-sub-inner">
                            <i class="fa fa-angle-double-right"></i>
                            <span class="nav-text">分类添加</span>
                        </a>
                    </router-link>
                </ul>
            </li>
            <router-link
                class="nav-item nav-main-item"
                to="/admin/userList"
                tag="li"
                @click.native="navClick($event, 3)"
                :class="{'act': index === 3}">
                <a href="javascript:;" class="nav-inner nav-main-inner">
                    <i class="fa nav-icon fa-user-circle"></i>
                    <span class="nav-text">用户列表</span>
                </a>
            </router-link>
            <router-link
                class="nav-item nav-main-item"
                to="/admin/commentList"
                tag="li"
                @click.native="navClick($event, 4)"
                :class="{'act': index === 4}">
                <a href="javascript:;" class="nav-inner nav-main-inner">
                    <i class="nav-icon fa fa-comments"></i>
                    <span class="nav-text">评论列表</span>
                </a>
            </router-link>
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
            navSlide(e) {
                const target = c.parent(e.target, 'nav-main-item');
                const subNav = target.getElementsByClassName('sub-nav')[0];
                const dirIcon = target.getElementsByClassName('nav-dir-icon')[0];
                if( subNav ) {
                    c.slideToggle(subNav, 100);
                    c.toggleClass(dirIcon, 'rotate');
                }
            },
            navClick(e, index) {
                e.stopPropagation();
                this.index = index;
            }
        },
        mounted() {
            const target = document.getElementsByClassName('nav-main-item')[this.index - 1];
            const subNav = target.getElementsByClassName('sub-nav')[0];
            const dirIcon = target.getElementsByClassName('nav-dir-icon')[0];
            if( subNav ) {
                c.slideToggle(subNav, 100);
                c.toggleClass(dirIcon, 'rotate');
            }
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
        transition: background-color .2s;
    }
    .nav-inner {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 15px;
    }
    .nav-main-item:hover, .nav-main-item.act {
        background-color: @blue;
        color: @white;
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
        transition: .15s;
    }
    .nav-dir-icon.rotate {
        transform: rotate(180deg);
    }
    .nav-text {
        padding-left: 10px;
    }
    .sub-nav {
        display: none;
        background-color: @bg;
    }
    .nav-sub-item {
        transition: padding .4s;
        padding-left: 10px;
    }
    .nav-sub-item:hover, .nav-sub-item.act {
        color: @blue;
        background-color: @white;
        padding-left: 15px;
    }
</style>