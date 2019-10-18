<template>
  <div class="panel-default">
    <div class="page-body">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="系统日志" name="first">
          <SyslogList :active-name="activeName" tab-name="first" />
        </el-tab-pane>
        <el-tab-pane label="登录日志" name="second">
          <LoginLogList :active-name="activeName" tab-name="second" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import SyslogList from './components/SyslogList'
import LoginLogList from './components/LoginLogList'
export default {
  components: { SyslogList, LoginLogList },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style lang="scss" scope>
.el-tabs--card>.el-tabs__header{
  border-bottom: none;
  margin-bottom: 25px;
}
.el-tabs--card>.el-tabs__header .el-tabs__nav{
  border: none;
  background: #424c80;
  border-radius: 5px;
}
#tab-first{
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
#tab-second{
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.el-tabs--card>.el-tabs__header .el-tabs__item:hover{
  color: #fff;
}
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
  border-bottom: none;
  background: #078af0;
  color: #fff;
  // border-radius: 5px;
}
.el-tabs__item{
  height: 35px;
  line-height: 35px;
  padding: 0 15px;
  color: #fff;
}
.el-tabs--card>.el-tabs__header .el-tabs__item{
  border-left: none;
}
</style>
