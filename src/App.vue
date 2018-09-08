<template>
    <div id="app">
        <Header></Header>
        <section id="content" class="clear">
            <Aside></Aside>
            <main id="main">
                <transition name="slide">
                    <router-view></router-view>
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
    #app {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    #header {
        height: 50px;
    }
    #content {
        height: calc(100% - 50px);
    }
    #aside {
        float: left;
        width: @asideW;
        height: 100%;
    }
    #main {
        float: right;
        width: calc(100% - @asideW);
        height: 100%;
        background-color: @bg;
        box-sizing: border-box;
        padding: 30px;
        overflow: auto;
    }
    #logo {
        float: left;
        width: @asideW;
        height: 100%;
        background-color: @bg;
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
    .slide-enter-active, .slide-leave-active {
        transition: .3s;
    }
    .slide-enter, .slide-leave-to /* .slide-leave-active below version 2.1.8 */ {
        transform: translateX(100px);
        opacity: 0;
    }
</style>