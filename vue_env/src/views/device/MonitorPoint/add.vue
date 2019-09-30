<template>
    <div> 
      <el-form
        :model="ruleForm" 
        :rules="rules" 
        ref="ruleForm" 
        status-icon
        label-width="120px"
        @submit.native.prevent>
        <el-form-item label="监控点名称：" prop="name">
          <el-input size="medium" v-model="ruleForm.name" placeholder="请输入监控点名称"></el-input>
        </el-form-item>
        <el-form-item label="监控点描述：" prop="description">
          <el-input size="medium" v-model="ruleForm.description" placeholder="请输入监控点描述"></el-input>
        </el-form-item>
        <el-form-item label="排序：" prop="rankNum">
          <el-input  size="medium" v-model.number="ruleForm.rankNum" placeholder="请输入排序"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:right">
        <el-button size="medium" @click="btnClose">取 消</el-button>
        <el-button type="primary" size="medium" @click="submitForm('ruleForm')">提 交</el-button>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'monitorAdd',
    props: {
      ruleForm: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        rules: {
          name: [
            { required: true, message: '请输入监控点名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入监控点描述', trigger: 'blur' },
            { min: 5, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          rankNum: [
            { required: true, message: '请输入排序'},
            { type: 'number', message: '排序必须为数字值'}
          ]
        }
      }
    },
    methods: {
      btnClose() {
        this.$emit("btnClose")
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit("btnSubmit", this.ruleForm)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 重置
      reset() {
        this.$refs.ruleForm.resetFields()
      }
    }
  }
</script>
