<template>
  <div class="wrapper">
    <div  v-show="articleDetailShow" opacity=".5">
      <el-page-header @back="goBack" content="文章详情" class="back-sign"></el-page-header>
      <article-detail></article-detail>
    </div>
    <div v-show="!articleDetailShow">
      <div class="main-left">
        <div class="show-name">个人空间</div>
      <!-- el-ui实现导航列表-->
        <div class="menu">
          <el-menu default-active="2"
            class="el-menu-vertical-demo"
            @select="handleSelect"
          >
            <el-menu-item index="1">
              <i class="el-icon-user"></i>
              <span class="menu-desc">我的关注</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-document"></i>
              <span class="menu-desc">我的文章</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-thumb"></i>
              <span class="menu-desc">我的点赞</span>
            </el-menu-item>
          </el-menu>
        </div>
        <!-- 走马灯-->
        <div class="block">
          <el-badge value="hot" class="item">
            <span class="demonstration">推荐</span>
          </el-badge>
          <el-carousel height="200px">
            <el-carousel-item v-for="(item,index) in imgs" :key="index">
              <div class="img-wrapper">
                <img :src="item.url" alt="signt" class="block-img">
              </div>
              <p class="small">{{item.title}}</p>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <!-- 列表-->
      <div class="show-list">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <p class="menu-title">{{menuTitle}}</p>
          </div>
          <div class="menu-show" style="overflow:auto">
            <!-- 我的文章/我的点赞 -->
            <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto" v-show="isArticles">
              <li v-for="(item,index) in theArticle" :key="index" class="infinit-list">
                <div class="li-title">
                  {{item.title}} <span>{{item.time}}</span>
                </div>
                <div class="li-words">{{item.content}}</div>
                <el-button type="primary" size="mini" plain @click="showDetail">查看详情</el-button>
                <el-divider><i class="el-icon-tickets"></i></el-divider>
              </li>
            </ul>
            <!-- 我的关注-->
            <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto" v-show="isMyFocus">
              <li v-for="(item,index) in focus" :key="index">
                <div class="focus-name">{{item.name}}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </div>
      <right-side :locals="localName"></right-side>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ArticleDetail from '@/components/Article.vue';
import { getMyArticles } from '@/api/demo';

import personalData from './components/personal.json';
import RightSide from './components/RightSide.vue';

export default {
  name: 'personalSpace',
  components: {
    RightSide,
    ArticleDetail
  },
  computed: {
    ...mapState(['users'])
  },
  data() {
    return {
      // 保存json文档的相关数据
      focus: [],
      myArticle: [],
      giveThumbs: [],
      localName: [],
      // 列表显示所用数据
      menuTitle: '我的文章',
      theArticle: [],
      imgs: [],// 推荐走马灯
      count: 0,
      // 列表显示条件
      isArticles: true,
      isMyFocus: false,
      // isMyThumbs: false,
      // 文章详情
      articleDetailShow: false
    };
  },
  methods: {
    handleSelect(index) {
      if (index === '1') {
        this.menuTitle = '我的关注';
        this.isMyFocus = true;
        this.isArticles = false;
        // this.isMyThumbs = false;
      } else if (index === '2') {
        this.menuTitle = '我的文章';
        this.theArticle = this.myArticle;
        this.isArticles = true;
        this.isMyFocus = false;
        // this.isMyThumbs = false;
      } else if (index === '3') {
        this.menuTitle = '我的点赞';
        // this.isMyThumbs = true;
        this.isMyArticles = true;
        this.theArticle = this.giveThumbs;
        this.isMyFocus = false;
      }// else {}
    },
    load() {
      this.count += 2;
    },
    showDetail() {
      this.articleDetailShow = true;
      console.log('show it');
    },
    goBack() {
      this.articleDetailShow = false;
    }
  },
  mounted() {
    const Data = personalData.data;
    this.focus = Data.focus;// 关注的人
    this.myArticle = Data.myArticle;// 我的文章
    this.theArticle = Data.myArticle;
    this.giveThumbs = Data.giveThumbs;// 我的点赞
    this.imgs = Data.imgs;// 推荐轮播图
    this.localName = Data.localName;
  },
  created() {
    getMyArticles({ userName: 'a' });
  }
};
</script>

<style lang="scss">
@import '@/theme/variable.scss';
.wrapper {
  width: 1200px;
  margin: 0px auto;
  font-weight: 600;
}
.back-sign {
  margin: 10px 0 0 50px;
  color: #f56c6c;
}
.main-left {
  width: 300px;
  display: inline-block;
}
.show-name {
  margin:30px 0;
  width: 300px;
  color: $--color-title;
  font-size: 25px;
}
// 导航条
.menu {
  display: inline-block;
  width: 180px;
  margin-right: 100px;
}
.el-menu {
  border-right: none;
}
.menu-desc {
  padding-left: 5px;
  color: $--color-title;
  font-weight: 500;
}
// 走马灯
.small {
  font-size: 13px;
  font-weight: normal;
  color: $--color-info;
  text-align: center;
}
.block {
  width: 220px;
  margin-top: 30px;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.block-img {
  width: 100%;
}
.img-wrapper {
  height: 150px;
  margin-top: 5px;
}
.el-carousel__button {
  margin-top: -60px;
  width: 10px;
  background: rgba($color: $--color-text-placeholder, $alpha: 1);
}
.demonstration {
  font-size: 15px;
  font-weight: normal;
  text-decoration: underline;
  padding: 8px;
}
// 匹配列表
.show-list {
  vertical-align: top;
  display: inline-block;
  width: 600px;
  height: 410px;
  margin-top: 91px;
}
.menu-title {
  text-align: center;
  color: $--color-title;
}
.infinit-list .el-button {
  padding: 4px;
  margin: 15px 0 0 20px;
}
.menu-show {
  height: 320px;
  padding-bottom: 10px;
}
.menu-show > ul {
  height: 100%;
}
.infinit-list {
  font-weight: normal;
  border-radius: 6px;
  margin-left: 0;
  padding: 0 10px;
}
.focus-name {
  color: $theme-5-hex;
  font-size: 16px;
  text-decoration: underline;
  height: 45px;
  width: 500px;
  line-height: 45px;
  border-bottom: 1px solid $--border-color-base;
}
.li-title {
  font-size: 16px;
  margin: 4px 0 10px 10px;
  color: $--color-title;
  font-weight: 600;
}
.li-title span {
  font-size: 12px;
  font-weight: normal;
  padding: 0 3px 1px 3px;
  border-bottom: 1px solid #eaebee;
}
.li-words {
  font-size: 14px;
  // 省略内容设置
  overflow: hidden;
  display: -webkit-box;
  text-overflow:ellipsis;
  -webkit-line-clamp:2;
  -webkit-box-orient: vertical;
}
.box-card {
  width: 580px;
  height: 410px;
}
.search-report {
  display: inline-block;
  width: 250px;
  background-color: red;
  vertical-align: top;
  margin-top: 91px;
}
</style>
