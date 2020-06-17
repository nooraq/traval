<template>
  <div class="header">
    <!-- 网站logo-->
    <div class="logo-wrapper">
      <img class="logo" src="@/assets/icons/travelLogo.png">
      <span class="site-name">轻足迹</span>
    </div>
    <!-- 选项-->
    <div class="title-wrapper">
      <span class="head-title track"
      :class="{onTrack: onTrack}" @click="handleClickTrack">我的足迹</span>
      <span class="head-title article" :class="{onArticle: onArticle}" @click="handleClickArticle">文章</span>
    </div>
    <!-- 更多-->
    <div class="name-wrapper">
      <el-button type="danger" icon="el-icon-edit" @click="handleWrite" class="write">写文章</el-button>
      <el-dropdown @command="handleCommand" trigger="click">
        <span class="el-dropdown-link">
          <i class="el-icon-user-solid"></i>{{more}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="personal" icon="el-icon-user-solid">个人空间</el-dropdown-item>
          <el-dropdown-item command="logoff" icon="el-icon-more">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Header',
  data() {
    return {
      onTrack: false,
      onArticle: false,
      more: '未登录...'
    };
  },
  computed: {
    // isLogin: function () { return this.$store.state.isLogin; },
    // user: function () { return this.$store.state.user; }
    ...mapState(['isLogin', 'user'])
  },
  methods: {
    ...mapMutations(['NotLogin']),
    // 选项标题click事件
    handleClickTrack() {
      if (!this.onTrack) {
        this.onTrack = true;
        this.onArticle = false;
        this.$router.push('/mapTrack');
      }
    },
    handleClickArticle() {
      if (!this.onArticle) {
        this.onArticle = true;
        this.onTrack = false;
        this.$router.push('/articalShow');
      }
    },
    // 更多设置click事件
    handleCommand(command) {
      this.onTrack = false;
      this.onArticle = false;
      if (command === 'personal') {
        this.$router.push('/personalSpace');
      } else {
        this.$router.push('/login');
        this.NotLogin();
      }
    },
    handleWrite() {
      this.$router.push('/writePage');
      this.onTrack = false;
      this.onArticle = false;
    },
  },
  created() {
    this.more = localStorage.username;
    const path = this.$route.path;
    if (this.isLogin === 0) {
      this.$message('还未登录，请先登录！');
      this.more = '未登录...';
      this.$router.push('/login');
    } else {
      this.more = localStorage.username;
      if (path === '/mapTrack') {
        this.onTrack = true;
        this.onArticle = false;
      } else if (this.$route.path === '/articalShow' || this.$route.params.id) {
        this.onTrack = false;
        this.onArticle = true;
      }
    }
  },
  watch: {
    $route() {
      if (this.isLogin === 0) {
        this.more = '未登录...';
        this.$message('还未登录，请先登录！');
        this.$router.push('/login');
      } else {
        this.more = localStorage.username;
        if (this.$route.path === '/mapTrack') {
          this.onTrack = true;
          this.onArticle = false;
        } else if (this.$route.path === '/articalShow' || this.$route.params.id) {
          this.onArticle = true;
          this.onTrack = false;
        } else {
          this.onArticle = false;
          this.onTrack = false;
        }
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import '@/theme/variable.scss';
// 头栏目外层包裹
.header {
  background-color: #fff;
  height: 58px;
  line-height: 58px;
  box-shadow: 0 2px 10px rgba(0,0,0,.05);
  // width:100%;
  min-width: 1000px; /* no */
  color: $header-color;
  // text-align: center;
}
// 网站logo包裹
.logo-wrapper {
  display: inline-block;
  vertical-align: top;
  // position: absolute;
  width: 20%;
}
.logo {
  height: 36px;
  margin: 11px 6px 11px 10px;
}
.site-name {
  font-size: 15px;
  font-weight: 400;
  padding: 4px;
  border-radius: 4px;
  color: $--color-title;
}
// 标题选项包裹
.title-wrapper {
  vertical-align: top;
  display: inline-block;
  // margin-left: 400px;
  width: 58%;
  text-align: center;
}
.head-title {
  font: bold 20px/58px '微软雅黑';
  padding: 0 20px;
  cursor: pointer;
}
.onTrack {
  color: $--color-danger;
}
.onArticle {
  color: $--color-danger;
}
// 更多选择包裹
.name-wrapper {
  margin-right: 20px;
  width: 20%;
  display: inline-block;
  text-align: right;
  overflow: hidden;
  // position: absolute;
  // float: right;
}
.write {
  margin-right: 20px;
}
.el-dropdown-link {
  cursor: pointer;
  font-size: 14px;
  color: $--color-user;
}
.el-icon-arrow-down {
  font-size: 15px;
}
</style>
