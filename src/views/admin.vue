<template>
  <div class="pdt-60 admin-box">
    <Header />
    <el-container>
      <el-aside width="200px">
        <el-menu :default-openeds="['contents']">
          <template v-for="sideItem of navItems">
            <sideBar :item="sideItem" />
          </template>
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
  import sideBar from '@/components/sideBar.vue'
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
            index: "users",
            link: 'usersCont',
            name: "用户管理",
            iconClass: "icon-user"
          },
          {
            index: "categories",
            link: 'categoryCont',
            name: "分类管理",
            iconClass: "icon-list"
          },
          {
            index: "tags",
            link: 'tagCont',
            name: "标签管理",
            iconClass: "icon-tag"
          },
          {
            index: "contents",
            name: "内容管理",
            iconClass: "el-icon-edit",
            children: [{
              index: "showCont",
              link: 'contentCont',
              name: "内容列表"
            }, {
              index: "addCont",
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
    overflow: hidden;
    border-right: 1px solid #ddd;
    color: #333;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .el-input {
    width: 200px;
    margin-right: 10px;
  }

  .el-menu {
    border: none;
  }

  /* .admin-box .common-header {
    background: #edf5ff;
  }

  .admin-box .cm-navbar .list {
    color: #000;
  } */
</style>