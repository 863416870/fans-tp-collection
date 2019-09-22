<template>
  <div class="app-content">
    <div class="table_expand_item">
      <b>element-ui table只展开一行demo</b>
      <el-table
        :data="tableData"
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        border
        style="width:750px; margin-top:20px;"
        @expand-change="expandSelect"
      >
        <el-table-column type="expand" label="展开" width="60px">
          <template slot-scope="scope">
            我是表格行展开的信息{{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          align="center"
        />
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
        />
        <el-table-column
          prop="address"
          label="地址"
          align="center"
        />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        id: 'a',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 'b',
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 'c',
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        id: 'd',
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      getRowKeys(row) { // 行数据的Key
        return row.id
      },
      expands: [] // 通过该属性设置Table目前的展开行，需要设置row-key属性才能使用，该属性为展开行的keys数组
    }
  },
  methods: {
    // table每次只能展开一行
    expandSelect(row, expandedRows) {
      this.expands = []
      if (expandedRows.length > 0) {
        row ? this.expands.push(row.id) : ''
      }
    }
  }
}
</script>
