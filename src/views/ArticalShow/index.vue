<template>
  <div class="all-wrapper">
    <div class="show-article">
      <article-detail></article-detail>
    </div>
    <div class="article-menu">
      <!-- 全局搜索 -->
      <!-- <el-autocomplete
        size="large"
        class="all-search"
        placeholder="按时间/地点搜索文章"
        suffix-icon="el-icon-search"
        v-model="allSearch"
        :value="allSearch"
        @select="handleSelect"
        :fetch-suggestions="querySearch"
      >
      </el-autocomplete> -->
      <el-tabs v-model="activeName" class="search-part">
        <el-tab-pane label="按地点搜索" name="local"><!-- 全局搜索 -->
          <el-autocomplete
            size="large"
            class="all-search"
            placeholder="按地点搜索文章"
            v-model="searchLocal"
            :value="allSearch"
            @select="handleSelect"
            :fetch-suggestions="querySearch"
          >
          </el-autocomplete>
          <el-button class="send-se" @click="handleSearch">搜索</el-button>
        </el-tab-pane>
        <el-tab-pane label="按时间搜索" name="time">
          <el-date-picker
            v-model="searchTime"
            type="date"
            placeholder="按开始日期搜索文章"
            size="large"
            class="all-search">
          </el-date-picker>
          <el-button class="send-se" @click="handleSearch">搜索</el-button>
        </el-tab-pane>
      </el-tabs>
      <!-- 推荐列表 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="recommend">推荐列表</span>
        </div>
        <ul class="menu-content" v-infinite-scroll="load" style="overflow:auto">
          <li v-for="(item,index) of recommendArticles" :key="index" class="menu-content-li">
            <!-- <p class="li-header">{{item.title}} </p> -->
            <div class="header-msg">
              <span class="li-header">{{item.title}}</span>
              <span class="msg lighter"><i class="el-icon-user"></i>：{{showArticle.author}}</span>
              <span class="msg">地点：{{showArticle.location}}</span>
            </div>
            <div class="li-content">{{item.content}}</div>
            <el-divider></el-divider>
          </li>
        </ul>
      </el-card>
    </div>
  </div>
</template>

<script>
import ArticleDetail from '@/components/Article.vue';
import articleData from './article.json';

export default {
  components: { ArticleDetail },
  data() {
    return {
      activeName: 'local',
      showArticle: {},
      count: 0,
      recommendArticles: [],
      searchLocal: '',
      searchTime: null,
      allLocals: [
        { value: '北京' },
        { value: '天津市' },
        { value: '上海市' },
        { value: '重庆市' },
        { value: '河北' },
        { value: '河南' },
        { value: '云南' },
        { value: '辽宁' },
        { value: '黑龙江' },
        { value: '湖南' },
        { value: '安徽' },
        { value: '山东' },
        { value: '新疆' },
        { value: '江苏' },
        { value: '浙江' },
        { value: '江西' },
        { value: '湖北' },
        { value: '广西壮族自治区' },
        { value: '甘肃' },
        { value: '山西' },
        { value: '内蒙古自治区' },
        { value: '陕西' },
        { value: '吉林' },
        { value: '福建' },
        { value: '贵州' },
        { value: '广东' },
        { value: '青海' },
        { value: '西藏自治区' },
        { value: '四川' },
        { value: '宁夏回族自治区' },
        { value: '海南' },
        { value: '台湾' },
        { value: '香港特别行政区' },
        { value: '澳门特别行政区' }
      ]
    };
  },
  methods: {
    load() {
      this.count += 2;
    },
    // 搜索自动匹配
    querySearch(queryString, cb) {
      const allLocals = this.allLocals;
      // results 保存匹配结果列表
      const results = queryString ? allLocals.filter(this.createFilter(queryString)) : allLocals;
      cb(results);
    },
    createFilter(queryString) {
      return (local) => { return (local.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0); };
    },
    handleSelect(item) {
      console.log(item.value);
    },
    handleSearch() {
      console.log('search');
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
// .clearfix:before,
// .clearfix:after {
//   display: table;
//   content: "";
// }
// .clearfix:after {
//   clear: both
// }
.box-card {
  width: 350px;
  height: 410px;
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
  width: 332px;
}
.menu-content-li {
  height: 88px;
  margin-top: 10px;
}
.li-content {
  width: 314px;
  font-size: 13px;
  // 部分显示
  overflow: hidden;
  display: -webkit-box;
  text-overflow:ellipsis;
  -webkit-line-clamp:2;
  -webkit-box-orient: vertical
}
// 列表信息
.header-msg {
  margin-bottom: 8px;
}
.msg {
  font-size: 13px;
  margin-left: 15px;
}
.header-msg .lighter {
  color: $--color-user;
  border-bottom: 0.7px solid;
  margin-left: 80px;
}
// .search-part {
//   margin-bottom: 20px;
// }
.all-search {
  width: 260px;
  margin-bottom: 25px;
}
.send-se {
  background-color: #545c64;
  color: #ffd04b;
  font-size: 14px;
  padding: 12px 20px;
  margin-left: 20px;
}
</style>
