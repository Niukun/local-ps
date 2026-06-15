<template>
  <div class="status-bar">
    <div class="status-left">
      <div class="status-item">
        <span>缩放: {{ zoom }}%</span>
      </div>
      <div class="status-item">
        <span>尺寸: {{ imageSize.width }} × {{ imageSize.height }}</span>
      </div>
    </div>
    <div class="status-right">
      <div class="status-item">
        <span>格式: {{ imageFormat }}</span>
      </div>
      <div class="status-item">
        <span>就绪</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'StatusBar',
  computed: {
    ...mapState('image', ['zoom', 'imageInfo']),
    imageSize() {
      return {
        width: this.imageInfo.width || 0,
        height: this.imageInfo.height || 0
      }
    },
    imageFormat() {
      const type = this.imageInfo.type || ''
      return type.split('/')[1]?.toUpperCase() || '未知'
    }
  }
}
</script>

<style scoped>
.status-bar {
  height: 28px;
  background-color: #16213e;
  border-top: 1px solid #0f3460;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  font-size: 12px;
  color: #888;
}

.status-left, .status-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>