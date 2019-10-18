<template>
	<div class="air-page">
		<ChangeType :type="type" :typeCnName="typeCnName" :rootPath="rootPath" :status="status"></changeType>
		<div class="panel-default air-page-left" style="overflow:auto;min-width:260px;">
			<div class="page-heading">
				<h4>对比维度</h4>
			</div>
			<div class="page-body" style="padding:20px 0px;">
				<CompareSidebar 
				:allMonitorList="allMonitorList" 
				:type="type" 
				@btn-confirm="getHourData(arguments)"
				/>
			</div>
		</div>

		<div class="air-page-right">
			<div class="panel-default">
				<div class="page-heading">
					<h4>24小时实时{{this.typeCnName}}走势图</h4>
				</div>
				<div class="page-body">
					<LineChart :chart-data="hour24LineData" v-if="hackReset" />
				</div>
			</div>
		</div>
	
	</div>		
</template>

<script>
// 样式
import '@/styles/air/index.scss';
// js
import {diffDate, transformDate} from '@/utils/date.js';
import { enName2CnName } from '@/utils/data-type-adapt.js'
// 组件
import CompareSidebar from './components/Sidebar' //左侧监控点列表
import ChangeType from '@/views/air/common/ChangeType' //切换页面
import LineChart from '@/views/air/common/LineChart' //折线图
// 请求
import { getZoneList} from '@/api/zone' // 监控点
import { getCompareDataList} from '@/api/data' // charts

import axios from 'axios';
export default {
	
	name: 'air',
	components: {
		CompareSidebar,
		ChangeType,
		LineChart
	},
	data() {
		return {
			type: '', //大气类型
			rootPath: '', //根路径
     	hackReset: true, //强制重新渲染数据
			status: 2, //展示或者对比选中状态
			rangeIndex: 0, //历史范围默认选中状态
			start_date: diffDate(7, 2),
			end_date: transformDate(),
			data: {}, // 向后端传递的数据
			typeCnName: "", // 大气类型的name
			radioChecked: "1", // 对比维度
			allMonitorList: [ //监控点列表

			],
			hour24LineData: { // 24小时走势图
				xAxisData: [],
				lineData: []
			},
		}
	},
	methods: {
		// 获取大气类型
		getType() {
			let hashUrl = window.location.hash;
			let hashArr = hashUrl.split('/');
			this.type = hashArr[hashArr.length - 1];
			this.typeCnName = enName2CnName(this.type);
      		this.rootPath = hashArr[1];
    		this.getZoneData();	
		},
		// 监控点列表
		async getZoneData() {
			try {
				const zoneRes = await getZoneList()
				this.allMonitorList = zoneRes.data.list || [];
			} catch (error) {}
		},
		// 获取24小时数据
		async getHourData(_data) {
			this.data =  _data[0];
			this.radioChecked = _data[1];
			try {
				const chartRes = await getCompareDataList(this.data, this.radioChecked)
        let data = chartRes.data || {}
				this.hour24LineData.xAxisData = data.xArray || []
				this.hour24LineData.lineData = data.dataArray || []
				this.rebuileComponents()
			} catch (error) {}
		},
		rebuileComponents() {
			// 销毁子标签
			this.hackReset = false;
			// 重新创建子标签
			this.$nextTick(() => {
				this.hackReset = true;
			});
		},
	},
	computed: {

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
	},
 	// 接下来的是运行中的两个事件
	beforeUpdate() { 
		// 这时候，表示 我们的界面还没有被更新【数据被更新了吗？  数据肯定被更新了】
		// 得出结论： 当执行 beforeUpdate 的时候，页面中的显示的数据，还是旧的，此时 data 数据是最新的，页面尚未和 最新的数据保持同步
	},
    updated() {
        // updated 事件执行的时候，页面和 data 数据已经保持同步了，都是最新的
    }
}
</script>

