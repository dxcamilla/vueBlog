<template>
  <el-main>
    <el-row>
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" style="width:200px;">
      </el-input>
      <el-button type="primary" icon="el-icon-search" plain>搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" plain @click="editPop">添加标签</el-button>
      <el-button type="danger" icon="el-icon-delete" plain @click="delCatePop">批量删除</el-button>
    </el-row>

    <el-table border style="width:100%" :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="_id" label="id" width="200"></el-table-column>
      <el-table-column prop="tag" label="标签名称"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button style="color:#F56C6C" type="text" @click="delCatePop(scope.row)">删除</el-button>
          <el-button type="text" @click="editPop(scope.row)">更改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="totalLists" @current-change="handleCurrentChange">
    </el-pagination>

    <el-dialog :title="addTagTitle" :visible.sync="dialogEditTag">
      <el-form :model="editRow">
        <el-form-item label="标签名称" :label-width="formLabelWidth">
          <el-input v-model="editRow.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditTag = false">取 消</el-button>
        <el-button v-if="editRow.id" type="primary" @click="changeCate">修 改</el-button>
        <el-button v-else type="primary" @click="addCate">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="删除提示" :visible.sync="dialogDelTag" width="30%" center>
      <div style="color:#F56C6C">确定删除以下标签？</div>
      <ul v-for='(item,index) in delRow.name'>
        <li>
          <el-tag>{{item}}</el-tag>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelTag = false">取 消</el-button>
        <el-button type="primary" @click="delCate">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>
<script>
  import {
    admin_tagManage,
    admin_delTag,
    admin_addTag,
    admin_changeTag
  } from '@/api/admin/tagManage'
  export default {
    name: 'usersCont',
    components: {
    },
    data() {
      return {
        tableData: [],
        dialogEditTag: false,
        dialogDelTag: false,
        addTagTitle: '添加标签',
        changeId: '',
        multiDel: false,
        totalLists: 0,
        pageSize: 0,
        curPgae: 1,
        delRow: {
          id: [],
          name: []
        },
        editRow: {
          id: '',
          name: ''
        },
        formLabelWidth: '120px'
      }
    },
    mounted() {
      this.queryInit(this.curPgae);
    },
    methods: {
      queryInit(pageNum) {
        admin_tagManage({
          params: {
            page: pageNum
          }
        })
          .then(res => {
            console.log(res);
            this.tableData = res.tags;
            this.totalLists = res.total;
            this.pageSize = res.limit;
          }).catch(err => {
            console.log(err)
          })
      },
      //多事件
      handleSelectionChange(val) {
        let arr = [], arrName = [];
        for (let index of val.keys()) {
          arr.push(val[index]._id)
          arrName.push(val[index].tag)
        }
        this.multiDel = true;
        this.delRow = {
          id: arr,
          name: arrName
        };
      },
      // 分页查询
      handleCurrentChange(val) {
        this.curPage = val;
        this.queryInit(this.curPage);
      },

      // 弹出添加/修改标签弹框
      editPop(row) {
        const tagId = row._id || '';
        const tagName = row.tag || '';
        console.log(tagId)
        if (tagId) {
          this.addTagTitle = '修改标签'
          this.editRow = {
            id: tagId,
            name: tagName
          }
        } else {
          this.addTagTitle = '添加标签'
          this.editRow = {
            id: '',
            name: ''
          }
        }
        this.dialogEditTag = true;
      },
      // 添加标签
      addCate() {
        if (!this.editRow.name) {
          this.$message({
            message: '木有标签名',
            type: 'warning'
          });
          return
        }
        let name = this.editRow.name
        console.log(name);
        admin_addTag({
          params: {
            tagName: name
          }
        })
          .then(res => {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.queryInit(curPage)
            this.dialogEditTag = false;

          }).catch(err => {
            this.$message.error(err)
          })
      },
      // 更改标签
      changeCate() {
        admin_changeTag({
          params: {
            tagId: this.editRow.id,
            tagName: this.editRow.name
          }
        })
          .then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.queryInit(curPage)
            this.dialogEditTag = false;
          }).catch(err => {
            this.$message.error(err)
          })
      },
      // 删除弹框
      delCatePop(row) {
        if (row._id) {
          this.multiDel = false;
          this.delRow = {
            id: [row._id],
            name: [row.category]
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
        this.dialogDelTag = true
      },
      // 删除标签
      delCate() {
        admin_delTag({
          params: {
            tagIds: this.delRow.id
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
            this.queryInit(curPage)
            this.dialogDelTag = false;

          }).catch(err => {
            this.$message.error(err)
          })
      },

    },
  };
</script>