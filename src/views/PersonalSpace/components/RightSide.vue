<template>
  <div class="right-wrapper">
    <!-- 搜索个人文章-->
    <div class="search">
      <el-tabs v-model="activeName">
        <el-tab-pane label="按地点" name="local">
          <el-select class="all-search" v-model="searchCity" placeholder="搜索我的文章">
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
    <div class="report" v-show="showReport">
      <el-carousel height="270px" trigger="click" indicator-position="none">
        <el-carousel-item v-for="(item,index) in reportMsg" :key="index">
          <div class="report-item">
            {{item.msg}}
          </div>
        </el-carousel-item>
      </el-carousel>
      <div class="button-con">
        <el-button type="danger" @click="changeReportState">收起展示</el-button>
      </div>
    </div>
    <div class="report" v-show="!showReport">
      <el-button type="danger" @click="changeReportState">展示我的旅途记录</el-button>
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
      searchCity: '',
      searchMonth: null,
      activeName: 'local',
      showReport: false,
      reportMsg: [
        { msg: 'hello' },
        { msg: 'yes' },
        { msg: 'bye' }
      ],
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
          userName: this.user.username
        });
        console.log(res);
      }
    },
    async handleLocationSearch() {
      const res = await getSearchByLocation({
        userName: this.user.username,
        location: this.searchCity
      });
      console.log(res);
    },
    async handleDateSearch() {
      console.log('月份', this.searchMonth);
      const splitTime = this.searchMonth.split('-');
      const time = splitTime.map(item => parseInt(item, 10));
      const res = await getSearchByDate({
        userName: this.user.username,
        month: time[1],
        year: time[0]
      });
      console.log(res);
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
  text-align: center;
  line-height: 310px;
}
.all-search{
  width: 185px;
  margin: 0 20px 25px 0;
}
.el-carousel__item {
  color: #475669;
  font-size: 14px;
  opacity: 1;
  line-height: 270px;
  background-color: #99a9bf;
  margin: 0;
}
.button-con {
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  padding-bottom: 5px;
}
</style>
