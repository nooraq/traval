<template>
  <div class="all-wrapper">
    <div class="show-article">
      <article-detail :detail="detail" v-if="$route.params.id"></article-detail>
      <el-card v-else :style="{height: '4.5rem'}">随便搜点什么看看</el-card>
    </div>
    <div class="article-menu">
      <!-- 全局搜索 -->
      <el-select class="all-search" v-model="searchCity" placeholder="搜索感兴趣的文章" clearable filterable>
        <el-option
          v-for="(item,index) in allLocals"
          :key="index"
          :label="item.value"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button class="search-button" @click="handleSelect">搜索</el-button>
      <!-- 展示搜索结果 -->
      <el-card class="box-card" v-if="searchNow">
        <div slot="header" class="clearfix">
          <el-page-header @back="goBack" content="搜索结果"></el-page-header>
        </div>
        <ul class="menu-content" v-infinite-scroll="load" style="overflow:auto">
          <span class="msg" v-if="searchEmpty">没有搜到该地点的文章</span>
          <li v-for="(item,index) of searchResults" :key="index" class="menu-content-li">
            <p class="li-header">{{item.Title}}</p>
            <p class="li-msg">
              <span><i class="el-icon-map-location"></i>{{item.Location}}</span>
              <span class="start-time"><i class="el-icon-time"></i>{{item.SDate}}</span>
              <el-link type="primary" :href="`/#/articalShow/${item.id}`" class="link-detail">查看详情</el-link>
            </p>
            <el-divider></el-divider>
          </li>
        </ul>
      </el-card>
      <!-- 文章推荐结果 -->
      <el-card class="box-card" v-else>
        <div slot="header" class="clearfix">
          <span class="recommend">推荐文章</span>
        </div>
        <ul class="menu-content" v-infinite-scroll="load" style="overflow:auto">
          <li v-for="(item,index) of allArticles" :key="index" class="menu-content-li">
            <p class="li-header">{{item.Title}}</p>
            <p class="li-msg">
              <span><i class="el-icon-map-location"></i>{{item.Location}}</span>
              <el-link type="primary" :href="`/#/articalShow/${item.id}`" class="link-detail">查看详情</el-link>
            </p>
            <el-divider></el-divider>
          </li>
        </ul>
      </el-card>
    </div>
  </div>
</template>

<script>
import ArticleDetail from '@/components/Article.vue';
import { getArticleSearch, getAll, getShowArticle, getArticleDetail } from '@/api/demo';
import { mapState, mapMutations } from 'vuex';
// import articleData from './article.json';

export default {
  components: { ArticleDetail },
  data() {
    return {
      activeName: 'local',
      detail: {},
      count: 0,
      allArticles: [],
      recommendArticles: [],
      searchCity: '',
      searchResults: [],
      searchNow: false,
      searchEmpty: false
    };
  },
  computed: {
    ...mapState(['user', 'allLocals', 'latestArticleId'])
  },
  methods: {
    ...mapMutations(['changeArticleId']),
    load() {
      this.count += 2;
    },
    async handleShowDetail(item) {
      const res = await getShowArticle({
        action: 'show_article',
        articleid: item.id
      });
      this.detail = res.article;
    },
    async handleSelect() {
      const local = this.searchCity;
      const param = {
        action: 'search_by_location',
        userid: localStorage.userid,
        location: local
      };
      const res = await getArticleSearch(param);
      this.searchResults = res.retlist;
      if (this.searchResults.length === 0) {
        this.searchEmpty = true;
      } else { this.searchEmpty = false; }
      this.searchNow = true;
    },
    goBack() {
      this.searchNow = false;
    }
  },
  watch: {
    async $route() {
      // 路径params变化不产生重新渲染，需通过监听改变文章详情
      const resDetail = await getShowArticle({
        action: 'show_article',
        articleid: this.$route.params.id
      });
      this.detail = resDetail.article[0];
      this.detail.author = resDetail.username;
      // // 获取文章评论点赞数
      const resMsg = await getArticleDetail({
        articleId: this.detail.id
      });
      this.detail.allComments = resMsg.recommend;
      this.detail.likeNum = resMsg.likenumber;
    }
  },
  async created() {
    const res = await getAll({
      action: 'recommend'
    });
    this.allArticles = res.retlist;
    for (let i = 0; i < 10; i += 1) {
      if (this.allArticles[i] !== undefined) {
        this.recommendArticles[i] = this.allArticles[i];
      } else { break; }
    }
    if (!this.$route.params.id) {
      return;
    }
    // 获取文章具体内容
    const resDetail = await getShowArticle({
      action: 'show_article',
      articleid: this.$route.params.id
    });
    this.detail = resDetail.article[0];
    this.detail.author = resDetail.username;
    // // 获取文章评论点赞数
    const resMsg = await getArticleDetail({
      articleId: this.detail.id
    });
    this.detail.allComments = resMsg.recommend;
    this.detail.likeNum = resMsg.likenumber;
  }
};
</script>

<style lang="scss" scoped>
@import '@/theme/variable.scss';

.all-wrapper {
  margin: 0 70px;
  margin-top: 33px;
  width: 100%;
}
// 文章显示框样式
.show-article {
  display: inline-block;
  width: 50%;
}
// 文章推荐列
.recommend {
  font-size: 15px;
}
.box-card {
  width: 100%;
  height: 420px;
}
.link-detail {
  padding: 2px;
  // border: none;
  // border-bottom: 0.9px solid;
  margin-left: 15px;
  // color: $--color-title;
  font-size: 13px;
}
.article-menu {
  width: 28%;
  height: 450px;
  display: inline-block;
  margin-left: 120px;
  vertical-align: top;
}
.menu-content {
  height: 320px;
  // width: 94%;
}
.menu-content-li {
  height: 60px;
  margin-top: 15px;
}
// 列表信息
.header-msg {
  margin-bottom: 8px;
  height: 30px;
  line-height: 30px;
}
.li-header {
  font-size: 15px;
  color: $--color-title;
  margin-bottom: 8px;
  // color: blue;
}
.location {
  font-size: 13px;
  margin-left: 20px;
}
.li-msg {
  font-size: 12px;
  color: $--color-info;
}
.all-search {
  width: 70%;
  margin-bottom: 25px;
}
.search-button {
  margin-left: 10px;
  padding: 9px 20px;
  background-color: #545c64;
  color: #ffd04b;
}
.start-time {
  margin: 0 10px;
}
</style>
