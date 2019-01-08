<template>
  <el-main>
    <el-row>
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" style="width:200px;">
      </el-input>
      <el-button type="primary" icon="el-icon-search" plain>搜索</el-button>
      <el-button type="danger" icon="el-icon-delete" plain @click="delPop">批量删除</el-button>
    </el-row>
    <el-table border style="width:100%" :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50">
        <template prop="isAdmin" slot-scope="scope">
          <el-checkbox v-if="scope.row.isAdmin == 0" name="type"></el-checkbox>
          <el-checkbox v-else name="type" disabled></el-checkbox>
        </template>
      </el-table-column>

      <el-table-column prop="_id" label="id" width="200"></el-table-column>
      <el-table-column prop="userAccount" label="用户邮箱" width="150"></el-table-column>
      <el-table-column prop="userName" width="150" label="用户名"></el-table-column>
      <el-table-column prop="password" width="150" label="密码"></el-table-column>
      <el-table-column prop="isAdmin" width="70" label="管理员">
        <template slot-scope="scope">
          <div v-if="scope.row.isAdmin">是</div>
          <div v-else>否</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template prop="isAdmin" slot-scope="scope">
          <el-button v-if="scope.row.isAdmin == 0" style="color:#F56C6C" type="text" @click="delPop(scope.row)">删除</el-button>
          <el-button v-if="scope.row.isAdmin == 0" type="text" @click="editPop(scope.row)">更改</el-button>
          <el-button v-if="loginUser.isAdmin === 2" el-button type="text">设为管理员</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="totalLists" @current-change="handleCurrentChange">
    </el-pagination>

    <!-- <el-dialog :title="addCateTitle" :visible.sync="dialogEditCate">
      <el-form :model="rowEdit">
        <el-form-item label="分类名称">
          <el-input v-model="rowEdit.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="rowEdit.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditCate = false">取 消</el-button>
        <el-button v-if="rowEdit.id" type="primary">修 改</el-button>
      </div>
    </el-dialog> -->
    <el-dialog title="删除提示" :visible.sync="dialogDelCate" width="30%" center>
      <div style="color:#F56C6C">确定删除以下分类？</div>
      <ul v-for="(item,index) in rowDel.name">
        <li>
          <el-tag>{{item}}</el-tag>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelCate = false">取 消</el-button>
        <el-button type="primary" @click="delFun">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>
<script>
  import http from '@/api/http.js'
  import { admin_userManage } from '@/api/admin/userManage'
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'usersCont',
    components: {
    },
    data() {
      return {
        dialogEditCate: false,
        dialogDelCate: false,
        addCateTitle: '添加分类',
        totalLists: 0,
        pageSize: 0,
        curPgae: 1,
        tableData: [],
        rowDel: {
          id: '',
          name: ''
        },
        rowEdit: {
          id: '',
          name: ''
        },
      }
    },
    mounted() {
      const pageNum = this.curPage
      this.queryUsers(pageNum);
      console.log(this.loginUser)
    },
    computed: {
      ...mapState(['loginUser'])

    },
    methods: {
      queryUsers(pageNum) {
        admin_userManage(
          {
            params: {
              page: pageNum
            }
          }
        )
          .then(res => {
            this.tableData = res.users;
            this.totalLists = res.total;
            this.pageSize = res.limit;
          })
      },
      // 翻页事件
      handleCurrentChange(val) {
        this.curPage = val;
        this.queryUsers(this.curPage);
      },
      handleSelectionChange(val) {
        console.log(val);
        // let arr = [], arrName = [];
        // for (let index of val.keys()) {
        //   arr.push(val[index]._id)
        //   arrName.push(val[index].userAccount)
        // }
        // this.rowDel = {
        //   id: arr,
        //   name: arrName
        // }
        // this.delIds = arr
        // this.delNames = arrName
      },
      // 删除弹框
      delPop(row) {
        const cateId = row._id;
        if (cateId) {
          // this.delIds = cateId
          // this.delCateName = [];
          // this.delCateName.push(row.category);
        }
        if (this.rowDel.id.length === 0) {
          this.$message({
            message: '没选删个屁？',
            type: 'warning'
          });
          return
        }
        this.dialogDelCate = true
      },
      delFun() {
        admin_delCategory({
          params: {
            cateIds: this.rowDel.id
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

    }
  };
</script>