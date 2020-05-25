<template>
  <div class="article-body">
    <div class="content-wrapper">
      <!-- 文章显示内容-->
      <el-card class="box-card">
        <!-- 文章头部 -->
        <div slot="header" class="clearfix">
          <p class="header-title" v-text="showArticle.Title"></p>
          <div class="header-msg">
            <span class="msg lighter"><i class="el-icon-user"></i>: {{showArticle.author}}</span>
            <span class="msg"><i class="el-icon-map-location"></i>：{{showArticle.Location}}</span>
            <span class="msg">
              <i class="el-icon-time"></i>：{{showArticle.SDate}}
              <i class="el-icon-minus"></i>{{showArticle.EDate}}
            </span>
            <span class="msg" v-if="!showArticle.Public">状态：私密</span>
          </div>
        </div>
        <!-- 文章内容 -->
        <div class="content" v-infinite-scroll="load" style="overflow:auto" v-html="showArticle.Body"></div>
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
          <el-menu-item index="1"><i class="el-icon-chat-line-square"></i><span class="msg">评论 {{cLength}}</span></el-menu-item>
          <el-menu-item index="2"><i class="el-icon-thumb"></i><span class="msg">{{thumbState}} {{likeNum}}</span></el-menu-item>
          <el-menu-item index="3"><i class="el-icon-star-off"></i><span class="msg">{{startState}}</span></el-menu-item>
        </el-menu>
        <div class="show-comment" style="overflow:auto" v-show="showComments">
          <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto" v-show="cLength">
            <li v-for="(item,index) in allComments" class="infinite-list-item" :key="index">
              <div class="comment-area">
                <span class="comment-from"><i class="el-icon-user"></i> {{item.UserName}}:</span>
                <span class="comment-in">{{item.Remark}}</span>
                <el-divider class="divider"></el-divider>
              </div>
            </li>
          </ul>
          <div class="add-comment">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item prop="comment">
                <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="请输入你的评论"
                  v-model="ruleForm.comment">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="submitForm('ruleForm')">添加评论</el-button>
                <el-button @click="resetForm('ruleForm')">取消评论</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postRemark, postLike, postDeLike, getArticleDetail, postFollow, postDeFollow } from '@/api/demo';
import { mapState } from 'vuex';

export default {
  name: 'Article',
  props: ['detail'],
  data() {
    return {
      count: 0,
      showComments: false,
      thumbFlag: false,
      thumbState: '点赞',
      startState: '关注作者',
      likeNum: this.detail.likeNum,
      showArticle: this.detail,
      allComments: this.detail.allComments,
      cLength: 0,
      ruleForm: {
        comment: ''
      },
      rules: {
        comment: [
          { required: true, message: '请填写你的评论', trigger: 'blur' },
          { min: 1, max: 100, message: '最多输入80个字', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        // 发送评论
        if (valid) {
          const msg = {
            articleid: this.showArticle.id,
            remark: this.ruleForm.comment,
            remarkuserid: localStorage.userid
          };
          const res = postRemark(msg);
          const resMsg = await getArticleDetail({
            articleId: this.detail.id
          });
          this.allComments = resMsg.recommend;
          this.likeNum = resMsg.likenumber;
          this.cLength = this.allComments.length;
          this.$message('评论成功！');
          this.$refs[formName].resetFields();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async handleSelect(index) {
      if (index === '2') {
        // 点赞
        if (this.thumbState === '点赞') {
          await postLike({
            articleid: this.detail.id,
            likeuserid: localStorage.userid
          });
          this.thumbState = '已点赞';
          // console.log('like:', res);
        } else if (this.thumbState === '已点赞'){
          const res1 = await postDeLike({
            articleid: this.detail.id,
            likeuserid: localStorage.userid
          });
          this.thumbState = '点赞';
          console.log('cancle result:', res1);
        }
        const resMsg = await getArticleDetail({
          articleId: this.detail.id
        });
        this.allComments = resMsg.recommend;
        this.likeNum = resMsg.likenumber;
      } else if (index === '3') {
        // 判断关注
        if (this.startState === '关注作者') {
          await postFollow({
            followuserid: this.detail.Userid_id,
            userid: parseInt(localStorage.userid, 10)
          });
          this.startState = '已关注该作者';
        } else if (this.startState === '已关注该作者') {
          await postDeFollow({
            followuserid: this.detail.Userid_id,
            userid: parseInt(localStorage.userid, 10)
          });
          this.startState = '关注作者';
        }
      } else if (index === '1') { this.showComments = !this.showComments; }
    },
    load() {
      this.count += 2;
    }
  },
  watch: {
    async detail() {
      this.showArticle = this.detail;
      const resMsg = await getArticleDetail({
        articleId: this.detail.id
      });
      this.likeNum = resMsg.likenumber;
      this.allComments = resMsg.recommend;
      this.cLength = this.detail.allComments.length;
      this.thumbState = '点赞';
      this.startState = '关注作者';
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/theme/variable.scss';
.article-body {
  font-weight: normal;
  width: 100%;
}
.content-wrapper {
  // width: 650px;
  width: 100%;
  // background-color: $main-bg;
  margin: 0 auto;
}
// 内容
.content {
  // width: 630px;
  width: 97%;
  height: 300px;
  font-size: 16px;// 测试字号
}
// 文章显示头部
.header-title {
  font-size: 18px;
  text-align: center;
  font-weight: 600;
}
.header-msg {
  margin-bottom: -10px;
  margin-top: 5px;
}
.msg {
  font-size: 13px;
  margin-left: 20px;
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
.box-card {
  // width: 650px;
  width: 100%;
}
.add-comment {
  margin-top: 10px;
  width: 61%;
}
</style>
