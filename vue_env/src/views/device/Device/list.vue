<template>
  <div>
    <!-- 列表页面 -->
    <div v-if="!showEdit" class="panel-default">
      <!-- <div class="header">
        <div class="title">列表</div>
      </div>-->
      <!-- 搜索 -->
      <div class="search">
        <zzd-table-search
          size="mini"
          label-width="80px"
          :search-data="searchData"
          :search-form="searchForm"
          @handleFilter="handleFilter"
        />
      </div>
      <!-- 表格 -->
      <div class="page-body">
        <zzd-table
          v-loading="loading"
          :table-column="tableColumn"
          :table-data="tableData"
          :operate="operate"
          :type="type"
          :select-field-unique="selectFieldUnique"
          @handleStatus="handleStatus"
          @handleEdit="handleEdit"
          @handleDelete="handleDelete"
          @row-click="rowClick"
          @selection-change="handleSelectionChange"
        />
      </div>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          v-if="refreshPagination"
          :background="true"
          :page-size="pageCount"
          :page-sizes="[10, 20, 50, 100]"
          :current-page="currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total_nums"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <!-- 编辑页面 -->
    <rule-add v-else :edit-book-i-d="editBookID" @editClose="editClose" />
  </div>
</template>

<script>
import axios from 'axios'
import ZzdTable from '@/components/Base/Table'
import ZzdTableSearch from '@/components/Base/TableSearch'
import { getDeviceList, updateDeviceStatus } from '@/api/device'
export default {
  name: 'DeviceList',
  components: {
    ZzdTable,
    ZzdTableSearch
  },
  data() {
    return {
      // --搜索 start--
      searchData: { nadeviceIdme: null, status: '' },
      searchForm: [
        {
          type: 'Input',
          label: '设备编号',
          prop: 'deviceId',
          width: '180px',
          placeholder: '请输入设备编号'
        },
        {
          type: 'Select',
          label: '设备状态',
          prop: 'status',
          width: '180px',
          filterable: true,
          options: [{ value: '', label: '请选择' }]// TODO根据接口返回数据
        }
      ],
      // --搜索 end--
      // --分页 start--
      refreshPagination: true, // 页数增加的时候，因为缓存的缘故，需要刷新Pagination组件
      total_nums: 0, // 分组内的用户总数
      currentPage: 1, // 默认获取第一页的数据
      pageCount: 10, // 每页10条数据
      // --分页 end--
      tableColumn: [
        { prop: 'deviceId', label: '设备编号' },
        { prop: 'name', label: '设备名称' },
        { prop: 'typeName', label: '设备类型' },
        { prop: 'zoneName', label: '设备区域' },
        { prop: 'statusText', label: '状态' },
        { prop: 'updateTimeText', label: '修改时间' }
      ], // 表头数据
      type: null, // 是否开启多选
      selectFieldUnique: null, // 默认唯一选中字段
      tableData: [], // 表格数据
      operate: [], // 表格按键操作区;
      highlightCurrentRow: false,
      editIndex: null, // 编辑的行ss
      dialogFormVisible: false, // 控制弹窗显示
      showEdit: false,
      editBookID: 1
    }
  },
  watch: {

  },
  async created() {
    this.loading = true
    this.getDataList()
    this.operate = [
      { name: '编辑', func: 'handleEdit', type: 'primary' },
      { name: '删除', func: 'handleDelete', type: 'danger', auth: '删除设备' },
      { name: '启用/关闭', func: 'handleStatus', type: 'warning' }
    ]
    this.loading = false
  },
  mounted() {
    // axios.post('device/statusupdate',{"deviceId":2000015444,'status':2},{
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    //   }}).then(function (res) {
    //   console.log('res',res)
    //   }
    // );

  },
  methods: {
    async getDataList() {
      try {
        const params = { curPage: this.currentPage, perPage: this.pageCount }
        const ret = await getDeviceList(params)
        this.tableData = ret.data.list || []
        this.total_nums = parseInt(ret.data.total)
      } catch (error) {
        if (error.error_code === 10020) {
          this.tableData = []
        }
      }
    },
    handleEdit(val) {
      console.log('val', val)
      this.showEdit = true
      this.editBookID = val.row.id
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(async() => {
        console.log('val', val.row.deviceId)
        await this.updateStatus(val.row.deviceId, 2)
        this.getDataList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleStatus(val) {
      let msg = ''
      let operateStatus = 3 // 默认关闭
      if (val.row.status == 1) {
        msg = '关闭'
        operateStatus = 3
      } else if (val.row.status == 3) {
        msg = '开启'
        operateStatus = 1
      } else {
        this.$message({
          type: 'error',
          message: '状态非法'
        })
        return
      }
      this.$confirm('确认' + msg + '该设备?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await this.updateStatus(val.row.deviceId, operateStatus)
        this.getDataList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    async updateStatus(deviceId, status) {
      console.log('deviceid', deviceId)
      try {
        const params = { deviceId: deviceId, status: status }
        const ret = await updateDeviceStatus(params)
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
      } catch (error) {
        if (error.error_code === 10020) {
        }
      }
    },
    handleFilter(val) {
      console.log('val', val)
    },
    // 切换table页
    async handleCurrentChange(val) {
      this.currentPage = val
      await this.getDataList()
    },
    // 切换每页条数
    async handleSizeChange(val) {
      this.pageCount = val
      await this.getDataList()
    },
    rowClick(row) {
      console.log('rowclick')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    editClose() {
      this.showEdit = false
      // this.getBooks()
    }
  }
}
</script>

<style lang="scss" scoped>
  .panel-default {
    .search {
      display: flex;
      align-items: center;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .pagination {
      display: flex;
      justify-content: flex-end;
      margin: 20px;
    }
  }
</style>
