<template>
  <div id="main-inner">
    <Header></Header>
    <section id="all" class="clear">
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
import Header from "@/components/header/header.vue";
import Aside from "@/components/aside/aside.vue";
export default {
  components: {
    Header,
    Aside
  }
};
</script>

<style lang="less">
#main-inner {
  width: 100%;
  height: 100%;
}
#header {
  height: @headerH;
  line-height: @headerH;
  background-color: @bg;
  color: @color;
}
#all {
  position: absolute;
  left: 0;
  top: @headerH;
  right: 0;
  bottom: 0;
}
#aside {
  display: inline-block;
  width: @asideW;
  height: 100%;
  background-color: @bg;
}
#main {
  position: absolute;
  left: @asideW;
  top: 0;
  right: 10px;
  bottom: 0;
  box-sizing: border-box;
  border: 1px solid darken(@bg, 10%);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: #fff;
  overflow: hidden;
  overflow-y: auto;
  padding: 30px;
}
.slide-enter-active,
.slide-leave-active {
  transition: 0.3s;
}
.slide-enter,
.slide-leave-to {
  position: absolute;
  transform: translateX(100px);
  opacity: 0;
}
</style>