<template>
  <div>
    <!-- 列表页面 -->
    <div class="sys-log-list">
      <zzd-table
        v-loading="loading"
        :table-column="tableColumn"
        v-if="activeName == tabName"
        :table-data="tableData"
        :operate="operate"
        :type="type"
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
</template>

<script>
import ZzdTable from '@/components/Base/Table'
import { getSyslogList } from '@/api/audit'
export default {
  name: 'SyslogList',
  components: {
    ZzdTable
  },
  props: {
    activeName: {
      type: String,
      required: true
    },
    tabName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // --分页 start--
      refreshPagination: true, // 页数增加的时候，因为缓存的缘故，需要刷新Pagination组件
      total_nums: 0, // 分组内的用户总数
      currentPage: 1, // 默认获取第一页的数据
      pageCount: 10, // 每页10条数据
      // --分页 end--
      tableColumn: [
        { prop: 'username', label: '操作人' },
        { prop: 'createTimeText', label: '时间' },
        { prop: 'operation', label: '内容' }
      ], // 表头数据
      type: null, // 是否开启多选
      tableData: [], // 表格数据
      operate: [] // 表格按键操作区;
    }
  },
  watch: {},
  async created() {
    this.loading = true
    this.getDataList()
    this.operate = {
      data: []
    }
    this.loading = false
  },
  methods: {
    async getDataList() {
      try {
        const params = { curPage: this.currentPage, perPage: this.pageCount }
        const ret = await getSyslogList(params)
        this.tableData = ret.data.list || []
        this.total_nums = parseInt(ret.data.total)
      } catch (error) {
        if (error.error_code === 10020) {
          this.tableData = []
        }
      }
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
