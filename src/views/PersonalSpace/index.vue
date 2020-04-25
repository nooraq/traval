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
            <!-- <i class="el-icon-user"></i> -->
            <p class="menu-desc el-icon-user"> 我的关注</p>
          </el-menu-item>
          <el-menu-item index="2">
            <p class="menu-desc el-icon-tickets"> 我的文章</p>
          </el-menu-item>
          <el-menu-item index="3">
            <p class="menu-desc el-icon-thumb"> 别人赞我</p>
          </el-menu-item>
          <el-menu-item index="4">
            <p class="menu-desc el-icon-thumb"> 我赞别人</p>
          </el-menu-item>
        </el-menu>
      </div>
      <!-- 走马灯-->
      <div class="block">
        <p class="demonstration">推荐</p>
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
      <!-- <div class="menu-title">{{menuTitle}}</div>
      <div class="contentWrapper">
          <div class="content" v-for="(item,index) of contentSum" :key="index">
          <div class="content-title">{{item.title}}</div>
          <div class="content-data">{{item.content}}</div>
      </div>
      </div> -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <p class="menu-title">{{menuTitle}}</p>
        </div>
        <div class="menu-show" v-infinite-scroll="load" style="overflow:auto">
          <div v-for="(item,index) in contentSum" :key="index" class="text item">
          {{item.title}}
        </div>
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
        this.menuTitle = '别人赞我';
        this.contentSum = this.getThumbs;
      } else {
        this.menuTitle = '我赞别人';
        this.contentSum = this.giveThumbs;
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
.menu-one {
  height:40px;
  line-height: 40px;
  padding-left: 15px;
  font-size: 15px;
  cursor: pointer;
}
.menu-one:hover {
  background: rgba($color: $theme-1-hex, $alpha: 0.2);
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
  margin-top: 20px;
}
.block-img {
  width: 100%;
}
.img-wrapper {
  height: 150px;
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
  padding: 4px;
}
// 匹配列表
.show-list {
  vertical-align: top;
  display: inline-block;
  width: 700px;
  height: 430px;
  margin-top: 93px;
}
// el 实现列表
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
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
  height: 430px;
}
</style>
