<template>
  <div class="zzd-table-search">
    <el-form
      :size="size"
      inline
      :label-width="labelWidth"
      ref="tableSearchForm"
      @submit.native.prevent
    >
      <el-form-item
        v-for="item in searchForm"
        :label="item.label"
        :key="item.prop"
        :prop="item.prop"
      >
        <!-- 输入框 -->
        <el-input
          v-if="item.type==='Input'"
          v-model="searchData[item.prop]"
          size="mini"
          :placeholder="item.placeholder"
        ></el-input>
        <!-- 下拉框 -->
        <el-select
          v-if="item.type==='Select'"
          :filterable="item.filterable"
          v-model="searchData[item.prop]"
          size="mini"
          @change="item.change(searchData[item.prop])"
          :placeholder="item.placeholder"
        >
          <el-option v-for="op in item.options" :label="op.label" :value="op.value" :key="op.value"></el-option>
        </el-select>

        <!-- 单选 -->
        <el-radio-group v-if="item.type==='Radio'" v-model="searchData[item.prop]">
          <el-radio v-for="ra in item.radios" :label="ra.value" :key="ra.value">{{ra.label}}</el-radio>
        </el-radio-group>
        <!-- 单选按钮 -->
        <el-radio-group
          v-if="item.type==='RadioButton'"
          v-model="searchData[item.prop]"
          @change="item.change && item.change(searchData[item.prop])"
        >
          <el-radio-button v-for="ra in item.radios" :label="ra.value" :key="ra.value">{{ra.label}}</el-radio-button>
        </el-radio-group>
        <!-- 复选框 -->
        <el-checkbox-group v-if="item.type==='Checkbox'" v-model="searchData[item.prop]">
          <el-checkbox v-for="ch in item.checkboxs" :label="ch.value" :key="ch.value">{{ch.label}}</el-checkbox>
        </el-checkbox-group>
        <!-- 日期 -->
        <el-date-picker
          v-if="item.type==='Date'"
          v-model="searchData[item.prop]"
          :placeholder="item.placeholder"
        ></el-date-picker>
        <!-- 时间 -->
        <el-time-select
          v-if="item.type==='Time'"
          v-model="searchData[item.prop]"
          type
          :placeholder="item.placeholder"
        ></el-time-select>
        <!-- 日期时间 -->
        <el-date-picker
          v-if="item.type==='DateTime'"
          type="datetime"
          v-model="searchData[item.prop]"
          :disabled="item.disable && item.disable(searchData[item.prop])"
          :placeholder="item.placeholder"
        ></el-date-picker>
        <!--日期和时间范围-->
        <el-date-picker
          v-if="item.type==='DateTimeRange'"
          v-model="searchData[item.prop]"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          :start-placeholder="item.startPlaceholder"
          :end-placeholder="item.endPlaceholder"
          align="right"
        ></el-date-picker>
        <!-- 滑块 -->
        <!-- <el-slider v-if="item.type==='Slider'" v-model="searchData[item.prop]"></el-slider> -->
        <!-- 开关 -->
        <el-switch v-if="item.type==='Switch'" v-model="searchData[item.prop]"></el-switch>
      </el-form-item>
      <el-row>
        <el-button type="primary" :size="size" icon="el-icon-search" @click="handleFilter()">搜索</el-button>
      </el-row>
    </el-form>
    <!-- <el-form inline v-if="isHandle">
      <el-form-item v-for="item in searchHandle" :key="item.label">
        <el-button
          :type="item.type"
          :size="item.size || size"
          :icon="item.icon"
          @click="item.handle()"
        >{{item.label}}</el-button>
      </el-form-item>
    </el-form>-->
  </div>
</template>

<script>
export default {
  name: "ZzdTableSearch",
  components: {},
  props: {
    isHandle: {
      type: Boolean,
      default: true
    },
    labelWidth: {
      type: String,
      default: "100px"
    },
    size: {
      type: String,
      default: "mini"
    },
    searchForm: {
      type: Array,
      default: []
    },
    searchData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  methods: {
    // 搜索按钮传给父组件
    handleFilter() {
      this.$emit("handleFilter", this.searchData);
    }
  }
};
</script>



<style>
.zzd-table-search {
  position: relative;
  width: 100%;
  /* background: #ffffff; */
  padding: 15px;
  color: #fff;
}
.el-row{
  margin-left: 80px;
}
label{
  color: #fff!important;
}
.search{
  margin-bottom: 20px;
}
.el-pagination__jump,.el-pagination__total{
  color: #409EFF;
}
</style>
