<template>
  <div class="article-body">
    <!-- <el-page-header @back="goBack" content="文章详情" class="back-sign"></el-page-header> -->
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
              <i class="el-icon-alarm-clock"></i>：{{showArticle.SDate}}
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
          <el-menu-item index="1"><i class="el-icon-chat-line-square"></i><span class="msg">评论</span></el-menu-item>
          <el-menu-item index="2"><i class="el-icon-thumb"></i><span class="msg">点赞 {{likeNum}}</span></el-menu-item>
          <el-menu-item index="3"><i class="el-icon-star-off"></i><span class="msg">{{startState}}</span></el-menu-item>
        </el-menu>
        <div class="show-comment" style="overflow:auto">
          <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto"  v-show="showComments">
            <li v-for="(item,index) in allComments" class="infinite-list-item" :key="index">
              <div class="comment-area">
                <span class="comment-from"><i class="el-icon-user"></i> {{item.UserName}}:</span>
                <span class="comment-in">{{item.Remark}}</span>
                <el-divider class="divider"></el-divider>
              </div>
            </li>
          </ul>
          <div class="add-comment" v-show="showComments">
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
      startFlag: false,
      startState: '关注作者',
      // msg: {},
      likeNum: this.detail.likeNum,
      showArticle: this.detail,
      allComments: this.detail.allComments,
      ruleForm: {
        comment: ''
      },
      rules: {
        comment: [
          { required: true, message: '请填写你的评论', trigger: 'blur' },
          { min: 1, max:100, message: '最多输入80个字', trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    ...mapState(['user'])
  //   theArticle() { return this.detail },
  //   showArticle() { return this.detail },
  //   likeNum() { return this.detail.likeNum },
  //   allComments() { return this.detail.allComments }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        //发送评论，over
        if (valid) {
          const msg = {
            articleid: this.showArticle.id,
            remark: this.ruleForm.comment,
            remarkuserid: this.user.userid
          };
          const res = postRemark(msg);
          console.log('remark:', res, this.detail.id);
          const resMsg = await getArticleDetail({
          articleId: this.detail.id
          });
          console.log('msg:', resMsg);
          this.allComments = resMsg.recommend;
          this.likeNum = resMsg.likenumber;
          this.$message('评论成功！');
          this.$refs[formName].resetFields();
        } else {
          console.log('error submit!!');
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
        const res = await postLike({
          articleid: this.detail.id,
          likeuserid: this.user.userid
        });
        console.log('like:', res);
        const likeResult = res.msg;
        // const resMsg = await getArticleDetail({
        // articleId: this.detail.id
        // });
        if (likeResult === 'already liked') {
          this.$message('已经点过赞了呀');
          const res = await postDeLike({
            articleid: this.detail.id,
            likeuserid: this.user.userid
          });
          const delikeResult = res.msg;
          console.log('cancle result:', delikeResult)
          // const resMsg = await getArticleDetail({
          // articleId: this.detail.id
          // });
        } else { this.likeNum++; }
        const resMsg = await getArticleDetail({
        articleId: this.detail.id
        });
        console.log('msg:', resMsg);
        this.allComments = resMsg.recommend;
        this.likeNum = resMsg.likenumber;
        // } else { console.log('already thumb'); }
      } else if (index === '3') {
        //判断关注
        const res = await postFollow({
          followuserid: this.user.userid,
          userid: this.detail.Userid_id
        });
        console.log('follow:', res);// 出现错误，已关注返回值导致的报错使后面的代码无法进行
        // if (res.ret === 1) {
        //   this.startState  = '关注作者';
        //   const resDel = await postDeFollow({
        //     followuserid: this.user.userid,
        //     userid: this.detail.Userid_id
        //   });
        //   console.log('delfollow result:', resDel);
        // }
        // console.log('测试取关');
        this.startFlag = !this.startFlag;
        if (this.startFlag) {this.startState = '已关注'} else {this.startState  = '关注作者'}
      } else if (index === '1') { this.showComments = !this.showComments; }
    },
    load () {
      this.count += 2;
    }
  },
  watch: {
    detail: async function() {
      this.showArticle = this.detail;
      // this.likeNum = this.detail.likeNum;
      const resMsg = await getArticleDetail({
        articleId: this.detail.id
      });
      // console.log('get new msg:', resMsg);
      this.likeNum = resMsg.likenumber;
      this.allComments = resMsg.recommend;
      // console.log('new likeNum:', this.likeNum, this.allComments);
      // console.log('new article:', this.showArticle);
      // console.log('new detail:', this.detail);
    }
  },
  // async mounted() {
  //   const latestArticleId = 
  // }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variable.scss';
.article-body {
  font-weight: normal;
  width: 100%;
}
.content-wrapper {
  width: 650px;
  // background-color: $main-bg;
  margin: 0 auto;
}
// 内容
.content {
  width: 630px;
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
  width: 650px;
}
.add-comment {
  margin-top: 10px;
  width: 400px;
}
</style>
