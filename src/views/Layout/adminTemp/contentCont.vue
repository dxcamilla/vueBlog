<template>
  <el-main>
    <el-row>
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" style="width:200px;">
      </el-input>
      <el-button type="primary" icon="el-icon-search" plain>搜索</el-button>
      <el-button type="danger" icon="el-icon-delete" plain @click="delContPop">批量删除</el-button>
      <router-link to="/admin/addContent">
        <el-button type="primary" icon="el-icon-plus" plain>新增文章</el-button>
      </router-link>
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
          <el-button type="text" @click="delContPop(scope.row)">删除</el-button>
          <el-button type="text">编辑</el-button>
          <el-button type="text">上线</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="删除提示" :visible.sync="dialogDel" width="30%" center>
      <div style="color:#F56C6C">确定删除以下文章？</div>
      <ul v-for='(item,index) in delRow.name'>
        <li>
          <el-tag>{{item}}</el-tag>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDel = false">取 消</el-button>
        <el-button type="primary" @click="delCont">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>
<style>

</style>
<script>
  import http from '@/api/http.js'
  import { admin_contentManage, admin_delContent } from '@/api/admin/contentManage'
  export default {
    name: 'usersCont',
    components: {
    },
    data() {
      return {
        tableData: [],
        delRow: {
          id: [],
          name: []
        },
        multiDel: false,
        dialogFormVisible: false,
        dialogDel: false,
        formLabelWidth: '120px'
      }
    },
    mounted() {
      this.queryInit()
    },
    methods: {
      queryInit() {
        admin_contentManage()
          .then(res => {
            this.tableData = res.data
            console.log(this.tableData)
          }).catch(err => {
            this.$message.error(err)
          })
      },
      handleSelectionChange(val) {
        let arr = [], arrName = [];
        for (let index of val.keys()) {
          arr.push(val[index]._id)
          arrName.push(val[index].title)
        }
        this.multiDel = true;
        this.delRow = {
          id: arr,
          name: arrName
        }
      },
      delContPop(row) {
        if (row._id) {
          this.multiDel = false;
          this.delRow = {
            id: [row._id],
            name: [row.title]
          }
        } else {
          if (this.delRow.id.length === 0 || !this.multiDel) {
            this.$message({
              message: '没选删个屁？',
              type: 'warning'
            });
            return
          }
        }
        this.dialogDel = true
      },
      // 删除分类
      delCont() {
        admin_delContent({
          params: {
            contIds: this.delRow.id
          }
        })
          .then(res => {
            if (res.resCode === 1) {
              this.$message({
                message: res.resMsg,
                type: 'success'
              });
              this.delRow = {
                id: [],
                name: []
              }
              this.queryInit()
              this.dialogDel = false;
            } else {
              this.$message.error(res.resMsg);
            }
          }).catch(err => {
            this.$message.error(err)
          })
      },
    },
  };
</script>