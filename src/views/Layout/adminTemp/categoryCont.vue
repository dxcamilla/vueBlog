<template>
  <el-main>
    <el-row>
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" style="width:200px;">
      </el-input>
      <el-button type="primary" icon="el-icon-search" plain>搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" plain @click="editPop">增加分类</el-button>
      <el-button type="danger" icon="el-icon-delete" plain @click="delCatePop">批量删除</el-button>
    </el-row>

    <el-table border style="width:100%" :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="_id" label="id" width="200"></el-table-column>
      <el-table-column prop="category" label="分类名称"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button style="color:#F56C6C" type="text" @click="delCatePop(scope.row)">删除</el-button>
          <el-button type="text" @click="editPop(scope.row)">更改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="addCateTitle" :visible.sync="dialogEditCate">
      <el-form :model="rowEdit">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="rowEdit.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditCate = false">取 消</el-button>
        <el-button v-if="rowEdit.id" type="primary" @click="changeCate">修 改</el-button>
        <el-button v-else type="primary" @click="addCate">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="删除提示" :visible.sync="dialogDelCate" width="30%" center>
      <div style="color:#F56C6C">确定删除以下分类？</div>
      <ul v-for='(item,index) in delCateName'>
        <li>
          <el-tag>{{item}}</el-tag>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelCate = false">取 消</el-button>
        <el-button type="primary" @click="delCate">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>
<script>
  import http from '@/api/http.js'
  import {
    admin_categoryManage,
    admin_delCategory,
    admin_addCategory,
    admin_changeCategory
  } from '@/api/admin/categoryManage'
  export default {
    name: 'usersCont',
    components: {
    },
    data() {
      return {
        tableData: [],
        delIds: [],
        delCateName: [],
        dialogEditCate: false,
        dialogDelCate: false,
        addCateTitle: '添加分类',
        changeId: '',
        rowEdit: {
          id: '',
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
        admin_categoryManage()
          .then(res => {
            this.tableData = res.categories
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
      },

      // 弹出添加/修改分类弹框
      editPop(row) {
        const cateId = row._id || '';
        const cateName = row.category || '';
        console.log(cateId)
        if (cateId) {
          this.addCateTitle = '修改分类'
          this.rowEdit = {
            id: cateId,
            name: cateName
          }
        } else {
          this.addCateTitle = '添加分类'
          this.rowEdit = {
            id: '',
            name: ''
          }
        }
        this.dialogEditCate = true;
      },
      // 添加分类
      addCate() {
        if (!this.rowEdit.name) {
          this.$message({
            message: '木有分类名',
            type: 'warning'
          });
          return
        }
        let name = this.rowEdit.name
        console.log(name);
        admin_addCategory({
          params: {
            cateName: name
          }
        })
          .then(res => {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.queryInit()
            this.dialogEditCate = false;

          }).catch(err => {
            this.$message.error(err)
          })
      },
      // 更改分类
      changeCate() {
        admin_changeCategory({
          params: {
            cateId: this.rowEdit.id,
            cateName: this.rowEdit.name
          }
        })
          .then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.queryInit()
            this.dialogEditCate = false;
          }).catch(err => {
            this.$message.error(err)
          })
      },
      // 删除弹框
      delCatePop(row) {
        const cateId = row._id;
        if (cateId) {
          this.delIds = cateId
          this.delCateName = [];
          this.delCateName.push(row.category);
        }
        if (this.delIds.length === 0) {
          this.$message({
            message: '没选删个屁？',
            type: 'warning'
          });
          return
        }
        this.dialogDelCate = true
      },
      // 删除分类
      delCate() {
        console.log("cateIds", this.delIds)
        admin_delCategory({
          params: {
            cateIds: this.delIds
          }
        })
          .then(res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.queryInit()
            this.dialogDelCate = false;

          }).catch(err => {
            this.$message.error(err)
          })
      },

    },
  };
</script>