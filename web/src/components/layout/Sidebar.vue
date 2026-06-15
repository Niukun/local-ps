<template>
  <div class="sidebar">
    <div class="tool-group">
      <div class="tool-group-title">文件</div>
      <div class="tool-btn" @click="openFile" title="打开文件">
        <svg viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/></svg>
        <span class="tooltip">打开文件</span>
      </div>
      <div class="tool-btn" @click="saveFile" title="保存">
        <svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
        <span class="tooltip">保存</span>
      </div>
      <div class="tool-btn" @click="exportFile" title="导出">
        <svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
        <span class="tooltip">导出</span>
      </div>
    </div>

    <div class="separator"></div>

    <div class="tool-group">
      <div class="tool-group-title">选择</div>
      <div class="tool-btn" :class="{ active: activeTool === 'select' }" @click="setActiveTool('select')" title="选择工具">
        <svg viewBox="0 0 24 24"><path d="M7 2l12 11.5-5.5 1.5 3.5 7-2 1-3.5-7L7 18.5V2z"/></svg>
        <span class="tooltip">选择</span>
      </div>
      <div class="tool-btn" :class="{ active: activeTool === 'move' }" @click="setActiveTool('move')" title="移动画布">
        <svg viewBox="0 0 24 24"><path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"/></svg>
        <span class="tooltip">移动</span>
      </div>
    </div>

    <div class="separator"></div>

    <div class="tool-group">
      <div class="tool-group-title">裁剪</div>
      <div class="tool-btn" :class="{ active: activeTool === 'crop' }" @click="setActiveTool('crop')" title="裁剪">
        <svg viewBox="0 0 24 24"><path d="M17 15h2V7c0-1.1-.9-2-2-2H9v2h8v8zM7 17V1H5v4H1v2h4v10c0 1.1.9 2 2 2h10v4h2v-4h4v-2H7z"/></svg>
        <span class="tooltip">裁剪</span>
      </div>
    </div>

    <div class="separator"></div>

    <div class="tool-group">
      <div class="tool-group-title">旋转</div>
      <div class="tool-btn" @click="rotateLeft" title="左旋90°">
        <svg viewBox="0 0 24 24"><path d="M7.11 8.53L5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03L7.1 18.32zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z"/></svg>
        <span class="tooltip">左旋90°</span>
      </div>
      <div class="tool-btn" @click="rotateRight" title="右旋90°">
        <svg viewBox="0 0 24 24"><path d="M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z"/></svg>
        <span class="tooltip">右旋90°</span>
      </div>
      <div class="tool-btn" :class="{ active: activeTool === 'rotate' }" @click="setActiveTool('rotate')" title="任意旋转">
        <svg viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>
        <span class="tooltip">任意旋转</span>
      </div>
    </div>

    <div class="separator"></div>

    <div class="tool-group">
      <div class="tool-group-title">缩放</div>
      <div class="tool-btn" @click="zoomIn" title="放大">
        <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/></svg>
        <span class="tooltip">放大</span>
      </div>
      <div class="tool-btn" @click="zoomOut" title="缩小">
        <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"/></svg>
        <span class="tooltip">缩小</span>
      </div>
      <div class="tool-btn" @click="fitToWindow" title="适应窗口">
        <svg viewBox="0 0 24 24"><path d="M3 5v4h2V5h4V3H5c-1.1 0-2 .9-2 2zm2 10H3v4c0 1.1.9 2 2 2h4v-2H5v-4zm14 4h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zm0-16h-4v2h4v4h2V5c0-1.1-.9-2-2-2z"/></svg>
        <span class="tooltip">适应窗口</span>
      </div>
      <div class="tool-btn" @click="actualSize" title="实际大小">
        <svg viewBox="0 0 24 24"><path d="M15 3l2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3h-6zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3v6zm6 12l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6h6zm12-6l-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6v-6z"/></svg>
        <span class="tooltip">实际大小</span>
      </div>
    </div>

    <div class="separator"></div>

    <div class="tool-group">
      <div class="tool-group-title">处理</div>
      <div class="tool-btn" :class="{ active: activeTool === 'correction' }" @click="setActiveTool('correction')" title="纠偏">
        <svg viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
        <span class="tooltip">纠偏</span>
      </div>
      <div class="tool-btn" :class="{ active: activeTool === 'denoise' }" @click="setActiveTool('denoise')" title="去黑孔">
        <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        <span class="tooltip">去黑孔</span>
      </div>
      <div class="tool-btn" :class="{ active: activeTool === 'cutout' }" @click="setActiveTool('cutout')" title="扣照片">
        <svg viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
        <span class="tooltip">扣照片</span>
      </div>
    </div>

    <div class="separator"></div>

    <div class="tool-group">
      <div class="tool-group-title">调整</div>
      <div class="tool-btn" :class="{ active: activeTool === 'adjust' }" @click="setActiveTool('adjust')" title="亮度/对比度">
        <svg viewBox="0 0 24 24"><path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/></svg>
        <span class="tooltip">亮度/对比度</span>
      </div>
      <div class="tool-btn" :class="{ active: activeTool === 'stitch' }" @click="setActiveTool('stitch')" title="图像拼接">
        <svg viewBox="0 0 24 24"><path d="M2 4v16h20V4H2zm4 14H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V8h2v2zm0-4H4V4h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V8h2v2zm0-4H8V4h2v2zm4 12h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2zm0-4h-2V4h2v2zm4 12h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2zm0-4h-2V4h2v2z"/></svg>
        <span class="tooltip">图像拼接</span>
      </div>
      <div class="tool-btn" :class="{ active: activeTool === 'split' }" @click="setActiveTool('split')" title="图像分割">
        <svg viewBox="0 0 24 24"><path d="M3 5v14h18V5H3zm4 2v2H5V7h2zm-2 6v-2h2v2H5zm0 2h2v2H5v-2zm14 2H9v-2h10v2zm0-4H9v-2h10v2zm0-4H9V7h10v2z"/></svg>
        <span class="tooltip">图像分割</span>
      </div>
    </div>

    <div class="separator"></div>

    <div class="tool-group">
      <div class="tool-group-title">辅助</div>
      <div class="tool-btn" @click="undo" title="撤销">
        <svg viewBox="0 0 24 24"><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/></svg>
        <span class="tooltip">撤销 (Ctrl+Z)</span>
      </div>
      <div class="tool-btn" @click="redo" title="恢复">
        <svg viewBox="0 0 24 24"><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"/></svg>
        <span class="tooltip">恢复 (Ctrl+Y)</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AppSidebar',
  computed: {
    ...mapState('tool', ['activeTool'])
  },
  methods: {
    ...mapActions('tool', ['setActiveTool']),
    ...mapActions('history', ['undo', 'redo']),
    openFile() {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/jpeg,image/png'
      input.onchange = (e) => {
        const file = e.target.files[0]
        if (file) {
          this.$store.dispatch('image/loadImage', file)
        }
      }
      input.click()
    },
    saveFile() {
      console.log('Save file')
    },
    exportFile() {
      console.log('Export file')
    },
    rotateLeft() {
      console.log('Rotate left')
    },
    rotateRight() {
      console.log('Rotate right')
    },
    zoomIn() {
      console.log('Zoom in')
    },
    zoomOut() {
      console.log('Zoom out')
    },
    fitToWindow() {
      console.log('Fit to window')
    },
    actualSize() {
      console.log('Actual size')
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 56px;
  background-color: #16213e;
  border-right: 1px solid #0f3460;
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  overflow-y: auto;
}

.tool-group {
  margin-bottom: 8px;
}

.tool-group-title {
  font-size: 10px;
  color: #666;
  text-align: center;
  padding: 4px 0;
  border-bottom: 1px solid #0f3460;
  margin-bottom: 4px;
}

.tool-btn {
  width: 40px;
  height: 40px;
  margin: 2px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.tool-btn:hover {
  background-color: #0f3460;
}

.tool-btn.active {
  background-color: #e94560;
}

.tool-btn svg {
  width: 20px;
  height: 20px;
  fill: #eaeaea;
}

.tool-btn .tooltip {
  position: absolute;
  left: 48px;
  background-color: #333;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  z-index: 100;
}

.tool-btn:hover .tooltip {
  opacity: 1;
}

.separator {
  height: 1px;
  background-color: #0f3460;
  margin: 6px 8px;
}
</style>