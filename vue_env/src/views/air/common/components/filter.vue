<template>
	<div class="filter-section">
		<div class="filter-left">
			范围：
			<el-tag size="medium"
			v-for="(item,idx) in dateType"
			v-bind:key="idx"
            :class="idx==rangeIndex?'active':''" 
			@click="btnChange(item,idx)"
			>{{item.name}}</el-tag>
		</div>
		<div class="filter-right">
			<el-date-picker
				size="small"
				v-model="startDateShow"
				type="date"
				@change="changeDate"
				placeholder="开始日期">
			</el-date-picker>
			至
			<el-date-picker
				v-model="endDateShow"
				size="small"
				type="date"
				@change="changeDate"
				placeholder="结束日期">
			</el-date-picker>
		</div>
	</div>					
</template>

<script>
import {diffDate, transformDate} from '@/utils/date.js';

export default {
	name: 'airFilter',
	props: {
		rangeIndex: {
			type: Number,
			required: true
		},
		start_date: {
			required: true
		},
		end_date: {
			required: true
		},
		dateType: {
			required: true
		}
	},
    data() {
        return {
			startDateShow: this.start_date,
			endDateShow: this.end_date
        }
	},
	methods: {
		// 改变范围
		btnChange(item, idx){
			this.$emit("changeRange",idx,item);
		},
		// 改变时间
		changeDate(){
			this.$emit("changeDate");
		}
	},
	watch:{
		startDateShow(val){
			if(val == null){
				this.$emit('update:start_date', val)
			}else{
				this.$emit('update:start_date', transformDate(val))
			}
		},
		endDateShow(val){
			this.$emit('update:end_date', transformDate(val))
		},
		start_date(val){
			this.startDateShow = val
		},
		end_date(val){
			this.endDateShow = val
		},
	},
	updated(){
		
	}
}
</script>