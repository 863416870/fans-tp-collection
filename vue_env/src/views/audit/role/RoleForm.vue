<template>
  <div class="panel-default">
    <el-container>
      <el-main>
        <el-row :gutter="20">
          <el-col :lg="12" :md="20" :sm="24" :xs="24" :span="12" class="form-col">
            <el-form
              ref="auditUserForm"
              :model="auditRoleForm"
              :rules="rules"
              status-icon
              label-width="120px"
              @submit.native.prevent
            >
              <el-form-item label="角色名称：" prop="name">
                <el-input
                  v-model="auditRoleForm.name"
                  class="span10"
                  size="medium"
                  placeholder="请输入角色名称"
                />
              </el-form-item>
              <el-form-item label="角色简介：" prop="description">
                <el-input
                  type="textarea"
                  class="span10"
                  size="medium"
                  :rows="4"
                  v-model="auditRoleForm.description"
                  placeholder="请输入角色简介"
                ></el-input>
              </el-form-item>
              <el-form-item class="submit">
                <el-button type="primary" @click="submitForm('auditUserForm')">保 存</el-button>
                <el-button @click="back">返 回</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { addRole, modifyRole, getRoleDetail } from "@/api/role";
import { mapGetters } from "vuex";
import Utils from "@/utils/util.js";
export default {
  name: "auditRoleForm",
  data() {
    return {
      roleId: 0,
      auditRoleForm: {
        name: "",
        description: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入角色简介", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    const roleId = this.$route.params.id || 0;
    this.roleId = roleId;
  },
  computed: {
    ...mapGetters(["commonInfo"])
  },
  mounted() {
    if (this.roleId) {
      this.getAuditRoleData();
    }
  },
  methods: {
    async getAuditRoleData() {
      try {
        const params = {
          roleId: this.roleId
        };
        const ret = await getRoleDetail(params);
        this.auditRoleForm = ret.data.detail || {};
      } catch (error) {}
    },
    submitForm(formName) {
      console.log(this.auditUserForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.savePost();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async savePost() {
      const that = this;
      try {
        let ret = "";
        if (this.roleId) {
          ret = await modifyRole(this.auditRoleForm);
        } else {
          ret = await addRole(this.auditRoleForm);
        }
        if (ret.code === 0) {
          this.$message({
            type: "success",
            message: "保存成功"
          });
          setTimeout(function() {
            that.$router.push("/role/list");
          }, 1200);
        }
      } catch (error) {}
    }
  }
};
</script>