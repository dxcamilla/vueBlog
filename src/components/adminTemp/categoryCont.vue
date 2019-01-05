<template>
  <el-main>
    <el-row>
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" style="width:200px;">
      </el-input>
      <el-button type="primary" icon="el-icon-search" plain>搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" plain @click="dialogFormVisible = true">增加分类</el-button>
      <el-button type="danger" icon="el-icon-delete" plain @click="delCatePop">批量删除</el-button>
    </el-row>

    <el-table border style="width:100%" :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="_id" label="id" width="200"></el-table-column>
      <el-table-column prop="category" label="分类名称"></el-table-column>
    </el-table>

    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="删除提示" :visible.sync="centerDialogVisible" width="30%" center>
      <div style="color:#F56C6C">确定删除以下分类？</div>
      <ul v-for='(item,index) in delCateName'>
        <li>
          <el-tag>{{item}}</el-tag>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delCate">确 定</el-button>
      </span>
    </el-dialog>
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
        queryUrl: process.env.VUE_APP_serverURL + '/admin/categoriesManage',
        tableData: [],
        delIds: [],
        delCateName: [],
        dialogFormVisible: false,
        centerDialogVisible: false,
        form: {
          name: ''
        },
        formLabelWidth: '120px'
      }
    },
    mounted() {
      // const url = this.serverUrl + '/admin/categoriesManage'
      this.queryInit()
    },
    methods: {
      queryInit() {
        http.get(this.queryUrl)
          .then(res => {
            console.log(res)
            let data = res;
            if (data.resCode === 1) {
              this.tableData = data.categories
            }
          }).catch(err => {
            console.log(err)
          })
      },
      handleSelectionChange(val) {
        let arr = [], arrName = [];
        for (let index of val.keys()) {
          arr.push(val[index]._id)
          arrName.push(val[index].category)
        }
        this.delIds = arr
        this.delCateName = arrName
        console.log(arrName)
      },
      delCatePop() {
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
      delCate() {
        const url = this.serverUrl + '/admin/delCategory'
        http.get(url, {
          params: {
            cateIds: this.delIds
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
              this.centerDialogVisible = false;
            } else {
              this.$message.error(data.resMsg);
            }

          }).catch(err => {
            this.$message.error('删除失败')
          })
      },
      // 添加分类
      addCate() {
        if (!this.form.name) {
          this.$message({
            message: '木有分类名',
            type: 'warning'
          });
          return
        }
        let name = this.form.name
        console.log(name);
        const url = this.serverUrl + '/admin/addCategory'
        http.get(url, {
          params: {
            cateName: name
          }
        })
          .then(res => {
            let data = res.data;
            if (data.resCode === 1) {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              // this.queryInit()
              this.dialogFormVisible = false;
            } else {
              this.$message.error(data.resMsg);
            }

          }).catch(err => {
            this.$message.error('添加失败')
          })
      },
    },
  };
</script>