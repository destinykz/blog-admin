<template>
    <div id="main-inner">
        <Header></Header>
        <section id="content" class="clear">
            <Aside></Aside>
            <main id="main">
                <transition name="slide">
                    <router-view>
                    </router-view>
                </transition>
            </main>
        </section>
    </div>
</template>

<script>
    import Header from '@/components/header/header.vue'
    import Aside from '@/components/aside/aside.vue'
    export default {
        components: {
            Header,
            Aside
        }
    }
</script>

<style lang="less">
    @asideW: 210px;
    #main-inner {
        width: 100%;
        height: 100%;
    }
    #header {
        position: relative;
        height: 50px;
        background-color: @bg;
    }
    #content {
        height: calc(100% - 50px);
    }
    #aside {
        float: left;
        position: relative;
        width: @asideW;
        height: 100%;
        background-color: @bg;
    }
    #aside:after {
        content: '';
        position: absolute;
        width: 1px;
        height: 100%;
        right: 0;
        top: 0;
        background-color: darken(@bg, 2%);;
        z-index: 50;
    }
    #main {
        position: relative;
        float: right;
        width: calc(100% - @asideW);
        height: 100%;
        background-color: @white;
        box-sizing: border-box;
        padding: 30px;
        overflow-x: hidden;
        overflow-y: auto;
    }
    #username {
        position: absolute;
        height: 100%;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding: 14px 20px;
        color: @color;
        font-size: 18px;
        transition: .15s;
    }
    #username:hover {
        background-color: @bg;
    }
    #logo {
        float: left;
        width: @asideW;
        height: 100%;
        background-color: @white;
        color: @blue;
        text-align: center;
    }
    #logo a {
        display: block;
        height: 100%;
    }
    #logo img {
        width: 130px;
        margin-top: 6%;
    }
    #header-cnt {
        float: left;
        position: relative;
        width: calc(100% - @asideW);
        height: 100%;
    }
    #header-cnt:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        left: 0;
        bottom: 0;
        background-color: darken(@bg, 2%);
    }
    .slide-enter-active, .slide-leave-active {
        transition: .3s;
    }
    .slide-enter, .slide-leave-to /* .slide-leave-active below version 2.1.8 */ {
        position: absolute;
        transform: translateX(100px);
        opacity: 0;
    }
</style>