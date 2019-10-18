<template>
  <div class="panel-default">
    <div class="page-heading">
      <h4>{{title}}预警规则</h4>
    </div>
    <div class="page-body">
      <el-row :gutter="30">
          <el-col
            :lg="10"
            :md="20"
            :sm="24"
            :xs="24"
            :span="12"
            class="form-col"
          >
            <el-form
              status-icon
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              @submit.native.prevent="">

              <el-form-item label="报警类型：" prop="typeId">
                <el-select
                  v-model="ruleForm.typeId"
                  size="medium"
                  class="span10"
                  placeholder="请选择报警类型"
                  @change="typeChange"
                >
                  <el-option v-for="(item, index) in warnTypeList" :key="item.typeId" :label="item.name" :value="item.typeId" />
                </el-select>
              </el-form-item>

              <el-form-item label="规则名称：" prop="name">
                <el-input class="span10" size="medium" v-model="ruleForm.name" placeholder="请输入规则名称"></el-input>
              </el-form-item>

              <el-form-item label="监控区域：" prop="zoneId">
                <el-select
                  v-model="ruleForm.zoneId"
                  size="medium"
                  placeholder="请选择"
                  class="span5"
                  @change="zoneChange"
                  style="float:left;margin-right:5px;"
                >
                  <el-option 
                  v-for="item in zoneList" 
                  :key="item.zoneId" 
                  :value="item.zoneId" 
                  :label="item.name"
                  >
                  <span>{{('&nbsp;').repeat(item.level * 5)}} |-- {{item.name}}</span>
                  </el-option>
                </el-select>
                <el-form-item prop="deviceId" class="span5" style="float:left;margin-bottom:0">
                  <el-select
                    v-model="ruleForm.deviceId"
                    size="medium"
                    placeholder="请选择"
                    style="width:98%"
                  >
                    <el-option v-for="item in deviceList" :key="item.deviceId" :label="item.name" :value="item.deviceId" />
                  </el-select>
                </el-form-item>
              </el-form-item>

              <el-form-item label="报警规则：">
                <el-form-item v-for="(item, index) in warnRules[ruleForm.typeId]" :key="item.ruleItemId" :label="item.unitName">
                  <el-input
                    class="span5 warn-rule"
                    size="medium"
                    placeholder="请输入"
                    :disabled="true"
                    v-model="ruleForm.rules[index].value"
                    >
                  </el-input>&nbsp;&nbsp;{{defaultUnit}}
                </el-form-item>
              </el-form-item>

              <el-form-item class="submit">
                <el-button type="primary" :loading="loading" size="medium" @click="submitForm('ruleForm')">提 交</el-button>
                <el-button @click="back" size="medium">返 回</el-button>
              </el-form-item>

            </el-form>
          </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
  import { getDatatypeList } from "@/api/warning";
  import { getZoneList } from "@/api/zone";
  import { getDeviceList, addRules, detailRules, updateRules } from "@/api/warning";
  export default {
    name: 'RuleForm',
    data() {
      return {
        // 表单
        ruleForm: {
          typeId: '',
          name: '',
          zoneId: '',
          deviceId: '',
          ruleItems: "",
          ruleId: '',
          rules: [],
          dataTypeId: ""
        },
        defaultUnit: '', //单位
        warnTypeList: [], // 报警类型
        warnRules: {}, // 报警规则
        zoneList: [], // 监控区域
        deviceList: [], // 监控设备
        rules: {
          typeId: [
            { required: true, message: '请选择报警类型', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入规则名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          zoneId: [
            { required: true, message: '请选择', trigger: 'blur' }
          ],
          deviceId: [
            { required: true, message: '请选择', trigger: 'blur' }
          ],
          rules: [
            { required: true, message: '请输入报警规则', trigger: 'blur' }
          ]
        },
        title: "新增",
        detailData: {}, // 详情
        count: 0, // 编辑第一次进来不监听联动
        defaultUnit: '', // 单位
        loading: false
      }
    },
    created() {
      this.ruleForm.ruleId = this.$route.params.id  
      this.getTypeList() // 获取报警类型
      this.getZoneList() // 监控区域列表
    },
    mounted() {
      if(this.ruleForm.ruleId){
        this.title = "编辑"
        this.getDetailData() // 详情
      }  
    },
    watch: {
      // 监听联动
      'ruleForm.zoneId': function (newVal, oldVal) {
        if(this.ruleForm.ruleId){
          if(this.count !== 0){
            this.ruleForm.deviceId = ''
          }
        }else{
          this.ruleForm.deviceId = ''
        }
        this.count++;
      }
    },
    methods: {
      // 详情
      async getDetailData() {
        try {
          const res = await detailRules({
            ruleId: this.ruleForm.ruleId
          });
          this.ruleForm = res.data
          /*   向vue中添加新属性   */
          // 1、this.$set(this.data,"key",value)
          // this.$set(this.ruleForm,"rules", [])
          // this.$set(this.ruleForm,"typeId", res.data.dataTypeId)

          // 2、使用Object.assign(目标对象，源对象...)
          this.ruleForm = Object.assign( {}, this.ruleForm, {
            "ruleItems": "",
            "typeId": res.data.dataTypeId,
            "rules": [],
            "dataTypeId": ""
          })
          //3、不可监听到data的数据变化
          // Object.assign(this.ruleForm, {
          //   rules: [],
          //   typeId: res.data.dataTypeId
          // })

          this.detailData = res.data;
          this.zoneChange()
          this.typeChange()
        } catch (error) {

        }     
     
      }, 
      // 报警类型
      async getTypeList() {
        try {
          const res = await getDatatypeList();
          this.warnTypeList = res.data.list;
          this.warnRules = res.data.warnRules;
        } catch (error) {

        }
      }, 
      // 改变报警类型
      typeChange() {
        // 获取单位
        const that = this;
        let typeItem = this.warnTypeList.find(function(item, index, arr) {
          return item.typeId = that.ruleForm.typeId;
        }) // 10
        console.log(typeItem)
        this.defaultUnit = typeItem.defaultUnit;
        // 获取单位
        let rulesArr = [];
        this.ruleForm.rules = []
        if(this.ruleForm.ruleId){
          if(this.ruleForm.typeId === this.detailData.dataTypeId){
            rulesArr = this.detailData.ruleItems || []
          }else{
            rulesArr = this.warnRules[this.ruleForm.typeId] || []
          }
        }else{
          rulesArr = this.warnRules[this.ruleForm.typeId] || []
        }
        if(rulesArr.length > 0){
          rulesArr.forEach((item, index, arr) => {
            this.ruleForm.rules.push({
              unitId: item.unitId,
              value: item.value
            })
          });
        }
        console.log(this.ruleForm.rules)
      },
      // 监控区域
      async getZoneList() {
        try {
          const resZone = await getZoneList();
          let zoneList = resZone.data.list;
          this.zoneList = zoneList      
        } catch (error) {

        }
      }, 
      // 改变监控区域——导致改变监控设备
      async zoneChange() {
        const resDevice = await getDeviceList({
          zoneId: this.ruleForm.zoneId
        });
        this.deviceList = resDevice.data.list
      },
      // 验证表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.saveForm()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 提交表单
      async saveForm() {
        try { 
          this.ruleForm.ruleItems = JSON.stringify(this.ruleForm.rules)
          this.ruleForm.dataTypeId = this.ruleForm.typeId
          console.log(this.ruleForm)
          if(this.ruleForm.ruleId){
            await updateRules(this.ruleForm)
          }else{
            await addRules(this.ruleForm)
          }
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          setTimeout(() => {
            this.$router.push("list")
            this.loading = false;
          }, 1500);
        } catch (error) {
          this.loading = false;
        }
      }
    },
  }
</script>

