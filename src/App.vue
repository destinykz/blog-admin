<template>
    <div id="app">
        <Header></Header>
        <section id="content" class="clear">
            <Aside></Aside>
            <main id="main"></main>
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
    #logo {
        float: left;
        width: @asideW;
        height: 100%;
        background-color: @bg;
        color: @primary;
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
</style>