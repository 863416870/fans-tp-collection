<template>
  <div class="page-privilege">
    <div class="panel-default">
      <div class="page-heading">
        <h4>权限管理</h4>
      </div>
      <div class="page-body">
        <el-row :gutter="20">
          <el-col :lg="22" :md="20" :sm="24" :xs="24" :span="12" class="form-col">
            <el-form>
              <el-form-item>
                <el-tree
                  :data="menuList"
                  :props="menuListTreeProps"
                  node-key="menuId"
                  ref="menuListTree"
                  :default-expand-all="true"
                  show-checkbox>
                </el-tree>
              </el-form-item>
              <el-form-item class="submit">
                <el-button type="primary" @click="dataFormSubmit">保 存</el-button>
                <el-button @click="back">返 回</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>


<script>
import { treeDataTranslate } from '@/utils'
import { getMenuList } from '@/api/role'
export default {
  name: "Privilege",
  data() {
    return {
      dataForm: {
        roleId: null,
        menuIdList: [],
      },
      menuList: [],
      menuListTreeProps: {
        label: 'name',
        children: 'children'
      },
      tempKey: -666666 // 临时key, 用于解决tree半选中状态项不能传给后台接口问题.
    }
  },
  mounted() {
    this.init("001")
  },
  methods: {
    init (id) {
      const data = getMenuList()
      this.menuList = treeDataTranslate(data, 'menuId')
      if(id){
        let data = {
          role: {
            menuIdList: [3, 4, 5, -666666, 2]
          }
        }
        let idx = data.role.menuIdList.indexOf(this.tempKey)
        if (idx !== -1) {
          data.role.menuIdList.splice(idx, data.role.menuIdList.length - idx)
        }
        this.$refs.menuListTree.setCheckedKeys(data.role.menuIdList)
      }
    },
    // 表单提交
    dataFormSubmit () {
      this.dataForm.menuIdList = [].concat(this.$refs.menuListTree.getCheckedKeys(), [this.tempKey], this.$refs.menuListTree.getHalfCheckedKeys())
      if(this.dataForm.menuIdList && this.dataForm.menuIdList.length > 0){
        console.log(this.dataForm.menuIdList)
      }else{
        this.$message.error('请选择权限');
      }
    }
  }

}
</script>
<style lang="scss">
.el-tree{
  background: none;
  color: #fff;
}
.el-tree-node__content:hover{
  background-color: #21206c!important;
}
.el-tree-node:focus>.el-tree-node__content{
  background-color: #21206c!important;
}
.el-tree-node__content{
  margin-bottom: 5px;
}
.el-tree-node__children{
  margin-bottom: 10px;
 .el-tree-node{
    // float: left!important;
  }
}
</style>