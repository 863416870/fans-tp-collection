<template>
  <div class="panel-default">
    <el-container>
      <el-main>
        <el-row :gutter="20">
          <el-col :lg="12" :md="20" :sm="24" :xs="24" :span="12" class="form-col">
            <el-form
              ref="auditUserForm"
              :model="auditUserForm"
              :rules="rules"
              status-icon
              label-width="120px"
              @submit.native.prevent
            >
              <el-form-item label="用户名：" prop="username">
                <el-input
                  v-model="auditUserForm.username"
                  class="span10"
                  size="medium"
                  placeholder="请输入用户名"
                />
              </el-form-item>
              <template v-if="auditUserId == 0">
                <el-form-item label="密码：" prop="password">
                  <el-input
                    v-model="auditUserForm.password"
                    :disabled="true"
                    class="span10"
                    size="medium"
                    placeholder="请输入密码"
                  />
                </el-form-item>
              </template>
              <el-form-item label="姓名：" prop="chineseName">
                <el-input
                  v-model="auditUserForm.chineseName"
                  class="span10"
                  size="medium"
                  placeholder="请输入姓名"
                />
              </el-form-item>
              <el-form-item label="手机：" prop="phone">
                <el-input
                  v-model="auditUserForm.phone"
                  class="span10"
                  size="medium"
                  placeholder="请输入手机"
                />
              </el-form-item>
              <el-form-item label="角色：" prop="roles">
                <el-checkbox-group v-model="auditUserForm.roleListLabel" @change="handleRoleChange">
                  <el-checkbox
                    :label="item.name"
                    :value="item.roleId"
                    :data-value="item.roleId"
                    name="role"
                    v-for="item in roleList"
                    :key="item.roleId"
                  ></el-checkbox>
                </el-checkbox-group>
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
import { addUser, modifyUser, getUserDetail } from "@/api/audit";
import { roleList } from "@/api/role";
import { mapGetters } from "vuex";
import Utils from "@/utils/util.js";
import $ from "jquery";

export default {
  name: "AuditUserForm",
  data() {
    return {
      auditUserId: 0,
      auditUserForm: {
        auditUserId: "",
        username: "",
        chineseName: "",
        password: "123546",
        phone: "",
        // roles: [],
        roles: [], //选中的角色id  string 用逗号隔开
        roleListLabel: [] //选中的角色名称
      },
      roleList: [], //角色列表
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        chineseName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "手机号非法", trigger: "blur" }
        ],
        roles: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个角色",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.getRoleList();
    const auditUserId = this.$route.params.id || 0;
    this.auditUserId = auditUserId;
  },
  computed: {
    ...mapGetters(["commonInfo"])
  },
  mounted() {
    if (this.auditUserId) {
      this.getAuditUserData();
    }
  },
  methods: {
    //编辑时获取用户详情
    async getAuditUserData() {
      try {
        const params = {
          auditUserId: this.auditUserId
        };
        const ret = await getUserDetail(params);
        this.auditUserForm = ret.data || {};
        const roleListValue = [];
        const roleListLabel = [];
        if (ret.data.roles && ret.data.roles.length) {
          ret.data.roles.map(function(value) {
            roleListLabel.push(value.name);
            roleListValue.push(value.roleId);
          });
        }
        //方式1
        this.auditUserForm = Object.assign({}, this.auditUserForm, {
          roles: roleListValue,
          roleListLabel: roleListLabel
        });
        //方式2 this.$set赋值未被劫持到 vue 的深入响应式原理 @link https://blog.csdn.net/weixin_41646804/article/details/95307129
        // this.$set(this.auditUserForm, "roleListValue", roleListValue);
        // this.$set(this.auditUserForm, "roleListLabel", roleListLabel);
      } catch (error) {}
    },
    //获取角色列表
    async getRoleList() {
      try {
        const ret = await roleList();
        this.roleList = ret.data.list || [];
      } catch (error) {}
    },
    //处理多选
    handleRoleChange(value, auditUserForm, roles) {
      let checkedCount = value.length;
      this.auditUserForm.roleListLabel = value; // 记录所有被选中项的中文名称
      // 选中之后，获取value数字
      var text = $("input:checkbox[name='role']:checked")
        .map(function(index, elem) {
          return $(elem)
            .parents(".el-checkbox")
            .attr("data-value");
        })
        .get();
      // .join(",");
      console.log("选中的checkbox的值为：", text);
      this.auditUserForm.roles = text; //  赋值 （axios传参用）
    },
    //表单提交
    submitForm(formName) {
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
      console.log(this.auditUserForm)
      try {
        let ret = "";
        if (this.auditUserId) {
          ret = await modifyUser(this.auditUserForm);
        } else {
          ret = await addUser(this.auditUserForm);
        }
        if (ret.code === 0) {
          this.$message({
            type: "success",
            message: "保存成功"
          });
          setTimeout(function() {
            that.$router.push("/audit/user/list");
          }, 1200);
        }
      } catch (error) {}
    }
  }
};
</script>