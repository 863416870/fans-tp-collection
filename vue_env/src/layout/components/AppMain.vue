<template>
  <section class="app-main">
    <breadcrumb class="breadcrumb-container" />
    <div class="page-container">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </div>

  </section>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'AppMain',
  components: {
    Breadcrumb
  },
  mounted() {
      document.getElementById('loader').style.display = 'none'
  },
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
.breadcrumb-container {
    padding-left: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
    display: table;
    width: 100%;
}
.page-container{
  margin: 0 15px;
  padding: 0px 10px 10px 10px;
  border-radius: 5px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
