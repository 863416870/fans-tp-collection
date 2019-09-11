<template>
  <div>
    <div class="title">
      热销推荐
    </div>
    <ul>
      <li class="item border-bottom">
        <div class="item-img-wrapper">
          <img class="item-img" src="http://pic1.win4000.com/wallpaper/c/53cdd1f7c1f21.jpg" alt="">
        </div>
        <div class="item-info">
          <p class="item-title">撒大苏打撒</p>
          <p class="item-desc">水水水水水水水水水水水</p>
          <button class="item-button">查看详情</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend'
}
</script>

<style lang="stylus" scoped>
  @import '~styles/mixins.styl'
  .title
    margin-top .2rem
    background #eee;
    line-height 0.8rem
    text-indent .2rem
  .item
    overflow hidden
    display flex
    /*background red*/
    height 1.9rem
    .item-img
        height 1.7rem
        width 1.7rem
        padding .1rem
     .item-info
        flex 1
        padding .1rem
        min-width 0
        .item-title
          line-height .54rem
          font-size .32rem
          ellipsis()
       .item-desc
           line-height .4rem
           color #ccc
           ellipsis()
        .item-button
            margin-top .16rem
            line-height .44rem
            background #ff9300
            padding 0 .2rem
            border-radius .06rem
            color #fff
</style>
