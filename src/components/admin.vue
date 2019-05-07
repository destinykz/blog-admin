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
  position: relative;
  z-index: 50;
  height: @headerH;
  line-height: @headerH;
  color: @color;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
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
}
#main {
  position: absolute;
  left: @asideW;
  top: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  background-color: #fff;
  overflow: hidden;
  overflow-y: auto;
  padding: 15px;
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