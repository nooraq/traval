<template>
  <div class="article-body">
    <!-- <el-page-header @back="goBack" content="文章详情" class="back-sign"></el-page-header> -->
    <div class="content-wrapper">
      <!-- 文章显示内容-->
      <el-card class="box-card">
        <!-- 文章头部 -->
        <div slot="header" class="clearfix">
          <p class="header-title" v-text="showArticle.title"></p>
          <div class="header-msg">
            <span class="msg lighter"><i class="el-icon-user"></i>: {{showArticle.author}}</span>
            <span class="msg">地点：{{showArticle.location}}</span>
            <span class="msg">时间：{{showArticle.time}}</span>
          </div>
        </div>
        <!-- 文章内容 -->
        <div class="content" v-infinite-scroll="load" style="overflow:auto" v-text="showArticle.content"></div>
      </el-card>
      <!-- 评论、点赞、关注-->
      <div class="show-msg">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1"><i class="el-icon-chat-line-square"></i><span class="msg">评论 {{allComments.length}}</span></el-menu-item>
          <el-menu-item index="2"><i class="el-icon-thumb"></i><span class="msg">点赞 {{thumbNum}}</span></el-menu-item>
          <el-menu-item index="3"><i class="el-icon-star-off"></i><span class="msg">{{startState}}</span></el-menu-item>
        </el-menu>
        <div class="show-comment" style="overflow:auto">
          <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto"  v-show="showComments">
            <li v-for="(item,index) in allComments" class="infinite-list-item" :key="index">
              <div class="comment-area">
                <span class="comment-from"><i class="el-icon-user"></i> {{item.userName}}:</span>
                <span class="comment-in">{{item.comment}}</span>
                <el-divider class="divider"></el-divider>
              </div>
              <!-- <span>{{item.userName}}:</span><p>{{item.comment}}</p> -->
            </li>
          </ul>
          <div class="add-comment" v-show="showComments"><el-button type="danger">添加评论</el-button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postRemark, postLike } from '@/api/demo';

export default {
  name: 'Article',
  props: ['detail'],
  data() {
    return {
      count: 0,
      showComments: false,
      thumbFlag: false,
      startFlag: false,
      startState: '关注作者',
      thumbNum: 200,
      showArticle: {
        author: '小明',
        title: '明天',
        location: '北京',
        time: '2018/07/22',
        content: `让我掉下眼泪的,不止昨夜的酒。让我依依不舍的 ，止你的温柔。
        余路还要走多久，你攥着我的手.让我感到为难的 是挣扎的自由 分别总是在九月 
        回忆是思念的愁,深秋嫩绿的垂柳 亲吻着我额头在那座阴雨的小城里 我从未忘记你。
        成都，带不走的只有你`
      },
      allComments: [
        {userName:'lily', comment: 'this is great'},
        {userName:'lily', comment: 'this is great'},
        {userName:'lily', comment: 'this is great'},
        {userName:'lily', comment: 'this is great'},
        {userName:'lily', comment: 'this is great'},
        {userName:'lily', comment: 'this is great'},
        {userName:'lily', comment: 'this is great'}
      ]
    }
  },
  methods: {
    handleSelect(index) {
      if (index === '2') {
        // post请求
        const res = postLike()
        this.showComments = false;
        this.thumbFlag = !this.thumbFlag;
        if (this.thumbFlag) {this.thumbNum++;} else {this.thumbNum--;}
      } else if (index === '3') {
        this.showComments = false;
        this.startFlag = !this.startFlag;
        if (this.startFlag) {this.startState = '已关注'} else {this.startState  = '关注作者'}
      } else if (index === '1') { this.showComments = !this.showComments; }
    },
    // goBack() {
    //   this.$emit('detail-close');
    // },
    load () {
      this.count += 2;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variable.scss';
// .back-sign {
//   margin: 10px 0 0 50px;
// }
.article-body {
  font-weight: normal;
  // margin-top: 10px;
  // position: absolute;
  width: 100%;
  // background-color: $main-bg;
  // z-index: 20;
}
.content-wrapper {
  width: 650px;
  // background-color: $main-bg;
  margin: 0 auto;
}
// .show-article {
//   display: inline-block;
//   width: 650px;
//   height: 420px;
//   background: #fff;
// }
// 内容
.content {
  width: 630px;
  height: 300px;
  font-size: 16px;// 测试字号
}
// 文章显示头部
// .article-header {
//   background: rgba($color: $theme-1-hex, $alpha: .4);
// }
.header-title {
  font-size: 18px;
  text-align: center;
  font-weight: 600;
}
.header-msg {
  text-align: right;
  margin-right: 35px;
}
.msg {
  font-size: 13px;
  margin-left: 15px;
}
.header-msg .lighter {
  color: $--color-user;
  border-bottom: 0.7px solid;
}
.show-msg {
  margin: 10px 0;
}
//评论区
.infinite-list {
  width: 100%;
  height: 180px;
  padding-top: 20px;
  background-color: #fff;
  font-size: 14px;
  border-bottom: 2px solid rgba($color: $--border-color-base, $alpha: .5);
}
.comment-from {
  color: $--color-user;
  margin: 10px;
  border-bottom: 0.7px solid;
}
// /////@at-root
// .clearfix:before,
// .clearfix:after {
//   display: table;
//   content: "";
// }
// .clearfix:after {
//   clear: both
// }
.box-card {
  width: 650px;
}
</style>
