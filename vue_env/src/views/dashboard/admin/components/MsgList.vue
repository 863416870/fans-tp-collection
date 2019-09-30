<template>
  <div class="msg-list-content">
    <div class="m-list">
      <scrollCompent :data="msgList" :class-option="srollOption" class="wrap">
        <div v-for="item in msgList" class="m-item">
          <img class="m-alarm-icon" :src="warningIcon">
          <div class="m-content">{{ item.createTimeText }}，{{ item.dataType }}值{{ item.maxValue }} {{ item.dataUnit }}</div>
        </div>
      </scrollCompent>
    </div>
  </div>
</template>

<script>
import warningIcon from '@/assets/dashboard/warning_icon.png'
import scrollCompent from '@/components/Scroll/index'

export default {
  name: 'MsgList',
  components: {
    scrollCompent
  },
  props: {
    chartData: {
      type: Array,
      required: true,
      default: []
    }
  },
  data() {
    return {
      msgList: this.chartData,
      warningIcon: warningIcon
    }
  },
  computed: {
    srollOption() {
      return {
        limitMoveNum: 6
      }
    }
  },
  watch: {
    chartData: { // 深度监听，可监听到对象、数组的变化
      handler(val) {
        this.msgList = val
      },
      deep: true
    }
  },
  methods: {
    end() {
      console.log('ScrollEnd')
    }

  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/variables.scss';

  .msg-list-content{
    width: 100%;
    height: 100%;
    color: $baseTextColor;

    .m-list{
      margin-top: 40px;
      border-radius: 10px;
      box-shadow: inset 0 0 10px rgba($color: #ffffff, $alpha: 0.8);
      background: rgba(28,68,158,0.38);
      height: 100%;
      padding: 30px;
      overflow: hidden;
      font-size: 18px;
      .m-item{
        display: flex;
        justify-content:flex-start;
        align-items: center;
        line-height: 45px;
        height: 45px;
        .m-alarm-icon{
          width: 28px;
          height: 25px;
        }
        .m-content{
          margin-left: 10px;
          height: 100%;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>
