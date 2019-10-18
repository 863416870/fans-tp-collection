<template>
  <div :class="className" :style="{height:height,width:width}">
  </div>
</template>
<script>
  import echarts from "echarts";
  require("echarts/theme/macarons"); // echarts theme
  import resize from "./mixins/resize";
  import {getBetweenDate, diffDate} from "@/utils/date";
  export default {
    name: "AirCalendar",
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: "chart"
      },
      width: {
        type: String,
        default: "100%"
      },
      height: {
        type: String,
        default: "350px"
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
        heatmapData: [],
        lunarData: [],
        defaultSize : [40, 40]
      };
    },
    watch: {
      chartData: {
        deep: true,
        handler(val) {
          this.setOptions(val);
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart();
      });
    },
    beforeDestroy() {
      if (!this.chart) {
        return;
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
      //处理时间
      getVirtulData(startTime,endTime) {
        const dateList = _.chunk(getBetweenDate(startTime,endTime),1)
         dateList.forEach(function (val,key) {
          dateList[key].push('')
        })
        return dateList
      },
      //get
      obToArr(object){
        var arr= [];
        for (var i in object){
          arr.push(object[i][0],parseInt(object[i][1]));
        }
        return  _.chunk(arr,2);
      },
      //赋值heatmapData与lunarData
      setValue(dateList, heatmapData) {
        const heatmapDatas = this.obToArr(heatmapData)
        for (var i = 0; i < dateList.length; i++) {
          if (heatmapDatas.length === 0) { //处理空数据加默认值
            this.heatmapData.push([
              dateList[i][0],
              0
            ]);
          } else{
            this.heatmapData= heatmapDatas;
            break;
          }
          this.lunarData.push([
            dateList[i][0],
            1,
            dateList[i][1],
            dateList[i][2]
          ]);
        }
      },

      initChart() {
        this.chart = echarts.init(this.$el, "macarons");
        this.setOptions(this.chartData);
      },
      setOptions({ startTime, endTime, heatmapData, shapeSize} = {}) {

        const dateList = this.getVirtulData(startTime,endTime)//处理时间数据
        // const endate = diffDate(1,2,'YYYY-MM-DD',endTime)//将结束时间提前一天
        if(shapeSize == undefined || shapeSize.length === 0){
          shapeSize = this.defaultSize
        }
        this.setValue(dateList,heatmapData)//处理值
        this.chart.setOption({
          tooltip: {
            formatter: function (params) {
              return 'api: ' + params.value[1].toFixed(0);
            }
          },
          visualMap: {
            min: 0,
            max: 300,
            show : false,
            x: 'center',
            bottom: 5,
            type: 'piecewise',
            // orient: 'vertical',
            orient: 'horizontal',
            inRange: {
              color: ['rgb(14,202,59)', 'rgb(3,167,243)', 'rgb(247,188,8)','rgb(232,37,5)','rgb(0,0,0)'],
              opacity: 1
            },
            //颜色色值划分
             splitList: [
                 {start: 0, end:50},
                 {start: 50, end: 100},
                 {start: 100, end: 150},
                 {start: 150, end: 200},
                 {start: 200, end: 500}
             ],
            pieces: [
                {min: 0, max: 50}, // 不指定 max，表示 max 为无限大（Infinity）。
                {min: 50, max: 100},
                {min: 100, max: 150},
                {min: 150, max: 200},
                {min: 200, max: 500, lable: '\n\n0-50'},
            ],
            controller: {
              inRange: {
                opacity: 1
              }
            },
            textStyle: {
              color: "#fff",
            }
          },
          calendar: [{
            left: '0',
            top: '15%',
            width: '100%',
            cellSize: shapeSize,
            yearLabel: {show: false},
            orient: 'vertical',
            dayLabel: {
              firstDay: 1,
              nameMap: 'cn',
              color: '#ffffff'
            },
            monthLabel: {
              show: false
            },
            range:  [startTime,endTime],
          }],

          series: [
            {
              type: 'scatter',
              coordinateSystem: 'calendar',
              symbolSize: 1,
              label: {
                normal: {
                  show: true,
                  formatter: function (params) {
                    var d = echarts.number.parseDate(params.value[0]);
                    return d.getDate() + '\n\n' + params.value[2] + '\n\n';
                  },
                  textStyle: {
                    fontSize:14,
                    color: '#fff',
                    padding: [55,0,0,0]
                    //top:100,
                  }
                }
              },
              data: this.lunarData
            },
            {
              type: 'scatter',
              coordinateSystem: 'calendar',
              symbolSize: 0,
              label: {
                normal: {
                  show: true,
                  formatter: function (params) {
                    return '\n\n\n' + (params.value[3] || '');
                  },
                  textStyle: {
                    fontSize: 12,
                    color: '#a00'
                  }
                }
              },
              data: this.lunarData
            },
            {
              name: 'aqi日历',
              type: 'heatmap',
              coordinateSystem: 'calendar',
              data: this.heatmapData
            }
          ]},true)
      }
    }
  };
</script>

