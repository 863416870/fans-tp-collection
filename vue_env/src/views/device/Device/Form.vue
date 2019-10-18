<template>
  <div class="panel-default">
    <el-container>
      <el-main>
        <el-row :gutter="20">
          <el-col
            :lg="10"
            :md="20"
            :sm="24"
            :xs="24"
            :span="12"
            class="form-col"
          >
            <el-form
              ref="deviceForm"
              :model="deviceForm"
              :rules="rules"
              status-icon
              label-width="120px"
              @submit.native.prevent
            >
              <el-form-item label="设备编号：" prop="deviceId">
                <el-input
                  v-model="deviceForm.deviceId"
                  class="span10"
                  size="medium"
                  :disabled="deviceId ? true : false"
                  placeholder="请输入设备编号"
                />
              </el-form-item>
              <el-form-item label="设备名称：" prop="name">
                <el-input
                  v-model="deviceForm.name"
                  class="span10"
                  size="medium"
                  placeholder="请输入设备名称"
                />
              </el-form-item>
              <el-form-item label="设备类型：" prop="typeId">
                <el-select
                  v-model="deviceForm.typeId"
                  size="medium"
                  class="span10"
                  placeholder="请选择"
                >
                  <el-option v-for="item in deviceTypeList" :key="item.typeId" :label="item.name" :value="item.typeId" />
                </el-select>
              </el-form-item>
              <el-form-item label="设备状态：" prop="status">
                <el-select
                  v-model="deviceForm.status"
                  size="medium"
                  class="span10"
                  placeholder="请选择"
                >
                  <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item label="设备区域：" prop="zoneId">
                <el-select
                  v-model="deviceForm.zoneId"
                  size="medium"
                  class="span10"
                  placeholder="请选择"
                >
                  <el-option v-for="item in zoneList" :key="item.zoneId" :label="item.name" :value="item.zoneId">
                    <span>{{ '&nbsp;'.repeat(item.level * 5) }}</span>{{ item.name }}
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="设备描述：" prop="description">
                <el-input
                  v-model="deviceForm.description"
                  size="medium"
                  class="span10"
                  placeholder="请输入"
                />
              </el-form-item>
              <el-form-item class="submit">
                <el-button type="primary" @click="submitForm('deviceForm')">保 存</el-button>
                <el-button @click="back">返 回</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { addDevice, modifyDevice, getDeviceTypeList, getDeviceDetail } from '@/api/device.js'
import { getZoneList } from '@/api/zone'
import { mapGetters } from 'vuex'
import Utils from '@/utils/util.js'
export default {
  name: 'DeviceForm',
  data() {
    return {
      deviceId: 0,
      deviceForm: {
        deviceId: '',
        name: '',
        typeId: '',
        status: '',
        zoneId: '',
        description: ''
      },
      rules: {
        deviceId: [
          { required: true, message: '请输入设备编号', trigger: 'blur' },
          { type: 'number', message: '请输入设备编号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入监控点名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: '请选择设备类型', trigger: 'blur' }
        ],
        zoneId: [
          { required: true, message: '请选择监控区域', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入设备描述', trigger: 'blur' },
          { min: 5, max: 300, message: '长度在 5 到 300 个字符', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态' }
        ]
      },
      deviceTypeList: [],
      statusList: [],
      zoneList: []
    }
  },
  created() {
    const deviceId = this.$route.params.id || 0
    this.deviceId = deviceId
  },
  computed: {
    ...mapGetters([
      'commonInfo'
    ])
  },
  mounted() {
    this.getTypeList()
    // 设备状态数组
    const arr = Utils.obj2FilterArray(this.commonInfo.warnDeviceStatusMap, true)
    this.statusList = arr
    // 设备区域
    this.getZoneData()
    if (this.deviceId) {
      this.getDeviceData()
    }
  },
  methods: {
    async getTypeList() {
      try {
        const ret = await getDeviceTypeList()
        this.deviceTypeList = ret.data.list || []
      } catch (error) {
        if (error.error_code === 10020) {
        }
      }
    },
    async getDeviceData() {
      try {
        const params = {
          deviceId: this.deviceId
        }
        const ret = await getDeviceDetail(params)
        this.deviceForm = ret.data.detail || {}
      } catch (error) {
        if (error.error_code === 10020) {
        }
      }
    },
    // 监控点列表
    async getZoneData() {
      try {
        const ret = await getZoneList()
        const zoneList = ret.data.list || []
        const str = '-'

        zoneList.forEach((item, index) => {
          if (item.level) {
            const itemStr = '|' + str.repeat(3)
            zoneList[index].name = itemStr + item.name
          }
        })
        this.zoneList = zoneList
      } catch (error) {}
    },
    submitForm(formName) {
      console.log(this.deviceForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.savePost()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async savePost() {
      const that = this
      try {
        let ret = ''
        if (this.deviceId) {
          ret = await modifyDevice(this.deviceForm)
        } else {
          ret = await addDevice(this.deviceForm)
        }
        if (ret.code === 0) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          setTimeout(function() {
            that.$router.push('/device/device/list')
          }, 1200)
        }
      } catch (error) {
        if (error.error_code === 10020) {
        }
      }
    }
  }
}
</script>
