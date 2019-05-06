<template>
  <nav id="nav-box">
    <!-- <ul class="nav-list">
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
            to="/admin/tagAdd"
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
            to="/admin/tagList"
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
    </ul>-->
    <Menu style="width: 100%;" :active-name="activeName" :open-names="openNames">
      <Submenu name="article">
        <template slot="title">
          <Icon type="ios-book"/>文章管理
        </template>
        <MenuItem name="articleAdd" to="/admin/articleAdd">新增文章</MenuItem>
        <MenuItem name="articleList" to="/admin/articleList">文章列表</MenuItem>
        <MenuItem name="articleDraft" to="/admin/articleDraft">草稿箱</MenuItem>
      </Submenu>
      <Submenu name="tag">
        <template slot="title">
          <Icon type="ios-pricetag"/>标签管理
        </template>
        <MenuItem name="tagAdd" to="/admin/tagAdd">新增标签</MenuItem>
        <MenuItem name="tagList" to="/admin/tagList">标签列表</MenuItem>
      </Submenu>
      <MenuItem name="commentList" to="/admin/commentList">
        <Icon type="ios-people"/>评论列表
      </MenuItem>
    </Menu>
  </nav>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      activeName: "",
      openNames: []
    };
  },
  created() {
    const componentsNameArr = this.$route.name.split("/");
    this.openNames.push(componentsNameArr[0]);
    this.activeName = componentsNameArr[1];
  }
};
</script>




