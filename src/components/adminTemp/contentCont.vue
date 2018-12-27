<template>
  <el-main>
    <el-row>
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" style="width:200px;">
      </el-input>
      <el-button type="primary" icon="el-icon-search" plain>搜索</el-button>
      <router-link to="/admin/addContent">
        <el-button type="primary" icon="el-icon-plus" plain>新增文章</el-button>
      </router-link>
      <el-button type="danger" icon="el-icon-delete" plain @click="delContPop">批量删除</el-button>
    </el-row>
    <el-table border style="width:100%" :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="_id" label="id" width="200"></el-table-column>
      <el-table-column prop="categoryId.category" label="分类"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="stick" label="置顶"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="publishTime" label="发布时间"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="act" label="操作">
        <template slot-scope="scope">
          <el-button type="text">删除</el-button>
          <el-button type="text">编辑</el-button>
          <el-button type="text">上线</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="删除提示" :visible.sync="centerDialogVisible" width="30%" center>
      <div style="color:#F56C6C">确定删除以下文章？</div>
      <ul v-for='(item,index) in delName'>
        <li>
          <el-tag>{{item}}</el-tag>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delCont">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>
<style>

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
        queryUrl: process.env.VUE_APP_serverURL + '/admin/contentsManage',
        tableData: [],
        delIds: [],
        delName: [],
        dialogFormVisible: false,
        centerDialogVisible: false,
        form: {
          name: ''
        },
        formLabelWidth: '120px'
      }
    },
    mounted() {
      this.queryInit()
    },
    methods: {
      queryInit() {
        http.get(this.queryUrl)
          .then(res => {
            let data = res.data;
            if (data.resCode === 1) {
              this.tableData = data.data
              console.log(this.tableData)
            }
          }).catch(err => {
            console.log(err)
          })
      },
      handleSelectionChange(val) {
        let arr = [], arrName = [];
        for (let index of val.keys()) {
          arr.push(val[index]._id)
          arrName.push(val[index].title)
        }
        this.delIds = arr
        this.delName = arrName
        console.log(arrName)
      },
      delContPop() {
        if (this.delIds.length === 0) {
          this.$message({
            message: '没选删个屁？',
            type: 'warning'
          });
          return
        }
        this.centerDialogVisible = true
      },
      // 删除分类
      delCont() {
        const url = this.serverUrl + '/admin/delContent'
        http.get(url, {
          params: {
            contIds: this.delIds
          }
        })
          .then(res => {
            let data = res.data;
            console.log(data)
            if (data.resCode === 1) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              // this.queryInit()
            } else {
              this.$message.error(data.resMsg);
            }
          }).catch(err => {
            this.$message.error('删除失败')
          })
      },
    },
  };
</script>