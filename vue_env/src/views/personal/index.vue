<template>
  <div class="page-personal">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="panel-default">
          <div class="page-heading">
            <h4>个人资料</h4>
          </div>
          <div class="page-body">
            <Infomation :ruleFormInfo="ruleFormInfo" @infoSubmit="infoSubmit" />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="panel-default">
          <div class="page-heading">
            <h4>修改密码</h4>
          </div>
          <div class="page-body">
            <Password :ruleFormPwd="ruleFormPwd" @pwdSubmit="pwdSubmit" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Infomation from "./component/Infomation";
import Password from "./component/Password";
import { mapGetters } from "vuex";
import { infoDataSubmit, pwdDataSubmit } from "@/api/personal";
export default {
  name: "personal",
  components: {
    Infomation,
    Password
  },
  inject: ["reload"],
  data() {
    return {
      ruleFormInfo: {
        auditUserId: "",
        username: "",
        chineseName: "",
        phone: "",
        roles: []
      },
      ruleFormPwd: {
        auditUserId: "",
        oldPassword: "",
        newPassword: "",
        rePassword: ""
      },
      infoLoading: false
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  created() {
    this.ruleFormInfo = this.user;
    this.ruleFormPwd.auditUserId = this.user.auditUserId;
  },
  methods: {
    async infoSubmit(ruleFormInfo) {
      let self = this;
      try {
        let res = await infoDataSubmit(ruleFormInfo);
        this.$message({
          type: "success",
          message: "保存成功"
        });
        setTimeout(function() {
          self.reload();
        }, 1200);
      } catch (error) {
        console.log(error);
      }
    },
    async pwdSubmit(ruleFormPwd) {
      let self = this;
      try {
        let res = await pwdDataSubmit(ruleFormPwd);
        this.$message({
          type: "success",
          message: "保存成功"
        });
        setTimeout(function() {
          self.reload();
        }, 1200);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>