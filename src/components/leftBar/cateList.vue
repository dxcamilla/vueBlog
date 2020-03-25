<template>
  <div class="side-list" v-if="item.children && item.children.length">
    <i v-if="item.iconClass" :class="item.iconClass"></i>{{item.name}}
    <div class="sub-menu-ul">
      <cateList v-for="(subItem,index) of item.children" :item="subItem" :key="index" />
    </div>
  </div>
  <router-link v-else :to="item.link">
    <div class="side-list">
      <div class="list-inner">
        <i v-if="item.iconClass" :class="item.iconClass"></i>
        {{item.name}}
      </div>
    </div>
  </router-link>
</template>
<script lang="javascript">
  export default {
    name: 'cateList',
    props: {
      item: Object
    }
  }
</script>
<style lang="scss">
  .side-list {
    cursor: pointer;
    line-height: 48px;
    margin-left: 60px;
    height: 60px;

  }

  .list-inner {
    display: inline-block;
  }

  .side-list,
  .list-inner {
    color: #666;
    font-size: 16px;
    /* font-weight: bold; */
  }

  .router-link-exact-active .list-inner {
    color: #fd4733;
    border-bottom: 2px solid #fd4733
  }

  .sub-menu-ul {
    overflow: auto;

    .side-list {
      margin-left: 15px;
    }

    .list-inner {
      font-size: 12px;
      font-weight: bold;
    }
  }

  @media screen and (max-height: 599px) and (min-height: 500px) {
    .sub-menu-ul {
      max-height: 110px;
    }
  }

  @media screen and (max-width:760px) {

    .side-list,
    .list-inner {
      margin: 0;
      text-align: center
    }
  }
</style>