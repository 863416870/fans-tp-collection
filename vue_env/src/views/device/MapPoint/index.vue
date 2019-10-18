<template>
  <div class="panel-default">
    <div class="page-heading">
      <h4>坐标管理</h4>
    </div>
    <div class="page-boy">
      <div class="dashboard-editor-container">
        <el-row :gutter="20">
          <el-col :span="10" class="factory-box">
            <div class="factory-info">
              <FactoryDevicePoint :chart-data="FactoryDevicePointData" :show-status="showStatus" />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import FactoryDevicePoint from "../../dashboard/admin/components/FactoryDevicePoint";
import { getFactoryDevicePoint } from "@/api/dashboard";

export default {
  name: "DashboardAdmin",
  components: {
    FactoryDevicePoint
  },
  data() {
    return {
      FactoryDevicePointData: [],
      showStatus: { deviceName: true, zoneName: true, pollutant: false }
    };
  },
  mounted() {
    // TODO 此处统一请求接口
    this.getFactoryDevicePoint();
  },
  methods: {
    //地图
    async getFactoryDevicePoint() {
      try {
        const ret = await getFactoryDevicePoint();
        this.FactoryDevicePointData = ret.data.list || [];
      } catch (error) {}
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px 32px 0 32px;
  //background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }

  .real-value {
    width: 100%;
    // height: 500px;
    display: flex;
  }
  .msg-box {
    margin-bottom: 32px;
    height: 280px;
  }
  .aircalendar-box {
    margin-top: 20px;
    height: 440px;
  }
  .weather-box {
    margin-top: 30px;
    height: 430px;
  }
  .air-box {
    margin-top: 20px;
  }
  .factory-box {
    height: 750px;
    float: none;
    margin: 20px auto 30px;
    .bg-left-img,
    .bg-right-img {
      width: 100px;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .factory-info {
      height: 100%;
      width: 100%;
    }
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
