<template>
  <div class="wrapper">
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
          <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
          <li v-for="(item,index) in contentSum" :key="index" class="infinit-list">
            <div class="li-title">{{item.title}} <span>{{item.time}}</span></div>
            <div class="li-words">{{item.content}}</div>
            <el-divider><i class="el-icon-tickets"></i></el-divider>
          </li>
        </ul>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import personalData from './personal.json';

export default {
  name: 'personalSpace',
  computed: {
    ...mapState(['users'])
  },
  data() {
    return {
      // 保存json文档的相关数据
      focus: [],
      myArticle: [],
      getThumbs: [],
      giveThumbs: [],
      // 列表显示所用数据
      menuTitle: '我的文章',
      contentSum: [],
      imgs: [],
      count: 0
    };
  },
  methods: {
    handleSelect(index) {
      if (index === '1') {
        this.menuTitle = '我的关注';
        this.contentSum = this.focus;
      } else if (index === '2') {
        this.menuTitle = '我的文章';
        this.contentSum = this.myArticle;
      } else if (index === '3') {
        this.menuTitle = '我的点赞';
        this.contentSum = this.giveThumbs;
      } else {
      }
    },
    load() {
      this.count += 2;
    }
  },
  mounted() {
    const Data = personalData.data;
    this.focus = Data.focus;
    this.myArticle = Data.myArticle;
    this.getThumbs = Data.getThumbs;
    this.giveThumbs = Data.giveThumbs;
    this.contentSum = Data.myArticle;
    this.imgs = Data.imgs;
  }
};
</script>

<style lang="scss">
@import '@/theme/variable.scss';
.wrapper {
  width: 1150px;
  margin: 0px auto;
  font-weight: 600;
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
  width: 700px;
  height: 410px;
  margin-top: 91px;
}
.menu-title {
  text-align: center;
  color: $--color-title;
}
.menu-show {
  height: 320px;
  padding-bottom: 10px;
}
.menu-show > ul {
  height: 100%;
}
.infinit-list {
  margin: 5px 0;
  // border: 1px solid #ebeef5;
  font-weight: normal;
  border-radius: 6px;
  margin-left: 0;
  padding: 10px;
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
}
// el 实现列表
// .text {
//   font-size: 14px;
//   height: 360px;
// }
// .item {
//   margin-bottom: 18px;
// }
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.box-card {
  width: 580px;
  height: 410px;
}
</style>
