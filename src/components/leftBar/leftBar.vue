<template>
  <aside class="left-bar">
    <div class="menu-ul">
      <router-link :to="{name:'categories',params:{cateId:'all'}}">
        <div class="side-list">
          <div class="list-inner">
            <!-- <i class="all-icon"></i> -->
            全部
          </div>
        </div>
      </router-link>
      <cateList v-for="(sideItem,index) of navItems" :item="sideItem" :key="index" />
    </div>
  </aside>
</template>
<style lang="scss" scoped>
  $m_top1: 80px;

  .left-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 180px;
    height: 100%;
    box-shadow: 5px 5px 15px #ccc;
    background: #fff;
    border-radius: 4px;
  }

  .menu-ul {
    overflow: auto;
    margin-top: $m_top1;
  }



  @media screen and (min-width:1280px) {
    .left-bar {
      left: 50%;
      margin-left: -640px;
    }
  }

  @media screen and (max-width:760px) {
    .left-bar {
      display: none;
      z-index: 9;
      width: 100%;
    }

    /* .side-list,
    .list-inner {
      margin: 0;
      text-align: center
    } */
  }
</style>
<script>
  import cateList from "@/components/leftBar/cateList"
  export default {
    name: 'leftBar',
    components: {
      cateList
    },
    props: {
      navItems: Array
    }
  }
</script>