<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
  export default {
    name: 'about',
    metaInfo: {
      title: '家盟家政管理系统', // set a title
      meta: [{ // set meta
        name: 'keyWords',
        content: '家盟，家政管理，家政助手，月嫂管理，保姆管理，育儿嫂管理，阿姨管理，三个阿姨'
      }, {
        name: 'Description',
        content: '家盟是为家政公司提供的一款SaaS平台，提供针对阿姨和客户的管理工具，通过阿姨简历快捷分享、自由添加客户跟进记录等更好的实现阿姨与客户的匹配与协调，从而降低客户流失率；自定义商家小程序中的显示内容和服务产品，提升门店形象，拓展获取客户渠道。'
      }]
    }
  }
</script>