<template>
  <nav id="nav-box">
    <ul class="nav-list">
      <li class="nav-item nav-main-item">
        <a
          href="javascript:;"
          class="nav-inner nav-main-inner"
          :class="{'act': index === 0}"
          @click="navSlide"
        >
          <i class="nav-icon fa fa-book"></i>
          <span class="nav-text">文章管理</span>
          <i class="nav-dir-icon fa fa-angle-up"></i>
        </a>
        <ul class="sub-nav">
          <router-link
            class="nav-item nav-sub-item"
            to="/admin/articleAdd"
            tag="li"
            @click.native="navClick($event, 1)"
            active-class="act"
          >
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
            active-class="act"
          >
            <a href="javascript:;" class="nav-inner nav-sub-inner">
              <i class="fa fa-angle-double-right"></i>
              <span class="nav-text">文章列表</span>
            </a>
          </router-link>
        </ul>
      </li>
      <li class="nav-item nav-main-item">
        <a
          href="javascript:;"
          class="nav-inner nav-main-inner"
          :class="{'act': index === 2}"
          @click="navSlide"
        >
          <i class="nav-icon fa fa-tags"></i>
          <span class="nav-text">标签管理</span>
          <i class="nav-dir-icon fa fa-angle-up"></i>
        </a>
        <ul class="sub-nav">
          <router-link
            class="nav-item nav-sub-item"
            to="/admin/classificationAdd"
            tag="li"
            @click.native="navClick($event, 2)"
            active-class="act"
          >
            <a href="javascript:;" class="nav-inner nav-sub-inner">
              <i class="fa fa-angle-double-right"></i>
              <span class="nav-text">标签添加</span>
            </a>
          </router-link>
          <router-link
            class="nav-item nav-sub-item"
            to="/admin/classificationList"
            tag="li"
            @click.native="navClick($event, 2)"
            active-class="act"
          >
            <a href="javascript:;" class="nav-inner nav-sub-inner">
              <i class="fa fa-angle-double-right"></i>
              <span class="nav-text">标签列表</span>
            </a>
          </router-link>
        </ul>
      </li>
      <router-link
        class="nav-item nav-main-item"
        to="/admin/userList"
        tag="li"
        @click.native="navClick($event, 3)"
        active-class="act"
        :class="{'act': index === 3}"
      >
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
        active-class="act"
        :class="{'act': index === 4}"
      >
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
      index: 0
    };
  },
  methods: {
    navSlide(e) {
      const target = c.parent(e.target, "nav-main-item");
      const subNav = target.getElementsByClassName("sub-nav")[0];
      if (subNav) {
        c.slideToggle(subNav, 100);
        c.toggleClass(target, "nav-rotate");
      }
    },
    navClick(e, index) {
      e.stopPropagation();
      this.index = index;
    }
  },
  mounted() {
    const mainNav = document.getElementsByClassName("nav-main-item");
    const subNav = document.getElementsByClassName("sub-nav");
    c.toggleClass(mainNav[this.index], "nav-rotate");
    c.slideToggle(subNav[this.index], 100);
  }
};
</script>

<style lang="less">
#nav-box {
  padding-top: 20px;
}
.nav-item {
  box-sizing: border-box;
  color: @color;
  font-size: 14px;
  transition: background-color 0.2s;
}
.nav-inner {
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 15px;
  color: @color;
}
.nav-main-inner:hover,
.nav-main-inner.act {
  background-color: @blue;
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
  transition: 0.15s;
}
.nav-main-item.nav-rotate .nav-dir-icon {
  transform: rotate(180deg);
}
.nav-text {
  padding-left: 10px;
}
.sub-nav {
  background-color: lighten(@bg, 2%);
}
.nav-sub-item {
  transition: 0.15s;
  padding-left: 10px;
}
.nav-sub-item:hover {
  color: @blue;
  transform: translateX(5px);
}
.nav-sub-item:hover,
.nav-sub-item.act {
  .nav-inner {
    color: @blue;
  }
}
</style>





