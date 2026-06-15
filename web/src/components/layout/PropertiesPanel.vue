<template>
  <div class="properties-panel">
    <div class="panel-tabs">
      <div class="panel-tab" :class="{ active: activeTab === 'image' }" @click="switchTab('image')">图像</div>
      <div class="panel-tab" :class="{ active: activeTab === 'tool' }" @click="switchTab('tool')">工具</div>
      <div class="panel-tab" :class="{ active: activeTab === 'history' }" @click="switchTab('history')">历史</div>
    </div>

    <div class="panel-content" v-show="activeTab === 'image'">
      <div class="panel-section">
        <div class="panel-section-title">图像信息</div>
        <div class="panel-row">
          <span class="panel-label">文件名</span>
          <span class="panel-label">{{ imageInfo.name || '-' }}</span>
        </div>
        <div class="panel-row">
          <span class="panel-label">尺寸</span>
          <span class="panel-label">{{ imageInfo.width || 0 }} × {{ imageInfo.height || 0 }} px</span>
        </div>
        <div class="panel-row">
          <span class="panel-label">文件大小</span>
          <span class="panel-label">{{ fileSize }}</span>
        </div>
        <div class="panel-row">
          <span class="panel-label">格式</span>
          <span class="panel-label">{{ imageFormat }}</span>
        </div>
      </div>
    </div>

    <div class="panel-content" v-show="activeTab === 'tool'">
      <div class="panel-section">
        <div class="panel-section-title">工具属性</div>
        <p class="placeholder">请选择一个工具</p>
      </div>
    </div>

    <div class="panel-content" v-show="activeTab === 'history'">
      <div class="panel-section">
        <div class="panel-section-title">操作历史</div>
        <div class="history-list">
          <div v-for="(item, index) in history" :key="index" class="history-item">
            <span>{{ item.action }}</span>
            <span>{{ formatTime(item.timestamp) }}</span>
          </div>
          <p v-if="history.length === 0" class="placeholder">暂无操作记录</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PropertiesPanel',
  data() {
    return {
      activeTab: 'image'
    }
  },
  computed: {
    ...mapState('image', ['imageInfo']),
    ...mapState('history', ['history']),
    fileSize() {
      const bytes = this.imageInfo.size || 0
      if (bytes === 0) return '0 B'
      const k = 1024
      const sizes = ['B', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    },
    imageFormat() {
      const type = this.imageInfo.type || ''
      return type.split('/')[1]?.toUpperCase() || '未知'
    }
  },
  methods: {
    switchTab(tab) {
      this.activeTab = tab
    },
    formatTime(timestamp) {
      const date = new Date(timestamp)
      return date.toLocaleTimeString()
    }
  }
}
</script>

<style scoped>
.properties-panel {
  width: 280px;
  background-color: #16213e;
  border-left: 1px solid #0f3460;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.panel-tabs {
  display: flex;
  border-bottom: 1px solid #0f3460;
}

.panel-tab {
  flex: 1;
  padding: 10px 8px;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.panel-tab:hover {
  background-color: #0f3460;
}

.panel-tab.active {
  color: #e94560;
  border-bottom-color: #e94560;
}

.panel-content {
  flex: 1;
}

.panel-section {
  padding: 12px 16px;
  border-bottom: 1px solid #0f3460;
}

.panel-section-title {
  font-size: 12px;
  color: #888;
  margin-bottom: 8px;
}

.panel-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.panel-label {
  font-size: 12px;
  color: #aaa;
}

.placeholder {
  font-size: 12px;
  color: #666;
  text-align: center;
  padding: 20px 0;
}

.history-list {
  max-height: 400px;
  overflow-y: auto;
}

.history-item {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  background-color: #1a1a2e;
  border-radius: 4px;
  margin-bottom: 4px;
  font-size: 12px;
}
</style>