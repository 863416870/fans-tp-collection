<template>
  <div>
    <el-col :lg="20" :md="24" :sm="24" :xs="24" :span="12" class="form-col">
      <el-form
        ref="ruleFormInfo"
        :model="ruleFormInfo"
        :rules="rules"
        status-icon
        label-width="120px"
        @submit.native.prevent
      >
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="ruleFormInfo.username" class="span10" size="medium" :disabled="true" />
        </el-form-item>
        <el-form-item label="姓名：" prop="chineseName">
          <el-input
            v-model="ruleFormInfo.chineseName"
            class="span10"
            size="medium"
            placeholder="请输入姓名"
          />
        </el-form-item>
        <el-form-item label="手机：" prop="phone">
          <el-input v-model="ruleFormInfo.phone" class="span10" size="medium" placeholder="请输入手机" />
        </el-form-item>
        <el-form-item label="角色：" prop="role">
          <el-checkbox-group v-model="checkList">
            <el-checkbox
              name="role"
              :label="item.name"
              v-show="ruleFormInfo.roles"
              v-for="(item,i) in ruleFormInfo.roles"
              :key="i"
              disabled
            ></el-checkbox>
          </el-checkbox-group>
          <!-- <el-checkbox v-model="checked">备选项</el-checkbox> -->
        </el-form-item>
        <el-form-item class="submit">
          <el-button type="primary" size="medium" @click="submitForm('ruleFormInfo')">提 交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "Infomation",
  props: {
    ruleFormInfo: {
      type: Object,
      default: true
    }
  },
  created() {
    this.setCheckList();
  },
  watch: {},
  data() {
    return {
      checkList: [], //选中状态值
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        chineseName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "手机号非法", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 选中的角色赋值
    setCheckList() {
      const newArr = [];
      if (this.ruleFormInfo.roles && this.ruleFormInfo.roles.length) {
        this.ruleFormInfo.roles.map(function(value) {
          newArr.push(value.name);
        });
        this.checkList = newArr;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("infoSubmit", this.ruleFormInfo);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>