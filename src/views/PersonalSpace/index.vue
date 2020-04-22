<template>
  <div class="wrapper">
    <div class="show-name"><span class="name">{{users.UserName}}</span><span class="space">的空间</span></div>
    <!-- el-ui实现导航列表-->
    <div class="menu">
      <el-menu default-active="2"
        class="el-menu-vertical-demo"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          <i class="el-icon-user"></i>
          <span class="menu-desc">我的关注</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-tickets"></i>
          <span class="menu-desc">我的文章</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-thumb"></i>
          <span class="menu-desc">别人赞我</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-thumb"></i>
          <span class="menu-desc">我赞别人</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 列表-->
    <div class="show-list" >
      <div class="title">{{listTitle}}</div>
      <div class="showBody">{{listBody}}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'personalSpace',
  computed: {
    ...mapState(['users'])
  },
  data() {
    return {
      // 导航的相关数据
      focus: {},
      myArticle: [],
      getThumbs: [],
      giveThumbs: [],
      listTitle: null,
      listBody: null,
    };
  },
  methods: {
    handleSelect(index, indexPath) {
        if (index === '1') {
          this.listTitle = '我的关注';
          this.listBody = 'focus';
        }
    },
    // gg
    getMenuInfo() {
      axios.get('/api/personal.json')
        .then(this.getMenuInfoSucc);
    },
    getMenuInfoSucc(res) {
      const getRes = res.data;
      if (getRes.ret && getRes.data) {
        const Data = res.data;
        this.focus = Data.focus;
        this.myArticle = Data.myArticle;
        this.getThumbs = Data.getThumbs;
        this.giveThumbs = Data.giveThumbs;
      }
    }
  },
  // mounted() {
  //   this.getMenuInfo();
  // }
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
  width: 180px;
  margin-right: 100px;
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
  height: 380px;
  background: #fff;
  border: 1.5px solid rgba($color: $--color-info, $alpha: 0.3);
  border-radius: 4px;
}
</style>
