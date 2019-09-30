<template>
    <div>
      <!-- 列表页面 -->
      <div v-if="!showEdit" class="panel-default">
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
            v-if="hackReset"
            @handleDelete="handleDelete"
            @btnAdd="btnAdd"
            @handleEdit="handleEdit"
          />
        </div>
        <div class="add-form">
          <!-- <el-dialog
            :title="tittle"
            :visible.sync="centerDialogVisible"
            :width="dialogWidth"
            right>
            <addForm 
            @btnClose="btnClose" 
            @btnSubmit="btnSubmit"
            />
          </el-dialog> -->
          <dialogCommon
            :tittle="tittle"
            :isShow="isShow"
            :width="dialogWidth" 
          >   
            <addForm 
            slot="form-content" 
            v-if="hackReset"
            :ruleForm="ruleForm"
            @btnClose="btnClose" 
            @btnSubmit="btnSubmit"
            />     
          </dialogCommon>
        </div>
      </div>
  </div>
</template>

<script>
  import ZzdTable from "@/components/Base/Table";
  import dialogCommon from "@/components/Base/dialog";
  import addForm from "./add";

  import { getZoneList } from "@/api/zone";
  import { addMonitor, detailMonitor, updateMonitor, deleteMonitor } from "@/api/device";
  export default {
    name: "MonitorPointList",
    components: {
      ZzdTable,
      addForm,
      dialogCommon
    },
    data() {
      return {
        isShow: false,
        tittle: "新增监控点",
        dialogWidth: "500px",
        tableColumn: [
          { prop: "zoneId", label: "编号" },
          { prop: "name", label: "监控点名称" },
          { prop: "description", label: "监控点描述" },
          { prop: "rankNum", label: "排序" },
          { prop: "updateTimeText", label: "修改时间" }
        ], // 表头数据
        tableData: [], // 表格数据
        operate: [], // 表格按键操作区;
        highlightCurrentRow: false,
        editIndex: null, // 编辑的行
        showEdit: false,
        editBookID: 1,
        parentId: 0,
        zoneId: 0,
        hackReset: true, //强制重新渲染数据
        ruleForm: {
          name: '',
          description: '',
          rankNum: ''
        },
      };
    },
    watch: {
      // 此处监听多选的id
      multipleSelection: function() {
        const arr = [];
        for (const i in this.multipleSelection) {
          arr.push(this.multipleSelection[i].zoneId);
        }
        console.log("勾中的id为：" + arr.join());
      }
    },
    created() {
      this.loading = true;
      this.getMonitorList();
      this.operate = [
        { name: "新增子监控", func: "btnAdd", type: "warning" },
        { name: "编辑", func: "handleEdit", type: "primary" },
        { name: "删除", func: "handleDelete", type: "danger", auth: "删除" }
      ];
      this.loading = false;
    },
    mounted() {

    },
    methods: {
      async getMonitorList() {
        this.rebuileComponents()
        try {
          const WarnInfoList = await getZoneList();
          this.tableData = WarnInfoList.data.list;
        } catch (error) {
          console.log(error)
        }
      },
      btnClose() {
        this.isShow = false
      },
      btnAdd(val) {
        this.rebuileComponents()
        if(!val.row){
          this.tittle = "新增监控点"
        }else{
          this.tittle = "新增子监控点"
          this.parentId = val.row.zoneId
        }
        this.isShow = true
      },
      async handleEdit(val) {
        this.rebuileComponents()
        const res = await detailMonitor({
          zoneId: val.row.zoneId
        });
        const detailData = res.data;
        this.ruleForm = detailData;
        this.isShow = true;
        this.zoneId = val.row.zoneId;
      },
      async btnSubmit(val) {
        val.parentId = this.parentId;
        val.zoneId = this.zoneId;
        console.log(val);
        try {
          let msg = "";
          if(!val.zoneId){
            await updateMonitor(val);
            message = "修改成功";
          }else{
            await addMonitor(val);
            message = "添加成功";            
          }
          this.isShow = false
          this.$message({
            type: 'success',
            message
          });
          this.getMonitorList();
        } catch (error) {
          console.log(error)
        }
      },
      handleDelete(val) {
        this.$confirm("您确定要删除监控点吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(async () => {
          let zoneId = val.row.zoneId;
          await deleteMonitor({
            zoneId: zoneId
          });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getMonitorList();
        }).catch(() => {

        });
      },
      rebuileComponents() {
        // 销毁子标签
        this.hackReset = false;
        // 重新创建子标签
        this.$nextTick(() => {
          this.hackReset = true;
        });
      },
    }
  };
</script>
