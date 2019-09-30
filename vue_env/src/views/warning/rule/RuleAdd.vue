<template>
  <div class="panel-default">
    <el-container>
      <!-- <el-header>
        <div slot="header" class="clearfix">
          <span>新建预警规则</span>
          <span class="back" @click="back" style="float: right; padding: 3px 0">
            <i class="el-icon-back"></i> 返回
          </span>
        </div>
      </el-header> -->
      <el-main>
        <el-row :gutter="20">
            <el-col
              :lg="16"
              :md="20"
              :sm="24"
              :xs="24"
              :span="12"
              :offset="3"
            >
              <el-form
                :model="form"
                status-icon
                ref="form"
                label-width="100px"
                @submit.native.prevent>
                <el-form-item label="报警类型" prop="title">
                  <el-input class="span6" size="medium" v-model="form.title" placeholder="请填写书名"></el-input>
                </el-form-item>
                <el-form-item label="规则名称" prop="author">
                  <el-input class="span6" size="medium" v-model="form.author" placeholder="请填写作者"></el-input>
                </el-form-item>
                <el-form-item label="监控区域" prop="image">
                  <el-input class="span6" size="medium" v-model="form.image" placeholder="请填写封面地址"></el-input>
                </el-form-item>
                <el-form-item label="报警规则" prop="summary">
                  <el-form-item label="报警规则" prop="summary">
                    <el-input
                      class="span5"
                      size="medium"
                      placeholder="请输入简介"
                      v-model="form.summary">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="报警规则" prop="summary">
                    <el-input
                      class="span5"
                      size="medium"
                      placeholder="请输入简介"
                      v-model="form.summary">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="报警规则" prop="summary">
                    <el-input
                      class="span5"
                      size="medium"
                      placeholder="请输入简介"
                      v-model="form.summary">
                    </el-input>
                  </el-form-item>
                </el-form-item>
                <el-form-item class="submit">
                  <el-button type="primary" @click="submitForm('form')">保 存</el-button>
                  <el-button @click="resetForm('form')">重 置</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  // import book from '@/models/book'

  export default {
    name: 'RuleAdd',
    data() {
      return {
        form: {
          title: '',
          author: '',
          summary: '',
          image: '',
        },
      }
    },
    methods: {
      async submitForm(formName) {
        try {
          // const res = await book.addBook(this.form)
          // if (res.error_code === 0) {
          //   this.$message.success(`${res.msg}`)
          //   this.resetForm(formName)
          // }
        } catch (error) {
          console.log(error)
        }
      },
      // 重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      back() {
        this.$emit('editClose')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .panel-default {
    // .title {
    //   height: 59px;
    //   line-height: 59px;
    //   font-size: 16px;
    //   font-weight: 500;
    //   text-indent: 40px;
    //   border-bottom: 1px solid #dae1ec;
    // }
   
  }
</style>
<style>
    label{
      color: #fff!important;
    }
</style>

