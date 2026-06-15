<template>
  <div id="app">
    <div class="menu-bar-container">
      <MenuBar />
    </div>
    <div class="main-container">
      <Sidebar />
      <div class="preview-area">
        <div class="canvas-container">
          <div class="canvas-placeholder" v-if="!currentImage">
            <svg viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
            <p>拖拽图片到此处打开</p>
            <p class="hint">支持 JPG、PNG 格式，最大 50MB</p>
          </div>
          <canvas ref="mainCanvas" v-show="currentImage"></canvas>
        </div>
      </div>
      <PropertiesPanel />
    </div>
    <div class="status-bar-container">
      <StatusBar />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MenuBar from './components/layout/MenuBar.vue'
import Sidebar from './components/layout/Sidebar.vue'
import StatusBar from './components/layout/StatusBar.vue'
import PropertiesPanel from './components/layout/PropertiesPanel.vue'

export default {
  name: 'App',
  components: {
    MenuBar,
    Sidebar,
    StatusBar,
    PropertiesPanel
  },
  computed: {
    ...mapState('image', ['currentImage'])
  },
  mounted() {
    this.setupDragAndDrop()
  },
  methods: {
    setupDragAndDrop() {
      const previewArea = document.querySelector('.preview-area')
      if (previewArea) {
        previewArea.addEventListener('dragover', (e) => {
          e.preventDefault()
          e.stopPropagation()
        })
        previewArea.addEventListener('drop', (e) => {
          e.preventDefault()
          e.stopPropagation()
          const files = e.dataTransfer.files
          if (files.length > 0) {
            const file = files[0]
            if (file.type === 'image/jpeg' || file.type === 'image/png') {
              this.$store.dispatch('image/loadImage', file)
            }
          }
        })
      }
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Microsoft YaHei', Arial, sans-serif;
  background-color: #1a1a2e;
  color: #eaeaea;
  overflow: hidden;
  height: 100vh;
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.menu-bar-container {
  height: 36px;
  flex-shrink: 0;
}

.main-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.preview-area {
  flex: 1;
  background-color: #1a1a2e;
  position: relative;
  overflow: hidden;
}

.canvas-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.canvas-placeholder {
  width: 80%;
  height: 80%;
  border: 2px dashed #0f3460;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
}

.canvas-placeholder svg {
  width: 64px;
  height: 64px;
  fill: #0f3460;
  margin-bottom: 16px;
}

.canvas-placeholder p {
  font-size: 14px;
  margin-bottom: 8px;
}

.canvas-placeholder .hint {
  font-size: 12px;
  color: #555;
}

.status-bar-container {
  height: 28px;
  flex-shrink: 0;
}
</style>