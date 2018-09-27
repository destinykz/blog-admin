<template>
    <header id="header" class="clear">
        <h1 id="logo">
            <a title="logo" href="#">
                <img src="@/assets/img/logo.png" alt="logo">
                <span id="logo-text">chandler</span>
            </a>
        </h1>
        <section id="header-cnt">
            <a href="javascript:;" id="login-out" title="注销" @click="loginOut">注 销</a>
            <span id="say-hello">欢迎您，{{username}}</span>
        </section>
    </header>
</template>

<script>
    export default {
        computed: {
            username() {
                return window.localStorage.getItem('username');
            }
        },
        methods: {
            loginOut() {
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('uid');
                window.localStorage.removeItem('username');
                this.$router.push({ name: 'login'});
                c.msg({
                    content: '注销成功！'
                })
            }
        }
    }
</script>

<style lang="less">
    #logo {
        float: left;
        width: @asideW;
        height: 100%;
        text-align: center;
    }
    #logo img {
        width: 40px;
        vertical-align: middle;
    }
    #logo-text {
        color: @color;
        font-size: 28px;
        vertical-align: middle;
        font-weight: bold;
    }
    #header-cnt {
        float: left;
        position: relative;
        width: calc(100% - @asideW);
        height: 100%;
        font-size: 12px;
        box-sizing: border-box;
        padding-right: 10px;
    }
    #say-hello {
        float: right;
        margin-right: 70px;
    }
    #login-out {
        position: absolute;
        height: 100%;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding: 0 20px;
        transition: .15s;
    }
    #login-out:hover {
        background-color: @blue;
        color: #fff;
    }
</style>