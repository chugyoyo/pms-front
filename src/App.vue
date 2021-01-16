<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
  .el-row {
    padding: 10px 0;
  }

  .select-pagination {
    text-align: center;
    font-size: 14px;
  }
  .select-pagination span{
    cursor: pointer;
  }
</style>
