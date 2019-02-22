<template>
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
</template>