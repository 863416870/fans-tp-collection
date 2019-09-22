<template>
  <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" row-key="id" style="width: 100%" @row-click="openDetails" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="38" />
    <el-table-column label="订单编号" width="170" fixed>
      <template scope="scope">{{ scope.row.orderNo }}</template>
    </el-table-column>
    <el-table-column prop="id" label="id" width="170" />
    <el-table-column prop="payNo" label="支付单号" width="170" />
    <el-table-column prop="wName" label="商户公众号名称" width="130" />
    <el-table-column prop="wID" label="商户公众号ID" width="120" />
    <el-table-column prop="payer" label="支付人" width="120" />
    <el-table-column prop="payment" label="支付方式" width="100" />
    <el-table-column prop="business" label="所属业务" width="100" show-overflow-tooltip />
    <el-table-column prop="amount" label="支付金额" width="120" class-name="sum-color" />
    <el-table-column prop="fee" label="手续费" width="120" class-name="sum-color" />
    <el-table-column prop="refund" label="退款金额" width="120" class-name="sum-color" />
    <el-table-column prop="actual" label="实际金额" width="120" class-name="sum-color" />
    <el-table-column prop="status" label="到账状态" width="100" />
    <el-table-column prop="payDate" label="支付时间" width="150" />
    <el-table-column prop="arrivalDate" label="到账时间" width="150" />
  </el-table>
</template>

<script>
export default {
  name: 'RuleAdd',
  data() {
    return {
      tableData: [
        {
          id: 123,
          orderNo: '6881234567890123456',
          payNo: '2331234567890123456',
          wName: 'xxx公众号',
          wID: 'zjfiawsf',
          payer: '张三张四张五',
          payment: '微信支付',
          business: '微餐饮',
          amount: '14614.00', // 支付金额
          fee: '322.00', // 手续费
          refund: '322.00', // 退款金额
          actual: '322.00', // 实际金额
          status: '已到账', // 到账状态
          payDate: '2017-9-27 10:31:37', // 支付时间
          arrivalDate: '2017-9-27 10:31:44' // 到账日期
        },
        {
          id: 213,
          orderNo: '6881234567890123456',
          payNo: '2331234567890123456',
          wName: 'xxx公众号',
          wID: 'zjfiawsf',
          payer: '张三张四张五',
          payment: '微信支付',
          business: '微餐饮',
          amount: '14614.00', // 支付金额
          fee: '322.00', // 手续费
          refund: '322.00', // 退款金额
          actual: '322.00', // 实际金额
          status: '已到账', // 到账状态
          payDate: '2017-9-27 10:31:37', // 支付时间
          arrivalDate: '2017-9-27 10:31:44' // 到账日期
        }
      ],
      multipleSelection: []
    }
  },
  watch: {
    multipleSelection: function() {
      const arr = []
      for (const i in this.multipleSelection) {
        arr.push(this.multipleSelection[i].id)
      }
      console.log('勾中的id为：' + arr.join())
    }
  },
  methods: {
    // 打开详情页弹窗
    openDetails(row, event, column) {
      console.log(row.key, event, column)
    },
    // 获取多选参数
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped>

</style>
