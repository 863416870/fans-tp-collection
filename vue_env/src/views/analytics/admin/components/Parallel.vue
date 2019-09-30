<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  name: 'ParallelVue',
  mixins: [resize],
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
      default: '350px'
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
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
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
    setOptions({ dataBJ, dataGZ, dataSH, schema, lineStyle } = {}) {
      this.chart.setOption({
        backgroundColor: '#333',
        legend: {
          bottom: 30,
          data: ['北京', '上海', '广州'],
          itemGap: 20,
          textStyle: {
            color: '#fff',
            fontSize: 14
          }
        },
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
        parallelAxis: [
          { dim: 0, name: schema[0].text, inverse: true, max: 31, nameLocation: 'start' },
          { dim: 1, name: schema[1].text },
          { dim: 2, name: schema[2].text },
          { dim: 3, name: schema[3].text },
          { dim: 4, name: schema[4].text },
          { dim: 5, name: schema[5].text },
          { dim: 6, name: schema[6].text },
          { dim: 7, name: schema[7].text,
            type: 'category', data: ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染'] }
        ],
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
          right: '18%',
          bottom: 100,
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
        series: [
          {
            name: '北京',
            type: 'parallel',
            lineStyle: lineStyle,
            data: dataBJ
          },
          {
            name: '上海',
            type: 'parallel',
            lineStyle: lineStyle,
            data: dataSH
          },
          {
            name: '广州',
            type: 'parallel',
            lineStyle: lineStyle,
            data: dataGZ
          }
        ]
      })
    }
  }
}
</script>

<style scoped>

</style>
