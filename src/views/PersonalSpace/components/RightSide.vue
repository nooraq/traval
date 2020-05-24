<template>
  <div class="right-wrapper">
    <!-- 搜索个人文章-->
    <div class="search">
      <el-tabs v-model="activeName">
        <el-tab-pane label="按地点" name="local">
          <el-select class="all-search" v-model="searchCity" placeholder="搜索我的文章" clearable>
            <el-option
              v-for="(item,index) in allLocals"
              :key="index"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button class="send-se" @click="handleLocationSearch">搜索</el-button>
        </el-tab-pane>
        <el-tab-pane label="按时间" name="time">
          <el-date-picker
            v-model="searchMonth"
            class="all-search"
            type="month"
            value-format="yyyy-MM"
            placeholder="搜索我的文章">
          </el-date-picker>
          <el-button class="send-se" @click="handleDateSearch">搜索</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 展示年报-->
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
    <div v-else>
    <div class="report" v-show="showReport">
      <el-carousel height="270px" trigger="click" indicator-position="none" class="summary" :loop="falseSign">
        <el-carousel-item v-for="(item,index) in reportMsg" :key="index">
          <p class="site"><img class="the-logo" src="@/assets/icons/travelLogo.png"><span>你的旅行记录</span></p>
          <div class="report-item" v-html="item.msg"></div>
        </el-carousel-item>
      </el-carousel>
      <div class="button-con">
        <el-button type="danger" @click="changeReportState">收起展示</el-button>
      </div>
    </div>
    <div class="report view" v-show="!showReport">
      <el-button type="danger" @click="changeReportState">展示我的旅途记录</el-button>
    </div>
    </div>
  </div>
</template>

<script>
import { getSearchByLocation, getSearchByDate, getSummary } from '@/api/demo';
import { mapState } from 'vuex';

export default {
  name: 'RightSide',
  props: ['locals'],
  data() {
    return {
      count: 0,
      searchCity: '',
      searchMonth: null,
      activeName: 'local',
      showReport: false,
      searchNow: false,
      searchEmpty: false,
      searchResults: [],
      reportMsg: [
        { msg: '' },
        { msg: '' },
        { msg: '' },
        { msg: '' },
        { msg: '' }
      ],
      falseSign: false,
      cityResult: [],
      dateResult: []
    };
  },
  computed: {
    ...mapState(['user', 'allLocals'])
  },
  methods: {
    async changeReportState() {
      this.showReport = !this.showReport;
      if (this.showReport) {
        const res = await getSummary({
          // 上传过文章才能正确返回
          userName: localStorage.username
        });
        const summaryData = res.data;
        // console.log(data);
        this.reportMsg[0].msg = `${'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}感谢你来到轻足迹`;
        this.reportMsg[1].msg = `<p>你已经加入轻足迹${summaryData.sighUpDays}天了，</p><br/><p>在些天里，你记录了许多旅游心得~</p>`;
        this.reportMsg[2].msg = `<p>你最近的旅游地点是<br/>${'&nbsp;&nbsp;'}${summaryData.cityLast}</p><br/><p>你在这次旅途中收获了许多许多</p>`;
        this.reportMsg[3].msg = `<p>你停留最久的旅游地点是<br/>${'&nbsp;&nbsp;'} ${summaryData.cityLongest_city}</p><br/></p>你的旅途开始时间是： 
                                <br/>${'&nbsp;&nbsp;'} ${summaryData.cityLongest_start}</p>
                                <p>直到 ${summaryData.cityLongest_end} 才离开,<br/>这里一定有很吸引你的地方！</p>`;
        this.reportMsg[4].msg = `<p>你对许多旅游地点都写下了你的感受和喜爱</p><br/>
                                <p>希望我们能在今后的旅途中，一直陪伴你~</p>`;
        // console.log(this.reportMsg);
      }
    },
    load() {
      this.count += 2;
    },
    goBack() {
      this.searchNow = false;
    },
    async handleLocationSearch() {
      const res = await getSearchByLocation({
        userName: localStorage.username,
        location: this.searchCity
      });
      this.searchResults = res.data;
      if (res.data.length === 0) {
        this.searchEmpty = true;
      } else {
        this.searchEmpty = false;
      }
      this.searchNow = true;
    },
    async handleDateSearch() {
      console.log('月份', this.searchMonth);
      const splitTime = this.searchMonth.split('-');
      const time = splitTime.map(item => parseInt(item, 10));
      const res = await getSearchByDate({
        userName: localStorage.username,
        month: time[1],
        year: time[0]
      });
      this.searchResults = res.data;
      if (res.data.length === 0) {
        this.searchEmpty = true;
      } else {
        this.searchEmpty = false;
      }
      this.searchNow = true;
    }
  },
  // created() {
  //   console.log(this.detail.id);
  // }
};
</script>

<style lang="scss" scoped>
@import '@/theme/variable.scss';

.right-wrapper {
  margin: 92px 0 0 50px;
  vertical-align: top;
  display: inline-block;
  width: 250px;
}
// 年报
.el-button {
  font-size: 14px;
  padding: 6px;
}
.report {
  height: 310px;
  background-image: url(images/reportBg.png);
  background-size: contain;
  // text-align: center;
  // line-height: 310px;
}
.view {
  text-align: center;
  line-height: 310px;
}
.site {
  height: 42px;
  background-color: #fff;
}
.report-item {
  // background-color: green;
  padding: 50px 20px;
  font-weight: normal;
}
.the-logo {
  height: 36px;
  margin: 3px 0 0 5px;
}
.box-card {
  height: 310px;
}
.link-detail {
  padding: 2px;
  font-size: 12px;
}
.all-search{
  width: 185px;
  margin: 0 20px 25px 0;
}
.el-carousel__item {
  color: #475669;
  font-size: 14px;
  height: 270px;
  // opacity: 1;
  // line-height: 270px;
  background-image: url(images/summaryBg.png);
  margin: 0;
}
.button-con {
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  padding-bottom: 5px;
  text-align: center;
}
// .summary{
//   background-image: url(images/summaryBg.png);
// }
.menu-content {
  font-size: 14px;
}
.li-msg {
  font-size: 12px;
  font-weight: normal;
}
.start-time {
  margin: 0 5px;
}
</style>
