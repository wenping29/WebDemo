
<template>
<el-container style="height: 100%; border: 1px solid #eee">
  <el-header>
    <top-header></top-header>
  </el-header>
  <el-container>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <leftmenu></leftmenu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
  <el-footer>
    <foot></foot>
  </el-footer>
</el-container>
</template>
<script>
import foot from '../footer.vue'
import topHeader from './topHeader/index.vue'
import leftmenu from './leftMenu/index'

export default {
  name: 'App',
  components: {
    topHeader,
    foot,
    leftmenu
  },
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item)
      // git remote add origin http://192.168.1.5:2030/gitlab/wenping/myproject.git
    }
  }
}
</script>
<style scoped>
  .el-header {
    background-color: #4d83ff;
    /* color: #333; */
    /* line-height: 60px; */
    border-bottom: 1px solid #DCDFE6;
  }
  .el-aside {
    /* color: #333; */
  }
  .el-main{
    padding: 0px;
  }
</style> 