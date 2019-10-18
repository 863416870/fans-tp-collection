<template>
  <div class="analytics-page panel-default">
    <el-form :model="selectInfo" :rules="rules" ref="selectInfo" label-width="90px" label-position="left">
      <el-form-item label="监控点" prop="zoneIds" class="formItem">
        <el-tag :key="tag.value" v-for="tag in selectInfo.zoneIds" closable color="transparent" class="elTag" :disable-transitions="false" @close="closeTag(tag, 'zoneIds')">
          {{tag.label}}
        </el-tag>
        <el-select class="input-new-tag" v-if="monitorVisible" v-model="monitorValue" ref="saveMonitorInput" placeholder="添加监控点"
          @visible-change="dealSelect($event, 'monitor')" @blur="dealSelect($event, 'monitor')" @change="selMonitor($event, 'monitorValue')">
          <el-option v-for="item in monitorOpt" :key="item.value" :value="item.value">
            <span v-html="item.label"></span>
          </el-option>
        </el-select>
        <el-button v-else class="button-new-tag" size="small" @click="monitorVisible = true"
          :disabled="selectInfo.zoneIds.length > 2">+ 添加</el-button>
      </el-form-item>
      <el-form-item label="参数" prop="typeIds" class="formItem">
        <el-tag :key="tag.value" v-for="tag in selectInfo.typeIds" closable class="elTag" color="transparent" :disable-transitions="false" @close="closeTag(tag, 'typeIds')">
          {{tag.label}}
        </el-tag>
        <el-select class="input-new-tag" v-if="paramVisible" v-model="paramValue" ref="saveParamInput" placeholder="添加参数"
          @visible-change="dealSelect($event, 'param')" @blur="dealSelect($event, 'param')" @change="selMonitor($event, 'paramValue')">
          <el-option v-for="item in paramOpt" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button v-else class="button-new-tag" size="small" @click="paramVisible = true"
          :disabled="selectInfo.typeIds.length > 5">+ 添加</el-button>
      </el-form-item>
      <el-form-item label="选择时间" class="formItem" required>
        <el-form-item prop="startTime" class="disInline">
          <el-date-picker autosize default-time="00:00:00" v-model="selectInfo.startTime" type="date" class="startTime" placeholder="开始时间" :picker-options="pickStartTime" size="small"></el-date-picker>
        </el-form-item>
        <b class="demonstration disInline">至</b>
        <el-form-item prop="endTime" class="disInline">
          <el-date-picker autosize default-time="00:00:00" v-model="selectInfo.endTime" type="date" class="endTime" placeholder="结束时间" :picker-options="pickEndTime" size="small"></el-date-picker>
        </el-form-item>
        <el-button size="small" type="primary" @click="submitInfo" class="submitBtn">提交</el-button>
      </el-form-item>
    </el-form>
    <el-row style="padding:16px 30px;">
      <el-col :span="22" :offset="1">
        <Parallel :chart-data="lineChartDatas" />
      </el-col>
    </el-row>
  </div>
</template>

<script>

import moment from 'moment'
import Parallel from './components/Parallel'
import { getZoneList } from '@/api/zone'
import { getDatatypeList } from '@/api/warning'
import { getAnalyticsData } from '@/api/analytics'

const lineChartData = {
  parallelaqi: {
    data:{
      // 10000000001: [],
    },
    schema: [
      { name: 'date', index: 0, text: '日期' },
      { name: '等级', index: 1, text: '等级' }
    ],
    lineStyle: {
      normal: {
        width: 1,
        opacity: 0.5
      }
    },
    zoneName: {
        // 10000000001: "请求",
    },
    parallelAxis:[
      { dim: 0, name: '日期', inverse: true, max: 31, nameLocation: 'start' },
      { dim: 1, name: '等级',
            type: 'category', data: ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染'] }
    ]
  }
}

export default {
  name: 'analytics',
  components: {
    Parallel,
  },
  data() {
    return {
      //顶部选择框的数据
      selectInfo:{
        startTime: new Date(moment(new Date().setDate(1)).format('YYYY-MM-DD 00:00:00')),
        endTime: new Date(),
        zoneIds: [],
        typeIds: []
      },
      //监控点下拉框是否可见以及其绑定的值
      monitorVisible: false,
      monitorValue: "",
      monitorOpt:[],
      monitorOptFormat:{
          name: [],
          zoneId: []
        },
      //参数下拉框是否可见以及其绑定的值
      paramVisible: false,
      paramValue: '',
      paramOpt:[],
      paramOptFormat:{
        name: [],
        typeId: []
      },
      //图的数据
      lineChartDatas: "",
      //下拉框校验规则
      rules: {
        zoneIds: [
          { type: 'array', required: true, message: '请选择监控点', trigger: 'blur' }
        ],
        startTime: [
          { type: 'date', required: true, message: '请选择开始日期', trigger: 'change' }
        ],
        endTime: [
          { type: 'date', required: true, message: '请选择结束日期', trigger: 'change' }
        ],
        typeIds: [
          { type: 'array', required: true, message: '请选择参数', trigger: 'blur' }
        ]
      },

      //起始时间限制条件
      pickStartTime: {
        disabledDate: time => {
          var endDateVal = this.selectInfo.endTime;
          //最长显示30天的数据
          let one = 30 * 24 * 3600 * 1000;
          if (endDateVal) {
          //起始时间选择框，起始时间不能大于开始时间且起始时间不能小于结束时间30天
            return time.getTime() > new Date(endDateVal).getTime() || time.getTime() + one < new Date(endDateVal).getTime();
          }else{
            return time.getTime() > new Date(new Date().toDateString()).getTime()
          }
        }
      },

      //结束时间限制条件
      pickEndTime: {
          disabledDate: time => {
          var beginDateVal = this.selectInfo.startTime;
          //最长显示30天的数据
          let one = 30 * 24 * 3600 * 1000;
          if (beginDateVal) {
          //结束时间选择框，结束时间不能小于起始时间，结束时间不能大于等于今天并且结束时间不能大于起始时间30天
            return time.getTime() > new Date(new Date().toDateString()).getTime()|| time.getTime() < new Date(beginDateVal).getTime() || time.getTime() > new Date(beginDateVal).getTime() + one
          }else{
              return time.getTime() > new Date(new Date().toDateString()).getTime()
            }
        }
      }
    }
  },
  created() {
    this.getZoneData()
    this.getDatatype()
    this.getInitData();
    this.getChartData("");
  },
  methods: {
    //获取默认数据
    getInitData() {
       var _this = this;

       var data = [];
        this.selectInfo.typeIds = data;
        var data1 = [];
        this.selectInfo.zoneIds = data1;
      },

    //点击添加下拉框选择数据
    dealSelect(status, element) {
      var _this = this;
      var status = status;
      var element = element;
      var tagFlag = element == "param" ? "typeIds": "zoneIds";
      if(status) { return;}
      var formatValue = JSON.parse(sessionStorage.getItem(element + "OptFormat"));
      let selValue = this[element + "Value"];
      if(element !== "param"){
        if(formatValue.zoneId.indexOf(selValue) > -1 && JSON.stringify(_this.selectInfo[tagFlag]).indexOf(selValue) == "-1"){
          _this.selectInfo[tagFlag].push({
            value: selValue,
            label: formatValue.name[formatValue.zoneId.indexOf(selValue)]
          });
        }
      }else{
        if(formatValue.typeId.indexOf(selValue) > -1 && JSON.stringify(_this.selectInfo[tagFlag]).indexOf(selValue) == "-1"){
          _this.selectInfo[tagFlag].push({
            value: selValue,
            label: formatValue.name[formatValue.typeId.indexOf(selValue)]
          });
        }
      }
      this[element + "Value"] = "";
      this[element + "Visible"] = false;
    },

    //关闭tag标签
    closeTag(tag, element) {
      this.selectInfo[element].splice(this.selectInfo[element].indexOf(tag), 1);
    },

    //将选择的值赋给model
    selMonitor(value, element){
      this[element] = value;
    },

    //点击确定按钮，提交数据
    submitInfo(){
      var _this = this;
      this.$refs.selectInfo.validate((valid) => {
        if (!valid) {
          return false;
        } else {
          var selectInfo = JSON.parse(JSON.stringify(_this.selectInfo));
          var zoneIds = [];
          var typeIds = [];
          //格式转换
          selectInfo.startTime = moment(selectInfo.startTime).format("YYYY-MM-DD");
          selectInfo.endTime = moment(selectInfo.endTime).format("YYYY-MM-DD");
          selectInfo.zoneIds.forEach((item,index,arr)=>{
            zoneIds.push(item.value);
          })
          selectInfo.typeIds.forEach((item,index,arr)=>{
            typeIds.push(item.value);
          })
          selectInfo.zoneIds = zoneIds;
          selectInfo.typeIds = typeIds;
          console.log(selectInfo.startTime,selectInfo.endTime, selectInfo.zoneIds,selectInfo.typeIds)
          //发送请求获取图的数据
          _this.getChartData(selectInfo);
        }
      })
    },

    //请求图中所需的数据
    getChartData(selectInfo){
        var selectInfo = selectInfo;
        if(selectInfo === ""){
          this.lineChartDatas = this.formatChartData(lineChartData.parallelaqi);

        }else{
          this.getAnalyticsData(selectInfo)
          // this.lineChartDatas = this.formatChartData(this.lineChartDatas);
        }
    },

    //将图的数据转化为所需格式
    formatChartData({data, schema, zoneName, lineStyle, parallelAxis} = {}){
      var _zoneId = [];
      var series = [];
      var legend = [];
      for(var item in zoneName){
        _zoneId.push(item);
      };
      _zoneId.forEach((element, index) => {
        var jsonStr = {};
          jsonStr["name"] = zoneName[element];
          jsonStr["type"] = 'parallel';
          jsonStr["lineStyle"] = lineStyle;
          jsonStr["data"] = data[element];
          legend.push(zoneName[element]);
          series.push(jsonStr);
      });

      return {
        series: series,
        schema: schema,
        legend: legend,
        parallelAxis: parallelAxis,
      }
    },
    // 监控点列表
    async getZoneData() {
      try {
        const ret = await getZoneList()
        var list = ret.data.list || []
        list.forEach((item,index,arr)=>{
          this.monitorOptFormat.name.push(item.name);
          this.monitorOptFormat.zoneId.push(item.zoneId);
          if(item['level'] > 0){
            item['name'] = ("&nbsp;".repeat(item.level * 5))+"|--"+item['name']
          }
          this.monitorOpt[index] = {"value":item['zoneId'],'label':item['name']};
        })
        sessionStorage.setItem("monitorOptFormat", JSON.stringify(this.monitorOptFormat));
      } catch (error) {}
    },

    // 参数列表
    async getDatatype() {
      try {
        const ret = await getDatatypeList()
        var list = ret.data.list || []
        list.forEach((item,index,arr)=>{
          this.paramOptFormat.name.push(item.name);
          this.paramOptFormat.typeId.push(item.name);
          this.paramOpt[index] = {"value":item['name'],'label':item['name']};
        })
        sessionStorage.setItem("paramOptFormat", JSON.stringify(this.paramOptFormat));
      } catch (error) {
          console.log(error)
      }
    },
    // 请求图标的数据列表
    async getAnalyticsData(selectInfo) {
      const { zoneIds, typeIds, startTime, endTime } = selectInfo
      let data = {
        zoneIds:zoneIds,
        dataNames:typeIds,
        startTime:startTime,
        endTime:endTime,
      };
      try {
        const ret = await getAnalyticsData(data)
        var list = ret.data.lists || []
        list['lineStyle'] = {
            normal: {
                width: 1,
                opacity: 0.5
            }
        },
        list['parallelAxis'] = [];
        list.schema.forEach((ele,index)=>{
            if(index == 0){
                list['parallelAxis'][index] = { dim: index, name: ele.text, inverse: true, max: 31, nameLocation: 'start' };
            }else if(index === (list.schema.length - 1)){
                list['parallelAxis'][index] =  { dim: index, name: ele.text,
                            type: 'category', data: ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染'] }
            }else{
                list['parallelAxis'][index] =  {dim: index, name: ele.text}
            }
        })
        this.lineChartDatas = this.formatChartData(list);
        // console.log(this.lineChartDatas)
      } catch (error) {}
    },
  }
}
</script>
<style lang="scss">
 .elTag{
   .el-icon-close{
      color: #fff !important;
      display: inline-block;
      float: right;
      margin-top: 8px;
    }
  }
  .endTime, .startTime{
    input{
      text-align: center;
    }
  }
  .formItem{
    label.el-form-item__label{
      color: #fff;
    }
    .button-new-tag + .el-form-item__error{
      position: relative;
    }
  }
</style>
<style lang="scss" scoped>
  .analytics-page {
    padding: 15px 30px;
    background-color: #21206c;
    position: relative;
    .formItem{
      line-height: 47px;
      margin-bottom:0px;
      .el-tag {
        font-size: 12px;
        border: 0;
        color: #ffffff !important;
        width: auto;
        min-width: 80px;
        margin-right: 4%;
      }
      .button-new-tag {
        background: transparent;
        font-weight: bold;
        height: 26px;
        line-height: 24px;
        padding-top: 0;
        padding-bottom: 0;
        border-color: rgb(0, 255, 255);
        color: rgb(0, 255, 255);
        border-radius: 10px;
      }
      .input-new-tag {
        width: auto;
        margin-left: 10px;
        vertical-align: bottom;
      }
      .leftLabel{
        font-size: 14px;
        font-weight: bold;
        line-height: 30px;
        width: 65px;
        display: inline-block;
        margin-left: 40px;
      }
      .demonstration{
        width: 4%;
        display: inline-block;
        text-align: center;
      }
      .submitBtn{
        margin-left: 5%;
        width: 75px;
        border-radius: 5px;
      }
      .endTime{
        text-align: center;
      }
      .startTime{
        text-align: center;
        margin-left: 10px;
      }
      .disInline{
        display: inline-block;
      }
    }
  }
</style>
