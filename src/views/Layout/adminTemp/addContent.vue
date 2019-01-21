<template>
  <el-main>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="form.checkCate" placeholder="请选择分类">
          <el-option v-for="item in form.categories" :key="item._id.toString()" :label="item.category" :value="item._id.toString()"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="置顶">
        <el-radio-group v-model="form.stick">
          <el-radio :label="0"></el-radio>
          <el-radio :label="1"></el-radio>
          <el-radio :label="2"></el-radio>
          <el-radio :label="3"></el-radio>
        </el-radio-group>
        <span style="margin-left:20px;color:red;">默认0，不置顶，递增置顶</span>
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="form.checkTag" multiple filterable allow-create default-first-option clearable placeholder="请选择文章标签">
          <el-option v-for="item in form.tags" :key="item._id.toString()" :label="item.tag" :value="item.tag" clearable>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="摘要">
        <el-input type="textarea" v-model="form.summary"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input class="txtarea-cont" type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addContentPop">{{popBtnTip}}</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="提示" :visible.sync="dialogEdit" width="30%" center>
      <div>确认创建文章？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="editContent" :disabled="createDisable">创建并上线</el-button>
        <el-button type="primary" @click="editContent" :disabled="createDisable">创建</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogUpdate" width="30%" center>
      <div>确认更新文章？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdate = false">取 消</el-button>
        <el-button type="primary" @click="updateContent" :disabled="updateDisable">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>
<style>

</style>
<script>
  import {
    admin_addContent,
    admin_creatContent,
    admin_updateContent
  } from '@/api/admin/contentManage';
  export default {
    name: 'usersCont',
    components: {
    },
    data() {
      return {
        createDisable: false,
        updateDisable: false,
        updateId: '',
        isUpdate: false,
        popBtnTip: '立即创建',
        dialogUpdate: false,
        dialogEdit: false,
        form: {
          title: '',
          categories: '',
          stick: 0,
          tags: [],
          summary: '',
          content: '',
          checkCate: [],
          checkTag: [],
        },
      }
    },
    mounted() {
      this.loadCont();
    },
    methods: {
      // markInit() {
      //   let showdown = require('showdown');
      //   let coverter = new showdown.Converter();
      //   this.converter = coverter
      // },
      // contentChanged() {
      //   let html = this.converter.makeHtml(this.content);
      //   document.getElementById('show-content').innerHTML = html;
      // },
      loadCont() {
        this.updateId = this.$route.query.contId;
        if (this.updateId) {
          this.popBtnTip = '立即更新';
          this.isUpdate = true;
        }
        admin_addContent({
          params: {
            contId: this.updateId
          }
        })
          .then(res => {
            console.log(res);
            if (res.content) {
              this.form.title = res.content.title;
              this.form.summary = res.content.summary;
              this.form.checkCate = res.content.categoryId;
              this.form.checkTag = res.content.tags;
              this.form.content = res.content.content;
            }
            this.form.categories = res.categories;
            this.form.tags = res.tags;
          })
      },
      addContentPop() {
        const emptyVerArr = [
          {
            key: this.form.title,
            tip: '标题不能为空'
          },
          {
            key: this.form.checkCate,
            tip: '请选择分类'
          },
          {
            key: this.form.summary,
            tip: '麻烦写下摘要'
          },
          {
            key: this.form.content,
            tip: '内容也不能空'
          }
        ]
        for (let item of emptyVerArr) {
          if (item.key === "") {
            this.$message({
              message: item.tip,
              type: 'warning'
            });
            return;
          }
        }
        if (this.isUpdate) {
          this.dialogUpdate = true;
        } else {
          this.dialogEdit = true;
        }

      },
      editContent() {
        this.createDisable = true;
        setTimeout(() => {
          this.createDisable = false;
        }, 2000)
        admin_creatContent({
          params: {
            contType: this.form.checkCate,
            contTitle: this.form.title,
            contSummary: this.form.summary,
            contBody: this.form.content,
            tags: this.form.checkTag,
            stick: this.form.stick
          }
        }).then(res => {
          this.$message({
            message: res.resMsg,
            type: 'success'
          });
          this.dialogEdit = false;
        }).catch(err => {
          this.$message.error(err)
        })
      },
      updateContent() {
        this.updateDisable = true;
        setTimeout(() => {
          this.updateDisable = false;
        }, 2000)
        admin_updateContent({
          params: {
            contId: this.updateId,
            contType: this.form.checkCate,
            contTitle: this.form.title,
            contSummary: this.form.summary,
            contBody: this.form.content,
            tags: this.form.checkTag,
            stick: this.form.stick
          }
        }).then(res => {
          this.$message({
            message: res.resMsg,
            type: 'success'
          });
          this.dialogUpdate = false;
        }).catch(err => {
          this.$message.error(err)
        })
      },
    },
  };
</script>
<style scope="scope">
  .txtarea-cont textarea {
    min-height: 200px !important;
  }
</style>