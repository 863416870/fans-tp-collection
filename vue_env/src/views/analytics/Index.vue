<template>
  <div class="dashboard-container">
    <div>
      <adminDashboard />
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import adminDashboard from './admin'
  export default {
    name: 'Analytics',
    components: { adminDashboard },
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
  .dashboard-container{
    margin-top: 60px;
  }
</style>
