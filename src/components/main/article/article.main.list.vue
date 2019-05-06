<template>
  <div>
    <articleList :state="1"></articleList>
  </div>
</template>

<script>
  import articleList from './article.base.list';
  export default {
    components: {
      articleList
    }
  }
</script>

<style lang="css">

</style>