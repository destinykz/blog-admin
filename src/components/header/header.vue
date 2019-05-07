<template>
  <header id="header" class="clear">
    <h1 id="logo">
      <a title="logo" href="#">
        <span id="logo-text">chandler</span>
      </a>
    </h1>
    <section id="header-cnt">
      <a href="javascript:;" id="login-out" title="注销" @click="loginOut">注 销</a>
      <a id="github-address" href="https://github.com/chandlerCao/blog-admin" target="_blank">
        <Icon type="logo-github" :size="25"/>
      </a>
      <span id="say-hello">欢迎您，{{username}}</span>
    </section>
  </header>
</template>
<script>
export default {
  computed: {
    username() {
      return window.localStorage.getItem("username");
    }
  },
  methods: {
    loginOut() {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("username");
      this.$router.push({ name: "login" });
      c.$Message.success("注销成功！");
    }
  }
};
</script>
<style lang="less">
#logo {
  float: left;
  width: @asideW;
  height: 100%;
  background-color: @content;
  text-align: center;
}
#logo-text {
  color: #fff;
  font-size: 30px;
  vertical-align: middle;
  font-weight: bold;
}
#header-cnt {
  display: flex;
  justify-content: flex-end;
  float: left;
  position: relative;
  width: calc(100% - @asideW);
  height: 100%;
  font-size: 12px;
  box-sizing: border-box;
  padding-right: 10px;
}
#github-address {
  margin-right: 20px;
}
#say-hello {
  margin-right: 80px;
}
#login-out {
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding: 0 20px;
  margin-right: 10px;
  transition: 0.15s;
}
#login-out:hover {
  background-color: @blue;
  color: #fff;
}
</style>