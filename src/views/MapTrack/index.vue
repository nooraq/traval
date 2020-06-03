<template>
<div class="wrapper">
  <div class='main-title'>
    我的旅行日记
  </div>
  <div class="map">
    <echarts :options="options" class="chart" @click="Click"></echarts>
  </div>
<div class="recommend" style="overflow:auto">
  <el-switch
  :value="showList === 'myArticles'"
  active-text="曾经写过的文章"
  inactive-text="可能感兴趣的文章"
  @change="onShowArticlesChange"
  >
  </el-switch>
   <ul class="menu-content" style="overflow:auto">
     <li v-if="!location && showList !== 'myArticles'">请选择地点推荐</li>
     <li v-if="list[showList].length === 0
     && showList !== 'myArticles'">目前暂无推荐</li>
          <li v-for="(item) of list[showList]"
          :key="item.id" class="menu-content-li">
            <p class="title">{{item.Title}}</p>
            <p class="li-msg">
              <span class="location">
                <i class="el-icon-map-location"></i>{{item.Location}}</span>
              <el-link type="primary"
              :href="`/#/articalShow/${item.id}`"
               class="link">查看详情</el-link>
            </p>
            <el-divider></el-divider>
          </li>
        </ul>
</div>
</div>
</template>

<script>
import Echarts from 'vue-echarts';
import 'echarts/lib/chart/map';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/component/geo';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/tooltip';
import _ from 'lodash';
import { mapState } from 'vuex';
import styles from '@/theme/variable.scss';
import { getLocation, getMyArticles, getArticlesByLocation } from '@/api/demo';
import chinaJson from './china.json';

const getData = [
  { name: '北京', value: 1 },
  { name: '天津市', value: 1 },
  { name: '上海市', value: 1 },
  { name: '重庆市', value: 1 },
  { name: '河北', value: 1 },
  { name: '河南', value: 1 },
  { name: '云南', value: 1 },
  { name: '辽宁', value: 1 },
  { name: '黑龙江', value: 1 },
  { name: '湖南', value: 1 },
  { name: '安徽', value: 1 },
  { name: '山东', value: 1 },
  { name: '新疆', value: 1 },
  { name: '江苏', value: 1 },
  { name: '浙江', value: 1 },
  { name: '江西', value: 1 },
  { name: '湖北', value: 1 },
  { name: '广西壮族自治区', value: 1 },
  { name: '甘肃', value: 1 },
  { name: '山西', value: 1 },
  { name: '内蒙古自治区', value: 1 },
  { name: '陕西', value: 1 },
  { name: '吉林', value: 1 },
  { name: '福建', value: 1 },
  { name: '贵州', value: 1 },
  { name: '广东', value: 1 },
  { name: '青海', value: 1 },
  { name: '西藏自治区', value: 1 },
  { name: '四川', value: 1 },
  { name: '宁夏回族自治区', value: 1 },
  { name: '海南', value: 1 },
  { name: '台湾', value: 1 },
  { name: '香港特别行政区', value: 1 },
  { name: '澳门特别行政区', value: 1 }
];

const selectedItemStyle = {
  areaColor: styles['selected-bg']
};
Echarts.registerMap('china', chinaJson);
export default {
  name: 'MapTrack',
  data() {
    return {
      showList: 'myArticles',
      location: '',
      list: {
        myArticles: [],
        recommendArticles: []
      },
      mapData: [],
    };
  },
  computed: {
    ...mapState(['isLogin', 'user']),
    options() {
      return {
        geo: {
          map: 'china',
          layoutSize: 800,
          itemStyle: { // 定义样式
            areaColor: styles['map-bg'],
          },
          layoutCenter: ['50%', '70%'],
          emphasis: {
            itemStyle: {
              areaColor: styles['map-emphasis-bg'],
              shadowColor: 'rgba(0,0,0,.3)',
              shadowOffsetX: 0,
              shadowOffsetY: 2,
              shadowBlur: 8,
            }
          },
          regions: this.mapData.filter((item) => {
            if (item.value === 0) {
              item.itemStyle = selectedItemStyle;
            }
            return item;
          })

        },

        series: [
          // {
          //   name: '我的旅行',
          //   type: 'map',
          //   mapType: 'china',
          //   backgroundColor: styles['map-bg'],
          //   geoIndex: 0,
          //   roam: false,
          //   layoutCenter: ['50%', '70%'],
          //   layoutSize: 800,
          //   label: {
          //     normal: {
          //       show: false
          //     },
          //     emphasis: {
          //       show: true
          //     }
          //   },
          //   // width: 600,
          //   // height: 600,
          //   data: getData,
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'path://M512 85.333333a341.333333 341.333333 0 0 0-341.333333 337.92c0 233.813333 300.8 494.08 313.6 505.173334a42.666667 42.666667 0 0 0 55.466666 0C554.666667 917.333333 853.333333 657.066667 853.333333 423.253333A341.333333 341.333333 0 0 0 512 85.333333z m0 469.333334a149.333333 149.333333 0 1 1 149.333333-149.333334A149.333333 149.333333 0 0 1 512 554.666667z',
            symbolSize: 16,
            symbolKeepAspect: true,
            silent: true,
            color: styles['theme-5-hex'],
            data: this.mapData.map(item =>
              (item.value === 0 ? {
                ...item,
                value: chinaJson.features.find(element =>
                  element.properties.name === item.name).properties.center
              } : null))
          }
        ]
      };
    }
  },
  components: {
    Echarts
  },
  methods: {
    async Click(params) {
      this.location = params.name;
      const res = await getArticlesByLocation({
        location: this.location
      });
      this.list.recommendArticles = res.retlist;
    },
    async onShowArticlesChange(checked) {
      if (checked) {
        this.showList = 'myArticles';
      } else {
        this.showList = 'recommendArticles';
        const res = await getArticlesByLocation({
          location: this.location
        });
        this.list.recommendArticles = res.retlist;
      }
    }
  },
  async created() {
    if (this.isLogin === 0) {
      this.$message('还未登录，请先登录！');
      this.$router.push('/login');
    } else {
      const res = await getLocation({
        action: 'have_been',
        userid: this.user.userid
      });
      const wentLoc = res.retlist.map(item => (
        { name: item.Location, value: 0 }));
      this.mapData = [...(_.differenceBy(getData, wentLoc, 'name')
      ), ...wentLoc].map((item) => {
        if (item.value === 0) {
          item.itemStyle = selectedItemStyle;
        }
        return item;
      });

      const { data } = await getMyArticles({
        userName: localStorage.username
      });
      this.list.myArticles = data;
    }
  }
};
</script>

<style lang='scss' scoped>
@import '@/theme/variable.scss';
.chart {
  width: 100%;
  height: 600px;
  z-index: 1;
}
.main-title {
  color: $theme-4-hex;
  font-weight: 800;
  font-size: 32px;
}
.map {
  width: 800px;
  float: left;
}
.select {
  position:absolute;
  margin-left: 200px;
  margin-top: 50px;
}
.wrapper {
  position: relative;
  height: 600px;
  width: 100%;
}
.recommend {
  margin-left: 880px;
  margin-right: 24px;
  background-color: #FFF;
  border-radius: 2px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0,0,0,.05);
  height: calc(100vh - 200px);
  min-height: 400px;
  line-height: 1.5;
  .title {
    color:$title-color;
  font-weight: 700;
  line-height: 1.5;
  font-size: 20px;
  }
  .el-icon-map-location,.location {
    color: $detail-color;
    font-size: 16px;
  }

.menu-content {
  margin-top: 24px;
}

.li-header {
  font-size: 15px;
  color: $--color-title;
}
  .el-divider--horizontal {
    margin: 12px 0;
  }
}
.link {
  float: right;
  margin-right:24px;
}
</style>
