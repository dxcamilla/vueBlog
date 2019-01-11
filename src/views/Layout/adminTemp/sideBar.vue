<template>
  <div>
    <el-submenu v-if="item.children && item.children.length" :index="item.index">
      <template slot="title">
        <i v-if="item.iconClass" :class="item.iconClass"></i>
        {{item.name}}
      </template>
      <sideBar v-for="subItem of item.children" :item="subItem" :key="subItem.name"></sideBar>
    </el-submenu>
    <el-menu-item v-else :index="item.index">
      <template slot="title">
        <router-link :to="{name:item.link}">
          <i v-if="item.iconClass" :class="item.iconClass"></i>
          {{item.name}}
        </router-link>
      </template>
    </el-menu-item>
  </div>
</template>
<script>
  export default {
    name: 'sideBar',
    props: {
      item: Object
    }
  }
</script>