<template>
    <div class="compare-sidebar">
        <div class="compare-type">
            <el-radio v-model="radio" label="1" @change="changeType('1')">同一监控点不同天对比</el-radio>
            <el-radio v-model="radio" label="2" @change="changeType('2')">同一时间段不同监控点对比</el-radio>
        </div>
        <div class="compare-monitor">
            <div class="title">
                <h4>监控点</h4>
                <el-popover
                    placement="right"
                    width="200"
                    trigger="click"
                    title="监控点列表"
                    >
                    <ul>
                        <li 
                        v-for="(item, index) in allMonitorListRet" 
                        v-bind:key="item.zoneId" 
                        @click="addMonitor(item, index)"
                        :class="item.showActive ? 'active': ''"
                        >
                            <span :style="'width:' + item.level*30 + 'px;display:inline-block'"></span>
                            <i class="el-icon-success" v-if="item.showActive"></i>
                            {{item.name}}
                        </li>
                    </ul>
                    <el-button slot="reference" size="mini">+ 添加</el-button>
                </el-popover>
            </div>
            <div class="monitor-list">
                <ul>
                    <li 
                    v-for="(item, index) in showMonitorList" 
                    :key="item.zoonId"
                    >
                        <span>{{item.name}}</span><i class="el-icon-close" @click="removeMonitor(item, index)"></i>
                    </li>
                </ul>
            </div>
        </div>
        <div class="compare-date">
            <div class="title">
                <h4>选择日期</h4>
                <div class="title-right" v-if="radio=='1'">
                    <el-button size="mini">+ 添加</el-button>
                    <el-date-picker
                        size="small"
                        v-model="choose_dateone"
                        type="date"
                        @change="addDate()"
                        :picker-options="pickerOptions"
                        >
                    </el-date-picker>
                </div>
            </div>
            <div class="content">
                <div class="date-list monitor-list" v-if="radio=='1'" style="margin: 0">
                    <ul>
                        <li 
                        v-for="(item, index) in chooseDateList" 
                        :key="item"
                        >
                            <span>{{item}}</span><i class="el-icon-close" @click="removeDate(item, index)"></i>
                        </li>
                    </ul>
                </div>

                <div class="content-type2" v-if="radio=='2'">
                    <el-date-picker
                        size="small"
                        v-model="start_date"
                        type="date"
                        placeholder="开始日期"
                        :picker-options="pickerOptions"
                        >
                    </el-date-picker>
                    至
                    <el-date-picker
                        v-model="end_date"
                        size="small"
                        type="date"
                        placeholder="结束日期"
                        :picker-options="pickerOptions"
                        >
                    </el-date-picker>
                </div>
            </div>
        </div>
        <div class="btn-confirm">
            <el-button size="medium" type="primary" @click="btnComfirm()">确定</el-button>
        </div>
    </div>
</template>
<script>
import {diffDate, transformDate} from '@/utils/date.js';
import { type } from 'os';

export default {
    name: 'CompareSidebar',
    props: {
        allMonitorList: {
            type: Array,
            required: true
        },
        type: {
            type: String,
            required: true           
        }
    },
    data() {
        return {
            radio: "1", //对比维度
			start_date: diffDate(1, 2),
			end_date: transformDate(),
            choose_dateone: "", // 添加的某个时间
            chooseDateList: [transformDate(), diffDate(1, 2)], // 添加的时间列表
            showMonitorList: [], //选中的监控点
            showMonitorListIds: [], //选中的监控点id
            allMonitorListRet: [], //所有监控点
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            }
        }
    },
    methods: {
        // 切换对比维度
        changeType(compareType) {
            this.radio = compareType;
        },
        // 默认第一个监控点
        defaultMonitor() {
            var defaultItem = this.allMonitorListRet[0];
            this.showMonitorList.push({
                zoneId: defaultItem.zoneId,
                name: defaultItem.name
            })
            this.showMonitorListIds.push(defaultItem.zoneId);
            this.allMonitorListRet[0]['showActive'] = true;
            this.btnComfirm();
        },
        // 添加监控点
        addMonitor(item, index) {
            let monitorRet = this.showMonitorList.findIndex((v) => {
                return v.zoneId === item.zoneId;
            }); 
            // 返回-1说明数组的所有成员都不符合条件
            // 判断此监控点是不是已经选择
            if(monitorRet != -1){
                this.$message({
                    message: '此监控点已添加',
                    type: 'warning'
                });
                return
            }
            if(this.radio == "1" && this.showMonitorList.length >= 1){
                this.$message({
                    message: '同一监控点不同天对比,只能添加一个监控点',
                    type: 'warning'
                });
                return
            }
            this.allMonitorListRet[index]['showActive'] = true;
            this.showMonitorList.push({
                zoneId: item.zoneId,
                name: item.name
            })
            this.showMonitorListIds.push(item.zoneId);
        },
        // 移除监控点
        removeMonitor(item, index){
            this.showMonitorList.splice(this.showMonitorList.findIndex(v => v.zoneId === item.zoneId), 1);
            this.showMonitorListIds.splice(this.showMonitorListIds.findIndex(v => v === item.zoneId), 1);
            this.allMonitorListRet.findIndex(v => {
                v.zoneId === item.zoneId ? v.showActive = false : ''
            })
        },
        // 新增时间
        addDate(){
            let dateRet = this.chooseDateList.findIndex((v) => {
                return v === transformDate(this.choose_dateone);
            }); 
            // 返回-1说明数组的所有成员都不符合条件
            if(dateRet != -1){
                this.$message({
                    message: '当前时间已添加',
                    type: 'warning'
                });
                return
            }
            this.chooseDateList.push(transformDate(this.choose_dateone));
        },
        // 移除时间
        removeDate(item, index) {
            this.chooseDateList.splice(index, 1);
        },
        btnComfirm() {
            let _data = {};
            if(this.radio == "1"){
                if(this.showMonitorList.length > 1){
                    this.$message({
                        message: '同一监控点不同天对比,只能添加一个监控点',
                        type: 'warning'
                    });
                    return
                }
                if(this.chooseDateList.length < 2){
                    this.$message({
                        message: '同一监控点不同天对比,最少需要两天',
                        type: 'warning'
                    });
                    return                    
                }
                _data.areaZoneId = this.showMonitorListIds.join(",");
                _data.categoryName = this.type;
                _data.dateArr = this.chooseDateList;
            }else{
                if(this.showMonitorList.length < 2){
                    this.$message({
                        message: '同一时间段不同监控点对比,最少需要两个监控点',
                        type: 'warning'
                    });
                    return
                }
                if(this.start_date === null || this.end_date === null){
                    this.$message({
                        message: '请选择时间段',
                        type: 'warning'
                    });
                    return                    
                }
                _data.areaZoneIds = this.showMonitorListIds;
                _data.categoryName = this.type;
                _data.startDate = transformDate(this.start_date);
                _data.endDate = transformDate(this.end_date);
            }   
            this.$emit('btn-confirm', _data, this.radio)   
        }
    },
    watch:{
        allMonitorList(val){
            this.allMonitorListRet = val;
            this.defaultMonitor();
        }
    },
    created() {

    },
    mounted() {

    },
	beforeUpdate() { 

	},
}
</script>