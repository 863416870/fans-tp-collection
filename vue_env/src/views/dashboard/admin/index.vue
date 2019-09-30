<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20">
      <el-col :span="7">
        <div class="i-title"><span class="i-lable" />实时天气状况</div>
        <div class="weather-box">
          <div class="real-weather" />
          <div>
              <WeatherHeader :chart-data="WeatherHeaderData"/>
          </div>
          <div class="real-value">
              <WeatherTemp :chart-data="WeatherTempData" :style="{height:&quot;250px&quot;,width:&quot;50%&quot;}" />
              <WeatherHumi :chart-data="WeatherHumiData" :style="{height:&quot;250px&quot;,width:&quot;50%&quot;}" />
          </div>
        </div>
        <div class="i-title"><span class="i-lable" />大气实时状况</div>
        <div class="air-box">
          <AirList :chart-data="AirListData.PM25AirListData" />
          <AirList :chart-data="AirListData.PM10AirListData" />
          <AirList :chart-data="AirListData.SO2AirListData" />
          <AirList :chart-data="AirListData.O3AirListData" />
          <AirList :chart-data="AirListData.TSPAirListData" />
        </div>
      </el-col>

      <el-col :span="10" class="factory-box">
        <div class="bg-left-img"><img :src="bgLeftImg"></div>
        <div class="factory-info">
          <FactoryDevicePoint :chart-data="FactoryDevicePointData"/>
        </div>
        <div class="bg-right-img"><img :src="bgRightImg"></div>

      </el-col>

      <el-col :span="7">
        <div class="i-title"><span class="i-lable" />空气质量日历</div>
        <div class="aircalendar-box">
          <AirCalendar :chart-data="AirCalendarData" />
          <LegendView />
        </div>
        <div class="i-title"><span class="i-lable" />实时消息</div>
        <div class="msg-box">
          <MsgList :chart-data="MsgListData" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import WeatherTemp from './components/WeatherTemp'
import WeatherHumi from './components/WeatherHumi'
import WeatherHeader from './components/WeatherHeader'
import MsgList from './components/MsgList'
import AirList from './components/AirList'
import AirCalendar from './components/AirCalendar'
import LegendView from './components/Legend'
import FactoryDevicePoint from './components/FactoryDevicePoint'
const moment = require('moment')
import { diffDate } from '@/utils/date'
import { getNoticeList, getAirDataList, getAirCalendarDataList, getWeatherData, getCurrentWeather, getFactoryDevicePoint } from '@/api/dashboard'
import bgLeftImg from '@/assets/dashboard/bg_left.png'
import bgRightImg from '@/assets/dashboard/bg_right.png'


// 大气实时默认数据
const AirChartData = {
  AirList: {
    // 默认颜色色值
    myColor: ['rgb(4,4,4)', 'rgb(252,255,1)', 'rgb(64,239,105)', 'rgb(232,37,5)', 'rgb(3,167,243)'],
    // 默认数据类型名称
    dataName: ['TSP', 'O3', 'SO2', 'PM10', 'PM2.5'],
    // 默认数据类型值
    dataValue: [0, 0, 0, 0, 0]
  },
  AirListData: {// 左侧大气实时状况
    TSPAirListData: {
      myColor: 'rgb(4,4,4)', // 默认颜色色值
      dataName: 'TSP', // 默认数据类型名称
      dataValue: 0, // 原值
      rateVaule:0, // 默认数据类型值此处是百分比 dataValue/maxValue
      maxValue: 1000,//最大值
      WhiteBoxValue: 99.5, // 白框的长度，根据数值范围定长,
      OuterLineValue: 100 // 外框的长度，根据数值范围定长
    },
    O3AirListData: { myColor: 'rgb(252,255,1)', dataName: 'O3', dataValue: 0,maxValue: 1200 },
    SO2AirListData: { myColor: 'rgb(64,239,105)', dataName: 'SO2', dataValue: 0,maxValue: 2600 },
    PM10AirListData: { myColor: 'rgb(232,37,5)', dataName: 'PM10', dataValue: 0,maxValue: 600 },
    PM25AirListData: { myColor: 'rgb(3,167,243)', dataName: 'PM2.5', dataValue: 0,maxValue: 250 }
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    WeatherTemp,
    WeatherHumi,
    WeatherHeader,
    MsgList,
    AirList,
    AirCalendar,
    LegendView,
    FactoryDevicePoint
  },
  data() {
    return {
      WeatherTempData: { TempValue: 0 }, // 左侧温度
      WeatherHumiData: { HumiValue: 0 }, // 左侧湿度
      WeatherHeaderData: { // 左侧天气
        iconClass:'Sunny',
        cur_temp:'0',
        max_temp:'0',
        min_temp:'0',
        cur_weather: '晴天'
      },
      AirListData: {// 左侧大气实时状况
        TSPAirListData: {
          myColor: 'rgb(4,4,4)', // 默认颜色色值
          dataName: '   TSP', // 默认数据类型名称
          dataValue: 0, // 原值
          rateVaule:0, // 默认数据类型值此处是百分比 dataValue/maxValue
          maxValue: 1000,//最大值
          WhiteBoxValue: 99.5, // 白框的长度，根据数值范围定长,
          OuterLineValue: 100 // 外框的长度，根据数值范围定长
        },
        O3AirListData: { myColor: 'rgb(252,255,1)', dataName: '     O3', dataValue: 0,maxValue: 1200 },
        SO2AirListData: { myColor: 'rgb(64,239,105)', dataName: '   SO2', dataValue: 0,maxValue: 2600 },
        PM10AirListData: { myColor: 'rgb(232,37,5)', dataName: ' PM10', dataValue: 0,maxValue: 600 },
        PM25AirListData: { myColor: 'rgb(3,167,243)', dataName: 'PM2.5', dataValue: 0,maxValue: 250 }
      },
      FactoryDevicePointData:[],
      AirCalendarData: { // 右侧空气质量日历
        startTime: diffDate( 30, 2,'YYYY-MM-DD',moment().format('YYYY-MM-DD')),
        endTime: moment().format('YYYY-MM-DD'),
        heatmapData: [],
        shapeSize: [50, 50] // [宽,高]
      },
      MsgListData: [], //右侧 实时消息
      bgLeftImg: bgLeftImg,
      bgRightImg: bgRightImg,
    }
  },
  mounted() {
    // TODO 此处统一请求接口
    this.getAirCalendar()
    this.getMsgList()
    this.getAirList()
    this.getWeatherData()
    this.getCurrentWeather()
    this.getFactoryDevicePoint()
  },
  methods: {
    //  该方法为数据赋值
    handleSetLineChartData(type,val) {
      const __ = this.AirListData
      const __copy = this.AirList
      switch (type) {
        case 'TSP':
          __.TSPAirListData.dataValue = val
          __.TSPAirListData.rateVaule = Math.round((val/__.TSPAirListData.maxValue)*100)
        case 'O3':
          __.O3AirListData.dataValue = val
          __.O3AirListData.rateVaule = Math.round((val/__.O3AirListData.maxValue)*100)
        case 'SO2':
          __.SO2AirListData.dataValue = val
          __.SO2AirListData.rateVaule = Math.round((val/__.SO2AirListData.maxValue)*100)
        case 'PM10':
          __.PM10AirListData.dataValue = val
          __.PM10AirListData.rateVaule = Math.round((val/__.PM10AirListData.maxValue)*100)
        case 'PM25':
          __.PM25AirListData.dataValue = val
          __.PM25AirListData.rateVaule = Math.round((val/__.PM25AirListData.maxValue)*100)
      }
    },
    // 预警实时消息
    async getMsgList() {
      try {
        const ret = await getNoticeList()
        this.MsgListData = ret.data.list || []
      } catch (error) {}
    },
    // 大气实时数据
    async getAirList() {
      try {
        const ret = await getAirDataList()
         this.handleSetLineChartData('TSP',parseInt(ret.data.TSP.toFixed(0)))
         this.handleSetLineChartData('O3',parseInt(ret.data.O3.toFixed(0)))
        this.handleSetLineChartData('SO2',parseInt(ret.data.SO2.toFixed(0)))
        this.handleSetLineChartData('PM10',parseInt(ret.data.PM10.toFixed(0)))
        this.handleSetLineChartData('PM25',parseInt(ret.data.PM25.toFixed(0)))
      } catch (error) {}
    },
    // 空气质量日历
    async getAirCalendar() {
      try {
        const ret = await getAirCalendarDataList()
        const __ = this.AirCalendarData
        __.startTime = ret.data.range[0] || diffDate(moment().format('YYYY-MM-DD'), 30, 2)
        __.endTime = ret.data.range[1] || moment().format('YYYY-MM-DD')
        __.heatmapData = ret.data.data[0] || []
      } catch (error) {}
    },
    // 空气温度 湿度
    async getWeatherData() {
      try {
        const ret = await getWeatherData()
        const __ = this.WeatherTempData
        __.TempValue = ret.data.temperature || 0 // 温度
        __.HumiValue = ret.data.humidity || 0 // 湿度
      } catch (error) {}
    },
    // 空气
    async getCurrentWeather() {
      try {
        const ret = await getCurrentWeather()
        const __ = this.WeatherHeaderData
        __.iconClass = ret.data.cur_weathere || 'Sunny';
        __.cur_weather = ret.data.cur_weather || '晴天';
        __.cur_temp = ret.data.cur_temp || 0;
        __.min_temp = ret.data.min_temp || 0;
        __.max_temp = ret.data.max_temp || 0;
      } catch (error) {}
    },
    //地图
    async getFactoryDevicePoint() {
      try {
        const ret = await getFactoryDevicePoint()
        this.FactoryDevicePointData = ret.data.list || []
        console.log('ret',ret)
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  //background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }

  .real-value{
    width: 100%;
    // height: 500px;
    display:flex;
  }
  .msg-box{
    margin-bottom:32px;
    height: 280px;
  }
  .aircalendar-box{
    margin-top: 20px;
    height: 440px;
  }
  .weather-box{
    margin-top: 30px;
    height: 430px;
  }
  .air-box{
    margin-top: 20px;
  }
  .factory-box{
    display: flex;
    height: 845px;
    .bg-left-img,.bg-right-img{
      width: 100px;
      height: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .factory-info{
      height: 80%;
      width: 100%;
      margin: 80px 0;
    }
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
