<template>
  <div>
    <!-- 列表页面 -->
    <div v-if="!showEdit" class="container">
      <div class="header">
        <!-- <div class="title">图书列表</div> -->
      </div>
      <!-- 表格 -->
      <zzd-table
        v-loading="loading"
        :table-column="tableColumn"
        :table-data="tableData"
        :operate="operate"
        :type="type"
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
    <!-- 编辑页面 -->
    <book-edit v-else :edit-book-i-d="editBookID" @editClose="editClose" />

  </div>
</template>

<script>

import ZzdTable from '@/components/Base/Table'
import { getList } from '@/api/warning'
export default {
  name: 'InfoList',
  components: {
    ZzdTable
  },
  data() {
    return {
      refreshPagination: true, // 页数增加的时候，因为缓存的缘故，需要刷新Pagination组件
      editIndex: null, // 编辑的行
      total_nums: 0, // 分组内的用户总数
      currentPage: 1, // 默认获取第一页的数据
      pageCount: 10, // 每页10条数据
      dialogFormVisible: false, // 控制弹窗显示
      tableColumn: [{ prop: 'chinese_name', label: '名称' }, { prop: 'department_name', label: '部门' }], // 表头数据
      tableData: [], // 表格数据
      operate: [], // 表格按键操作区;
      type: 'selection', // 表格头部多选框
      showEdit: false,
      editBookID: 1
    }
  },
  async created() {
    this.loading = true
    this.getWarnInfoList()
    this.operate = [{ name: '编辑', func: 'handleEdit', type: 'primary' }, {
      name: '删除',
      func: 'handleDelete',
      type: 'danger',
      auth: '删除图书'
    }]
    this.loading = false
  },
  mounted() {
    // console.log(getList())
  },
  methods: {
    async getWarnInfoList() {
      try {
        const WarnInfoList = await getList()
        this.tableData = WarnInfoList.data.user_list
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
      // this.$confirm('此操作将永久删除该图书, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(async() => {
      //   const res = await book.delectBook(val.row.id)
      //   if (res.error_code === 0) {
      //     this.getBooks()
      //     this.$message({
      //       type: 'success',
      //       message: `${res.msg}`
      //     })
      //   }
      // })
    },
    // 切换table页
    async handleCurrentChange(val) {
      this.currentPage = val
      this.loading = true
      // await this.getAdminUsers('changePage')
      this.loading = false
    },
    rowClick() {

    },
    editClose() {
      this.showEdit = false
      // this.getBooks()
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

  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}
</style>
