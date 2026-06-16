<template>
  <!-- 右侧属性面板：280px -->
  <div class="property-panel">
    <!-- 标签页切换 -->
    <div class="panel-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-btn"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="panel-content">
      <!-- 图像信息 -->
      <div v-show="activeTab === 'image'" class="tab-content">
        <template v-if="fileInfo">
          <div class="info-item">
            <span class="info-label">文件名</span>
            <span class="info-value" :title="fileInfo.name">{{ fileInfo.name }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">格式</span>
            <span class="info-value">{{ fileInfo.format.toUpperCase() }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">尺寸</span>
            <span class="info-value">{{ fileInfo.dimensions.width }} × {{ fileInfo.dimensions.height }} px</span>
          </div>
          <div class="info-item">
            <span class="info-label">大小</span>
            <span class="info-value">{{ formattedSize }}</span>
          </div>
        </template>
        <div v-else class="panel-empty">请先打开图片文件</div>
      </div>

      <!-- 工具属性 - 根据当前工具动态渲染 -->
      <div v-show="activeTab === 'tools'" class="tab-content">
        <slot name="toolProperties"></slot>
        <div v-if="!activeTool || activeTool === 'select'" class="panel-empty">请选择工具</div>
      </div>

      <!-- 操作历史 -->
      <div v-show="activeTab === 'history'" class="tab-content">
        <template v-if="historyList.length > 0">
          <div
            v-for="(item, idx) in historyList"
            :key="idx"
            class="history-item"
            :class="{ 'is-current': item.isCurrent }"
          >
            <span class="history-index">{{ historyList.length - idx }}.</span>
            <span class="history-name">{{ item.label }}</span>
          </div>
        </template>
        <div v-else class="panel-empty">暂无操作记录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatFileSize } from '@/utils/fileUtils'

export default {
  name: 'PropertyPanel',

  props: {
    fileInfo: {
      type: Object,
      default: null
    },

    activeTool: {
      type: String,
      default: 'select'
    },

    historyList: {
      type: Array,
      default: () => []
    },

    defaultTab: {
      type: String,
      default: 'image'
    }
  },

  data() {
    return {
      activeTab: this.defaultTab,
      tabs: [
        { key: 'image', label: '图像' },
        { key: 'tools', label: '工具' },
        { key: 'history', label: '历史' }
      ]
    }
  },

  computed: {
    formattedSize() {
      return this.fileInfo ? formatFileSize(this.fileInfo.size) : ''
    }
  },

  watch: {
    activeTool(val) {
      // 切换到工具时自动切到工具标签页
      if (val && val !== 'select') {
        this.activeTab = 'tools'
      }
    },

    defaultTab(val) {
      this.activeTab = val
    }
  }
}
</script>

<style lang="scss" scoped>
.property-panel {
  display: flex;
  flex-direction: column;
  width: 280px;
  min-width: 280px;
  background-color: #fafafa;
  border-left: 1px solid #e0e0e0;
  overflow: hidden;
  flex-shrink: 0;

  .panel-tabs {
    display: flex;
    border-bottom: 1px solid #e0e0e0;
    flex-shrink: 0;

    .tab-btn {
      flex: 1;
      padding: 8px 4px;
      border: none;
      border-bottom: 2px solid transparent;
      background: transparent;
      color: #666;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.15s;

      &:hover {
        color: #333;
      }

      &.active {
        color: #1890ff;
        border-bottom-color: #1890ff;
      }
    }
  }

  .panel-content {
    flex: 1;
    overflow-y: auto;
    padding: 12px;
  }

  .panel-empty {
    padding: 24px 0;
    text-align: center;
    color: #ccc;
    font-size: 13px;
  }

  .info-item {
    display: flex;
    align-items: center;
    padding: 6px 0;
    font-size: 13px;

    &:not(:last-child) {
      border-bottom: 1px solid #f0f0f0;
    }

    .info-label {
      width: 56px;
      color: #999;
      flex-shrink: 0;
    }

    .info-value {
      flex: 1;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .history-item {
    display: flex;
    align-items: center;
    padding: 5px 8px;
    font-size: 12px;
    border-radius: 3px;

    &.is-current {
      background-color: #e6f7ff;
      color: #1890ff;
    }

    &:not(.is-current) {
      color: #999;
    }

    .history-index {
      width: 24px;
      flex-shrink: 0;
    }

    .history-name {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
