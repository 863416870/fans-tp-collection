<template>
  <div>
    <!-- 列表页面 -->
    <div class="panel-default">
      <div class="search">
        <zzd-table-search
          size="mini"
          labelWidth="80px"
          :searchData="searchData"
          :searchForm="searchForm"
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
          @handleInfo="handleInfo"
        />
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
    </div>
  </div>
</template>

<script>
import ZzdTable from "@/components/Base/Table";
import ZzdTableSearch from "@/components/Base/TableSearch";
import { getList, handleStatus } from "@/api/notice";
import { getDatatypeList } from "@/api/warning";
import Utils from '@/utils/util.js'
export default {
  name: "InfoList",
  components: {
    ZzdTable,
    ZzdTableSearch
  },
  data() {
    return {
      // --搜索 start--
      searchData: { dataTypeId: '' },
      searchForm: [
        {
          type: "Select",
          label: "预警类型",
          prop: "dataTypeId",
          width: "180px",
          filterable: true,
          options: []//TODO根据接口返回数据
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
        { prop: "dataTypeText", label: "预警类型" },
        { prop: "zoneText", label: "监控区域" },
        { prop: "setValue", label: "报警阈值" },
        { prop: "maxValue", label: "当前值" },
        { prop: "createTimeText", label: "修改时间" },
        { prop: "isHandleText", label: "状态" }
      ], // 表头数据
      tableData: [], // 表格数据
      operate: {}, // 表格按键操作区;
      loading: false
    };
  },
  watch: {

  },
  async created() {
    this.loading = true;
    this.operate = {
      width: '',
      data: [
        { name: "处理", func: "handleInfo", type: "primary", condition: 0, condationName: "isHandle", },
      ]
    };
    this.getWarnInfoList();
    this.loading = false;
    this.getTypeList() // 获取报警类型
  },
  mounted() {
  },
  methods: {
    // 报警类型
    async getTypeList() {
      try {
        const res = await getDatatypeList();
        const arr = Utils.filterArraySelect(res.data.list, true, 'name', 'typeId')
        this.searchForm[0].options = arr;
      } catch (error) {

      }
    }, 
    // 消息列表
    async getWarnInfoList() {
      try {
        const params = { curPage: this.currentPage, perPage: this.pageCount };
        Object.assign(params, this.searchData)
        const WarnInfoList = await getList(params);
        this.tableData = WarnInfoList.data.list;
        this.total_nums = parseInt(WarnInfoList.data.total);
      } catch (error) {
        if (error.error_code === 10020) {
          this.tableData = [];
        }
      }
    },
    handleFilter(val) {
      this.searchData = val
      this.getWarnInfoList()
    },
    // 切换table页
    async handleCurrentChange(val) {
      this.currentPage = val;
      await this.getWarnInfoList();
    },
    // 切换每页条数
    async handleSizeChange(val) {
      this.pageCount = val;
      await this.getWarnInfoList();
    },
    async handleInfo(val) {
      await handleStatus({
        warnNoticeId: val.row.warnNoticeId
      })
      this.$message({
        type: 'success',
        message: '处理成功，正在刷新...'
      });
      setTimeout(() => {
        this.getWarnInfoList()
      }, 1500);
    }
  }
};
</script>

