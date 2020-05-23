<template>
  <div class="all-wrapper">
    <div class="show-article">
      <article-detail :detail="detail" v-if="showDetailFlag"></article-detail>
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
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="recommend">推荐文章</span>
        </div>
        <ul class="menu-content" v-infinite-scroll="load" style="overflow:auto">
          <li v-for="(item,index) of allArticles" :key="index" class="menu-content-li">
            <p class="li-header">{{item.Title}}</p>
            <p class="li-msg">
              <span><i class="el-icon-map-location"></i>{{item.Location}}</span>
              <el-button type="primary" class="button-detail" plain @click="handleShowDetail(item)">查看详情</el-button>
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
      showDetailFlag: false,
      activeName: 'local',
      detail: {
        Body: '',
        EDate: '',
        Location: '',
        Public: null,
        SDate: '',
        Title: '',
        Userid_id: null,
        allComments: [],
        author: '',
        id: null,
        likeNum: null
      },
      count: 0,
      allArticles: [],
      recommendArticles: [],
      searchCity: '',
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
      console.log(item.id);
      // 获取文章主内容
      const resA = await getShowArticle({
        action: 'show_article',
        articleid: item.id
      });
      this.detail = resA.article[0];
      this.detail.author = resA.username;
      this.changeArticleId(this.detail.id);
      // console.log('返回latestArticleId:', this.latestArticleId);
      // 获取文章评论点赞信息
      const resMsg = await getArticleDetail({
        articleId: this.detail.id
      });
      this.detail.allComments = resMsg.recommend;
      this.detail.likeNum = resMsg.likenumber;
      // console.log('comments:', resMsg);
      console.log('article msg:', this.detail);
      // const resDetail = await getShowArticle({
    //   action: 'show_article',
    //   articleid: this.allArticles[0].id
    // });
    // console.log('z wy ', resDetail);
    // this.detail = resDetail.article[0];
    // this.detail.author = resDetail.username;
    // // articleMsg.author = resDetail.username;
    // // 获取文章评论点赞数
    // const resMsg = await getArticleDetail({
    //   articleId: this.detail.id
    // });
    // this.detail.allComments = resMsg.recommend;
    // this.detail.likeNum = resMsg.likenumber;
    // // console.log('comments:', resMsg);
    // console.log('article msg:', this.detail);
    // this.showDetailFlag = true;
    // this.detail = this.allArticles[0];
    // console.log(this.recommendArticles);
      // console.log('de', this.detail);
    },
    async handleSelect() {
      const local = this.searchCity;
      const param = {
        action: 'search_by_location',
        userid: this.user.userid,
        location: local
      };
      console.log('check search:', param);
      const res = await getArticleSearch(param);
      console.log(res);
    }
  },
  // mounted() {
  //   // console.log(articleData);
  // },
  async created() {
    const res = await getAll({
      action: 'recommend'
    });
    // console.log('all', res.retlist);
    this.allArticles = res.retlist;
    // console.log('show articles:', res);
    for (let i = 0; i < 10; i += 1) {
      if (this.allArticles[i] !== undefined) {
        this.recommendArticles[i] = this.allArticles[i];
      } else { break; }
    }
    // 获取文章具体内容
    this.showDetailFlag = true;
    // 先完成articleshow的渲染在进行文章内容显示的渲染
    //否则detail还未成功传送，会报错
    if (localStorage.latestArticleId === undefined) {
      console.log('no latestArticleId now');
    } else {
      // console.log('latest:', this.latestArticleId);
      // 重新/初始渲染文章页时请求最近看过的文章详情
      const res = await getShowArticle({
        action: 'show_article',
        articleid: parseInt(localStorage.latestArticleId, 10)
      });
      console.log('最近文章：', res);
      this.detail = res.article[0];
      this.detail.author = res.username;
      const resMsg = await getArticleDetail({
        articleId: this.detail.id
      });
      this.detail.allComments = resMsg.recommend;
      this.detail.likeNum = resMsg.likenumber;
    }
    
  }
};
</script>

<style lang="scss" scoped>
@import '@/theme/variable.scss';

.all-wrapper {
  margin: 0 70px;
  margin-top: 33px;
}
// 文章显示框样式
.show-article {
  display: inline-block;
  width: 650px;
}
// 文章推荐列
.recommend {
  font-size: 15px;
}
.box-card {
  width: 350px;
  height: 410px;
}
.button-detail {
  padding: 2px;
  border: none;
  border-bottom: 0.9px solid;
  margin-left: 15px;
  color: $--color-title;
}
.article-menu {
  width: 350px;
  height: 450px;
  display: inline-block;
  margin-left: 120px;
  vertical-align: top;
}
.menu-content {
  height: 320px;
  width: 330px;
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
  width: 270px;
  margin-bottom: 25px;
}
.search-button {
  margin-left: 10px;
  padding: 9px 20px;
  background-color: #545c64;
  color: #ffd04b;
}
</style>
