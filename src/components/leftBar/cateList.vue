<template>
  <li class="side-list" v-if="item.children && item.children.length">
    <i v-if="item.iconClass" :class="item.iconClass"></i>{{item.name}}
    <ul class="sub-menu-ul">
      <cateList v-for="(subItem,index) of item.children" :item="subItem" :key="index" />
    </ul>
  </li>

  <li v-else class="side-list">
    <router-link :to="item.link">
      <div class="list-inner">
        <i v-if="item.iconClass" :class="item.iconClass"></i>
        {{item.name}}
      </div>
    </router-link>
  </li>
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
    line-height: 60px;
    margin-left: 60px;
    height: 60px;

  }

  .side-list,
  .list-inner {
    color: #666;
    font-size: 16px;
    font-weight: bold;
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
</style>