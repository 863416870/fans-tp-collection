<template>
  <div>
    <!-- 列表页面 -->
    <div class="panel-default">
      <!-- <div class="header">
        <div class="title">列表</div>
      </div>-->
      <!-- 表格 -->
      <div class="page-body">
        <div class="common-action-row clearfix">
          <el-header style="float:right">
            <el-row>
              <router-link to="/role/add">
                <el-button type="primary" size="medium">新增角色</el-button>
              </router-link>
            </el-row>
          </el-header>
        </div>
        <zzd-table
          v-loading="loading"
          :table-column="tableColumn"
          :table-data="tableData"
          :operate="operate"
          :type="type"
          :select-field-unique="selectFieldUnique"
          @handleEdit="handleEdit"
          @handleDelete="handleDelete"
          @handlePrivilege="handlePrivilege"
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
  </div>
</template>

<script>
import ZzdTable from "@/components/Base/Table";
import { roleList, deleteRole } from "@/api/role";
import { mapGetters } from "vuex";
import Utils from "@/utils/util.js";
export default {
  name: "AuditRoleList",
  components: {
    ZzdTable
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
        { prop: "name", label: "角色名" },
        { prop: "description", label: "描述" }
      ], // 表头数据
      type: null, // 是否开启多选
      selectFieldUnique: null, // 默认唯一选中字段
      tableData: [], // 表格数据
      operate: [], // 表格按键操作区;
      highlightCurrentRow: false,
      editIndex: null // 编辑的行ss
    };
  },
  watch: {},
  async created() {
    this.loading = true;
    this.getDataList();
    this.operate = {
      data: [
        { name: "编辑", func: "handleEdit", type: "primary" },
        { name: "删除", func: "handleDelete", type: "danger", auth: "删除角色" },
        { name: "权限", func: "handlePrivilege", type: "warning" }
      ]
    };
    this.loading = false;
  },
  computed: {
    ...mapGetters(["commonInfo"])
  },
  mounted() {
    console.log(this.commonInfo);
  },
  methods: {
    async getDataList() {
      try {
        const params = { curPage: this.currentPage, perPage: this.pageCount };
        const ret = await roleList(params);
        this.tableData = ret.data.list || [];
        this.total_nums = parseInt(ret.data.total);
      } catch (error) {
        console.log(
          "[路径]views/audit/role/RoleList-[method]getDataList",
          error
        );
      }
    },
    handleEdit(val) {
      this.$router.push("/role/modify/" + val.row.roleId);
      // this.showEdit = true
      // this.editBookID = val.row.id
    },
    handleDelete(val) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(async () => {
          try {
            const params = { roleId: val.row.roleId };
            const ret = await deleteRole(params);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.getDataList();
          } catch (error) {}
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    handlePrivilege() {
      this.$router.push('privilege')
    },
    // 切换table页
    async handleCurrentChange(val) {
      this.currentPage = val;
      await this.getDataList();
    },
    // 切换每页条数
    async handleSizeChange(val) {
      this.pageCount = val;
      await this.getDataList();
    },
    rowClick(row) {
      console.log("rowclick");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    editClose() {
      // this.showEdit = false;
      // this.getBooks()
    }
  }
};
</script>

<style lang="scss" scoped>
.panel-default {
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
