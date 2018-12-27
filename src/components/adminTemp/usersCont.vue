<template>


  <el-main>
    <el-row>
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" style="width:200px;">
      </el-input>
      <el-button type="primary" icon="el-icon-search" plain>搜索</el-button>
      <el-button type="danger" icon="el-icon-delete" plain>批量删除</el-button>
    </el-row>

    <el-table border style="width:100%" :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="_id" label="id" width="200"></el-table-column>
      <el-table-column prop="userAccount" label="用户邮箱" width="150"></el-table-column>
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="isAdmin" label="管理员权限">
        <template slot-scope="scope">
          {{scope.row.isAdmin}}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="1000">
    </el-pagination>
  </el-main>

</template>
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
      let pageNum = 1;
      const url = this.serverUrl + '/admin/usersManage?page=' + pageNum
      http.get(url)
        .then(res => {
          let data = res.data;
          if (data.resCode === 1) {
            this.tableData = data.users
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