<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div class="floor-list-box">
        <ul>
          <li
            v-for="(item, idx) in monitorList"
            :key="item.zoneId"
            :data-id="item.zoneId"
            :class="idx==monitorIndex?'f-active':''"
            @click="btnMonitor(idx,item)"
          >
            <span :style="'width:' + (item.level+1)*30 + 'px;display:inline-block'" />{{ item.name }}
          </li>
        </ul>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  name: 'IndexSidebar',
  props: {
    monitorList: {
      type: Array,
      required: true
    },
    monitorIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    btnMonitor(idx, item) {
      this.$emit('changeMonitor', idx, item)
    }
  }
}
</script>
