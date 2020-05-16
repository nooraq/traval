<template>
<div class="wrapper">
  <div class='main-title'>
    我的旅行日记
  </div>
  <div class="map">
    <echarts :options="options" class="chart" @click="Click"></echarts>
  </div>
<div class="recommend">
  <el-switch
  v-model="myList"
  active-text="曾经写过的文章"
  inactive-text="可能感兴趣的文章">
  </el-switch>
  <div class="recommend-item">
    <div class="location">
    <p>{{location}}</p>
    </div>
    <router-link class="title" :to="`/essay/${location}`">这是标题</router-link>
    <p class="detail">详情详情详情详情详情详情详情详情详情
      详情详情详情详情详情详情详情详情详情
    </p>
  </div>
  <div class="recommend-item">
    <p class="title">title</p>
    <p class="detail">详情详情详情详情详情详情详情详情详情
      详情详情详情详情详情详情详情详情详情
    </p>
  </div>
  <div class="recommend-item">
    <p class="title">title</p>
    <p class="detail">详情详情详情详情详情详情详情详情详情
      详情详情详情详情详情详情详情详情详情
    </p>
  </div>
</div>
</div>
</template>

<script>
import Echarts from 'vue-echarts';
import 'echarts/lib/chart/map';
// import 'echarts/lib/chart/scatter';
// import 'echarts/lib/component/geo';
import 'echarts/lib/component/tooltip';
import { mapState } from 'vuex';
import styles from '@/theme/variable.scss';
import { getLocation } from '@/api/demo';
import chinaJson from './china.json';

const getData = [
  { name: '北京', value: 1 },
  { name: '天津市', value: 1 },
  { name: '上海市', value: 0 },
  { name: '重庆市', value: 0 },
  { name: '河北', value: 0 },
  { name: '河南', value: 1 },
  { name: '云南', value: 1 },
  { name: '辽宁', value: 1 },
  { name: '黑龙江', value: 1 },
  { name: '湖南', value: 0 },
  { name: '安徽', value: 0 },
  { name: '山东', value: 0 },
  { name: '新疆', value: 0 },
  { name: '江苏', value: 0 },
  { name: '浙江', value: 0 },
  { name: '江西', value: 0 },
  { name: '湖北', value: 0 },
  { name: '广西壮族自治区', value: 0 },
  { name: '甘肃', value: 0 },
  { name: '山西', value: 0 },
  { name: '内蒙古自治区', value: 0 },
  { name: '陕西', value: 0 },
  { name: '吉林', value: 0 },
  { name: '福建', value: 0 },
  { name: '贵州', value: 0 },
  { name: '广东', value: 0 },
  { name: '青海', value: 0 },
  { name: '西藏自治区', value: 0 },
  { name: '四川', value: 0 },
  { name: '宁夏回族自治区', value: 0 },
  { name: '海南', value: 0 },
  { name: '台湾', value: 0 },
  { name: '香港特别行政区', value: 0 },
  { name: '澳门特别行政区', value: 0 }
];

const selectedItemStyle = {
  areaColor: styles['selected-bg']
};
Echarts.registerMap('china', chinaJson);
export default {
  name: 'MapTrack',
  data() {
    return {
      myList: true,
      location: '北京',
      options: {
        // tooltip: {
        //   trigger: 'item',
        //   // formatter: '{b}<br/>{c} (p / km2)'
        // },
        // geo: {
        //   map: 'china',
        //   itemStyle: { // 定义样式
        //     color: styles['map-bg'],
        //   },
        //   width: 600,
        //   height: 600,
        // },
        visualMap: {
          min: 800,
          max: 50000,
          text: ['High', 'Low'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['lightskyblue', 'yellow', 'orangered']
          }
        },
        series: [
          {
            name: '我的旅行',
            type: 'map',
            mapType: 'china',
            backgroundColor: styles['map-bg'],
            // geoIndex: 0,
            roam: false,
            layoutCenter: ['50%', '70%'],
            layoutSize: 800,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            emphasis: {
              itemStyle: {
                areaColor: styles['map-emphasis-bg'],
                shadowColor: 'rgba(0,0,0,.3)',
                shadowOffsetX: 0,
                shadowOffsetY: 2,
                shadowBlur: 8,
                // shadow: '0 2px 12px 0 '
              }
            },
            itemStyle: { // 定义样式
              areaColor: styles['map-bg'],
              color: 'red',
            },
            width: 600,
            height: 600,
            data: getData.map((item) => {
              if (item.value === 0) {
                item.itemStyle = selectedItemStyle;
              }
              return item;
            })
          }
          //     {
          //       type: 'scatter',
          //       coordinateSystem: 'geo',
          //       symbol: 'pin',
          //       symbolSize: 18,
          //       // silent: true,
          //       itemStyle: {
          //         color({ data }) {
          //           return data.mark === 0 ? styles['theme-4-hex'] : 'blue';
          //         }
          //       },
          //       data: [
          //         {
          //           name: '海南', // 数据项名称，在这里指地区名称

          //           value: [ // 数据项值
          //             ...(chinaJson.features.find(element =>
          //               element.properties.name === '海南').properties.center),
          //             340 // 北京地区的数值
          //           ],
          //           mark: 0
          //         },
          //         {
          //           name: '北京', // 数据项名称，在这里指地区名称

          //           value: [ // 数据项值
          //             ...(chinaJson.features.find(element =>
          //               element.properties.name === '北京').properties.center),
          //             340, // 北京地区的数值
          //             0
          //           ],
          //           mark: 1
          //         }
          //       ]
          //     }
        ]
      },
    };
  },
  components: {
    Echarts
  },
  methods: {
    Click(params) { this.location = params.data.name; }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  // 判断登录与否，否则跳到登录页
  mounted() {
    if (!this.isLogin) {
      alert('还未登录，请先登录！');
      this.$router.push('/login');
    }
    // console.log(window.location.href);
    // console.log(this.$route.path);
    // console.log(this.$route.params);
  },

  async created() {
    const res = await getLocation({
      action: 'have_been',
      Userid: '2'
    });
    this.data = res;
  }
  // ,
  // computed: {
  //  ...mapState(['isLogin'])
  // }
  // ,
  // // 判断登录与否，否则跳到登录页
  // mounted () {
  //   console.log(this.isLogin);
  //   if (!this.isLogin) {
  //     alert('还未登录，请先登录！');
  //     this.$router.push('/login');
  //   }
  //   // console.log(window.location.href);
  //   // console.log(this.$route.path);
  //   // console.log(this.$route.params);
  // }
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
  background-color: #FFF;
  border-radius: 2px;
  padding: 24px;
  margin-right: 80px;
  box-shadow: 0 2px 10px rgba(0,0,0,.05);
  height: calc(100vh - 200px);
  min-height: 400px;
  line-height: 1.5;
  .title {
    color:$title-color;
  font-weight: 700;
  line-height: 1.5;
  font-size: 22px;
  &:hover {
    text-decoration: underline;
    cursor:pointer;
  }
  }
  .detail {
    color: $detail-color;
  }

}
</style>
