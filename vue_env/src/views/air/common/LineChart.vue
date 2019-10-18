<template>
  <div :class="className" :style="{width:width,height:height}" />
</template>

<script>
import resize from '@/views/dashboard/admin/components/mixins/resize'

export default {
  name: 'LineChart',
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
      default: '450px'
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
  // 响应数据的变化
  watch: {
    chartData: {
      deep: true, // deep属性（深度监听，用于对象下面属性的改变）
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    //  Vue.nextTick: 在下次 DOM 更新循环结束之后执行延迟回调。
    // 在修改数据之后立即使用这个方法，获取更新后的 DOM。
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
      this.chart = this.$echarts.init(this.$el, 'shine')
      this.setOptions(this.chartData)
    },
    setOptions({ xAxisData, lineData }) {
      this.$forceUpdate()
      const series = []
      lineData.forEach(function(item, index, array) {
        series.push({
          name: item.name,
          type: 'line',
          smooth: true,
          data: item.data,
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          },
          markLine: {
            data: [
              { type: 'average', name: '平均值' }
            ]
          }
        })
      })
      this.chart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          show: true,
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '9%',
          top: '17%',
          containLabel: true
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          },
          iconStyle: {
            borderColor: '#fff'
          },
          right: '3%'
        },
        dataZoom: [
          {
            type: 'slider', // slider表示有滑动块的，inside表示内置的
            show: true,
            height: 12,
            bottom: '2%',
            backgroundColor: 'rgba(0,0,0,0)', // 组件的背景颜色
            borderColor: '#fff', // 边框颜色
            fillerColor: '#0c2785', // 选中范围的填充颜色。
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '100%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            textStyle: {
              color: '#fff'
            }
          },
          {
            type: 'inside',
            show: true,
            height: 15
          }
        ],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxisData,
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          name: '',
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          }
        },
        series: series
      })
    }
  }
}
</script>
