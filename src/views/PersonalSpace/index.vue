<template>
  <div class="wrapper">
    <div>
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
        <el-card class="box-card" v-if="showFocusArticle">
          <div slot="header" class="clearfix">
            <el-page-header @back="goBack" content="该作者所有公共文章"></el-page-header>
          </div>
          <div class="menu-show" style="overflow:auto">
            <!-- 被关注人的所有文章 -->
            <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
              <li v-for="(item,index) in focusArticles" :key="index" class="infinit-list">
                <div class="li-title">
                  {{item.Title}}
                </div>
                <div class="li-words">
                  <span class="msg lighter"><i class="el-icon-user"></i></span>
                  <span class="location"><i class="el-icon-map-location"></i>{{item.Location}}</span>
                  <span><i class="el-icon-alarm-clock"></i>
                    {{item.SDate}}<i class="el-icon-minus"></i>{{item.EDate}}
                  </span>
                </div>
                <el-link type="primary" :href="`/#/articalShow/${item.id}`" class="link">查看详情</el-link>
                <el-divider><i class="el-icon-tickets"></i></el-divider>
              </li>
            </ul>
          </div>
        </el-card>
        <el-card class="box-card" v-else>
          <div slot="header" class="clearfix">
            <p class="menu-title">{{menuTitle}}</p>
          </div>
          <div class="menu-show" style="overflow:auto">
            <!-- 我的文章/我的点赞 -->
            <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto" v-show="isArticles">
              <li v-for="(item,index) in theArticle" :key="index" class="infinit-list">
                <div class="li-title">
                  {{item.Title}}
                </div>
                <div class="li-words">
                  <span class="location"><i class="el-icon-map-location"></i>{{item.Location}}</span>
                  <span><i class="el-icon-alarm-clock"></i>
                    {{item.SDate}}<i class="el-icon-minus"></i>{{item.EDate}}
                  </span>
                  <span class="location" v-if="showCondtion">状态：<span v-if="!item.Public">私密</span><span v-else>公开</span> </span>
                </div>
                <el-link type="primary" :href="`/#/articalShow/${item.id}`" class="link">查看详情</el-link>
                <el-divider><i class="el-icon-tickets"></i></el-divider>
              </li>
            </ul>
            <!-- 我的关注-->
            <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto" v-show="isMyFocus">
              <li v-for="(item,index) in focus" :key="index">
                <p class="focus-name"><i class="el-icon-user"></i><span class="befollow" @click="handleFollowName(item.UserName)">{{item.UserName}}</span></p>
                <el-divider></el-divider>
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
import { getMyArticles, getArticleDetail, getMyFollow, getMyLike } from '@/api/demo';

import personalData from './components/personal.json';
import RightSide from './components/RightSide.vue';

export default {
  name: 'personalSpace',
  components: {
    RightSide,
    ArticleDetail
  },
  computed: {
    ...mapState(['user'])
  },
  data() {
    return {
      // 保存json文档的相关数据
      focus: [],
      focusName: '',// 被展示其所有文章的被关注人
      focusArticles: [],// 被关注人的所有文章
      myArticle: [],
      giveThumbs: [],
      localName: [],
      showCondtion: true,
      // 列表显示所用数据
      menuTitle: '我的文章',
      theArticle: [],
      imgs: [], // 推荐走马灯
      count: 0,
      detail: {},// 文章详情
      // 列表显示条件
      showFocusArticle: false,// 是否展示被关注者文章
      isArticles: true,
      isMyFocus: false,
    };
  },
  methods: {
    async handleSelect(index) {
      if (index === '1') {
        const res = await getMyFollow({ userName: localStorage.username });
        console.log('follow:', res);
        this.focus = res.data;
        this.menuTitle = '我的关注';
        this.isMyFocus = true;
        this.isArticles = false;
        // this.isMyThumbs = false;
      } else if (index === '2') {
        console.log('personal', localStorage.username);
        const res = await getMyArticles({ userName: localStorage.username });
        console.log('myall', res);
        this.menuTitle = '我的文章';
        this.theArticle = this.myArticle;
        this.goBack();
        this.isArticles = true;
        this.isMyFocus = false;
        this.showCondtion = true;
        // this.isMyThumbs = false;
      } else if (index === '3') {
        // console.log('user is', localStorage.username);
        const res = await getMyLike({ userName: localStorage.username });
        console.log('my like:', res);
        this.giveThumbs = res.data;
        console.log('看点赞：', this.giveThumbs);
        this.menuTitle = '我的点赞';
        this.goBack();
        // this.isMyThumbs = true;
        this.isMyArticles = true;
        this.showCondtion = false;
        this.theArticle = this.giveThumbs;
        console.log('展示看：', this.theArticle);
        this.isMyFocus = false;
      }// else {}
    },
    async handleFollowName(name) {
      // this.$message(name);
      this.focusArticles = [];// 每次重新查看被关注者要将列表清空
      const res = await getMyArticles({ userName: name });
      const followData = res.data;
      console.log('查看状态：', followData);
      for (let i = 0; i < followData.length; i+=1) {
        let isPublic = followData[i].Public;
        if (isPublic) {
          this.focusArticles.push(followData[i]);
        }
      }
      // this.focusArticles = res.data;
      console.log('follow all', this.focusArticles);
      this.showFocusArticle = true;
    },
    goBack() {
      this.showFocusArticle = false;
    },
    load() {
      this.count += 2;
    },
  },
  mounted() {
    const Data = personalData.data;
    // this.theArticle = this.myArticle;
    this.imgs = Data.imgs;// 推荐轮播图
    this.localName = Data.localName;
  },
  async created() {
    const res = await getMyArticles({ userName: localStorage.username });
    console.log('myall', res);
    this.myArticle = res.data;
    this.theArticle = res.data;
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
  // padding-right: 20px;
  height: 45px;
  // width: 500px;
  line-height: 45px;
  // border-bottom: 1px solid $--border-color-base;
}
.befollow {
  text-decoration: underline;
  padding: 10px;
  font-weight: normal;
  cursor: pointer;
}
.li-title {
  font-size: 16px;
  margin: 4px 0 10px 0;
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
.location {
  margin-right: 15px;
  margin-left: 10px;
}
</style>
