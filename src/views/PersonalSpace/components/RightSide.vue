<template>
  <div class="right-wrapper">
    <!-- 搜索个人文章-->
    <div class="search">
      <el-input
        size="middle"
        placeholder="按地点搜索我的文章"
        suffix-icon="el-icon-search"
        v-model="inputCity"
        class="personal-search">
      </el-input>
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
  data: function() {
    return {
      inputCity: '',
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
