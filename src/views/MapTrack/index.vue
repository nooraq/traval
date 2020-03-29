<template>
<div>
<el-select></el-select>
<echarts :options="options" class="chart"></echarts>
</div>

</template>

<script>
import Echarts from 'vue-echarts';
import 'echarts/lib/chart/map';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/component/geo';
import 'echarts/lib/component/tooltip';
import chinaJson from './china.json';

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
          map: 'china'
        },
        series: [
          {
            name: '我的旅行',
            type: 'map',
            geoIndex: 0,
            roam: false,
            width: 700,
            height: 500,
            layoutCenter: ['38%', '65%'],
            layoutSize: 900,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: { // 定义样式
              normal: { // 普通状态下的样式
                areaColor: '#323c48',
                borderColor: '#111'
              },
              emphasis: { // 高亮状态下的样式
                areaColor: '#2a333d'
              },
            },
            backgroundColor: '#404a59',
            data: [
              { name: '北京', value: Math.round(Math.random() * 1000) },
              { name: '天津', value: Math.round(Math.random() * 1000) },
              { name: '上海', value: Math.round(Math.random() * 1000) },
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
            data: [{
              name: '海南', // 数据项名称，在这里指地区名称

              value: [ // 数据项值
                110.33119, 20.031971,
                340 // 北京地区的数值
              ]
            }]
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

<style>
.chart {
  width: 800px;
  height: 600px;
}
</style>
