<template>
  <div class="show-form-list">
    <div class="list-label">{{fLabel}}：</div>
    <div class="list-value">{{fValue}}</div>
  </div>
</template>
<script>
  export default {
    name: 'showForm',
    props: ['fLabel', 'fValue']
  }
</script>
<style lang="scss">
  $labelWidth:120px;

  .show-form-list {
    overflow: hidden;
    margin-top: 20px;
    font-size: 14px;

    .list-label {
      float: left;
      padding: 0 20px;
      width: $labelWidth;
      font-weight: bold;
      color: #666;
    }

    .list-value {
      box-sizing: content-box;
      margin-left: $labelWidth;
      border-bottom: 1px solid #d7d7d7;
      padding-bottom: 15px;
      min-height: 20px;
      line-height: 20px;
      color: #333;

    }
  }
</style>