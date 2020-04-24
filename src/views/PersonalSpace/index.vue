<template>
  <div class="wrapper">
    <div class="main-left">
      <div class="show-name"><span class="name">{{users.UserName}}</span><span class="space">的空间</span></div>
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
          <i class="el-icon-tickets"></i>
          <span class="menu-desc">我的文章</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-thumb"></i>
          <span class="menu-desc">别人赞我</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-thumb"></i>
          <span class="menu-desc">我赞别人</span>
        </el-menu-item>
      </el-menu>
    </div>
    </div>
    <!-- 列表-->
    <div class="show-list">
      <div class="menu-title">{{menuTitle}}</div>
      <div class="contentWrapper" ref="contentWrapper">
        <div>
          <div class="content" v-for="(item,index) of contentSum" :key="index">
          <div class="content-title">{{item.title}}</div>
          <div class="content-data">{{item.content}}</div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BScroll from 'better-scroll';
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
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.contentWrapper, { mouseWheel: true, click: true });
    const Data = personalData.data;
    this.focus = Data.focus;
    this.myArticle = Data.myArticle;
    this.getThumbs = Data.getThumbs;
    this.giveThumbs = Data.giveThumbs;
    this.contentSum = Data.myArticle;
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
}
.name {
  color: $--color-danger;
  font-size: 35px;
  padding:2px 8px;
  font-style: italic;
  border-bottom: 2px solid;
}
.space {
  color: $--color-title;
  font-size: 25px;
}
// 导航条
.menu {
  display: inline-block;
  width: 180px;
  margin-right: 100px;
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
// 匹配列表
.show-list {
  vertical-align: top;
  display: inline-block;
  width: 700px;
  height: 440px;
  background: #fff;
  border: 1.5px solid rgba($color: $--color-info, $alpha: 0.3);
  border-radius: 4px;
  margin-top: 35px;
}
.contentWrapper {
  width: 100%;
  height: 390px;
  overflow: hidden;
}
.menu-title {
  color: $theme-4-hex;
  font-size: 18px;
  padding: 10px 300px;
  margin-bottom: 5px;
  background: rgba($color: $theme-1-hex, $alpha: 0.7);
  border-bottom : 1px solid rgba($color: $--color-info, $alpha: 0.5);
}
.content {
  border-bottom : 1px solid rgba($color: $--color-info, $alpha: 0.5);
  padding: 0 20px;
  padding-bottom: 5px;
}
.content-title {
  font-size: 16px;
  margin: 5px 10px;
}
.content-data {
  font-size: 14px;
  color: rgb(85, 79, 79);
  font-weight: normal;
}
</style>
