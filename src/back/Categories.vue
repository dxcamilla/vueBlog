<template>
  <div class="cate-box">
    <Header />
    <leftBar :navItems="navItems" />

    <div class="cate-main">
      <ul class="blog-lists">
        <li class="blog-card" v-for="content of contents">
          <div class="card-inner">
            <router-link :to="{path: '/detail', query:{contId: content._id}}" class="tbl">
              <div class="cate-icon">
                <span style="background-image:url();"></span>
              </div>
              <div class="tt-box">
                <h2>{{content.title}}</h2>
                <p class="summary">{{content.summary}}</p>
              </div>
            </router-link>
            <div class="act-btn">
              <span>
                <i class="icon-star-empty"></i>
                123445
              </span>
              <span>
                <i class="icon-thumbs-up-alt"></i>
                123445
              </span>
            </div>
          </div>
        </li>
        <!-- <li class="blog-card">
                  <div class="card-inner">
                    <router-link to="" class="tbl">
                      <div class="cate-icon">
                        <span style="background-image:url();"></span>
                      </div>
                      <div class="tt-box">
                        <h2>红色高跟鞋红色高跟鞋红色高跟色高红色高跟鞋红色高跟鞋红色高跟色高</h2>
                        <p class="summary">红色高跟鞋红色高跟鞋红色高跟色高红色高跟鞋红色高跟鞋红色高跟色高红色高跟鞋红色高跟鞋红色高跟色高红色高跟鞋红色高跟鞋红色高跟色高红色高跟鞋红色高跟鞋红色高跟色高红色高跟鞋红色高跟鞋红色高跟色高高红色高跟鞋红色高跟鞋红色高跟色高红色高跟鞋红色高跟鞋红色高跟色高红色高跟鞋红色高跟鞋红色高跟色高红色高跟鞋红色高跟鞋红色高跟色高红色高跟鞋红色高跟鞋红色高跟色高红色高跟鞋红色高跟鞋红色高跟色高高</p>
                      </div>
                    </router-link>
                    <div class="act-btn">
                      <span>
                        <i class="icon-star-empty"></i>
                        123445
                      </span>
                      <span>
                        <i class="icon-thumbs-up-alt"></i>
                        123445
                      </span>
                    </div>
                  </div>
                </li> -->
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scope="scoped">
  body {
    background: #fafafa;
  }

  .cate-box {
    width: 100vw;
    min-height: 100vh;
    background: #fafafa;
  }

  .tbl {
    display: table;
  }

  .cate-main {
    margin: 0 auto;
    padding: 80px 0 0 200px;
    max-width: 1280px;
  }

  .blog-lists {
    overflow: hidden;
    padding-right: 20px;

    .blog-card {
      padding: 10px;
      width: 100%;
    }

    .card-inner {
      position: relative;
      padding: 15px 15px 50px;
      border-radius: 4px;
      background: #fff;
    }


    .cate-icon {
      /* display: table-cell; */
      float: left;
      overflow: hidden;
      width: 160px;
      vertical-align: middle;

      span {
        display: inline-block;
        /* border-radius: 100%; */
        border: 1px solid #d7d7d7;
        width: 140px;
        height: 140px;
        vertical-align: middle;
      }
    }

    .summary {
      position: relative;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      margin-top: 15px;
      /* padding-left: 60px; */
      max-height: 80px;
      line-height: 20px;
      font-size: 14px;
      color: #666;
      text-indent: 2em;

      /* &:before {
        content: "简介:";
        position: absolute;
        top: -2px;
        left: 15px;
        font-weight: bold;
        color: #fd4733;
      } */
    }

    .tt-box {
      /* display: table-cell; */

      margin-left: 160px;
      font-size: 18px;
      color: #333;


      h2 {
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }

    .act-btn {
      position: absolute;
      bottom: 20px;
      right: 20px;

      i {
        font-size: 14px;
      }

      span {
        font-size: 12px;
        cursor: pointer;
        margin-left: 15px;
        color: #666;
      }
    }
  }
</style>
<script>
  import leftBar from "@/components/leftBar/leftBar"
  import Header from '@/components/Header.vue';
  import { api_category } from '@/api/index';
  export default {
    name: 'categories',
    components: {
      leftBar,
      Header
    },
    data() {
      return {
        navItems: [],
        contents: [],
        cateId: ''
      }
    },

    mounted() {
      this.pageInit()
    },
    route: {
      data({ to: { params: { cateId } } }) {
        return Promise.all([
          this.pageInit()
        ]).then(() => {
          console.log("update")
        })
      }
    },
    methods: {
      pageInit() {
        this.cateId = this.$route.query.cateId;
        api_category({
          params: {
            cateId: this.cateId
          }
        }).then(res => {
          console.log(res)
          const cates = res.categories;
          let arr = [];
          cates.forEach((item, index) => {
            let objItem = {};
            objItem.link = `categories?cateId=${item._id}`
            objItem.name = item.category;
            this.navItems.splice(index, 1, objItem);
          });
          this.contents = res.data;

        }).catch(err => {
          this.$message.error(err)
        })
      }
    },
  }
</script>