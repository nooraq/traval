<template>
  <div class="all-wrapper">
    <div class="show-article">
      <div class="article-header">
        <p class="header-title">{{showArticle.title}}</p>
        <div class="header-msg">
          <span class="msg">地点：{{showArticle.location}}</span>
          <span class="msg">时间：{{showArticle.time}}</span>
        </div>
      </div>
      <div class="content" v-infinite-scroll="load" style="overflow:auto">
          {{showArticle.content}}
          {{showArticle.content}}
          {{showArticle.content}}
          {{showArticle.content}}
          {{showArticle.content}}
          {{showArticle.content}}
          {{showArticle.content}}
          {{showArticle.content}}
          {{showArticle.content}}
      </div>
    </div>
    <div class="article-menu">
      <div class="menu-header">
        推荐列表
      </div>
      <ul class="menu-content" v-infinite-scroll="load" style="overflow:auto">
        <li v-for="(item,index) of recommendArticles" :key="index" class="menu-content-li">
          <p class="li-header">{{item.title}}</p>
          <div class="li-content">{{item.content}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import articleData from './article.json';

export default {
  data() {
    return {
      showArticle: {},
      count: 0,
      recommendArticles: []
    };
  },
  methods: {
    load() {
      this.count += 2;
    }
  },
  mounted() {
    console.log(articleData);
    const Data = articleData.data;
    this.showArticle = Data.showArticle;
    this.recommendArticles = Data.recommendArticles;
  }
};
</script>

<style lang="scss" scoped>
@import '@/theme/variable.scss';

.all-wrapper {
  margin: 0 70px;
  margin-top: 50px;
}
// 文章显示框样式
.show-article {
  display: inline-block;
  width: 650px;
  height: 450px;
  background: #fff;
}
// 内容
.content {
  width: 610px;
  height: 340px;
  padding:0 20px 20px 20px;
  margin-top: 20px;
  font-size: 14px;
}
// 文章显示头部
.article-header {
  height: 50px;
  padding-top: 20px;
  background: rgba($color: $theme-1-hex, $alpha: .5);
  border-radius: 4px;
}
.header-title {
  font-size: 18px;
  text-align: center;
}
.header-msg {
  text-align: right;
  margin-right: 35px;
}
.msg {
  font-size: 13px;
  padding: 0 10px;
}
// 文章推荐列
.article-menu {
  width: 350px;
  height: 450px;
  display: inline-block;
  margin-left: 120px;
  border-radius: 6px;
  vertical-align: top;
  font-size: 15px;
  background-color: #fff;
  // padding: 4px;
}
.menu-content {
  height: 400px;
  padding: 0 10px 10px 10px;
}
.menu-header {
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  text-decoration: underline;
  background: rgba($color: $theme-1-hex, $alpha: .5);
}
.menu-content-li {
  height: 90px;
  margin-top: 10px;
  border-bottom: 1px solid rgb(151, 145, 145);
}
.li-content {
  width: 314px;
  font-size: 13px;
  margin-top: 10px;
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  text-overflow:ellipsis;
  -webkit-line-clamp:3;
  -webkit-box-orient: vertical
}
</style>
