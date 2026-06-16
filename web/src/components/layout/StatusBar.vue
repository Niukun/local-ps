<template>
  <!-- 底部状态栏：28px -->
  <div class="status-bar">
    <span class="status-item status-text">{{ statusText }}</span>
    <span class="status-spacer"></span>
    <span class="status-item">缩放：{{ zoomText }}</span>
    <span class="status-divider">|</span>
    <span class="status-item">鼠标：{{ mouseText }}</span>
    <span class="status-divider">|</span>
    <span class="status-item">文件：{{ fileIndexText }}</span>
    <span class="status-divider">|</span>
    <span class="status-item">历史：{{ historyStep }}/20</span>
  </div>
</template>

<script>
export default {
  name: 'StatusBar',

  props: {
    statusText: {
      type: String,
      default: '就绪'
    },

    zoomText: {
      type: String,
      default: '100%'
    },

    mouseText: {
      type: String,
      default: '(0, 0)'
    },

    fileIndexText: {
      type: String,
      default: '0/0'
    },

    historyStep: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.status-bar {
  display: flex;
  align-items: center;
  height: 28px;
  min-height: 28px;
  padding: 0 12px;
  background-color: #2c2c2c;
  border-top: 1px solid #1a1a1a;
  color: #aaa;
  font-size: 12px;
  flex-shrink: 0;

  .status-item {
    white-space: nowrap;
  }

  .status-spacer {
    flex: 1;
  }

  .status-text {
    color: #fff;
  }

  .status-divider {
    margin: 0 6px;
    color: #555;
  }
}
</style>
