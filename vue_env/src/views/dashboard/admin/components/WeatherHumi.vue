<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  name: 'WeatherTemp',

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
    con(val) {

    },
    setOptions({ HumiValue } = {}) {
      this.con(HumiValue)
      this.chart.setOption({
        title: {
          text: '湿度',
          show: true,
          bottom: 0,
          left: 'center',
          textStyle: {
            color: '#fff',
            fontSize: '16',
          }
        },
        // backgroundColor: '#062a44',
        series: [{
          type: 'gauge',
          radius: '35%',
          min: 0, // 最小刻度
          max: 150, // 最大刻度
          splitNumber: 15, // 刻度数量
          startAngle: '269.99',
          endAngle: '-90',
          axisLine: {
            show: true,
            lineStyle: {
              width: 2,
              color: [
                [0.2, '#78B5F3'],
                [1, '#3C8FF4']
              ]
            }
          },
          axisLabel: {
            show: true,
            color: '#fff',
            distance: -35,
            fontSize: 12,
            formatter: function(v) {
              switch (v + '') {
                case '0':
                  return '0'
                case '10':
                  return '10'
                case '20':
                  return '20'
                case '30':
                  return '30'
                case '40':
                  return '40'
                case '50':
                  return '50'
                case '60':
                  return '60'
                case '70':
                  return '70'
                case '80':
                  return '80'
                case '90':
                  return '90'
                case '100':
                  return '100'
                case '110':
                  return '110'
                case '120':
                  return '120'
                case '130':
                  return '130'
                case '140':
                  return '140'
                case '150':
                  return '0'
              }
            }
          }, // 刻度标签。
          axisTick: {
            show: true,
            splitNumber: 5,
            lineStyle: {
              color: '#33eab1', // 此处是刻度颜色
              width: 1
            },
            length: 10
          }, // 刻度样式
          splitLine: {
            show: true,
            length: 15,
            lineStyle: {
              color: '#3C8FF4' // 用颜色渐变函数不起作用
            }
          }, // 分隔线样式
          itemStyle: {
            normal: {
              show: false
            }
          },
          pointer: {
            show: true,
            length: '60%',
            width: 7 // 指针粗细
          },
          z: 12,
          'detail': {
            'formatter': function(value) {
              // if (value !== 0) {
              //     var num = Math.round(value);
              //     return  parseInt(num).toFixed(0) + "%";
              // } else {
              //     return 0;
              // }
              var num = Math.round(value)
              // return "当前进度" + parseInt(num).toFixed(0) + "%";
            },
            // "offsetCenter": ['30%', "60%"],
            'textStyle': {
              padding: [0, 0, 80, 0],
              'fontSize': 20,
              fontWeight: '700',
              'color': '#FBA51C'
            }
          },
          // 'title': {
          //   color: '#fff',
          //   'fontSize': 14,
          //   'offsetCenter': ['-20%', '30%']
          // },
          'data': [{
            'name': '',
            'value': HumiValue
          }]
        },
        {
          // title: {
          //   show: false
          // },
          type: 'gauge',
          radius: '60%',
          splitNumber: 10,
          startAngle: '269.99',
          endAngle: '-90',
          z: 11,
          'axisLine': {
            'lineStyle': {
              'color': [
                [0.6, new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0.1,
                  color: '#FFA500'
                },
                {
                  offset: 0.5,
                  color: '#FFFF00'
                },
                {
                  offset: 1,
                  color: '#7CFC00'
                }
                ])],
                [1, '#3399ea']
              ],
              'width': 5,
              borderWidth: 5,
              borderColor: 'red'
            }
          },
          axisLabel: {
            show: false
          },
          'axisTick': {
            show: false

          },
          'splitLine': {
            'show': false
          },
          pointer: {
            show: false
          },
          detail: {
            show: false
          }
        }
        ]
      },true)
    }
  }
}
</script>

