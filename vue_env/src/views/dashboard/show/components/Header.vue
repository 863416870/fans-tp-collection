<template>
  <div class="className">
    <div class="show-header">
      <div class="h-left">
        <img :src="logoImg">
      </div>
      <div class="h-title">
        <div class="h-title-text">{{ title }}</div>
        <div class="h-title-img"><img :src="headerBottomImg"></div>
      </div>
      <div class="h-right" />
    </div>
  </div>
</template>

<script>
import setting from '@/store/modules/settings'
import headerBottomImg from '@/assets/dashboard/header_bottom.png'

export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      logoImg: setting.state.sidebarLogoImg,
      headerBottomImg: headerBottomImg
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.show-header{
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-top: 27px;
  margin: 0 35px;
  .h-left{
    // margin-top: 27px;
    background-image: url('./../../../../assets/dashboard/header_line.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    flex: 1;
    img{
      // height: 60px;
      height: 48px;
      width: auto;
    }
  }
  .h-title{
    text-align: center;
    width: 600px;
    .h-title-text{
    //  line-height: 105px;
      padding-bottom: 10px;
      font-size: 48px;
      color: $baseTextColor;
      font-weight: bold;
      position: relative;
      img{
        width: 100%;
        height: auto;
      }
    }
    .h-title-img{
      position: absolute;
      left: 0;
      bottom: -20px;
      width: 100%;

    }
  }
  .h-right{
  //  margin-right: 35px;
  //  margin-top: 27px;
    background-image: url('./../../../../assets/dashboard/header_line.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    flex: 1;
    -moz-transform:scaleX(-1);
    -webkit-transform:scaleX(-1);
    -o-transform:scaleX(-1);
    transform:scaleX(-1);
    /*IE*/
    filter:FlipH;
  }
}
</style>
