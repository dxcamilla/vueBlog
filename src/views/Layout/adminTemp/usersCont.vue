<template>
  <el-main>
    <el-row>
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" style="width:200px;">
      </el-input>
      <el-button type="primary" icon="el-icon-search" plain>搜索</el-button>
      <el-button type="danger" icon="el-icon-delete" plain @click="delPop">批量删除</el-button>
    </el-row>
    <el-table ref="multipleTable" :border="true" syle="width:100%" :data="tableData"
      @selection-change="handleSelectionChange">
      <template v-if="loginUser.isAdmin === 1">
        <el-table-column :selectable='checkboxT' type="selection" width="50" disabled='true'></el-table-column>
      </template>
      <template v-if="loginUser.isAdmin === 2">
        <el-table-column type="selection" width="50"></el-table-column>
      </template>
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
          <template v-if="loginUser.isAdmin === 2">
            <el-button style="color:#F56C6C" type="text" @click="delPop(scope.row)">删除</el-button>
            <el-button type="text" @click="editPop(scope.row)">更改</el-button>
            <el-button v-if="scope.row.isAdmin == 0" el-button type="text" @click="setAdminPop(scope.row,1)">
              设为管理员
            </el-button>
            <el-button v-else el-button type="text" @click="setAdminPop(scope.row,0)">
              删除权限
            </el-button>
          </template>
          <template v-else>
            <template v-if="scope.row.isAdmin == 0">
              <el-button style="color:#F56C6C" type="text" @click="delPop(scope.row)">删除</el-button>
              <el-button type="text" @click="editPop(scope.row)">更改</el-button>
            </template>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="totalLists"
      @current-change="handleCurrentChange">
    </el-pagination>
    <el-dialog :title="addCateTitle" :visible.sync="dialogEditCate">
      <el-form :model="rowEdit">
        <el-form-item label="用户账号">
          <el-input v-model="rowEdit.userAccount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input v-model="rowEdit.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input v-model="rowEdit.password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="管理权限">
          <el-input v-model="rowEdit.isAdmin" autocomplete="off"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditCate = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirmChange = true">修 改</el-button>
      </div>
    </el-dialog>
    <el-dialog title="删除提示" :visible.sync="dialogDelCate" width="30%" center>
      <div style="color:#F56C6C">确定删除以下分类？</div>
      <ul v-for="(item,index) in delRow.name">
        <li>
          <el-tag>{{item}}</el-tag>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelCate = false">取 消</el-button>
        <el-button type="primary" @click="delFun">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改提示" :visible.sync="dialogConfirmChange" width="30%" center>
      <div>确定修改 <span style="color:#F56C6C">{{rowEdit.userAccount}}</span> 用户信息？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogConfirmChange = false">取 消</el-button>
        <el-button type="primary" @click="editFun">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="
          管理员权限提示" :visible.sync="dialogSetAdmin" width="30%" center>
      <div>{{adminPermissionTip}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSetAdmin = false">取 消</el-button>
        <el-button type="primary" @click="setAdmin">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>
<script>
  import { admin_userManage, admin_delUsers, admin_changeUserInfo, admin_setAdmin } from '@/api/admin/userManage'
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'usersCont',
    components: {
    },
    data() {
      return {
        dialogEditCate: false,
        dialogDelCate: false,
        dialogConfirmChange: false,
        dialogSetAdmin: false,
        addCateTitle: '添加分类',
        multiDel: false,
        totalLists: 0,
        pageSize: 0,
        curPgae: 1,
        tableData: [],
        checkAll: false,
        setAdminId: '',
        adminPermission: 0,
        adminPermissionTip: '确定设置该用户为管理员？',
        delRow: {
          id: [],
          name: []
        },
        rowEdit: {},
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
      checkboxT(row, index) {
        if (row.isAdmin === 0) {
          return 1;
        } else {
          return 0;
        }
      },
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
        let arr = [], arrName = [];
        for (let index of val.keys()) {
          arr.push(val[index]._id)
          arrName.push(val[index].userAccount)
        }
        this.multiDel = true;
        this.delRow = {
          id: arr,
          name: arrName
        };
      },
      // 删除弹框
      delPop(row) {
        if (row._id) {
          this.multiDel = false;
          this.delRow = {
            id: row._id,
            name: [row.userAccount]
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
        this.dialogDelCate = true
      },
      // 删除群选项
      delFun() {
        admin_delUsers({
          params: {
            userIds: this.delRow.id
          }
        })
          .then(res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.delRow = {
              id: [],
              name: []
            }
            this.queryUsers(this.curPage);
            this.dialogDelCate = false;
          }).catch(err => {
            this.$message.error(err)
          })
      },
      // 修改userInfo弹框
      editPop(row) {
        if (!row._id) {
          return
        }
        this.rowEdit = row
        console.log(this.rowEdit)
        this.dialogEditCate = true;
      },
      //修改用户邮箱、密码、昵称
      editFun() {
        admin_changeUserInfo({
          params: {
            userId: this.rowEdit._id,
            account: this.rowEdit.userAccount,
            nick: this.rowEdit.userName,
            pwd: this.rowEdit.password
          }
        }).then(res => {
          this.$message({
            message: res.resMsg,
            type: 'success'
          });
          this.queryUsers(this.curPage);
          this.dialogEditCate = false;
          this.dialogConfirmChange = false;
        }).catch(err => {
          this.$message.error(err)
        })
      },
      //设置、删除管理员权限pop
      setAdminPop(row, addAdmin) {
        if (row._id) {
          this.setAdminId = row._id;
          this.dialogSetAdmin = true;
          this.adminPermission = addAdmin;
          if (addAdmin === 0) {
            this.adminPermissionTip = "确定删除该用户管理员权限？"
          } else {
            this.adminPermissionTip = "确定设置该用户为管理员？"
          }
        }
      },
      //设置、删除管理员权限Function
      setAdmin() {
        admin_setAdmin({
          params: {
            userId: this.setAdminId,
            adminPermission: this.adminPermission
          }
        }).then(res => {
          this.$message({
            message: res.resMsg,
            type: 'success'
          });
          this.queryUsers(this.curPage);
          this.dialogSetAdmin = false;
        }).catch(err => {
          this.$message.error(err)
        })
      }
    }
  };
</script>