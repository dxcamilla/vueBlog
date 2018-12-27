<template>
  <div class="pdt-60">
    <Header />
    <el-container style="height:600px;">
      <el-aside width="200px">
        <el-menu :default-openeds="['3']">
          <el-menu-item index="1">
            <template slot="title"><i class="icon-user"></i> 用户管理</template>
          </el-menu-item>
          <el-menu-item index="2">
            <template slot="title"><i class="el-icon-circle-plus"></i> 标签管理</template>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-edit-outline"></i> 内容管理</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <component is="addContent" />
      </el-container>
    </el-container>
  </div>
</template>
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
<script>
  import Header from '@/components/Header.vue'
  import usersCont from '@/components/adminTemp/usersCont.vue'
  import categoryCont from '@/components/adminTemp/categoryCont.vue'
  import contentCont from '@/components/adminTemp/contentCont.vue'
  import addContent from '@/components/adminTemp/addContent.vue'
  export default {
    name: 'adminPage',
    components: {
      Header,
      usersCont,
      categoryCont,
      contentCont,
      addContent
    },
    data() {
      return {
        // serverUrl: process.env.VUE_APP_serverURL,
        tableData: []
      }
      // const item = {
      //   id: 1312321,
      //   account: '2016-05-02',
      //   name: '王小虎',
      //   isAdmin: 'false'
      // };
      // return {
      //   tableData: Array(10).fill(item)
      // }
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