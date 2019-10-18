<template>
  <div>
    <el-col :lg="20" :md="24" :sm="24" :xs="24" :span="12" class="form-col">
      <el-form
        ref="ruleFormPwd"
        :model="ruleFormPwd"
        :rules="rules"
        status-icon
        label-width="120px"
        @submit.native.prevent
      >
        <el-form-item label="旧密码：" prop="oldPassword">
          <el-input
            v-model="ruleFormPwd.oldPassword"
            class="span10"
            size="medium"
            placeholder="请输入旧密码"
          />
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword">
          <el-input
            v-model="ruleFormPwd.newPassword"
            class="span10"
            size="medium"
            placeholder="请输入新密码"
          />
        </el-form-item>
        <el-form-item label="确认密码：" prop="rePassword">
          <el-input
            v-model="ruleFormPwd.rePassword"
            class="span10"
            size="medium"
            placeholder="请再次输入密码"
          />
        </el-form-item>
        <el-form-item class="submit">
          <el-button type="primary" size="medium" @click="submitForm('ruleFormPwd')">提 交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "Password",
  props: {
    ruleFormPwd: {
      type: Object,
      default: true
    }
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.ruleFormPwd.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        rePassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur"
          },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  created() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("pwdSubmit", this.ruleFormPwd);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>