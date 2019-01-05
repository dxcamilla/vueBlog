<template>
  <div v-if="Content.length > 0" class="container max-1180 home-container">
    <div class="tab-wrap">
      <div class="tab-list cur"><i class="icon-home"></i> 主页</div>
      <div class="tab-list"><i class="icon-tags"></i> 分类</div>
      <div class="tab-list"><i class="icon-heart"></i> 关于</div>
    </div>
    <div class="blog-part stick">
      <div class="chief-block">
        <div class="chief-tt blog-left">
          <div class="tag">
            <div class="tag-in">
              <i class="icon-pushpin"></i>置顶
            </div>
          </div>
          <h3 class="cat-tt">{{Content[0].title}}</h3>
        </div>
        <div class="chief-summary blog-right">
          <p class="summary">{{Content[0].summary}}</p>
          <a href="#" class="more">More</a>
        </div>
      </div>
    </div>
    <div class="blog-part">
      <div class="chief-block">
        <div class="chief-summary blog-left">
          <p class="summary">{{Content[1].summary}}</p>
          <a href="#" class="more">More</a>
        </div>
        <div class="chief-tt blog-right">
          <div class="tag">
            <div class="tag-in">
              <i class="icon-refresh"></i>最新
            </div>
          </div>
          <h3 class="cat-tt">{{Content[1].title}}</h3>
          <!-- content::{{content}} -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    props: {
      // stickContent: Object,
      // lastContent: Object
      Content: {
        type: Array,
        default: []
      }
    }
  }
</script>