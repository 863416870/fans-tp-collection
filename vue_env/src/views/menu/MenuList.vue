<template>
  <div class="panel-default">
    <div class="page-heading">
      <el-form :inline="true" :model="dataForm">
        <el-form-item>
          <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="page-body">
      <zzd-table
        :row-key="rowKey"
        v-loading="loading"
        :table-column="tableColumn"
        :table-data="tableData"
        :operate="operate"
        :type="type"
        :select-field-unique="selectFieldUnique"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
        @row-click="rowClick"
        @selection-change="handleSelectionChange"
      />
    </div>
    <!-- 弹窗, 新增 / 修改 -->
    <MenuForm v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></MenuForm>
  </div>
</template>

<script>
import MenuForm from "./MenuForm";
import ZzdTable from "@/components/Base/Table";
import Utils from "@/utils/util";
export default {
  name: "AuditRoleList",
  components: {
    ZzdTable,
    MenuForm
  },
  data() {
    return {
      rowKey: "menuId",
      dataForm: {},
      addOrUpdateVisible: false,

      tableColumn: [
        { prop: "name", label: "名称" },
        { prop: "parentName", label: "上级菜单" },
        {
          prop: "icon",
          label: "图标",
          render: (h, params) => {
            return h("svg-icon", {
              props: {
                iconClass: params.row.icon
              } // 组件的props
            });
          }
        },
        {
          prop: "type",
          label: "类型",
          align: "center",
          render: (h, params) => {
            return h(
              "el-tag",
              {
                props: {
                  type:
                    params.row.type === 0
                      ? ""
                      : params.row.type === 1
                      ? "success"
                      : "info",
                  size: "small"
                } // 组件的props
              },
              params.row.type === 0
                ? "目录"
                : params.row.type === 1
                ? "菜单"
                : "按钮"
            );
          }
        },
        { prop: "orderNum", label: "排序号" },
        { prop: "url", label: "菜单URL" },
        { prop: "perms", label: "授权标识" }
      ], // 表头数据
      type: null, // 是否开启多选
      selectFieldUnique: null, // 默认唯一选中字段
      tableData: [], // 表格数据
      tableDataMock: [
        {
          icon: "system",
          list: null,
          menuId: 1,
          parentId: 0,
          parentName: null,
          name: "系统管理",
          open: null,
          url: null,
          perms: null,
          type: 0,
          url: null,
          orderNum: 0
        },
        {
          icon: "admin",
          list: null,
          menuId: 2,
          parentId: 1,
          parentName: "系统管理",
          name: "管理员列表",
          orderNum: 1,
          url: "sys/user",
          perms: null,
          type: 1,
          url: "sys/user"
        },
        {
          icon: "",
          list: null,
          menuId: 15,
          parentId: 2,
          parentName: "管理员列表",
          name: "查看",
          orderNum: 0,
          open: null,
          type: 2,
          url: null,
          perms: "sys:user:list,sys:user:info"
        }
      ],
      operate: [], // 表格按键操作区;
      highlightCurrentRow: false,
      editIndex: null // 编辑的行ss
    };
  },
  async created() {
    this.loading = true;
    this.operate = {
      data: [
        { name: "编辑", func: "handleEdit", type: "primary" },
        {
          name: "删除",
          func: "handleDelete",
          type: "danger",
          auth: "删除角色"
        }
      ]
    };
    this.tableData = Utils.treeDataTranslate(this.tableDataMock, "menuId");
    this.loading = false;
  },

  activated() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    rowClick(row) {
      console.log("rowclick");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 删除
    handleDelete(val) {
      this.$confirm("您确定要删除此菜单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {})
        .catch(() => {});
    },
    // 编辑
    async handleEdit(val) {
      console.log(val.row.menuId);
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(val.row.menuId);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.panel-default {
  .page-heading {
    padding: 20px 0 0 20px;
  }
}
</style>
