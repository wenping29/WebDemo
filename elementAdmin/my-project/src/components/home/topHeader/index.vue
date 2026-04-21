<template>
  <div class="head-contain">
    <div class="head-contain-title">这是一个很牛的系统</div>
    <el-input
      placeholder="请输入内容"
      class="search-input"
      prefix-icon="el-icon-search"
      v-model="input2">
    </el-input>
    <div class="right-div">
      <div class="item head-badge-contain">
        <el-badge is-dot class="item head-badge-icon">
          <!-- <el-button class="share-button" icon="el-icon-chat-line-square" type="primary"></el-button> -->
          <i class="el-icon-chat-line-square header-notice" style="margin-right: 8px"></i>
        </el-badge>
        <el-badge is-dot class="item head-badge-icon">
          <!-- <el-button class="share-button" icon="el-icon-share" type="primary"></el-button> -->
          <i class="el-icon-message-solid header-share" style="margin-right: 8px"></i>
        </el-badge>
      </div>

      <div class="head-avatar">
        <el-avatar icon="el-icon-user-solid"></el-avatar>
      </div>

      <span class="head-user-name">王小虎</span>
      <el-dropdown>
        <i class="el-icon-arrow-down head-user-name-down" style=""></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input2: '1111'
    }
  }
}
</script>
<style scoped>
.head-contain{
  display: inline-flex;
  width: 100%;
  height: 60px;
  line-height: 60px;
  /* text-align: right; */
  /* border-bottom: 1px solid #DCDFE6; */
}
.head-contain .head-contain-title{
  width: 400px;
  display: inline-block;
  font-size: 20px;
  font-weight: 700;
  color: whitesmoke;
  /* line-height: 60px; */
}
.right-div{
  text-align: right;
  font-size: 12px;
  width: 400px;
}
.search-input{
  width: calc(100% - 400px);
}

.head-contain .head-avatar{
  height: 45px;
  /* top: 10px; */
  /* bottom: 10px; */
  display: inline-block;
  line-height: normal;
  vertical-align: middle;
}
.head-contain .head-user-name{
  color: antiquewhite;
  font-size: 14px;
  margin-left: 8px
}
.head-contain .head-badge-icon {
  line-height: normal;
  /* margin-right: 20px; */
}
.head-contain .head-badge-contain{
  width: 90px;
  display: inline-block;
  margin-right: 20px;
}
.head-contain .header-share,
.head-contain .header-notice{
  width: 32px;
  height: 32px;
  font-size: 20px;
  color: antiquewhite;
}
.head-contain .el-avatar{
  width: 32px;
  height: 32px;
  line-height: 32px;
}
.head-contain .search-input .el-input__inner{
  height: 35px;
  line-height: 35px;
}
.head-contain .head-user-name-down{
  color: antiquewhite;
  margin-right: 8px;
  margin-left: 8px
}
</style>    