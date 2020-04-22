<template>
  <div class="header">
    <!-- 网站logo-->
    <div class="logo-wrapper">
      <img class="logo" src="@/assets/icons/travelLogo.png">
      <span class="site-name">轻足迹</span>
    </div>
    <!-- 选项-->
    <div class="title-wrapper">
      <span class="head-title track" :class="{onTrack: onTrack}" @click="handleClickTrack">我的足迹</span>
      <span class="head-title article" :class="{onArticle: onArticle}" @click="handleClickArticle">文章</span>
    </div>
    <!-- 更多-->
    <div class="name-wrapper">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          更多<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="write" icon="el-icon-edit">写文章</el-dropdown-item>
          <el-dropdown-item command="personal" icon="el-icon-user-solid">个人空间</el-dropdown-item>
          <el-dropdown-item command="logoff" icon="el-icon-more">安全退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Header',
  data() {
    return {
      onTrack: true,
      onArticle: false
    };
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
      if (command === 'write') {
        this.$router.push('/writePage');
      } else if (command === 'personal') {
        this.$router.push('/personalSpace');
      } else {
        this.$router.push('/login');
        this.NotLogin();
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
  box-shadow: 0 2px 10px rgba(0,0,0,.05);
  width:100%;
  color: $header-color;
}
// 网站logo包裹
.logo-wrapper {
  display: inline-block;
  width: 150px;
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
  width: 950px;
  height: 100%;
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
  vertical-align: top;
  display: inline-block;
  width: 63px;
  height: 100%;
  margin-left: 100px;
}
.el-dropdown-link {
  cursor: pointer;
  font-size: 15px;
  line-height: 58px;
  color: $--color-title;
}
.el-icon-arrow-down {
  font-size: 15px;
}
</style>
