<template>
<div id="blog-login">
    <h1 id="blog-login-title">博客后台登录</h1>
    <div id="login-box">
        <div class="login-title">
            <span>Login</span>
        </div>
        <form action>
            <div class="cdl-form-login">
                <div class="cdl-form-wrap">
                    <span class="cdl-form-title">
              <i class="fa fa-user"></i> 用户名
            </span>
                    <div class="cdl-form-cnt">
                        <input
                type="text"
                class="cdl-text"
                placeholder="Username"
                autofocus="true"
                v-model="username"
                @keyup.13="login"
                maxlength="80"
              >
            </div>
                    </div>
                </div>
                <div class="cdl-form-login">
                    <div class="cdl-form-wrap">
                        <span class="cdl-form-title">
              <i class="fa fa-lock"></i> 密码
            </span>
                        <div class="cdl-form-cnt">
                            <input
                type="password"
                class="cdl-text"
                placeholder="Password"
                v-model="password"
                @keyup.13="login"
                maxlength="100"
              >
            </div>
                        </div>
                    </div>
                    <div class="cdl-form-login">
                        <div class="cdl-form-wrap">
                            <div class="cdl-form-title"></div>
                            <div class="cdl-form-cnt">
                                <button type="button" class="login-btn cdl-button blue" @click="login">登录</button>
                            </div>
                        </div>
                    </div>
        </form>
    </div>
</div>
</template>

<script>
import {
    login as loginReq
} from "@/server/server";
export default {
    data() {
        return {
            username: "",
            password: ""
        };
    },
    mounted() {
        const heart = new c.Heart(document.getElementById("blog-login"));
    },
    methods: {
        login() {
            let loading = null;
            let timer = setTimeout(() => {
                // loading
                loading = new c.Loading("正在登录，请耐心等待！");
            }, 100);
            // 调用登录方法
            loginReq(this.username, this.password)
                .then(data => {
                    if (data.c === 0) {
                        window.localStorage.setItem("username", data.d.username);
                        window.localStorage.setItem("token", data.d.token);
                        this.$router.push('admin/articleAdd');
                    }
                })
                .finally(() => {
                    clearTimeout(timer);
                    loading && loading.close();
                });
        }
    }
};
</script>

<style lang="less">
.cdl-form-login {
    margin-bottom: 30px;
}

#blog-login {
    width: 100%;
    height: 100%;
    background-color: @bg;
    color: @blue;
}

#blog-login-title {
    text-align: center;
    color: @color;
    font-size: 30px;
    padding-top: 7%;
}

#login-box {
    position: absolute;
    width: 400px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    background-size: cover;
    padding-bottom: 0;
    padding: 30px;
    padding-bottom: 0;
    border-radius: 4px;
    box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.1);
    z-index: 50;
}

.login-title {
    position: relative;
    text-align: center;
    margin-bottom: 15px;
    border-top: 1px solid @color;
    color: @color;
    font-size: 20px;
    background-color: #fff;
}

.login-title span {
    position: relative;
    padding: 20px;
    background-color: #fff;
    top: -11px;
}

.login-btn {
    width: 100%;
}
</style>
