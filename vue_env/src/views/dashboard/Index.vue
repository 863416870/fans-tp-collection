<template>
  <div class="dashboard-container">
    <div>
      <adminDashboard />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
export default {
  name: 'Dashboard',
  components: { adminDashboard },
  data() {
    return {

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
@import './../../styles/variables.scss';

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
  padding-bottom: 30px ;
  // background-color: rgb(240, 242, 245);
}
</style>
