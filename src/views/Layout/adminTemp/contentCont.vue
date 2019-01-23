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
      <el-table-column type="selection" width="40"></el-table-column>
      <!-- <el-table-column prop="_id" label="id" width="200"></el-table-column> -->
      <el-table-column prop="title" label="标题" width="200">
        <template slot-scope="scope">
          <router-link :to="{path: '/admin/showContent', query:{contId: scope.row._id}}">{{scope.row.title}}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="categoryId.category" label="分类" width="80"></el-table-column>

      <el-table-column prop="stick" label="置顶等级" width="80"></el-table-column>
      <el-table-column prop="creator" label="作者" width="150"></el-table-column>
      <el-table-column prop="updater" label="更新者" width="150"></el-table-column>
      <!-- <el-table-column prop="createTime" label="创建时间"></el-table-column> -->
      <!-- <el-table-column prop="publishTime" label="发布时间"></el-table-column> -->
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <template v-if="scope.row.status===0">未发布</template>
          <template v-if="scope.row.status===1">已发布</template>
          <template v-if="scope.row.status===2">已下线</template>
        </template>
      </el-table-column>
      <el-table-column prop="act" label="操作">
        <template slot-scope="scope">
          <template v-if="scope.row.status===0 || scope.row.status===2">
            <el-button type="text">上线</el-button>
          </template>
          <template v-if="scope.row.status===1">
            <el-button type="text">下线</el-button>
          </template>
          <el-button type="text" @click="delContPop(scope.row)">删除</el-button>
          <router-link :to="{path: '/detail', query: {contId: scope.row._id}}">
            <el-button type="text">预览</el-button>
          </router-link>
          <router-link :to="{path: '/admin/addContent', query:{contId: scope.row._id}}">
            <el-button type="text">编辑</el-button>
          </router-link>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="totalLists" @current-change="handleCurrentChange">
    </el-pagination>
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
        totalLists: 0,
        pageSize: 0,
        curPgae: 1,
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
      this.queryInit(this.curPage)
    },
    methods: {
      queryInit(pageNum) {
        admin_contentManage({
          params: {
            page: pageNum
          }
        })
          .then(res => {
            this.tableData = res.data;
            this.totalLists = res.total;
            this.pageSize = res.limit;
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
            this.$message({
              message: res.resMsg,
              type: 'success'
            });
            this.delRow = {
              id: [],
              name: []
            }
            this.queryInit(this.curPage)
            this.dialogDel = false;
          }).catch(err => {
            this.$message.error(err)
          })
      },
      // 分页查询
      handleCurrentChange(val) {
        this.curPage = val;
        this.queryInit(this.curPage);
      },
    },
  };
</script>