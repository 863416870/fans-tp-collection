<template>
  <div>
    <home-header></home-header>
     <home-swiper :list="swiperList"></home-swiper>
      <home-icons ></home-icons>
      <home-recommend ></home-recommend>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import HomeHeader from '@/pages/home/components/Header'
import HomeSwiper from '@/pages/home/components/Swiper'
import HomeIcons from '@/pages/home/components/Icons'
import HomeRecommend from '@/pages/home/components/Recommend'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HomeRecommend
  },
  data () {
    return {
      swiperList: []
    }
  }
}
</script>

<style>

</style>
