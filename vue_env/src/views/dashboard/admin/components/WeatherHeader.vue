<template>
  <div class="real-top">
    <div class="top-left">
      <icon-svg :icon-class="chartData.iconClass" style="width: 80px;height: 80px;" />
      <div class="w-info">
        <span class="w-value" v-text="chartData.cur_temp + '℃'"></span>
        <span class="w-value">|</span>
        <div class="w-right">
          <div v-text="chartData.cur_weather"></div>
          <div class="w-c">{{chartData.min_temp}}~{{chartData.max_temp}}°C</div>
        </div>
      </div>
    </div>
    <div class="top-right">
      <div class="ymd" v-text="ymd"></div>
      <div class="hms" v-text="hms"></div>
    </div>
  </div>
</template>

<script>
import IconSvg from "@/components/SvgIcon";
import moment from "moment";

export default {
  name: "WeatherHeader",
  components: { IconSvg },
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      ymd: moment().format("YYYY年MM月DD日"),
      hms: moment().format("HH:mm:ss")
    };
  },
  methods: {},
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        console.log(val);
      }
    }
  },
  //mounted是在el挂载到实例上后调用，一般第一个业务逻辑会在这里开启
  mounted: function() {
    var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
    this.hmsTimer = setInterval(function() {
      //设置定时器，每秒执行一次function函数，
      //函数是获取当前时间并给date变量赋值(每秒赋值一次)
      _this.hms = moment().format("HH:mm:ss"); //修改数据hms
    }, 1000);
    this.ymdTimer = setInterval(function() {
      //设置定时器，每秒执行一次function函数，
      //函数是获取当前时间并给date变量赋值(每秒赋值一次)
      _this.ymd = moment().format("YYYY年MM月DD日"); //修改数据hms
    }, 1000 * 60 * 60);
  },
  beforeDestroy: function() {
    if (this.hmsTimer) {
      clearInterval(this.hmsTimer); //在Vue实例销毁前，清除定时器
    }
    if (this.ymdTimer) {
      clearInterval(this.ymdTimer); //在Vue实例销毁前，清除定时器
    }
  }
};
</script>

<style>
.real-top {
  display: flex;
  align-items: center;
}
.top-left,
.top-right {
  width: 50%;
  text-align: center;
}
.w-info {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
}
.w-value {
  font-size: 26px;
  padding-left: 10px;
}
.w-right {
  text-align: left;
  padding-left: 5px;
  font-size: 12px;
}
.ymd {
  font-size: 20px;
  letter-spacing: 1px;
}
.hms {
  font-size: 26px;
  padding-top: 20px;
}
.w-c {
  padding-top: 3px;
}
</style>
