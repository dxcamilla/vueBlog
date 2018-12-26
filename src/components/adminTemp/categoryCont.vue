<template>
  <el-main>
    <el-row>
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" style="width:200px;">
      </el-input>
      <el-button type="primary" icon="el-icon-search" plain>搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" plain>增加分类</el-button>
      <el-button type="danger" icon="el-icon-delete" plain>批量删除</el-button>
    </el-row>

    <el-table border style="width:100%" :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="_id" label="id" width="200"></el-table-column>
      <el-table-column prop="category" label="分类名称"></el-table-column>

    </el-table>
    <el-pagination background layout="prev, pager, next" :total="1000">
    </el-pagination>
  </el-main>

</template>
<style>
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

  .el-pagination {
    margin-left: -5px;
    padding: 20px 0;
  }
</style>
<script>
  import http from '@/api/http.js'
  export default {
    name: 'usersCont',
    components: {
    },
    data() {
      return {
        serverUrl: process.env.VUE_APP_serverURL,
        tableData: []
      }
    },
    mounted() {
      const url = this.serverUrl + '/admin/categoriesManage'
      http.get(url)
        .then(res => {
          let data = res.data;
          if (data.resCode === 1) {
            this.tableData = data.categories
            console.log(this.tableData)
          }
        })
    },
    methods: {
      handleSelectionChange() {

      }
    },

  };
</script>