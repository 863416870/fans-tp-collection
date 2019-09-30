<template>
  <div class="legend-list">
    <!-- <el-row>
      <el-col :span="7">
        <div class="grid-content">
          <div class="l-item">
            <div class="l-color l-you"></div>
            <div>优(0~50)</div>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <div class="l-item">
            <div class="l-color l-liang"></div>
            <div>良(50~100)</div>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content">
          <div class="l-item">
            <div class="l-color l-qing"></div>
            <div>轻度污染(100~150)</div>
          </div>
        </div>
      </el-col>
      <el-col :span="11">
        <div class="grid-content">
          <div class="l-item">
            <div class="l-color l-zhong"></div>
            <div>中度污染(150~200)</div>
          </div>
        </div>
      </el-col>
      <el-col :span="11">
        <div class="grid-content">
          <div class="l-item">
            <div class="l-color l-zhongdu"></div>
            <div>重度污染(200~300)</div>
          </div>
        </div>
      </el-col>
    </el-row> -->
      <div class="l-item">
        <div class="l-color l-you"></div>
        <div>优(0~50)</div>
      </div>
      <div class="l-item">
        <div class="l-color l-liang"></div>
        <div>良(50~100)</div>
      </div>
      <div class="l-item">
        <div class="l-color l-qing"></div>
        <div>轻度污染(100~150)</div>
      </div>
      <div class="l-item">
        <div class="l-color l-zhong"></div>
        <div>中度污染(150~200)</div>
      </div>
      <div class="l-item">
        <div class="l-color l-zhongdu"></div>
        <div>重度污染(200~300)</div>
      </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
    .legend-list{
        width: 100%;
        line-height: 38px;
        color: #fff;
        font-size: 14px;
        margin-bottom: 30px;
        .l-item{
            display: flex;
            align-items: center;
            float: left;
            padding-right: 5%;
            .l-color{
                width: 25px;
                height: 15px;
                margin-right: 5px;
                border-radius: 3px;
            }
            .l-liang{
                background-color: #03a7f3;
            }
            .l-you{
                background-color: #0cec41;
            }
            .l-qing{
                background-color: #f7bc08;
            }
            .l-zhong{
                background-color: #e82505;
            }
            .l-zhongdu{
                background-color: #000000;
            }
        }
    }
</style>
