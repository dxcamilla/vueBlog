<template>
  <div class="pdt-60 nonhome-box detail-box">
    <Header />
    <div class="detail-cont-box">
      <div class="newsview">
        <h3 class="news-title">{{content.title}}</h3>
        <div class="bloginfo">
          <ul>
            <li class="timer"><i class="icon-time"></i> {{content.publishTime}}</li>
            <li class="view"><i class="icon-eye-open"></i> 123</li>
            <li class="view"><i class="icon-list"></i> {{content.cateName}}</li>
            <li class="like"><i class="icon-star-empty"></i> <i class="icon-star"></i> 0</li>
          </ul>
        </div>
        <div class="tags"></div>
        <div class="news-about"><strong>简介</strong>{{content.summary}}</div>
        <div class="news-con" id="showCont"></div>
      </div>
      <!-- <div class="share">
        <p class="diggit"><a href="javascript:;"><i class="icon-heart-empty"></i> 很赞哦！ </a></p>
        <p class="dasbox"><a href="javascript:;" class="dashang" title="打赏，支持一下">￥ 打赏本站</a></p>
        <div class="hide-box"></div>
        <div class="shang-box">
          <i class="shang-close icon-remove-circle" onclick="dashangToggle()" title="关闭"></i>
          <div class="shang-tit">
            <p>感谢您的支持，我会继续努力的!</p>
          </div>
          <div class="shang-payimg"> <img src="" alt="扫码支持" title="扫一扫"> </div>
          <div class="pay-explain">扫码打赏，你说多少就多少</div>
          <div class="shang-payselect">
            <div class="pay-item checked" data-id="alipay">
              <span class="radiobox"></span><span class="pay-logo">
                <img src="" alt="支付宝"></span>
            </div>
            <div class="pay-item" data-id="weipay">
              <span class="radiobox"></span>
              <span class="pay-logo">
                <img src="" alt="微信">
              </span>
            </div>
          </div>
        </div>
      </div> -->
      <div class="nextinfo">
        <p>上一篇：<a href="/more/show/24.html">Just One Last Dance</a></p>
        <p>下一篇：<a href="/more/show/">返回列表</a></p>
      </div>
      <div class="otherlink">
        <h2><i class="icon-comments-alt"></i> 沙发区</h2>
      </div>
    </div>
  </div>
</template>
<style scoped src="../assets/css/detail.css">
  /* @import '../assets/css/detail.css'; */
</style>
<script>
  import Header from '@/components/Header.vue';
  import { api_detail } from '@/api/index';
  export default {
    name: 'detail',
    components: {
      Header
    },
    metaInfo: {
      title: 'this.content.title', // set a title
      meta: [{ // set meta
        name: 'keyWords',
        content: "文字=在v大撒法定时"
      }, {
        name: 'Description',
        content: 'this.content.summary'
      }]
    },
    data() {
      return {
        contId: '',
        content: {},
        coverter: ''
      }
    },
    mounted() {
      this.pageInit()
    },
    methods: {
      pageInit() {
        let showdown = require('showdown');
        let coverter = new showdown.Converter();
        this.converter = coverter;
        this.contId = this.$route.query.contId;
        api_detail({
          params: {
            contId: this.contId
          }
        }).then(res => {
          console.log(res);
          this.content = res.content;
          this.content.cateName = res.content.categoryId.category;
          let html = this.converter.makeHtml(res.content.content);
          document.getElementById('showCont').innerHTML = html;
        }).catch(err => {
          this.$message.error(err)
        })
      },
    }
  }
</script>