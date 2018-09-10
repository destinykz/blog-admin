<template>
    <header id="header" class="clear">
        <h1 id="logo">
            <a title="logo" href="#">
                <img src="@/assets/img/logo.png" alt="logo">
            </a>
        </h1>
        <section id="header-cnt"></section>
        <a id="username" href="javascript:;" @click="loginOut">Login Out</a>
    </header>
</template>

<script>
    export default {
        methods: {
            loginOut() {
                window.localStorage.removeItem('token');
                this.$router.push({ name: 'login'});
                c.msg({
                    content: '注销成功！'
                })
            }
        }
    }
</script>

<style lang="less">
</style>