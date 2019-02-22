<template>
  <el-main>
    <formList fLabel="标题" :fValue="content.title" />
    <formList fLabel="摘要" :fValue="content.summary" />
    <div class="show-form-list tags">
      <div class="list-label">标签：</div>
      <div class="list-value">
        <!-- <el-tag type="info">标签三</el-tag> -->
        <span class="tag" v-for="item in content.tags">
          {{item}}
        </span>
      </div>
    </div>
    <formList fLabel="创建时间" :fValue="content.createTime" />
    <formList fLabel="创建者" :fValue="content.creator" />
    <formList fLabel="更新时间" :fValue="content.updateTime" />
    <formList fLabel="更新者" :fValue="content.updater" />
    <template v-if="content.status!==0">
      <formList fLabel="发布时间" :fValue="content.publishTime" />
    </template>
    <template v-if="content.status===0">
      <formList fLabel="发布状态" fValue="未发布" />
    </template>
    <template v-if="content.status===1">
      <formList fLabel="发布状态" fValue="已发布" />
    </template>
    <template v-if="content.status===2">
      <formList fLabel="发布状态" fValue="已下线" />
    </template>
    <formList fLabel="置顶等级" :fValue="content.stick" />
    <div class="show-form-list tags">
      <div class="list-label">内容</div>
      <div class="list-value">
        <el-input disabled class="txtarea-cont" type="textarea" v-model="content.content"></el-input>
      </div>
      <!-- <textarea class="list-value" disabled>
        {{content.content}}
      </textarea> -->
    </div>
    <!-- <formList fLabel="内容" :fValue="content.content" /> -->
  </el-main>
</template>
<script>
  import {
    admin_addContent
  } from '@/api/admin/contentManage';
  import formList from '@/components/formListShow';
  export default {
    name: 'usersCont',
    components: {
      formList
    },
    data() {
      return {
        content: {}
      }
    },
    mounted() {
      this.loadCont();
    },
    methods: {
      loadCont() {
        this.updateId = this.$route.query.contId;
        admin_addContent({
          params: {
            contId: this.updateId
          }
        }).then(res => {
          console.log(res);
          this.content = res.content;
        }).catch(err => {
          this.$message.error(err)
        })
      },
    },
  };
</script>
<style scope="scope" lang="scss">
  .txtarea-cont textarea {
    min-height: 300px !important;
  }

  .el-textarea.is-disabled .el-textarea__inner {
    background: #fafafa;
    border: none;
    cursor: default;
    color: #333;
  }

  .tags {
    .tag {
      display: inline-block;
      white-space: nowrap;
      margin: 0 20px 10px 0;
      position: relative;
      padding: 3px 10px;
      -webkit-border-radius: 2px;
      -moz-border-radius: 2px;
      border-radius: 2px;
      font-size: 14px;
      color: #333;
      background: #f2f2f2;
    }
  }
</style>