<template>
    <table class="cdl-table">
        <thead>
            <slot name="thead"></slot>
        </thead>
        <tbody>
            <tr v-for="article in data" :key="article.ID">
              <td v-for="(val, key) in article" :key="key">{{val}}</td>
              <td>
                <slot :row="article"></slot>
              </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  }
};
</script>

<style lang="less" scoped>
.cdl-table {
  width: 100%;
  text-align: center;
  color: @color;
}
.cdl-table tr {
  border-bottom: 1px solid #f2f6fd;
}
.cdl-table tr:hover {
  background-color: @bg;
}
.cdl-table th,
.cdl-table td {
  height: 44px;
  line-height: 44px;
}
.cdl-table th {
  font-size: 14px;
}
.cdl-table td {
  font-size: 12px;
}
</style>