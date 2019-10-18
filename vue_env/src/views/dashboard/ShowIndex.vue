<template>
  <div class="dashboard-container">
    <showHeader :title="title" class="header-box" />
    <adminDashboard />
  </div>
</template>

<script>
import adminDashboard from './admin'
import { mapGetters } from 'vuex'
import showHeader from './show/components/Header'
import setting from '@/store/modules/settings'

export default {
  name: 'ShowIndex',
  components: {
    adminDashboard,
    showHeader
  },
  data() {
    return {
      title: setting.state.navbarHeaderContent || '环境大数据平台'
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

// 首页标题样式
.i-title{
    font-size: 24px;
    color: $baseTextColor;
    .i-lable{
      padding: 0px 3px;
      background: $baseTextColor;
      margin-right: 10px;
    }
  }
</style>

<style lang="scss" scoped>
.dashboard {
  &-container {
    //margin: 30px ;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dashboard-container{
  background-image: url(./../../assets/dashboard/bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  // padding-bottom: 30px;
  min-height: 100%;
  // background-color: rgb(240, 242, 245);
}

.header-box{
  width: 100%;
  height: 105px;
}
</style>
