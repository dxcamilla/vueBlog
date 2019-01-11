<template>
  <div class="pdt-60 admin-box">
    <Header />
    <el-container>
      <el-aside width="200px">
        <el-menu :default-openeds="['3']" v-for="sideItem of navItems" :key="sideItem.index">
          <sideBar :item="sideItem" />
        </el-menu>
      </el-aside>
      <el-container>
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import Header from '@/components/Header.vue'
  import sideBar from '@/views/Layout/adminTemp/sideBar.vue'
  export default {
    name: 'adminPage',
    components: {
      Header,
      sideBar
    },
    data() {
      return {
        navItems: [
          {
            index: "1",
            link: 'usersCont',
            name: "用户管理",
            iconClass: "icon-user"
          },
          {
            index: "2",
            link: 'categoryCont',
            name: "标签管理",
            iconClass: "el-icon-circle-plus"
          },
          {
            index: "3",
            name: "内容管理",
            iconClass: "el-icon-edit-outline",
            children: [{
              index: "3-1",
              link: 'contentCont',
              name: "内容列表"
            }, {
              index: "3-2",
              link: 'addContent',
              name: "添加内容"
            },
            ]
          },
        ],
        tableData: [],

      }
    },
    mounted() {
      // let pageNum = 1;
      // const url = this.serverUrl + '/admin/usersManage?page=' + pageNum
      // http.get(url)
      //   .then(res => {
      //     let data = res.data;
      //     if (data.resCode === 1) {
      //       this.tableData = data.users
      //       console.log(this.tableData)
      //     }
      //   })
    },
    methods: {
      handleSelectionChange() {

      }
    },

  };
</script>
<style>
  .el-row {
    margin-bottom: 20px;
  }

  .el-input {
    width: 200px;
    margin-right: 10px;
  }

  .el-pagination {
    margin-left: -5px;
    padding: 20px 0;
  }

  .admin-box .el-button {
    margin-left: 0;
    margin-right: 10px;
  }

  .el-tag {
    margin: 5px 0 0;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }


  .el-aside {
    color: #333;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .el-input {
    width: 200px;
    margin-right: 10px;
  }
</style>