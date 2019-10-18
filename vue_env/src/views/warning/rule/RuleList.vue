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
        <div class="common-action-row clearfix">
          <el-header style="float:right">
            <router-link to="add">
              <el-button type="warning" size="small">新增预警规则</el-button>
            </router-link>
          </el-header>
        </div>
        <zzd-table
          v-loading="loading"
          :table-column="tableColumn"
          :table-data="tableData"
          :operate="operate"
          @handleEdit="handleEdit"
          @handleStatus="handleStatus"
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
  </div>
</template>

<script>
import Utils from "@/utils/util.js";
import ZzdTable from "@/components/Base/Table";
import ZzdTableSearch from "@/components/Base/TableSearch";
import { getList, changeStatus } from "@/api/warning";
export default {
  name: "RuleList",
  components: {
    ZzdTable,
    ZzdTableSearch
  },
  data() {
    return {
      // --搜索 start--
      searchData: { ruleId: null },
      searchForm: [
        {
          type: "Input",
          label: "规则编号",
          prop: "ruleId",
          width: "180px",
          placeholder: "请输入规则编号"
        }
      ],
      // --搜索 end--
      // --分页 start--
      refreshPagination: true, // 页数增加的时候，因为缓存的缘故，需要刷新Pagination组件
      total_nums: 0, // 分组内的用户总数
      currentPage: 1, // 默认获取第一页的数据
      pageCount: 10, // 每页10条数据
      // --分页 end--
      tableColumn: [], // 表头数据
      tableData: [], // 表格数据
      operate: {} // 表格按键操作区;
    };
  },
  watch: {},
  async created() {
    this.loading = true;
    this.tableColumn = [
      { prop: "ruleId", label: "规则编号" },
      { prop: "dataType", label: "预警类型" },
      { prop: "name", label: "规则名称" },
      {
        prop: "ruleItems",
        label: "报警阈值",
        /* 处理某一列的数据 */
        // 1、使用formatter
        /* formatter: (value) => {
            let ruleItemsValue = this.handleRuleItems(value);
            return ruleItemsValue;
          }, */
        // 2、使用render
        render: (h, params) => {
          let ruleItemsValue = this.handleRuleItems(params.row);
          return h("span", {
            domProps: {
              innerHTML: ruleItemsValue
            }
          });
        }
      },
      { prop: "statusText", label: "状态" },
      { prop: "updateTimeText", label: "修改时间" }
    ];
    this.operate = {
      width: "",
      data: [
        { name: "编辑", func: "handleEdit", type: "primary" },
        {
          name: "删除",
          func: "handleStatus",
          type: "danger",
          params: { status: 2 }
        },
        {
          name: "关闭",
          func: "handleStatus",
          type: "warning",
          condition: 1,
          condationName: "status",
          params: { status: 3 }
        },
        {
          name: "启用",
          func: "handleStatus",
          type: "warning",
          condition: 3,
          params: { status: 1 }
        }
      ]
    };
    this.getWarnRulesList();
    this.loading = false;
  },
  mounted() {},
  methods: {
    // 获取列表数据
    async getWarnRulesList() {
      try {
        const params = { curPage: this.currentPage, perPage: this.pageCount };
        Object.assign(params, this.searchData);
        const WarnInfoList = await getList(params);
        this.tableData = WarnInfoList.data.list;
        this.total_nums = parseInt(WarnInfoList.data.total);
      } catch (error) {
        if (error.error_code === 10020) {
          this.tableData = [];
        }
      }
    },
    // 编辑
    handleEdit(val) {
      this.$router.push("update/" + val.row.ruleId);
    },
    // 删除，关闭，开启
    handleStatus(val) {
      console.log(val);
      let text = "";
      let status = val.params.status;
      if (status === 1) {
        text = "开启";
      } else if (status === 2) {
        text = "删除";
      } else if (status === 3) {
        text = "关闭";
      }
      this.$confirm("您确定要" + text + "吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await changeStatus({
            ruleId: val.row.ruleId,
            status: status
          });
          this.$message({
            type: "success",
            message: text + "成功!"
          });
          this.getWarnRulesList();
        })
        .catch(() => {});
    },
    // 查询
    async handleFilter(val) {
      this.searchData = val;
      await this.getWarnRulesList();
    },
    // 切换table页
    async handleCurrentChange(val) {
      this.currentPage = val;
      await this.getWarnRulesList();
    },
    // 切换每页条数
    async handleSizeChange(val) {
      this.pageCount = val;
      await this.getWarnRulesList();
    },
    handleRuleItems(value) {
      let ruleItems = value.ruleItems;
      let texts = "";
      ruleItems.forEach((item, index, arr) => {
        let text = item.unitName + "：" + item.value + `</br>`;
        texts = text + texts;
      });
      return texts;
    }
  }
};
</script>
