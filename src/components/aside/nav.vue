<template>
  <Menu
    style="width: 100%; height: 100%;"
    :active-name="activeName"
    :open-names="openNames"
    :theme="'dark'"
  >
    <Submenu name="article">
      <template slot="title">
        <Icon type="ios-book"/>文章管理
      </template>
      <MenuItem name="articleAdd" to="/admin/articleAdd">
        <Icon type="ios-arrow-forward"/>新增文章
      </MenuItem>
      <MenuItem name="articleMainList" to="/admin/articleMainList">
        <Icon type="ios-arrow-forward"/>文章列表
      </MenuItem>
      <MenuItem name="articleDraftList" to="/admin/articleDraftList">
        <Icon type="ios-arrow-forward"/>草稿箱
      </MenuItem>
      <MenuItem name="articleDustbinList" to="/admin/articleDustbinList">
        <Icon type="ios-arrow-forward"/>垃圾箱
      </MenuItem>
    </Submenu>
    <Submenu name="tag">
      <template slot="title">
        <Icon type="ios-pricetag"/>标签管理
      </template>
      <MenuItem name="tagAdd" to="/admin/tagAdd">
        <Icon type="ios-arrow-forward"/>新增标签
      </MenuItem>
      <MenuItem name="tagList" to="/admin/tagList">
        <Icon type="ios-arrow-forward"/>标签列表
      </MenuItem>
    </Submenu>
    <MenuItem name="commentList" to="/admin/commentList">
      <Icon type="ios-list-box" />评论列表
    </MenuItem>
    <MenuItem name="messageList" to="/admin/messageList">
      <Icon type="md-list-box" />留言列表
    </MenuItem>
  </Menu>
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
    this.changeNavActive(this.$route.name);
  },
  watch: {
    $route(route) {
      this.changeNavActive(route.name);
    }
  },
  methods: {
    changeNavActive(routeName) {
      const componentsNameArr = routeName.split("/");
      this.openNames.push(componentsNameArr[0]);
      this.activeName = componentsNameArr[1];
    }
  }
};
</script>




