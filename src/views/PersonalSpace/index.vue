<template>
  <div class="wrapper">
    <div class="show-name"><span class="name">{{users.UserName}}</span><span class="space">的空间</span></div>
    <!-- -->
    <div class="menu">
      <div class="menu-one">
        <i class="el-icon-user"></i>
        <span class="menu-desc">我的关注</span>
      </div>
      <div class="menu-one">
        <i class="el-icon-tickets"></i>
        <span class="menu-desc">我的文章</span>
      </div>
      <div class="menu-one">
        <i class="el-icon-thumb"></i>
        <span class="menu-desc">别人赞我</span>
      </div>
      <div class="menu-one">
        <i class="el-icon-thumb"></i>
        <span class="menu-desc">我赞别人</span>
      </div>
    </div>
    <!-- -->
    <div class="show-list">
      container
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'personalSpace',
  computed: {
    ...mapState(['users'])
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
.show-name {
  margin:30px 0;
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
  width: 150px;
  margin-right: 150px;
  background: #fff;
  border-radius: 4px;
  border: 1.5px solid rgba($color: $--color-info, $alpha: 0.3);
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
  height: 400px;
  background: #fff;
  border: 1.5px solid rgba($color: $--color-info, $alpha: 0.3);
}
</style>
