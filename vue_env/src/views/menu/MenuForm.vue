<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px"
    >
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="dataForm.type">
          <el-radio
            v-for="(type, index) in dataForm.typeList"
            :label="index"
            :key="index"
          >{{ type }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="dataForm.typeList[dataForm.type] + '名称'" prop="name">
        <el-input v-model="dataForm.name" :placeholder="dataForm.typeList[dataForm.type] + '名称'"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="parentName">
        <el-popover ref="menuListPopover" placement="bottom-start" trigger="click">
          <el-tree
            :data="menuList"
            :props="menuListTreeProps"
            node-key="menuId"
            ref="menuListTree"
            @current-change="menuListTreeCurrentChangeHandle"
            :default-expand-all="true"
            :highlight-current="true"
            :expand-on-click-node="false"
          ></el-tree>
        </el-popover>
        <el-input
          v-model="dataForm.parentName"
          v-popover:menuListPopover
          :readonly="true"
          placeholder="点击选择上级菜单"
          class="menu-list__input"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="dataForm.type === 1" label="菜单路由" prop="url">
        <el-input v-model="dataForm.url" placeholder="菜单路由"></el-input>
      </el-form-item>
      <el-form-item v-if="dataForm.type !== 0" label="授权标识" prop="perms">
        <el-input v-model="dataForm.perms" placeholder="多个用逗号分隔, 如: user:list,user:create"></el-input>
      </el-form-item>
      <el-form-item v-if="dataForm.type !== 2" label="排序号" prop="orderNum">
        <el-input-number v-model="dataForm.orderNum" controls-position="right" :min="0" label="排序号"></el-input-number>
      </el-form-item>
      <el-form-item v-if="dataForm.type !== 2" label="菜单图标" prop="icon">
        <el-row>
          <el-col :span="22">
            <el-popover
              ref="iconListPopover"
              placement="bottom-start"
              trigger="click"
              popper-class="mod-menu__icon-popover"
            >
              <div class="mod-menu__icon-inner">
                <div class="mod-menu__icon-list">
                  <el-button
                    v-for="(item, index) in iconList"
                    :key="index"
                    @click="iconActiveHandle(item)"
                    :class="{ 'is-active': item === dataForm.icon }"
                  >
                    <svg-icon :iconClass="item"></svg-icon>
                  </el-button>
                </div>
              </div>
            </el-popover>
            <el-input
              v-model="dataForm.icon"
              v-popover:iconListPopover
              :readonly="true"
              placeholder="菜单图标名称"
              class="icon-list__input"
            ></el-input>
          </el-col>
          <el-col :span="2" class="icon-list__tips">
            <el-tooltip placement="top" effect="light">
              <div slot="content" style="color:#999">
                全站推荐使用SVG Sprite, 详细请参考:
                <a>icons/index.js</a>描述
              </div>
              <i class="el-icon-warning" style="color:#f56c6c;margin-left:10px;font-size:20px"></i>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Utils from "@/utils/util";
import Icon from "@/icons";
export default {
  data() {
    var validateUrl = (rule, value, callback) => {
      if (this.dataForm.type === 1 && !/\S/.test(value)) {
        callback(new Error("菜单URL不能为空"));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      dataForm: {
        id: 0,
        type: 1,
        typeList: ["目录", "菜单", "按钮"],
        name: "",
        parentId: 0,
        parentName: "",
        url: "",
        perms: "",
        orderNum: 0,
        icon: "",
        iconList: []
      },
      dataRule: {
        name: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" }
        ],
        parentName: [
          { required: true, message: "上级菜单不能为空", trigger: "change" }
        ],
        url: [{ validator: validateUrl, trigger: "blur" }]
      },
      menuList: [],
      menuLists: [
        {
          menuId: 0,
          parentId: -1,
          parentName: null,
          name: "一级菜单",
          url: null,
          perms: null,
          type: null,
          url: null
        },
        {
          menuId: 1,
          parentId: 0,
          parentName: null,
          name: "系统管理",
          url: null,
          perms: null,
          type: 0,
          url: null
        },
        {
          menuId: 2,
          parentId: 1,
          parentName: null,
          name: "管理员列表",
          url: "sys/user",
          perms: null,
          type: 1,
          url: "sys/user"
        }
      ],
      menuListTreeProps: {
        label: "name",
        children: "children"
      }
    };
  },
  created() {
    this.iconList = Icon.getNameList();
    this.menuList = Utils.treeDataTranslate(this.menuLists, "menuId");
    console.log("menuList", this.menuList);
  },
  methods: {
    // 菜单树选中
    menuListTreeCurrentChangeHandle(data, node) {
      this.dataForm.parentId = data.menuId;
      this.dataForm.parentName = data.name;
    },
    // 菜单树设置当前选中节点
    menuListTreeSetCurrentNode() {
      // console.log("parentId", this.$refs.menuListTree);
      this.$refs.menuListTree.setCurrentKey(this.dataForm.parentId);
      this.dataForm.parentName = (this.$refs.menuListTree.getCurrentNode() ||
        {})["name"];
    },
    // 图标选中
    iconActiveHandle(iconName) {
      this.dataForm.icon = iconName;
    },

    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          //TODO 此处提交信息接口
          console.log("submit", this.dataForm);
        }
      });
    },
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;

      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
      });

      console.log("parentId", this.$refs.menuListTree);
      this.menuListTreeSetCurrentNode();
      //   this.$http({
      //     url: this.$http.adornUrl("/sys/menu/select"),
      //     method: "get",
      //     params: this.$http.adornParams()
      //   })
      //     .then(({ data }) => {
      //       this.menuList = treeDataTranslate(data.menuList, "menuId");
      //     })
      //     .then(() => {
      //       this.visible = true;
      //       this.$nextTick(() => {
      //         this.$refs["dataForm"].resetFields();
      //       });
      //     })
      //     .then(() => {
      //       if (!this.dataForm.id) {
      //         // 新增
      //         this.menuListTreeSetCurrentNode();
      //       } else {
      //         // 修改
      //         this.$http({
      //           url: this.$http.adornUrl(`/sys/menu/info/${this.dataForm.id}`),
      //           method: "get",
      //           params: this.$http.adornParams()
      //         }).then(({ data }) => {
      //           this.dataForm.id = data.menu.menuId;
      //           this.dataForm.type = data.menu.type;
      //           this.dataForm.name = data.menu.name;
      //           this.dataForm.parentId = data.menu.parentId;
      //           this.dataForm.url = data.menu.url;
      //           this.dataForm.perms = data.menu.perms;
      //           this.dataForm.orderNum = data.menu.orderNum;
      //           this.dataForm.icon = data.menu.icon;
      //           this.menuListTreeSetCurrentNode();
      //         });
      //       }
      //     });
    }
  }
};
</script>

<style lang="scss">
.mod-menu {
  .menu-list__input,
  .icon-list__input {
    > .el-input__inner {
      cursor: pointer;
    }
  }
  &__icon-popover {
    width: 458px;
    overflow: hidden;
  }
  &__icon-inner {
    width: 478px;
    max-height: 258px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  &__icon-list {
    width: 458px;
    padding: 0;
    margin: -8px 0 0 -8px;
    > .el-button {
      padding: 8px;
      margin: 8px 0 0 8px;
      > span {
        display: inline-block;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        font-size: 18px;
      }
    }
  }
  .icon-list__tips {
    font-size: 18px;
    text-align: center;
    color: #e6a23c;
    cursor: pointer;
  }
}
</style>
