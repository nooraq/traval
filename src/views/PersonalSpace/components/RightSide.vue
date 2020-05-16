<template>
  <div class="right-wrapper">
    <!-- 搜索个人文章-->
    <div class="search">
      <el-autocomplete
        size="middle"
        placeholder="按地点搜索我的文章"
        suffix-icon="el-icon-search"
        v-model="inputCity"
        :value="inputCity"
        @select="handleSelect"
        :fetch-suggestions="querySearch"
      >
      </el-autocomplete>
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
export default {
  name: 'RightSide',
  props: ['locals'],
  data: function() {
    return {
      inputCity: '',
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
      ],
      showReport: false,
      reportMsg: [
        {msg:"hello"},
        {msg:"yes"},
        {msg:"bye"}
      ]
    }
  },
  methods: {
    changeReportState () {
      this.showReport = !this.showReport;
    },
    querySearch(queryString, cb) {
      let allLocals = this.allLocals;
      // console.log("locals:");
      // console.log(allLocals);
      // results 保存匹配结果列表
      let results = queryString? allLocals.filter(this.createFilter(queryString)): allLocals;
      // console.log("results:");
      // console.log(results);
      cb(results);
    },
    createFilter(queryString) {
      return (local) => {
        return (local.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      }
    },
    handleSelect(item) {
      console.log(item.value);
    }
  }
}
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
  width: 100%;
  height: 310px;
  background-color: rgba($color: #fff, $alpha: 1);
  background-image: url(images/reportBg.png);
  background-size: contain;
  text-align: center;
  line-height: 310px;
}
.search {
  height: 45px;
  margin-bottom: 35px;
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
