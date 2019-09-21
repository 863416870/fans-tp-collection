<template>
  <div class="container">
    <div class="header" />
    <!-- 表格 -->
    <zzd-table
      v-loading="loading"
      :table-column="tableColumn"
      :table-data="tableData"
      :operate="operate"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
      @row-click="rowClick"
    />
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        v-if="refreshPagination"
        :background="true"
        :page-size="pageCount"
        :current-page="currentPage"
        layout="prev, pager, next, jumper"
        :total="total_nums"
        @current-change="handleCurrentChange"
      />
    </div>

  </div>
</template>

<script>
import ZzdTable from '@/components/Base/Table/index'

export default {
  name: 'RuleList',
  components: { ZzdTable },
  data() {
    return {
      id: 0, // 用户id
      refreshPagination: true, // 页数增加的时候，因为缓存的缘故，需要刷新Pagination组件
      editIndex: null, // 编辑的行
      total_nums: 0, // 分组内的用户总数
      currentPage: 1, // 默认获取第一页的数据
      pageCount: 10, // 每页10条数据
      tableData: [], // 表格数据
      tableColumn: [], // 表头数据
      operate: [], // 表格按键操作区
      dialogFormVisible: false, // 控制弹窗显示
      selectGroup: '', // 选中的分组Id
      groups: [], // 所有分组
      group_id: undefined,
      activeTab: '修改信息',
      form: { // 表单信息
        nickname: '',
        password: '',
        confirm_password: '',
        email: '',
        group_id: ''
      },
      loading: false
    }
  },
  methods: {
    // 切换table页
    async handleCurrentChange(val) {
      this.currentPage = val
      this.loading = true
      // await this.getAdminUsers('changePage')
      this.loading = false
    },
    async created() {
      this.tableColumn = [{ prop: 'nickname', label: '名称' }, { prop: 'group_name', label: '所属分组' }] // 设置表头信息
      this.operate = [{ name: '编辑', func: 'handleEdit', type: 'primary' }, { name: '删除', func: 'handleDelete', type: 'danger' }]
      this.eventBus.$on('addUser', this.addUser)
    }
  }
}
</script>

<style lang="scss" scoped>

  .container {
    padding: 0 30px;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        height: 59px;
        line-height: 59px;
        font-size: 16px;
        font-weight: 500;
      }
    }

    .pagination {
      display: flex;
      justify-content: flex-end;
      margin: 20px;
    }
  }
</style>
