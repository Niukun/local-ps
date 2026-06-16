<template>
  <!-- 左侧工具栏：112px 宽，双列布局 -->
  <div class="tool-bar">
    <!-- 第1行：打开 / 保存 -->
    <button class="tool-btn" title="打开文件" @click="$emit('action', 'openFile')">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/></svg>
      <span class="tool-label">打开</span>
    </button>
    <button class="tool-btn" title="保存 (Ctrl+S)" @click="$emit('action', 'saveFile')">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-4-4zm-5 16a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>
      <span class="tool-label">保存</span>
    </button>
    <div class="tool-divider"></div>

    <!-- 第2行：选择 / 移动 -->
    <button class="tool-btn" :class="{ active: activeTool === 'select' }" title="选择工具 (V)" @click="$emit('switchTool', 'select')">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 2l18 10-7 2-2 7L4 2z"/></svg>
      <span class="tool-label">选择</span>
    </button>
    <button class="tool-btn" :class="{ active: activeTool === 'move' }" title="移动工具 (H)" @click="$emit('switchTool', 'move')">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 6v5h5V7.75L22.25 12 18 16.25V13h-5v5h3.25L12 22.25 7.75 18H11v-5H6v3.25L1.75 12 6 7.75V11h5V6H7.75L12 1.75 16.25 6H13z"/></svg>
      <span class="tool-label">移动</span>
    </button>
    <div class="tool-divider"></div>

    <!-- 第3行：裁剪 / 旋转 -->
    <button class="tool-btn" :class="{ active: activeTool === 'crop' }" title="裁剪工具 (C)" @click="$emit('switchTool', 'crop')">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 15h2V7a2 2 0 0 0-2-2H9v2h8v8zM7 17V1H5v4H1v2h4v10a2 2 0 0 0 2 2h10v4h2v-4h4v-2H7z"/></svg>
      <span class="tool-label">裁剪</span>
    </button>
    <button class="tool-btn" :class="{ active: activeTool === 'rotate' }" title="旋转工具 (R)" @click="$emit('switchTool', 'rotate')">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.68 7.08C17.2 4.6 14.29 3 11 3 6.03 3 2 7.03 2 12s4.03 9 9 9c2.03 0 3.93-.68 5.46-1.85l-1.42-1.42A7.002 7.002 0 0 1 4 12c0-3.87 3.13-7 7-7 2.5 0 4.62 1.37 5.87 3.38L13 12h9V3l-3.32 4.08z"/></svg>
      <span class="tool-label">旋转</span>
    </button>
    <div class="tool-divider"></div>

    <!-- 第4行：放大 / 缩小 -->
    <button class="tool-btn" title="放大 (+)" @click="$emit('action', 'zoomIn')">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><circle cx="7.5" cy="9.5" r="1" fill="none"/></svg>
      <span class="tool-label">放大</span>
    </button>
    <button class="tool-btn" title="缩小 (-)" @click="$emit('action', 'zoomOut')">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7V9z"/></svg>
      <span class="tool-label">缩小</span>
    </button>
    <!-- 第4行续：适配 / 100% -->
    <button class="tool-btn" title="适应窗口 (Ctrl+0)" @click="$emit('action', 'fitWindow')">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 5v4h2V5h4V3H5a2 2 0 0 0-2 2zm2 10H3v4a2 2 0 0 0 2 2h4v-2H5v-4zm14 4h-4v2h4a2 2 0 0 0 2-2v-4h-2v4zm0-16h-4v2h4v4h2V5a2 2 0 0 0-2-2z"/></svg>
      <span class="tool-label">适配</span>
    </button>
    <button class="tool-btn" title="实际大小 (Ctrl+1)" @click="$emit('action', 'actualSize')">
      <span class="tool-icon-text">1:1</span>
      <span class="tool-label">100%</span>
    </button>
    <div class="tool-divider"></div>

    <!-- 第5行：纠偏 / 去黑孔 -->
    <button class="tool-btn" :class="{ active: activeTool === 'correction' }" title="纠偏工具" @click="$emit('switchTool', 'correction')">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
      <span class="tool-label">纠偏</span>
    </button>
    <button class="tool-btn" :class="{ active: activeTool === 'deblack' }" title="去黑孔工具" @click="$emit('switchTool', 'deblack')">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.24 7.76A5.974 5.974 0 0 0 12 6v6l-4.24 4.24A5.99 5.99 0 0 0 12 18c3.31 0 6-2.69 6-6a5.99 5.99 0 0 0-1.76-4.24z"/></svg>
      <span class="tool-label">去黑孔</span>
    </button>
    <!-- 第5行续：抠图 / 调色 -->
    <button class="tool-btn" :class="{ active: activeTool === 'aiCutout' }" title="AI 抠图工具" @click="$emit('switchTool', 'aiCutout')">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
      <span class="tool-label">抠图</span>
    </button>
    <button class="tool-btn" :class="{ active: activeTool === 'colorAdjust' }" title="色彩调整工具" @click="$emit('switchTool', 'colorAdjust')">
      <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg>
      <span class="tool-label">调色</span>
    </button>
    <div class="tool-divider"></div>

    <!-- 第6行：拼接 / 分割 -->
    <button class="tool-btn" :class="{ active: activeTool === 'stitch' }" title="图像拼接工具" @click="$emit('switchTool', 'stitch')">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zM13 3h8v8h-8V3zm0 10h8v8h-8v-8z"/></svg>
      <span class="tool-label">拼接</span>
    </button>
    <button class="tool-btn" :class="{ active: activeTool === 'split' }" title="图像分割工具" @click="$emit('switchTool', 'split')">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
      <span class="tool-label">分割</span>
    </button>
    <div class="tool-divider"></div>

    <!-- 第7行：批量 / 导出 -->
    <button class="tool-btn" title="批量处理" @click="$emit('action', 'batchProcess')">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/></svg>
      <span class="tool-label">批量</span>
    </button>
    <button class="tool-btn" title="导出 (Ctrl+E)" @click="$emit('action', 'exportFile')">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
      <span class="tool-label">导出</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ToolBar',

  props: {
    activeTool: {
      type: String,
      default: 'select'
    }
  }
}
</script>

<style lang="scss" scoped>
.tool-bar {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-content: start;
  width: 112px;
  min-width: 112px;
  padding: 6px 0;
  background-color: #f5f5f5;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
  user-select: none;
  flex-shrink: 0;

  .tool-divider {
    grid-column: 1 / -1;
    width: calc(100% - 16px);
    height: 1px;
    margin: 3px 8px;
    background-color: #e0e0e0;
  }

  .tool-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 44px;
    margin: 2px 0;
    padding: 2px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: #666;
    cursor: pointer;
    transition: all 0.15s ease;

    svg {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }

    &:hover {
      background-color: #e8e8e8;
      color: #333;
    }

    &.active {
      background-color: #d4e4f7;
      color: #1890ff;
    }

    .tool-label {
      margin-top: 2px;
      font-size: 10px;
      line-height: 1;
    }

    .tool-icon-text {
      font-size: 12px;
      font-weight: 700;
      line-height: 1;
      margin-bottom: 2px;
    }
  }
}
</style>
