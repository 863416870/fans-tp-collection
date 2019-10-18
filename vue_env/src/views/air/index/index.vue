<template>
  <div class="air-page">
    <ChangeType :type="type" :typeCnName="typeCnName" :rootPath="rootPath" :status="status" />
    <div class="panel-default air-page-left" style="overflow:auto">
      <div class="page-heading">
        <h4>监控点列表</h4>
      </div>
      <div class="page-body">
        <Sidebar
          :monitor-list="monitorList"
          :monitor-index="monitorIndex"
          @changeMonitor="changeMonitor(arguments)"
        />
      </div>
    </div>

    <div class="air-page-right">
      <div class="panel-default">
        <div class="page-heading">
          <h4>24小时实时{{ this.typeCnName }}走势图</h4>
        </div>
        <div class="page-body">
          <LineChart :chart-data="hour24LineData" v-if="hackReset" />
        </div>
      </div>
      <div class="panel-default">
        <div class="page-heading">
          <h4>日均{{ this.typeCnName }}历史走势图</h4>
        </div>
        <div class="page-body">
          <AirFilter
            :range-index="rangeIndex"
            :start_date.sync="start_date"
            :end_date.sync="end_date"
            :date-type="dateType"
            @changeRange="changeRange(arguments)"
            @changeDate="getHistoryData(monitorList[monitorIndex].zoneId)"
          />
          <lineChart :chart-data="historyLineData" v-if="hackReset1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import '@/styles/air/index.scss'
import { diffDate, transformDate } from '@/utils/date.js'
import { enName2CnName } from '@/utils/data-type-adapt.js'
import Sidebar from './components/Sidebar' // 左侧监控点列表
import ChangeType from '@/views/air/common/ChangeType' // 切换页面
import AirFilter from '@/views/air/common/AirFilter' // 历史筛选图
import LineChart from '@/views/air/common/LineChart' // 折线图
import { getZoneList } from '@/api/zone'
import { getDataList } from '@/api/data'

export default {
  name: 'air',
	components: {
		ChangeType,
		Sidebar,
		AirFilter,
		LineChart
	},
  data() {
		return {
      type: '', //大气类型
      rootPath: '', //根路径
      hackReset: true, //强制重新渲染数据
      hackReset1: true, //强制重新渲染数据
			monitorIndex: 0, //默认监控点选中第一个
			status: 1, //展示或者对比选中状态
			rangeIndex: 0, //历史范围默认选中状态
			start_date: diffDate(7, 2),
      end_date: transformDate(),
      typeCnName: "",
      dateType: [
				{name: '周',days: '7'},
				{name: '月',days: '30'},
				{name: '季',days: '90'},
				{name: '年',days: '365'},
				{name: '两年',days: '730'},
			],
      monitorList: [ //监控点列表

			],
      hour24LineData: { // 24小时走势图
        xAxisData: [],
        lineData: []
			},
			historyLineData: { // 历史走势图
        xAxisData: [],
        lineData: []
			}
		}
	},
  computed: {
    pointWidth(level) {
      return (10 * level) + 'px'
    }
  },
  methods: {
    // 监控点列表
    async getZoneData() {
      try {
        const ret = await getZoneList()
        this.monitorList = ret.data.list || []
        this.getHourData(this.monitorList[0].zoneId)
        this.getHistoryData(this.monitorList[0].zoneId)
      } catch (error) {}
    },
    // 获取大气类型
    getType() {
      const hashUrl = window.location.hash
      const hashArr = hashUrl.split('/')
      this.type = hashArr[hashArr.length - 1]
      this.typeCnName = enName2CnName(this.type)
      this.rootPath = hashArr[1];
    },
    // 改变监控点
    changeMonitor(msg) {
      this.monitorIndex = msg[0]
      const item = msg[1]
      let zoneId = this.monitorList[this.monitorIndex].zoneId
      this.getHourData(zoneId)
      this.getHistoryData(zoneId)
    },
    // 改变范围
    changeRange(msg) {
      this.rangeIndex = msg[0]
      const item = msg[1]
      this.start_date = diffDate(item.days, 2, 'YYYY-MM-DD')
      let zoneId = this.monitorList[this.monitorIndex].zoneId
      this.getHistoryData(zoneId)
    },
    // 获取24小时数据
    async getHourData(zoneId) {
      try {
        let _data = {
          areaZoneId: zoneId,
          categoryName: this.type,
          hourOrDay: 1
        }
        let ret = await getDataList(_data)
        let data = ret.data || {}
        this.hour24LineData.xAxisData = data.xArray || []
        this.hour24LineData.lineData = data.dataArray || []
        this.rebuileComponents();
      } catch (error) {
		    console.log(error)
	    }
    },
    // 获取历史数据
    async getHistoryData(zoneId) {
      try {
        let _data = {
          areaZoneId: zoneId,
          categoryName: this.type,
          hourOrDay: 2,
          startTime: this.start_date,
          endTime: this.end_date
        }
        let ret = await getDataList(_data)
        let data = ret.data || {}
        this.historyLineData.xAxisData = data.xArray || []
        this.historyLineData.lineData = data.dataArray || [];
        this.rebuileComponents1();
      } catch (error) {
        console.log(error)
      }
    },
    rebuileComponents() {
      // 销毁子标签
      this.hackReset = false;
      // 重新创建子标签
      this.$nextTick(() => {
        this.hackReset = true;
      });
    },
    rebuileComponents1() {
      // 销毁子标签
      this.hackReset1 = false;
      // 重新创建子标签
      this.$nextTick(() => {
        this.hackReset1 = true;
      });
    },
  },
  beforeCreate() {
    // 这是我们遇到的第一个生命周期函数，表示实例完全被创建出来之前，会执行它
    // 注意： 在 beforeCreate 生命周期函数执行的时候，data 和 methods 中的 数据都还没有没初始化
  },
  created() {
    // 在 created 中，data 和 methods 都已经被初始化好了！
    // 如果要直接调用 methods 中的方法，或者操作 data 中的数据，最早，只能在 created 中操作
    this.getType()
  },
  beforeMount() {
    // 这是遇到的第3个生命周期函数，表示 模板已经在内存中编辑完成了，但是尚未把 模板渲染到 页面中
    // 在 beforeMount 执行的时候，页面中的元素，还没有被真正替换过来，只是之前写的一些模板字符串
  },
  mounted() {
    // 这是遇到的第4个生命周期函数，表示，内存中的模板，已经真实的挂载到了页面中，用户已经可以看到渲染好的页面了
    // 注意： mounted 是 实例创建期间的最后一个生命周期函数，当执行完 mounted 就表示，实例已经被完全创建好了，此时，如果没有其它操作的话，这个实例，就静静的 躺在我们的内存中，一动不动
    //获取监控点数据
    this.getZoneData()
  },
 	// 接下来的是运行中的两个事件
  beforeUpdate() {
    // 这时候，表示 我们的界面还没有被更新【数据被更新了吗？  数据肯定被更新了】
    // 得出结论： 当执行 beforeUpdate 的时候，页面中的显示的数据，还是旧的，此时 data 数据是最新的，页面尚未和 最新的数据保持同步
  },
  updated() {
    // updated 事件执行的时候，页面和 data 数据已经保持同步了，都是最新的
  },
}
</script>

