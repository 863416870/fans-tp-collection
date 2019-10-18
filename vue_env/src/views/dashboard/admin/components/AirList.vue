<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>
<script>
import echarts from 'echarts';
require('echarts/theme/macarons') // echarts theme
  import resize from './mixins/resize';

export default {
  name: 'AirList',

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
      default: '65px'
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

    setOptions({ myColor, dataName, dataValue, rateVaule, WhiteBoxValue, OuterLineValue } = {}) {
      if(WhiteBoxValue == '' || WhiteBoxValue == undefined){
        WhiteBoxValue =99.5
      }
      if(OuterLineValue == '' || OuterLineValue == undefined){
        OuterLineValue =100
      }
      this.chart.setOption( {
        // backgroundColor: '#0e2147',
        grid: {
          left: '11%',
          top: '12%',
          right: '0%',
          bottom: '8%',
          containLabel: true
        },
        xAxis: [{
          show: false
        }],
        yAxis: [{
          axisTick: 'none',
          axisLine: 'none',
          offset: '27',
          axisLabel: {
            textStyle: {
              color: '#ffffff',
              fontSize: '16'
            }
          },
          data: [dataName]
        }, {
          axisTick: 'none',
          axisLine: 'none',
          axisLabel: {
            textStyle: {
              color: '#ffffff',
              fontSize: '16'
            }
          },
          data: ['ug/m3']
        }, {
          name: '单位 ug/m3',
          nameGap: '50',
          nameTextStyle: {
            color: '#ffffff',
            fontSize: '16'
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(0,0,0,0)'
            }
          },
          data: []
        }],
        series: [{
          name: '条',
          type: 'bar',
          yAxisIndex: 0,
          data: [rateVaule],
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter:function(param){
                // return param.value + '%';
                return dataValue;
              },
              textStyle: {
                color: '#ffffff',
                fontSize: '16'
              }
            }
          },
          barWidth: 12,
          itemStyle: {
            normal: {
              color: function(params) {
                var num = [myColor].length
                  return [myColor][params.dataIndex % num]
              }
            }
          },
          z: 2
        }, {
          name: '白框',
          type: 'bar',
          yAxisIndex: 1,
          barGap: '-100%',
          data: [WhiteBoxValue],
          barWidth: 20,
          itemStyle: {
            normal: {
              color: '#0e2147',
              barBorderRadius: 5
            }
          },
          z: 1
        }, {
          name: '外框',
          type: 'bar',
          yAxisIndex: 2,
          barGap: '-100%',
          data: [OuterLineValue],
          barWidth: 24,
          itemStyle: {
            normal: {
              color: function(params) {
                var num = [myColor].length
                  return [myColor][params.dataIndex % num]
              },
              barBorderRadius: 5
            }
          },
          z: 0
        },
        {
          name: '外圆',
          type: 'scatter',
          hoverAnimation: false,
          data: [0],
          yAxisIndex: 2,
          symbolSize: 35,
          itemStyle: {
            normal: {
              color: function(params) {
                var num = [myColor].length
                    return [myColor][params.dataIndex % num]
              },
              opacity: 1
            }
          },
          z: 2
        }
        ]
      },true)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './../../../../styles/variables.scss';
  .air-list-content{
    width: 100%;
    height: 100%;
    color: $baseTextColor;
  }
</style>
