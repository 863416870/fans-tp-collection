<template>
  <div>
    <!-- 列表页面 -->
    <div class="panel-default">
      <div class="page-heading">
        <h4>监控点列表</h4>
      </div>
      <!-- 表格 -->
      <div class="page-body">
        <div class="common-action-row clearfix">
          <el-header style="float:right">
            <el-button type="warning" size="small" @click="btnAdd">新增监控点</el-button>
          </el-header>
        </div>
        <zzd-table
          v-loading="loading"
          :table-column="tableColumn"
          :table-data="tableData"
          :operate="operate"
          v-show="tableShow"
          @handleDelete="handleDelete"
          @btnAdd="btnAdd"
          @handleEdit="handleEdit"
        />
      </div>
      <div class="add-form">
        <dialogCommon :tittle="tittle" :isShow="isShow" :width="dialogWidth">
          <AddForm
            slot="form-content"
            v-if="hackReset"
            :ruleForm="ruleForm"
            :formBtnLoading="formBtnLoading"
            @btnClose="btnClose"
            @btnSubmit="btnSubmit"
            ref="addMonitorForm"
          />
        </dialogCommon>
      </div>
    </div>
  </div>
</template>

<script>
import ZzdTable from "@/components/Base/Table";
import dialogCommon from "@/components/Base/dialog";
import AddForm from "./Add";

import { getZoneList } from "@/api/zone";
import {
  addMonitor,
  detailMonitor,
  updateMonitor,
  deleteMonitor
} from "@/api/device";
export default {
  name: "MonitorPointList",
  components: {
    ZzdTable,
    AddForm,
    dialogCommon
  },
  data() {
    return {
      isShow: false,
      tittle: "新增监控点",
      dialogWidth: "500px",
      tableShow: false, //请求只有展示数据
      tableColumn: [], // 表头数据
      tableData: [], // 表格数据
      operate: [], // 表格按键操作区
      hackReset: true, //强制重新渲染数据,未有效
      ruleForm: {
        name: "",
        description: "",
        rankNum: "",
        parentId: 0,
        zoneId: 0
      },
      ruleForms: {},
      formBtnLoading: false // 表单的btn提交是否加载中
    };
  },
  watch: {},
  created() {
    this.loading = true;
    this.ruleForms = this.ruleForm;
    this.operate = {
      width: "",
      data: [
        { name: "新增子监控", func: "btnAdd", type: "warning" },
        { name: "编辑", func: "handleEdit", type: "primary" },
        { name: "删除", func: "handleDelete", type: "danger", auth: "删除" }
      ]
    };
    this.tableColumn = [
      { prop: "zoneId", label: "编号" },
      {
        prop: "name",
        label: "监控点名称",
        render: (h, params) => {
          let motDescription = this.handleDescription(params.row);
          return h("span", {
            domProps: {
              innerHTML: motDescription
            }
          });
        }
      },
      { prop: "description", label: "监控点描述" },
      { prop: "rankNum", label: "排序" },
      { prop: "updateTimeText", label: "修改时间" }
    ];
    this.getMonitorList();
    this.loading = false;
  },
  mounted() {},
  methods: {
    async getMonitorList() {
      try {
        const WarnInfoList = await getZoneList();
        let tableData = WarnInfoList.data.list;
        tableData.forEach((item, index, arr) => {
          if (item.level > 0) {
            let space = "";
            item.name = space.repeat(item.level * 3) + item.name;
          }
        });
        this.tableData = tableData;
        this.tableShow = true;
      } catch (error) {
        console.log(error);
      }
    },
    btnClose() {
      this.isShow = false;
    },
    // 新增
    btnAdd(val) {
      if (!val.row) {
        this.tittle = "新增监控点";
      } else {
        this.tittle = "新增子监控点";
        this.ruleForm.parentId = val.row.zoneId;
      }
      this.ruleForm = Object.assign({}, this.ruleForms);
      this.isShow = true;
    },
    // 编辑
    async handleEdit(val) {
      const res = await detailMonitor({
        zoneId: val.row.zoneId
      });
      const detailData = res.data;
      this.ruleForm = detailData;
      this.ruleForm.zoneId = val.row.zoneId;
      this.isShow = true;
    },
    // 提交
    async btnSubmit(val) {
      this.formBtnLoading = true;
      try {
        let message = "";
        if (val.zoneId && val.zoneId != 0) {
          await updateMonitor(this.ruleForm);
          message = "修改成功";
        } else {
          await addMonitor(this.ruleForm);
          message = "添加成功";
        }
        this.isShow = false;
        this.$refs["addMonitorForm"].resetForm();
        this.formBtnLoading = false;
        this.$message({
          type: "success",
          message
        });
        this.getMonitorList();
      } catch (error) {
        console.log(error);
      }
    },
    // 删除
    handleDelete(val) {
      this.$confirm("您确定要删除监控点吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let zoneId = val.row.zoneId;
          await deleteMonitor({
            zoneId: zoneId
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getMonitorList();
        })
        .catch(() => {});
    },
    rebuileComponents() {
      // 销毁子标签
      this.hackReset = false;
      // 重新创建子标签
      this.$nextTick(() => {
        this.hackReset = true;
      });
    },
    // 处理监控点名称
    handleDescription(val) {
      if (val.level > 0) {
        let obj = "&nbsp;";
        let objs = obj.repeat(val.level * 8);
        return objs + val.name;
      } else {
        return val.name;
      }
    }
  }
};
</script>

