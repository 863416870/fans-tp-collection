<template>
	<div :class="className" :style="{width:width,height:height}"></div>
</template>

<script>
import resize from "@/views/dashboard/admin/components/mixins/resize";

export default {
	name: 'lineChart',
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
            deep: true, //deep属性（深度监听，用于对象下面属性的改变）
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
        setOptions({xAxisData, lineData}) {
			this.$forceUpdate();
			let series = []
			lineData.forEach(function(item, index, array) {
				series.push({
					name: item.name,
					type:'line',
					smooth: true,
					data: item.data,
					markPoint: {
						data: [
							{type: 'max', name: '最大值'},
							{type: 'min', name: '最小值'}
						]
					},
					markLine: {
						data: [
							{type: 'average', name: '平均值'}
						]
					}					
				})
			});
            this.chart.setOption({
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					show: true,
					textStyle: {
						color: "#fff"
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
						magicType: {type: ['line', 'bar']},
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
						type: 'slider', //slider表示有滑动块的，inside表示内置的
						show: true,
						height: 12,
						bottom: '2%',
						backgroundColor:"rgba(0,0,0,0)",  //组件的背景颜色
						borderColor:"#fff",  //边框颜色
						fillerColor: "#0c2785",  //选中范围的填充颜色。
					}, 
					{
						type: "inside",
						show: true,
						height: 15,
					}
				],
				xAxis:  {
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
					name: '空气质量指数',
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