<template>
  <div class="header">
    <div class="header-left">返回</div>
    <div class="header-input">輸入城市/景點/</div>
    <div class="header-right">城市</div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader'
}
</script>

<style lang="stylus" scoped>
    .header
        line-height: .86rem
        background: #00bcd4
        display: flex
        color: #fff
        .header-left
            width: .64rem
            float: left
        .header-input
            height .64rem
            line-height .64rem
            background: #ffffff
            margin-top: .12rem
            margin-left:.2rem
            border-radius: .1rem
            color: #cccccc
            flex: 1
        .header-right
            width: 1.24rem
            float: right
            text-align: center
</style>
