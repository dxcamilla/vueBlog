<template>
  <el-submenu v-if="item.children && item.children.length" :index="item.name">
    <!-- 创建菜单分组 -->
    <template slot="title">
      <i class="menu-iconfont" v-if="item.iconClass" :class="item.iconClass"></i>
      <span slot="title">{{item.name}}</span>
    </template>
    <!-- 递归调用自身，直到subItem不含有子节点 -->
    <sidebar-item v-for="subItem of item.children" :item="subItem" :key="subItem.name"></sidebar-item>
  </el-submenu>
  <el-menu-item v-else :index="item.name">
    <i v-if="item.iconClass" :class="item.iconClass"></i>
    <span slot="title">{{item.name}}</span>
  </el-menu-item>
</template>
<script>
  export default {
    name: 'sidebar-item',
    props: {
      item: {
        type: Object,
        require: true
      }
    }
  }
</script>
<style>
  .menu-iconfont {
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
  }

  .el-menu-item.is-active {
    color: #0099ff !important;
  }

  .el-menu-item.is-active i {
    color: #0099ff !important;
  }
</style>