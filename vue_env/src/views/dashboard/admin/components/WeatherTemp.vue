<template>
  <div :class="className" :style="{height:height,width:width}" class="temp-style"/>
</template>

<script>
import echarts from 'echarts';
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize';

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
      default: '300px'
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
      chart: null,
      mercuryColor: '#fd4d49',
      borderColor: '#fd4d49',
      boxPosition: [-100, -50],
      kd: []
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
      // 刻度使用柱状图模拟，短设置3，长的设置5；构造一个数据
      for (var i = 0, len = 130; i <= len; i++) {
        if (i > 100 || i < 30) {
          this.kd.push('0')
        } else {
          if (i % 10 === 0) {
            this.kd.push('10');
          } else {
            this.kd.push('3');
          }
        }

      }
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
    // 此处改变中间线的渐变色和文本内容
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ TempValue } = {}) {
      const data = [TempValue + 30]
      this.chart.setOption({
        title: {
          text: '温度',
          show: true,
          // top: 208,
          bottom: 10,
          left: 'center',
          textStyle: {
            color: '#fff',
            fontSize: '16',
          }
        },
        yAxis: [{
          show: false,
          min: 0,
          max: 90,
        }, {
          show: false,
          data: [],
          min: 0,
          max: 90,
        }],
        xAxis: [{
          show: false,
          data: []
        }, {
          show: false,
          data: []
        }, {
          show: false,
          data: []
        }, {
          show: false,
          min: -150,
          max: 100,

        }],
        grid: {
					top: 'center',
					height: 80,
				},
        series: [{
          name: '条',
          type: 'bar',
          // 对应上面XAxis的第一个对象配置
          xAxisIndex: 0,
          data: [
            {
              value: TempValue + 30,
              label: {
                normal: {
                  show: true,
                  position: this.boxPosition,
                  backgroundColor: {
                    // image: "/images/power/bg5Valuebg.png" //文字框背景图
                  },
                  width: 200,
                  height: 100,
                  formatter:
                    '{downTxt| ' +
                    TempValue +
                    ' }{downTxt|°C}\n{downTxt|' +
                    '' +
                    '}',
                  rich: {
                    back: {
                      align: 'center',
                      lineHeight: 50,
                      fontSize: 40,
                      fontFamily: 'digifacewide',
                      color: ''
                    },
                    unit: {
                      fontFamily: '微软雅黑',
                      fontSize: 15,
                      lineHeight: 50,
                      color: ''
                    },
                    downTxt: {
                      lineHeight: 50,
                      fontSize: 12,
                      align: 'center',
                      color: '#fff'
                    }
                  }
                }
              }
            }
          ],
          barWidth: 10,
          itemStyle: {
            normal: {
              color: '#ff0000',
              barBorderRadius: 10,
            }
          },
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: function(param) {
                // 因为柱状初始化为0，温度存在负值，所以，原本的0-100，改为0-130，0-30用于表示负值
                return param.value - 30 + '°C';
              },

              textStyle: {
                color: '#ccc',
                fontSize: '10',
              }
            }
          },
          z: 2
        }, {
          name: '白框',
          type: 'bar',
          xAxisIndex: 1,
          barGap: '-100%',
          data: [129],
          barWidth: 18,
          itemStyle: {
            normal: {
              color: 'rgb(57,97,153)',
              barBorderRadius: 50,
            }
          },
          z: 1
        }, {
          name: '外框',
          type: 'bar',
          xAxisIndex: 2,
          barGap: '-100%',
          data: [130],
          barWidth: 22,
          itemStyle: {
            normal: {
              color: this.borderColor,
              barBorderRadius: 50,
            }
          },
          z: 0
        }, {
          name: '圆',
          type: 'scatter',
          hoverAnimation: false,
          data: [0],
          xAxisIndex: 0,
          symbolSize: 20,
          itemStyle: {
            normal: {
              color: '#ff0000',
              opacity: 1,
            }
          },
          z: 2
        }, {
          name: '白圆',
          type: 'scatter',
          hoverAnimation: false,
          data: [0],
          xAxisIndex: 1,
          symbolSize: 28,
          itemStyle: {
            normal: {
              color: 'rgb(57,97,153)',
              opacity: 1,
            }
          },
          z: 1
        }, {
          name: '外圆',
          type: 'scatter',
          hoverAnimation: false,
          data: [0],
          xAxisIndex: 2,
          symbolSize: 32,
          itemStyle: {
            normal: {
              color: this.borderColor,
              opacity: 1,
            }
          },
          z: 0
        }, {
          name: '刻度',
          type: 'bar',
          yAxisIndex: 1,
          xAxisIndex: 3,
          label: {
            normal: {
              show: true,
              position: 'right',
              distance: 5,
              color: '#00fefb',
              fontSize: 7,
              formatter: function(params) {
                // 因为柱状初始化为0，温度存在负值，所以，原本的0-100，改为0-130，0-30用于表示负值
                if (params.dataIndex > 100 || params.dataIndex < 30) {
                  return '';
                } else {
                  if (params.dataIndex % 10 === 0) {
                    return params.dataIndex - 30;
                  } else {
                    return '';
                  }
                }
              }
            }
          },
          barGap: '-100%',
          data: this.kd,
          barWidth: 1,
          itemStyle: {
            normal: {
              barBorderRadius: 10,
              color: '#ff0000'
            }
          },
          z: 0
        }]
      })
    }
  }
}
</script>
<style>
.temp-style canvas{
  top: 10px!important;
}
</style>
