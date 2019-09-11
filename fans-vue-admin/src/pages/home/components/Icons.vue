<template>
  <div class="icons">
    <swiper class="swiper-container" :options="swiperOption">
        <swiper-slide v-for="(page, index) of pages" :key="index">
          <div class="icon">
              <div class='icon-img'
                v-for="item of page"
                :key="item.id">
                <img class='icon-img-content' :src='item.imgUrl' />
                <p class="icon-desc">{{item.desc}}</p>
            </div>
          </div>
        </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'HomeIcons',
  data () {
    return {
      swiperOption: {
        autoplay: false
      },
      iconList: [
        {
          id: 1001,
          imgUrl: '',
          desc: '888'
        },
        {
          id: 1002,
          imgUrl: '',
          desc: '888'
        },
        {
          id: 1003,
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568135052232&di=74cbf7634e2177729eddfc27cf4bfc32&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F54%2F03%2F90%2F5930149711114.png',
          desc: '888'
        },
        {
          id: 1004,
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568135052232&di=74cbf7634e2177729eddfc27cf4bfc32&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F54%2F03%2F90%2F5930149711114.png',
          desc: '888'
        },
        {
          id: 1005,
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568135052232&di=74cbf7634e2177729eddfc27cf4bfc32&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F54%2F03%2F90%2F5930149711114.png',
          desc: '888'
        },
        {
          id: 1006,
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568135052232&di=74cbf7634e2177729eddfc27cf4bfc32&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F54%2F03%2F90%2F5930149711114.png',
          desc: '888'
        },
        {
          id: 1007,
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568135052232&di=74cbf7634e2177729eddfc27cf4bfc32&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F54%2F03%2F90%2F5930149711114.png',
          desc: '888'
        },
        {
          id: 1008,
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568135052232&di=74cbf7634e2177729eddfc27cf4bfc32&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F54%2F03%2F90%2F5930149711114.png',
          desc: '888'
        },
        {
          id: 1009,
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568135052232&di=74cbf7634e2177729eddfc27cf4bfc32&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F54%2F03%2F90%2F5930149711114.png',
          desc: '888'
        }
      ]
    }
  },
  computed: {
    pages () {
      const pages = []
      this.iconList.forEach((item, index) => {
        const page = Math.floor(index / 8)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  }
}
</script>

<style lang="stylus" scoped>
   @import '~styles/varibles.styl'
   @import '~styles/mixins.styl'
  .icons >>> .swiper-container
    height: 0
    padding-bottom: 50%
  .icons
    margin-top: .1rem
    .icon
      position: relative
      overflow: hidden
      float: left
      width: 25%
      height: 0
      padding-bottom: 25%
      .icon-img
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: .44rem
        box-sizing: border-box
        padding: .1rem
        .icon-img-content
          display: block
          margin: 0 auto
          height: 100%
      .icon-desc
        position: absolute
        left: 0
        right: 0
        bottom: 0
        height: .44rem
        line-height: .44rem
        text-align: center
        color: $darkTextColor
        ellipsis()
</style>
