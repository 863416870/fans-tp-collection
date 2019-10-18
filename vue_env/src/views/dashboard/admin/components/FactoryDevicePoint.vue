<template>
  <div class="factory-device-point" :style="Img">
    <div class="point-box">
      <div
        class="point-img"
        v-for="item of chartData"
        :key="item.deviceId"
        :style="{position:'absolute',left:item.xPercent+'%',top:item.yPercent+'%'}"
      >
        <!--        <div class="out l-liang-out"  >-->
        <!--          <div class="in l-liang-in"></div>-->
        <!--          <div class="point-info" v-if="seen">-->
        <!--            <div class="point-item">监测点：{{item.deviceName}}</div>-->
        <!--            <div class="point-item">位置：{{item.zoneName}}</div>-->
        <!--            <div class="point-item">首要污染物：{{item.pollutant}}</div>-->
        <!--          </div>-->
        <!--        </div>-->
        <Point
          :deviceName="item.deviceName"
          :zoneName="item.zoneName"
          :pollutant="item.pollutant"
          :api="item.api"
          :show-status="showStatus"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Point from "./Point";
export default {
  name: "FactoryDevicePoint",
  components: { Point },
  props: {
    chartData: {
      type: Array,
      required: true
    },
    showStatus: {
      trpe: Object,
      required: true
    }
  },
  data() {
    return {
      seen: false,
      current: 0,

      Img: {
        backgroundImage:
          "url(" + require("@/assets/dashboard/factoryBg.jpg") + ")",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        position: "relative"
      }
    };
  },
  computed: {
    colorClass: function(val, type) {
      if (val >= 0 && val < 50) {
        return type === 1 ? "l-you-out" : "l-you-in";
      } else if (val >= 50 && val < 100) {
        return type === 1 ? "l-liang-out" : "l-liang-in";
      } else if (val >= 101 && val < 150) {
        return type === 1 ? "l-qing-out" : "l-qing-in";
      } else if (val >= 151 && val < 200) {
        return type === 1 ? "l-zhong-out" : "l-zhong-in";
      } else {
        return type === 1 ? "l-zhongdu-out" : "l-zhongdu-in";
      }
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.factory-device-point {
  width: 100%;
  height: 100%;
  .point-img {
    cursor: pointer;
  }
}
</style>
