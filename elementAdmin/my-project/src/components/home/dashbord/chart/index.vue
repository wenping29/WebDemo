<template>
  <div class="container-charts-warp">
    <el-row :gutter="20">
      <el-col :span="6">
        <lineareachart></lineareachart>
      </el-col>
      <el-col :span="6"> <linechart></linechart></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <bar-chart></bar-chart>
      </el-col>
      <el-col :span="6">
        <pie-chart></pie-chart>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <doughnut-chart></doughnut-chart>
      </el-col>
      <el-col :span="6">
        <scatter-chart></scatter-chart>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import leftmenu from './leftMenu/index'
import linechart from './linechart/index'
import barChart from './barChart/index'
import scatterChart from './scatterChart/index'
import pieChart from './pieChart/index'
import doughnutChart from './doughnutChart/index'
import lineareachart from './lineareachart/index'

export default {
  components: {
    linechart,
    barChart,
    scatterChart,
    pieChart,
    doughnutChart,
    lineareachart,
  }
}
</script>
<style scoped>
.container-charts-warp{
  /* display: flex; */
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>