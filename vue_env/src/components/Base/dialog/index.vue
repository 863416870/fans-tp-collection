<template>
  <el-dialog
    :modal="true"
    :modal-append-to-body="true"
    :title="tittle"
    :visible.sync="isShow"
    :width="width"
    :height="height"
    :close-on-click-modal="true"
    :show-close="showClose"
    :close-on-press-escape="true"
    right>
    <slot name="form-content"></slot>
  </el-dialog>
</template>
<script>
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      switchStyle: {
        type: Boolean,
        default: true
      },
      tittle: {
        type: String,
        default: '标题'
      },
      width: {
        type: String,
        default: "35%"
      },
      height: {
        type: String,
        default: "1000px"
      },
      showClose: {
        type: Boolean,
        default: true
      }
    },
    watch:{
      isShow(val){
        this.$emit('update:isShow')
      }
    },
    data(){
      return {
      }
    },
    methods: {

    },
    components: {

    }
 
  }
</script>
<style scoped>
  .divauto{
    margin:  10px auto 0 auto;
  }
</style>