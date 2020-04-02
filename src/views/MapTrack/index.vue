<template>
<div class="wrapper">
  <div class="map">
<el-select class="select" size="big">
  <el-option ></el-option>
</el-select>
<echarts :options="options" class="chart"></echarts>
  </div>
<div class="recommend">
  <div class="recommend-item">
    <div class="location">
    <img src="" alt="">
    <p>{{location}}</p>
    </div>
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
import 'echarts/lib/chart/scatter';
import 'echarts/lib/component/geo';
import 'echarts/lib/component/tooltip';
import chinaJson from './china.json';
import styles from '@/theme/variable.scss';

// console.log(`${chinaJson.features.map(item =>
//   ({
//     label: item.properties.name,
//     value: item.properties.childrenNum
//   }))}`);
Echarts.registerMap('china', chinaJson);
export default {
  name: 'MapTrack',
  data() {
    return {
      options: {
        tooltip: {
          trigger: 'item'
        },
        geo: {
          map: 'china',
          itemStyle: { // 定义样式
            color: styles['map-bg'],
          },
          width: 600,
          height: 600,
        },
        series: [
          {
            name: '我的旅行',
            type: 'map',
            geoIndex: 0,
            roam: false,
            layoutCenter: ['38%', '65%'],
            layoutSize: 1000,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },

            backgroundColor: '#404a59',
            data: [
              { name: '北京', value: Math.round(Math.random() * 1000), mark: 0 },
              { name: '天津', value: Math.round(Math.random() * 1000), mark: 1 },
              { name: '上海', value: Math.round(Math.random() * 1000), mark: 2 },
              { name: '重庆', value: Math.round(Math.random() * 1000) },
              { name: '河北', value: Math.round(Math.random() * 1000) },
              { name: '河南', value: Math.round(Math.random() * 1000) },
              { name: '云南', value: Math.round(Math.random() * 1000) },
              { name: '辽宁', value: Math.round(Math.random() * 1000) },
              { name: '黑龙江', value: Math.round(Math.random() * 1000) },
              { name: '湖南', value: Math.round(Math.random() * 1000) },
              { name: '安徽', value: Math.round(Math.random() * 1000) },
              { name: '山东', value: Math.round(Math.random() * 1000) },
              { name: '新疆', value: Math.round(Math.random() * 1000) },
              { name: '江苏', value: Math.round(Math.random() * 1000) },
              { name: '浙江', value: Math.round(Math.random() * 1000) },
              { name: '江西', value: Math.round(Math.random() * 1000) },
              { name: '湖北', value: Math.round(Math.random() * 1000) },
              { name: '广西', value: Math.round(Math.random() * 1000) },
              { name: '甘肃', value: Math.round(Math.random() * 1000) },
              { name: '山西', value: Math.round(Math.random() * 1000) },
              { name: '内蒙古', value: Math.round(Math.random() * 1000) },
              { name: '陕西', value: Math.round(Math.random() * 1000) },
              { name: '吉林', value: Math.round(Math.random() * 1000) },
              { name: '福建', value: Math.round(Math.random() * 1000) },
              { name: '贵州', value: Math.round(Math.random() * 1000) },
              { name: '广东', value: Math.round(Math.random() * 1000) },
              { name: '青海', value: Math.round(Math.random() * 1000) },
              { name: '西藏', value: Math.round(Math.random() * 1000) },
              { name: '四川', value: Math.round(Math.random() * 1000) },
              { name: '宁夏', value: Math.round(Math.random() * 1000) },
              { name: '海南', value: Math.round(Math.random() * 1000) },
              { name: '台湾', value: Math.round(Math.random() * 1000) },
              { name: '香港', value: Math.round(Math.random() * 1000) },
              { name: '澳门', value: Math.round(Math.random() * 1000) }
            ]
          },
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin',
            symbolSize: 18,
            silent: true,
            itemStyle: {
              color({ data }) {
                return data.mark === 0 ? styles['theme-4-hex'] : 'blue';
              }
            },
            data: [
              {
                name: '海南', // 数据项名称，在这里指地区名称

                value: [ // 数据项值
                  ...(chinaJson.features.find(element =>
                    element.properties.name === '海南').properties.center),
                  340 // 北京地区的数值
                ],
                mark: 0
              },
              {
                name: '北京', // 数据项名称，在这里指地区名称

                value: [ // 数据项值
                  ...(chinaJson.features.find(element =>
                    element.properties.name === '北京').properties.center),
                  340, // 北京地区的数值
                  0
                ],
                mark: 1
              }
            ]
          }
        ]
      }
    };
  },
  components: {
    Echarts
  }
};
</script>

<style lang='scss' scoped>
.chart {
  width: 100%;
  height: 600px;
  z-index: -1;
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
  width: 1440px;
}
.recommend {
margin-left: 810px;
}
</style>
