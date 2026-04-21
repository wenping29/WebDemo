<template>
  <div ref="barchart" style="width: 400px;height:400px;"></div>
</template>
<script>
var echarts = require('echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
export default {
  components: {
    // leftmenu
  },
  mounted() {
    this.initbar()
  },
  methods: {
    initbar() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.barchart);

      // 指定图表的配置项和数据
      var option = {
          title: {
              text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
              data:['销量']
          },
          xAxis: {
              data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          },
          yAxis: {},
          series: [{
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
          }]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
}
</script>
<style>
</style>