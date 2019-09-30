<template>
  <el-dropdown>
    <div class="notify">
      <el-badge :value="3" class="item">
        <img class="icon-img" src="@/assets/notify/铃铛icon.png">
      </el-badge>
    </div>
    <el-dropdown-menu slot="dropdown" style="position:relative;">
      <div class="notify-title">
        <p>消息提醒</p>
        <p class="button">全部已读</p>
      </div>
      <div class="left-border" />
      <el-dropdown-item
        v-for="unread in unreadMessages"
        :key="unread.id"
        class="unread-messages"
        @click.native="readMessage(unread)"
      >
        {{ unread.data }}
        <span class="date-time">08-16 13:22:07</span>
      </el-dropdown-item>
      <el-dropdown-item v-for="readed in readedMessages" :key="readed.id" class="read-messages">
        {{ readed.data }}
        <span class="date-time">08-16 13:22:07</span>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>

export default {
  data() {
    return {
      notify: null,
      unreadMessages: [
        { id: 1, data: '您的仪器一出问题啦!' },
        { id: 2, data: '您的仪器二出问题啦!' },
        { id: 3, data: '您的仪器三出问题啦!' }
      ],
      readedMessages: [
        { id: 4, data: '您的仪器四出问题啦!' },
        { id: 5, data: '您的仪器五出问题啦!' },
        { id: 6, data: '您的仪器六出问题啦!' }
      ]
    }
  },
  computed: {
  },
  created() {
    this.$nextTick(() => {

    })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.notify {
  height: 36px;
  width: 36px;
  margin-top: 10px;
  background: #0f1e4c;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

  .icon-img {
    width: 18px;
    height: 18px;
  }
}

.el-popper {
  padding-left: 10px;

  .el-dropdown-menu__item:nth-child(3) {
    &:after {
      content: "";
      position: absolute;
      right: 38px;
      top: -58px;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid #fff;
    }
  }

  .el-dropdown-menu__item.unread-messages {
    position: relative;

    &:before {
      content: "";
      position: absolute;
      height: 8px;
      width: 8px;
      border-radius: 50%;
      top: 50%;
      left: 5px;
      transform: translateY(-50%);
      background: #f4516c;
    }
  }

  .el-dropdown-menu__item.read-messages {
    position: relative;

    &:before {
      content: "";
      position: absolute;
      height: 8px;
      width: 8px;
      border-radius: 50%;
      top: 50%;
      left: 5px;
      transform: translateY(-50%);
      background: #ebedf2;
    }
  }
}

.notify-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #45526b;
  margin-left: 5px;
  margin-right: 15px;
  padding-bottom: 8px;
  height: 30px;
  min-width: 150px;
  border-bottom: 1px solid #dee2e6;

  .button {
    font-size: 12px;
    border: 1px solid #596c8e;
    border-radius: 2px;
    cursor: pointer;
    height: 20px;
    line-height: 20px;
    padding-left: 5px;
    padding-right: 5px;
  }
}

.left-border {
  position: absolute;
  box-sizing: border-box;
  background: #fff;
  width: 1px;
  height: calc(100% - 90px);
  top: 63px;
  left: 18px;
  border-left-color: rgb(235, 237, 242);
  border-left-style: solid;
  border-left-width: 1px;
  border-image-source: initial;
  border-image-slice: initial;
  border-image-width: initial;
  border-image-outset: initial;
  border-image-repeat: initial;
}

.date-time {
  float: right;
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  color: #c4c9d2;
}
.notify >>> .el-badge__content.is-fixed {
  transform-origin: center center;
  transform: translateY(-10%) translateX(100%) scale(0.8) !important;
}

.notify >>> .el-badge__content {
  border: 1px solid transparent !important;
  line-height: 20px !important;
}
</style>
