<template>
  <div class="dashboard-container">
    <div>
      <adminDashboard></adminDashboard>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
export default {
  name: 'Dashboard',
  data() {
    return {

    }
  },
  components: { adminDashboard },
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
</style>
