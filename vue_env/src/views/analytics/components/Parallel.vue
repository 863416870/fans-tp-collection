<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'ParallelVue',
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: document.body.clientHeight - 310 + 'px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    },
  },
  mounted() {
    var _this= this;
    window.onresize = function(){
       _this.chart.resize();
    }
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },

  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ series, schema, legend, parallelAxis } = {}) {
      this.chart.setOption({
        legend: {
          bottom: 10,
          data: legend,
          itemGap: 20,
          textStyle: {
            color: '#fff',
            fontSize: 14
          }
        },
        color:["#fe2407", "#2cd55c", "#0980fb"],
        tooltip: {
          padding: 10,
          backgroundColor: '#222',
          borderColor: '#777',
          borderWidth: 1,
          formatter: function(obj) {
            var value = obj[0].value
            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
                obj[0].seriesName + ' ' + value[0] + '日期：' +
                value[7] +
                '</div>' +
                schema[1].text + '：' + value[1] + '<br>' +
                schema[2].text + '：' + value[2] + '<br>' +
                schema[3].text + '：' + value[3] + '<br>' +
                schema[4].text + '：' + value[4] + '<br>' +
                schema[5].text + '：' + value[5] + '<br>' +
                schema[6].text + '：' + value[6] + '<br>'
          }
        },
        parallelAxis:parallelAxis,
        visualMap: {
          show: true,
          min: 0,
          max: 150,
          dimension: 2,
          inRange: {
            color: ['#d94e5d', '#eac736', '#50a3ba'].reverse()
            // colorAlpha: [0, 1]
          }
        },
        parallel: {
          left: '5%',
          right: '5%',
          bottom: 60,
          parallelAxisDefault: {
            type: 'value',
            name: 'AQI指数',
            nameLocation: 'end',
            nameGap: 20,
            nameTextStyle: {
              color: '#fff',
              fontSize: 12
            },
            axisLine: {
              lineStyle: {
                color: '#aaa'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#777'
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            }
          }
        },
        series: series
      },true)
    }
  }
}
</script>

<style scoped>

</style>
