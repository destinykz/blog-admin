<template>
    <header id="header" class="clear">
        <h1 id="logo">
            <a title="logo" href="#">
                <img src="@/assets/img/logo.png" alt="logo">
            </a>
        </h1>
        <section id="header-cnt">
            <a id="login-out" href="javascript:;" @click="loginOut"><i class="login-out-icon fa fa-mail-reply-all"></i>注 销</a>
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
    #say-hello {
        float: right;
        padding-top: 14px;
        padding-bottom: 14px;
        margin-right: 150px;
    }
    #login-out {
        position: absolute;
        height: 100%;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding: 12px 20px;
        color: @white;
        font-size: 18px;
        transition: .15s;
    }
    .login-out-icon {
        padding-right: 8px;
        font-size: 14px;
    }
    #login-out:hover {
        background-color: @bg;
        color: @color;
    }
</style>