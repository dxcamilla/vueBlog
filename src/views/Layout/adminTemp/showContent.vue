<template>
  <el-main>

  </el-main>
</template>
<script>
  import {
    admin_addContent
  } from '@/api/admin/contentManage';
  export default {
    name: 'usersCont',
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
          this.content = res.content
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