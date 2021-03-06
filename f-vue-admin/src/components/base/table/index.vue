<template>
  <div class="zzd-table">
    <el-table
      ref="zzdTable"
      v-loading="loading"
      stripe
      row-key="id"
      :border="border"
      :data="currentData"
      :header-cell-style="tableHeaderColor"
      :highlight-current-row="highlightCurrentRow ? true : false"
      :element-loading-text="loadingText"
      :element-loading-spinner="loadingIcon"
      :element-loading-background="loadingBG"
      :row-class-name="tableRowClassName"
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
      @select-all="selectAll"
      @row-click="rowClick"
    >
      <el-table-column v-if="type" :type="type" width="55" />
      <el-table-column
        v-if="index"
        :type="index"
        :index="currentIndex"
        width="55"
      />
      <el-table-column
        v-for="item in filterTableColumn"
        :key="item.id"
        :prop="item.prop"
        :label="item.label"
        :show-overflow-tooltip="true"
        :filters="item.filters ? item.filters : null"
        :filter-method="item.filterMethod ? item.filterMethod: null"
        :column-key="item.filterMethod ? item.prop: null"
        :formatter="item.formatter ? item.formatter: null"
        :sortable="item.sortable ? item.sortable : false"
        :fixed="item.fixed ? item.fixed : false"
        :width="item.width ? item.width : ''"
        v-html="item.prop"
      >
        <template slot-scope="scope">
            <ex-slot
              v-if="item.render"
              :render="item.render"
              :row="scope.row"
              :index="scope.$index"
              :column="item"
            />
            <span v-else>
              {{scope.row[item.prop]}}
            </span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="operate.data.length > 0"
        label="操作"
        fixed="right"
        :width="operate.width"
      >
        <template slot-scope="scope">
          <el-button
            v-for="(item,index) in operate.data"
            v-show="item.condition != undefined ? (scope.row[item.condationName] === item.condition) : true"
            :key="index"
            :type="item.type"
            size="mini"
            @click.native.prevent.stop="buttonMethods(item.func, scope.$index, scope.row, item.params)"
          >{{ item.name }}
          </el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="pagination"
      class="pagination"
      background
      layout="prev, pager, next"
      :page-size="pagination.pageSize ? pagination.pageSize: 10 "
      :total="pagination.pageTotal ? pagination.pageTotal : null "
      @current-change="currentChange"
    />
  </div>
</template>

<script>
// import Sortable from 'sortablejs'
// import FileSaver from 'file-saver'

// 自定义内容的组件
var exSlot = {
  functional: true,
  props: {
      row: Object,
      render: Function,
      index: Number,
      column: {
          type: Object,
          default: null
      }
  },
  render: (h, data) => {
    const params = {
        row: data.props.row,
        index: data.props.index
    }

    if (data.props.column) params.column = data.props.column
      return data.props.render(h, params)
  }
}


export default {
  components: {
      'ex-slot': exSlot
  },
  props: {
    tableColumn: {
      // 表头名称
      type: Array,
      default: () => []
    },
    tableData: {
      // 表格数据
      type: Array,
      default: () => []
    },
    operate: {
      // 自定义按键及绑定方法
      type: Object,
      default: () => []
    },
    customColumn: {
      // 定制要展示的列
      type: Array,
      default: () => []
    },
    fixedLeftList: {
      // 左侧固定列
      type: Array,
      default: () => []
    },
    fixedRightList: {
      // 右侧固定列
      type: Array,
      default: () => []
    },
    type: {
      // 是否开启表格多选
      type: String,
      default: null
    },
    index: {
      // 是否显示索引
      type: String,
      default: ''
    },
    highlightCurrentRow: {
      // 是否开启表格单选
      type: Boolean,
      default: false
    },
    loading: {
      // 动画加载
      type: Boolean,
      default: false
    },
    loadingText: {
      // 动画提示
      type: String,
      default: ''
    },
    loadingIcon: {
      // 动画图标
      type: String,
      default: 'el-icon-loading'
    },
    loadingBG: {
      // 动画背景色
      type: String,
      default: 'rgba(255,255,255,0.5)'
    },
    pagination: {
      // 分页
      type: [Object, Boolean],
      default: false
    },
    border: {
      // 边框
      type: Boolean,
      default: false
    },
    selectFieldUnique: {
      // 默认唯一选中字段
      type: String,
      default: 'id'
    }
  },
  data() {
    return {
      filterTableColumn: [], // 定制展示的列
      currentPage: 1, // 当前选中页
      currentData: [], // 每次切换页码的时候要给table传入不同的数据
      selectedTableData: [], // 多选选中的数据
      currentRow: null, // 单选选中的数据
      oldVal: [], // 上一次选中的数据
      oldKey: [], // 上一次选中数据的key
      currentIndex: 1, // 当前索引，切换页面的时候需要重新计算
      rowClassName: '' // 行样式
    }
  },
  watch: {
    fixedLeftList: {
        handler(val, oldVal) { // eslint-disable-line
        this.filterTableColumn.map((item, index) => {
          if (this.fixedLeftList.indexOf(item.label) > -1) {
            this.$set(this.filterTableColumn[index], 'fixed', 'left')
          } else if (this.fixedRightList.indexOf(item.label) === -1) {
            this.$set(this.filterTableColumn[index], 'fixed', false)
          }
          return ''
        })
      },
      deep: true,
      immediate: true
    },
    fixedRightList: {
        handler(val, oldVal) { // eslint-disable-line
        this.filterTableColumn.map((item, index) => {
          if (this.fixedRightList.indexOf(item.label) > -1) {
            this.$set(this.filterTableColumn[index], 'fixed', 'right')
          } else if (this.fixedLeftList.indexOf(item.label) === -1) {
            this.$set(this.filterTableColumn[index], 'fixed', false)
          }
          return ''
        })
      },
      deep: true,
      immediate: true
    },
    customColumn: {
      handler(val) {
        if (val.length > 1) {
          this.filterTableColumn = this.tableColumn.filter(
            v => val.indexOf(v.label) > -1,
          )
        }
      },
      deep: true
    },
    tableData: {
      handler() {
        // 传了分页配置
        if (this.pagination && this.pagination.pageSize) {
          this.currentData = this.tableData.filter((item, index) => index < this.pagination.pageSize)
        } else {
          this.currentData = this.tableData
        }
      },
      deep: true,
      immediate: true
    },
    tableColumn: {
      handler() {
        // 如果一开始没有传要展示的列 就默认全展示
        if (this.customColumn.length > 1) {
          this.filterTableColumn = this.tableColumn.filter(
            v => this.customColumn.indexOf(v.label) > -1,
          )
        } else {
          this.filterTableColumn = this.tableColumn
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  beforeMount() {
    // 先放在session里，因为每次切换页码table都会重新渲染，之前选中都数据就丢失了  sessionstorage在create里面打包会提示undefined
    sessionStorage.setItem('selectedTableData', JSON.stringify([]))
  },
  methods: {
    // 行内操作,具体方法在调用的模块定义
    buttonMethods(func, index, row, params) {
      this.$emit(func, { index, row, params })
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return 'dark-row'
      } else {
        return 'light-row'
      }
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #0e0d4f;color: #fff;font-weight: bold;border-right: 1px solid #fff'
      }
    },
    // 多选-选中checkbox
    toggleSelection(rows, flag) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.zzdTable.toggleRowSelection(row, flag)
        })
      } else {
        this.$refs.zzdTable.clearSelection()
      }
    },
    // 全选-取消全选
    selectAll(val) {
      this.oldKey = val.map(item => item[this.selectFieldUnique])
    },
    // 单选
    handleCurrentChange(val, oldVal) {
      this.currentRow = val
      this.$emit('handleCurrentChange', { val, oldVal })
    },
    // 单击某一行
    rowClick(row, column, event) { // eslint-disable-line
      // 选中-多选
      if (!this.oldKey.includes(row[this.selectFieldUnique])) {
        this.oldKey.push(row[this.selectFieldUnique])
        const data = this.oldVal.concat(row)
        this.handleSelectionChange(data)
        // 选中checkbox
        this.toggleSelection(this.currentData.filter(item => item[this.selectFieldUnique] === row[this.selectFieldUnique]))
        // 取消选中
      } else {
        this.oldKey = this.oldKey.filter(item => item !== row[this.selectFieldUnique])
        const data = this.oldVal.filter(item => item[this.selectFieldUnique] !== row[this.selectFieldUnique])
        this.handleSelectionChange(data)
        this.toggleSelection(this.currentData.filter(item => item[this.selectFieldUnique] === row[this.selectFieldUnique]), false)
      }
      // 选中-单选
      if (this.currentOldRow && this.currentOldRow[this.selectFieldUnique] === row[this.selectFieldUnique]) {
        // 取消单选选中
        this.$refs.zzdTable.setCurrentRow()
        this.currentOldRow = null
        return
      }
      this.currentOldRow = row
    },
    // 切换当前页
    currentChange(page) {
      const currentSelectedData = []
      this.oldVal = []
      this.currentPage = page
      this.selectedTableData = JSON.parse(sessionStorage.getItem('selectedTableData'))
        this.currentData = this.tableData.filter((item, index) => (index >= (this.currentPage - 1) * this.pagination.pageSize) && (index < (this.currentPage * this.pagination.pageSize))) // eslint-disable-line
      this.$emit('currentChange', page)
      // 已选中的数据打勾
      this.selectedTableData.forEach((item) => {
        for (let i = 0; i < this.currentData.length; i++) {
          if (this.currentData[i][this.selectFieldUnique] === item[this.selectFieldUnique]) {
            // 切换页码重新计算oldVal
            this.oldVal.push(this.currentData[i])
            // 需要打勾的数据
            currentSelectedData.push(this.currentData[i])
          }
        }
      })
      this.$nextTick(() => {
        this.toggleSelection(currentSelectedData)
      })
      // 切换行索引
      this.currentIndex = (this.currentPage - 1) * this.pagination.pageSize + 1
    },
    // checkbox触发函数
    handleSelectionChange(val) {
      const valKeys = val.map(item => item.audit_user_id)
      const oldValKeys = this.oldVal.map(item => item[this.selectFieldUnique])
      this.selectedTableData = JSON.parse(sessionStorage.getItem('selectedTableData'))
      // 一条数据都没选中
      if (this.selectedTableData.length === 0) {
        this.selectedTableData = this.selectedTableData.concat(val)
        this.$emit('selection-change', this.selectedTableData)
        this.oldVal = [...val]
        sessionStorage.setItem('selectedTableData', JSON.stringify(this.selectedTableData))
        return
      }
      // 判断是选中数据还是取消选中
      if (valKeys.length < oldValKeys.length) {
        const delKey = oldValKeys.filter(item => !valKeys.includes(item))
        this.selectedTableData = this.selectedTableData.filter(item => !delKey.includes(item[this.selectFieldUnique]))
        this.$emit('selection-change', this.selectedTableData)
      } else {
        const addKey = valKeys.filter(item => !oldValKeys.includes(item))
        const addVal = val.filter(item => addKey.includes(item[this.selectFieldUnique]))
        this.selectedTableData = this.selectedTableData.concat(addVal)
        this.$emit('selection-change', this.selectedTableData)
      }
      sessionStorage.setItem('selectedTableData', JSON.stringify(this.selectedTableData))
      this.oldVal = [...val]
    }
    // 拖拽
    // setDrag() {
    //   const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
    //   this.rowClassName = 'rowClassName' // 设置行样式，添加移动手势
    //   this.sortable = Sortable.create(el, {
    //     setData(dataTransfer) {
    //       dataTransfer.setData('Text', '')
    //     },
    //     onEnd: (evt) => {
    //       const dragData = [...this.currentData]
    //       let { oldIndex, newIndex } = evt
    //       if (this.pagination) {
    //         oldIndex = evt.oldIndex * this.currentPage
    //         newIndex = evt.newIndex * this.currentPage
    //       }
    //       dragData[oldIndex] = this.currentData[newIndex]
    //       dragData[newIndex] = this.currentData[oldIndex]
    //       this.$emit('getDragData', { dragData, oldIndex, newIndex })
    //     },
    //   })
    // },
    // 导出excel
    // exportExcel(fileName = 'sheet') {
    //   const targetTable = this.$XLSX.utils.table_to_book(document.querySelectorAll('.el-table__body-wrapper > table')[0])
    //   const writeTable = this.$XLSX.write(targetTable, { bookType: 'xlsx', bookSST: true, type: 'array' })
    //   try {
    //     FileSaver.saveAs(new Blob([writeTable], { type: 'application/octet-stream' }), `${fileName}.xlsx`)
    //   } catch (e) { if (typeof console !== 'undefined') console.log(e, writeTable) }
    //   return writeTable
    // },
    // 导出csv
    // exportCsv(fileName = 'sheet') {
    //   const targetTable = this.$XLSX.utils.table_to_book(document.querySelectorAll('.el-table__body-wrapper > table')[0])
    //   const writeTable = this.$XLSX.write(targetTable, { bookType: 'csv', bookSST: true, type: 'array' })
    //   try {
    //     FileSaver.saveAs(new Blob([writeTable], { type: 'application/octet-stream' }), `${fileName}.csv`)
    //   } catch (e) { if (typeof console !== 'undefined') console.log(e, writeTable) }
    //   return writeTable
    // },
  }
}
</script>

<style lang="scss" scoped>
  .zzd-table {
    position: relative;
    border: 1px solid #a7a7a7;
  }

  .sort-input {
    width: 50px;
    background: none;
    justify-content: space-around;
  }

  .table-edit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 135px;
  }

  .cell-edit-input .el-input,
  .el-input__inner {
    width: 125px;
  }

  .cell-icon {
    cursor: pointer;
    color: #3963bc;
    margin-left: 5px;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-right: -10px;
    margin-top: 15px;
  }
  .zzd-table{
    .el-pagination__total {
      margin-right: 10px;
      font-weight: 400;
      color: #fff;
    }
    .el-pager li{
      background-color: #3963bc;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #FD7A3A;   // 进行修改背景和字体
      color: #fff;
    }
  }
</style>

<style>
  .zzd-table .rowClassName {
    cursor: move !important;
  }
  .el-table .dark-row {
    background: #0e0d4f;
    color: #fff;
  }
  .el-table--border::after, .el-table--group::after, .el-table::before{
    height: 0px!important;
    background-color: none!important;
  }
  .el-table__fixed-right::before, .el-table__fixed::before{
    height: 0px!important;
    background-color: none!important;
  }
  .el-table td, .el-table th.is-leaf{
    border-bottom: 1px solid #a7a7a7;
    border-right: 1px solid #a7a7a7!important;
  }
  /* 鼠标悬浮 */
  .zzd-table .el-table__body tr.hover-row > td{
    background: #5a8af7!important;
  }
  .el-table .light-row {
    background: #1f1e79;
    color: #fff;
  }
  .el-table .light-row td{
    background: #1f1e79!important;
  }
  tbody td{
    border-right: 1px solid #fff;
  }
  .el-table__empty-block{
    background: #1f1e79;
  }
  .el-table__empty-text{
    color: #fff;
  }
  /* 分页 start*/
  .el-pagination li, .el-pagination .el-input__inner, .el-pagination .btn-next, .el-pagination .btn-prev {
    background: #252A6D !important;
    border: 1px solid #C1C1C1;
    color: #fff;
  }
  .el-pagination li.active {
    background: #078AF0 !important;
  }
  .el-pagination .el-pagination__total, .el-pagination .el-pagination__jump{
    color: #fff;
  }
  /* 分页 end*/

</style>
