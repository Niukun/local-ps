<template>
  <!-- 文件列表面板：可折叠，显示缩略图、文件名、尺寸、大小 -->
  <div class="file-list-panel" :class="{ collapsed: isCollapsed }">
    <div class="panel-header">
      <span class="panel-title" v-if="!isCollapsed">文件列表 ({{ files.length }})</span>
      <button class="collapse-btn" @click="isCollapsed = !isCollapsed" :title="isCollapsed ? '展开' : '折叠'">
        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"
          :style="{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>
    </div>

    <div v-show="!isCollapsed" class="panel-body">
      <div
        v-for="file in files"
        :key="file.id"
        class="file-item"
        :class="{ active: file.id === activeFileId }"
        @click="$emit('selectFile', file.id)"
      >
        <img
          v-if="file.thumbnail"
          :src="file.thumbnail"
          class="file-thumbnail"
          alt="缩略图"
        />
        <div v-else class="file-thumbnail file-thumbnail-placeholder">
          <svg viewBox="0 0 24 24" fill="#ccc" width="20" height="20">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="10" cy="9" r="2" />
            <path d="M3 16l5-4 3 3 5-4 5 6" />
          </svg>
        </div>

        <div class="file-info">
          <span class="file-name" :title="file.name">{{ file.name }}</span>
          <span class="file-detail">
            {{ file.dimensions.width }}×{{ file.dimensions.height }}
          </span>
        </div>

        <button
          class="file-close"
          title="关闭文件"
          @click.stop="$emit('removeFile', file.id)"
        >
          ×
        </button>
      </div>

      <div v-if="files.length === 0" class="panel-empty">
        暂无文件
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileList',

  props: {
    files: {
      type: Array,
      default: () => []
    },

    activeFileId: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      isCollapsed: false
    }
  }
}
</script>

<style lang="scss" scoped>
.file-list-panel {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-right: 1px solid #e0e0e0;
  overflow: hidden;

  &.collapsed {
    width: 30px;
  }

  &:not(.collapsed) {
    width: 220px;
    min-width: 220px;
  }

  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px;
    border-bottom: 1px solid #e8e8e8;
    background-color: #fafafa;
    flex-shrink: 0;

    .panel-title {
      font-size: 13px;
      font-weight: 600;
      color: #333;
    }

    .collapse-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      border: none;
      border-radius: 3px;
      background: transparent;
      color: #999;
      cursor: pointer;
      flex-shrink: 0;

      &:hover {
        background-color: #e8e8e8;
        color: #333;
      }
    }
  }

  .panel-body {
    flex: 1;
    overflow-y: auto;
  }

  .file-item {
    display: flex;
    align-items: center;
    padding: 6px 8px;
    cursor: pointer;
    border-bottom: 1px solid #f5f5f5;
    transition: background-color 0.1s;
    position: relative;

    &:hover {
      background-color: #f5f5f5;

      .file-close {
        opacity: 1;
      }
    }

    &.active {
      background-color: #e6f7ff;
      border-left: 3px solid #1890ff;
      padding-left: 5px;
    }

    .file-thumbnail {
      width: 36px;
      height: 36px;
      border-radius: 3px;
      object-fit: cover;
      flex-shrink: 0;

      &.file-thumbnail-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f0f0f0;
      }
    }

    .file-info {
      flex: 1;
      margin-left: 8px;
      overflow: hidden;
      min-width: 0;

      .file-name {
        display: block;
        font-size: 12px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .file-detail {
        display: block;
        margin-top: 2px;
        font-size: 11px;
        color: #999;
      }
    }

    .file-close {
      opacity: 0;
      width: 20px;
      height: 20px;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: #999;
      font-size: 14px;
      cursor: pointer;
      flex-shrink: 0;
      transition: opacity 0.15s;

      &:hover {
        background-color: #ff4d4f;
        color: #fff;
      }
    }
  }

  .panel-empty {
    padding: 20px;
    text-align: center;
    color: #ccc;
    font-size: 13px;
  }
}
</style>
