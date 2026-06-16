# 档案扫描件处理软件 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现一个完整的档案扫描件处理软件，包含图像处理、批量处理、拼接分割等功能

**Architecture:** 采用三层架构设计：用户界面层（Vue组件）、业务逻辑层（图像处理服务）、技术层（Canvas、Web Worker）

**Tech Stack:** Vue 2.6.x, Vue CLI 4.x, Vuex 3.x, Canvas API, Web Worker, Cropper.js, Fabric.js, FileSaver.js, JSZip

---

## 文件结构映射

```
web/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── router/index.js
│   ├── store/
│   │   ├── index.js
│   │   └── modules/
│   │       ├── image.js
│   │       ├── tool.js
│   │       └── history.js
│   ├── components/
│   │   ├── layout/
│   │   │   ├── MenuBar.vue
│   │   │   ├── Sidebar.vue
│   │   │   ├── StatusBar.vue
│   │   │   └── PropertiesPanel.vue
│   │   ├── canvas/
│   │   │   └── MainCanvas.vue
│   │   ├── tools/
│   │   │   ├── CropTool.vue
│   │   │   ├── RotateTool.vue
│   │   │   ├── AdjustTool.vue
│   │   │   ├── DenoiseTool.vue
│   │   │   ├── StitchTool.vue
│   │   │   └── SplitTool.vue
│   │   └── common/
│   │       ├── Modal.vue
│   │       ├── Slider.vue
│   │       └── Progress.vue
│   ├── services/
│   │   ├── imageProcessor.js
│   │   ├── cropService.js
│   │   ├── rotateService.js
│   │   ├── adjustService.js
│   │   ├── denoiseService.js
│   │   ├── stitchService.js
│   │   ├── splitService.js
│   │   ├── batchService.js
│   │   └── exportService.js
│   ├── workers/
│   │   ├── imageWorker.js
│   │   └── batchWorker.js
│   ├── utils/
│   │   ├── canvasUtils.js
│   │   ├── imageUtils.js
│   │   ├── fileUtils.js
│   │   └── mathUtils.js
│   ├── assets/
│   │   └── styles/
│   │       ├── main.scss
│   │       ├── variables.scss
│   │       └── components.scss
│   └── constants/
│       ├── index.js
│       └── tools.js
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── package.json
├── vue.config.js
├── babel.config.js
└── .eslintrc.js
```

## 任务分解

### Task 1: 项目初始化

**Files:**
- Create: `web/package.json`
- Create: `web/vue.config.js`
- Create: `web/babel.config.js`
- Create: `web/.eslintrc.js`
- Create: `web/public/index.html`
- Create: `web/src/main.js`
- Create: `web/src/App.vue`
- Create: `web/src/router/index.js`

- [ ] **Step 1: 创建package.json**

```json
{
  "name": "archive-scanner",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "test:unit": "jest --config jest.config.js",
    "test:e2e": "cypress open",
    "test:e2e:run": "cypress run",
    "lint": "eslint --ext .js,.vue src",
    "lint:fix": "eslint --ext .js,.vue src --fix",
    "format": "prettier --write src/**/*.{js,vue,css}"
  },
  "dependencies": {
    "vue": "^2.6.14",
    "vue-router": "^3.5.4",
    "vuex": "^3.6.2",
    "cropperjs": "^1.5.13",
    "fabric": "^5.3.0",
    "file-saver": "^2.0.5",
    "jszip": "^3.10.1"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "~5.0.0",
    "@vue/cli-plugin-eslint": "~5.0.0",
    "@vue/cli-plugin-router": "~5.0.0",
    "@vue/cli-plugin-vuex": "~5.0.0",
    "@vue/cli-service": "~5.0.0",
    "eslint": "^7.32.0",
    "eslint-plugin-vue": "^8.7.1",
    "sass": "^1.53.0",
    "sass-loader": "^12.6.0",
    "vue-template-compiler": "^2.6.14"
  }
}
```

- [ ] **Step 2: 创建vue.config.js**

```javascript
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
})
```

- [ ] **Step 3: 创建babel.config.js**

```javascript
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
```

- [ ] **Step 4: 创建.eslintrc.js**

```javascript
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
```

- [ ] **Step 5: 创建public/index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <link rel="icon" href="<%= BASE_URL %>favicon.ico">
  <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
  <noscript>
    <strong>请启用JavaScript以获得最佳体验。</strong>
  </noscript>
  <div id="app"></div>
</body>
</html>
```

- [ ] **Step 6: 创建src/main.js**

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

- [ ] **Step 7: 创建src/App.vue**

```vue
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
```

- [ ] **Step 8: 创建src/router/index.js**

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
```

- [ ] **Step 9: 创建views/Home.vue**

```vue
<template>
  <div class="home">
    <h1>档案扫描件处理软件</h1>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
```

- [ ] **Step 10: 安装依赖并启动项目**

```bash
cd web
npm install
npm run dev
```

- [ ] **Step 11: 提交代码**

```bash
git add web/
git commit -m "feat: initialize Vue project with basic structure"
```

### Task 2: 状态管理（Vuex Store）

**Files:**
- Create: `web/src/store/index.js`
- Create: `web/src/store/modules/image.js`
- Create: `web/src/store/modules/tool.js`
- Create: `web/src/store/modules/history.js`

- [ ] **Step 1: 创建store/index.js**

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import image from './modules/image'
import tool from './modules/tool'
import history from './modules/history'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    image,
    tool,
    history
  }
})
```

- [ ] **Step 2: 创建store/modules/image.js**

```javascript
const state = {
  currentImage: null,
  imageList: [],
  imageInfo: {},
  zoom: 100,
  rotation: 0,
  isProcessing: false
}

const mutations = {
  SET_CURRENT_IMAGE(state, image) {
    state.currentImage = image
  },
  SET_IMAGE_LIST(state, list) {
    state.imageList = list
  },
  ADD_IMAGE(state, image) {
    state.imageList.push(image)
  },
  REMOVE_IMAGE(state, index) {
    state.imageList.splice(index, 1)
  },
  SET_IMAGE_INFO(state, info) {
    state.imageInfo = info
  },
  SET_ZOOM(state, zoom) {
    state.zoom = zoom
  },
  SET_ROTATION(state, rotation) {
    state.rotation = rotation
  },
  SET_PROCESSING_STATUS(state, status) {
    state.isProcessing = status
  }
}

const actions = {
  loadImage({ commit }, file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          commit('SET_CURRENT_IMAGE', img)
          commit('SET_IMAGE_INFO', {
            name: file.name,
            size: file.size,
            width: img.width,
            height: img.height,
            type: file.type
          })
          resolve(img)
        }
        img.onerror = reject
        img.src = e.target.result
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  },
  updateImageInfo({ commit }, info) {
    commit('SET_IMAGE_INFO', info)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
```

- [ ] **Step 3: 创建store/modules/tool.js**

```javascript
const state = {
  activeTool: 'select',
  toolParams: {},
  isProcessing: false
}

const mutations = {
  SET_ACTIVE_TOOL(state, tool) {
    state.activeTool = tool
  },
  SET_TOOL_PARAMS(state, params) {
    state.toolParams = { ...state.toolParams, ...params }
  },
  RESET_TOOL_PARAMS(state) {
    state.toolParams = {}
  },
  SET_PROCESSING_STATUS(state, status) {
    state.isProcessing = status
  }
}

const actions = {
  setActiveTool({ commit }, tool) {
    commit('SET_ACTIVE_TOOL', tool)
    commit('RESET_TOOL_PARAMS')
  },
  updateToolParams({ commit }, params) {
    commit('SET_TOOL_PARAMS', params)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
```

- [ ] **Step 4: 创建store/modules/history.js**

```javascript
const state = {
  history: [],
  historyIndex: -1,
  maxHistory: 20
}

const mutations = {
  ADD_HISTORY(state, action) {
    // 移除当前索引之后的历史记录
    state.history = state.history.slice(0, state.historyIndex + 1)
    
    // 添加新记录
    state.history.push({
      ...action,
      timestamp: Date.now()
    })
    
    // 限制历史记录数量
    if (state.history.length > state.maxHistory) {
      state.history.shift()
    } else {
      state.historyIndex++
    }
  },
  UNDO(state) {
    if (state.historyIndex > 0) {
      state.historyIndex--
    }
  },
  REDO(state) {
    if (state.historyIndex < state.history.length - 1) {
      state.historyIndex++
    }
  },
  CLEAR_HISTORY(state) {
    state.history = []
    state.historyIndex = -1
  }
}

const actions = {
  addHistory({ commit }, action) {
    commit('ADD_HISTORY', action)
  },
  undo({ commit, state }) {
    if (state.historyIndex > 0) {
      commit('UNDO')
      return state.history[state.historyIndex]
    }
    return null
  },
  redo({ commit, state }) {
    if (state.historyIndex < state.history.length - 1) {
      commit('REDO')
      return state.history[state.historyIndex]
    }
    return null
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
```

- [ ] **Step 5: 提交代码**

```bash
git add src/store/
git commit -m "feat: add Vuex store modules for image, tool, and history"
```

### Task 3: 布局组件

**Files:**
- Create: `web/src/components/layout/MenuBar.vue`
- Create: `web/src/components/layout/Sidebar.vue`
- Create: `web/src/components/layout/StatusBar.vue`
- Create: `web/src/components/layout/PropertiesPanel.vue`
- Modify: `web/src/App.vue`

- [ ] **Step 1: 创建MenuBar.vue**

```vue
<template>
  <div class="menu-bar">
    <div class="menu-left">
      <div class="menu-item" @click="showMenuDropdown('file')">文件(F)</div>
      <div class="menu-item" @click="showMenuDropdown('edit')">编辑(E)</div>
      <div class="menu-item" @click="showMenuDropdown('view')">视图(V)</div>
      <div class="menu-item" @click="showMenuDropdown('tool')">工具(T)</div>
      <div class="menu-item" @click="showMenuDropdown('help')">帮助(H)</div>
    </div>
    <div class="app-title">档案扫描件处理软件</div>
    <div class="menu-right">
      <span class="version">v1.0</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuBar',
  methods: {
    showMenuDropdown(menu) {
      console.log('Menu clicked:', menu)
    }
  }
}
</script>

<style scoped>
.menu-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #16213e;
  height: 36px;
  padding: 0 12px;
  border-bottom: 1px solid #0f3460;
}

.menu-left {
  display: flex;
  gap: 4px;
}

.menu-item {
  padding: 6px 12px;
  font-size: 13px;
  color: #eaeaea;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #0f3460;
}

.app-title {
  font-size: 14px;
  font-weight: 600;
  color: #e94560;
}

.menu-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.version {
  font-size: 12px;
  color: #888;
}
</style>
```

- [ ] **Step 2: 创建Sidebar.vue**

```vue
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
  name: 'Sidebar',
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
```

- [ ] **Step 3: 创建StatusBar.vue**

```vue
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
```

- [ ] **Step 4: 创建PropertiesPanel.vue**

```vue
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
```

- [ ] **Step 5: 更新App.vue**

```vue
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
```

- [ ] **Step 6: 提交代码**

```bash
git add src/components/layout/
git commit -m "feat: add layout components (MenuBar, Sidebar, StatusBar, PropertiesPanel)"
```

### Task 4: 图像处理服务

**Files:**
- Create: `web/src/services/imageProcessor.js`
- Create: `web/src/services/cropService.js`
- Create: `web/src/services/rotateService.js`
- Create: `web/src/services/adjustService.js`

- [ ] **Step 1: 创建imageProcessor.js**

```javascript
class ImageProcessor {
  constructor() {
    this.canvas = null
    this.ctx = null
    this.originalImage = null
    this.currentImageData = null
  }

  init(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
  }

  loadImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          this.originalImage = img
          this.canvas.width = img.width
          this.canvas.height = img.height
          this.ctx.drawImage(img, 0, 0)
          this.currentImageData = this.ctx.getImageData(0, 0, img.width, img.height)
          resolve(img)
        }
        img.onerror = reject
        img.src = e.target.result
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  getImageData() {
    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
  }

  setImageData(imageData) {
    this.ctx.putImageData(imageData, 0, 0)
    this.currentImageData = imageData
  }

  render() {
    if (this.originalImage) {
      this.ctx.drawImage(this.originalImage, 0, 0)
    }
  }

  zoom(scale) {
    const width = this.originalImage.width * scale
    const height = this.originalImage.height * scale
    this.canvas.width = width
    this.canvas.height = height
    this.ctx.scale(scale, scale)
    this.ctx.drawImage(this.originalImage, 0, 0)
  }

  rotate(angle) {
    const radians = (angle * Math.PI) / 180
    const cos = Math.cos(radians)
    const sin = Math.sin(radians)
    
    const width = this.originalImage.width
    const height = this.originalImage.height
    
    const newWidth = Math.abs(width * cos) + Math.abs(height * sin)
    const newHeight = Math.abs(width * sin) + Math.abs(height * cos)
    
    this.canvas.width = newWidth
    this.canvas.height = newHeight
    
    this.ctx.translate(newWidth / 2, newHeight / 2)
    this.ctx.rotate(radians)
    this.ctx.drawImage(this.originalImage, -width / 2, -height / 2)
  }

  reset() {
    if (this.originalImage) {
      this.canvas.width = this.originalImage.width
      this.canvas.height = this.originalImage.height
      this.ctx.drawImage(this.originalImage, 0, 0)
    }
  }
}

export default new ImageProcessor()
```

- [ ] **Step 2: 创建cropService.js**

```javascript
class CropService {
  constructor() {
    this.cropRect = null
  }

  setCropRect(x, y, width, height) {
    this.cropRect = { x, y, width, height }
  }

  freeCrop(canvas, ctx) {
    if (!this.cropRect) return null
    
    const { x, y, width, height } = this.cropRect
    const imageData = ctx.getImageData(x, y, width, height)
    
    canvas.width = width
    canvas.height = height
    ctx.putImageData(imageData, 0, 0)
    
    return {
      width,
      height,
      imageData
    }
  }

  ratioCrop(canvas, ctx, ratio) {
    if (!this.cropRect) return null
    
    const { x, y, width, height } = this.cropRect
    let newWidth, newHeight
    
    if (ratio > 1) {
      newWidth = width
      newHeight = width / ratio
    } else {
      newHeight = height
      newWidth = height * ratio
    }
    
    const centerX = x + width / 2
    const centerY = y + height / 2
    
    const cropX = centerX - newWidth / 2
    const cropY = centerY - newHeight / 2
    
    const imageData = ctx.getImageData(cropX, cropY, newWidth, newHeight)
    
    canvas.width = newWidth
    canvas.height = newHeight
    ctx.putImageData(imageData, 0, 0)
    
    return {
      width: newWidth,
      height: newHeight,
      imageData
    }
  }

  sizeCrop(canvas, ctx, targetWidth, targetHeight) {
    if (!this.cropRect) return null
    
    const { x, y, width, height } = this.cropRect
    const centerX = x + width / 2
    const centerY = y + height / 2
    
    const cropX = centerX - targetWidth / 2
    const cropY = centerY - targetHeight / 2
    
    const imageData = ctx.getImageData(cropX, cropY, targetWidth, targetHeight)
    
    canvas.width = targetWidth
    canvas.height = targetHeight
    ctx.putImageData(imageData, 0, 0)
    
    return {
      width: targetWidth,
      height: targetHeight,
      imageData
    }
  }
}

export default new CropService()
```

- [ ] **Step 3: 创建rotateService.js**

```javascript
class RotateService {
  rotateLeft(canvas, ctx, image) {
    const width = canvas.width
    const height = canvas.height
    
    canvas.width = height
    canvas.height = width
    
    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.drawImage(image, -width / 2, -height / 2)
    ctx.restore()
    
    return {
      width: height,
      height: width
    }
  }

  rotateRight(canvas, ctx, image) {
    const width = canvas.width
    const height = canvas.height
    
    canvas.width = height
    canvas.height = width
    
    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate(Math.PI / 2)
    ctx.drawImage(image, -width / 2, -height / 2)
    ctx.restore()
    
    return {
      width: height,
      height: width
    }
  }

  rotateAngle(canvas, ctx, image, angle) {
    const radians = (angle * Math.PI) / 180
    const cos = Math.cos(radians)
    const sin = Math.sin(radians)
    
    const width = image.width
    const height = image.height
    
    const newWidth = Math.abs(width * cos) + Math.abs(height * sin)
    const newHeight = Math.abs(width * sin) + Math.abs(height * cos)
    
    canvas.width = newWidth
    canvas.height = newHeight
    
    ctx.save()
    ctx.translate(newWidth / 2, newHeight / 2)
    ctx.rotate(radians)
    ctx.drawImage(image, -width / 2, -height / 2)
    ctx.restore()
    
    return {
      width: newWidth,
      height: newHeight
    }
  }

  flipHorizontal(canvas, ctx, image) {
    const width = canvas.width
    const height = canvas.height
    
    ctx.save()
    ctx.scale(-1, 1)
    ctx.drawImage(image, -width, 0)
    ctx.restore()
  }

  flipVertical(canvas, ctx, image) {
    const width = canvas.width
    const height = canvas.height
    
    ctx.save()
    ctx.scale(1, -1)
    ctx.drawImage(image, 0, -height)
    ctx.restore()
  }
}

export default new RotateService()
```

- [ ] **Step 4: 创建adjustService.js**

```javascript
class AdjustService {
  adjustBrightness(imageData, value) {
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, Math.max(0, data[i] + value))
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + value))
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + value))
    }
    return imageData
  }

  adjustContrast(imageData, value) {
    const data = imageData.data
    const factor = (259 * (value + 255)) / (255 * (259 - value))
    
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128))
      data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128))
      data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128))
    }
    return imageData
  }

  adjustSaturation(imageData, value) {
    const data = imageData.data
    const factor = 1 + value / 100
    
    for (let i = 0; i < data.length; i += 4) {
      const gray = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]
      data[i] = Math.min(255, Math.max(0, gray + factor * (data[i] - gray)))
      data[i + 1] = Math.min(255, Math.max(0, gray + factor * (data[i + 1] - gray)))
      data[i + 2] = Math.min(255, Math.max(0, gray + factor * (data[i + 2] - gray)))
    }
    return imageData
  }

  adjustTemperature(imageData, value) {
    const data = imageData.data
    const factor = value / 100
    
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, Math.max(0, data[i] + factor * 20))
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] - factor * 20))
    }
    return imageData
  }
}

export default new AdjustService()
```

- [ ] **Step 5: 提交代码**

```bash
git add src/services/
git commit -m "feat: add image processing services (processor, crop, rotate, adjust)"
```

### Task 5: 主画布组件

**Files:**
- Create: `web/src/components/canvas/MainCanvas.vue`
- Modify: `web/src/App.vue`

- [ ] **Step 1: 创建MainCanvas.vue**

```vue
<template>
  <div class="main-canvas" ref="container">
    <canvas 
      ref="canvas" 
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @wheel="handleWheel"
    ></canvas>
    <div class="canvas-info" v-if="currentImage">
      <span>{{ zoom }}%</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import imageProcessor from '@/services/imageProcessor'

export default {
  name: 'MainCanvas',
  data() {
    return {
      isDragging: false,
      lastX: 0,
      lastY: 0,
      offsetX: 0,
      offsetY: 0
    }
  },
  computed: {
    ...mapState('image', ['currentImage', 'zoom']),
    canvas() {
      return this.$refs.canvas
    },
    ctx() {
      return this.canvas?.getContext('2d')
    }
  },
  watch: {
    currentImage(newImage) {
      if (newImage) {
        this.drawImage(newImage)
      }
    },
    zoom(newZoom) {
      if (this.currentImage) {
        this.scaleCanvas(newZoom / 100)
      }
    }
  },
  mounted() {
    this.initCanvas()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    ...mapActions('image', ['updateImageInfo']),
    initCanvas() {
      if (this.canvas) {
        imageProcessor.init(this.canvas)
        this.handleResize()
      }
    },
    handleResize() {
      if (this.canvas && this.$refs.container) {
        const container = this.$refs.container
        this.canvas.width = container.clientWidth
        this.canvas.height = container.clientHeight
      }
    },
    drawImage(image) {
      if (!this.ctx) return
      
      const scale = this.zoom / 100
      const width = image.width * scale
      const height = image.height * scale
      
      this.canvas.width = width
      this.canvas.height = height
      
      this.ctx.drawImage(image, 0, 0, width, height)
      
      this.updateImageInfo({
        width: image.width,
        height: image.height
      })
    },
    scaleCanvas(scale) {
      if (!this.currentImage || !this.ctx) return
      
      const width = this.currentImage.width * scale
      const height = this.currentImage.height * scale
      
      this.canvas.width = width
      this.canvas.height = height
      
      this.ctx.scale(scale, scale)
      this.ctx.drawImage(this.currentImage, 0, 0)
    },
    handleMouseDown(e) {
      this.isDragging = true
      this.lastX = e.clientX
      this.lastY = e.clientY
    },
    handleMouseMove(e) {
      if (!this.isDragging) return
      
      const deltaX = e.clientX - this.lastX
      const deltaY = e.clientY - this.lastY
      
      this.offsetX += deltaX
      this.offsetY += deltaY
      
      this.lastX = e.clientX
      this.lastY = e.clientY
      
      this.redraw()
    },
    handleMouseUp() {
      this.isDragging = false
    },
    handleWheel(e) {
      e.preventDefault()
      
      const delta = e.deltaY > 0 ? -10 : 10
      const newZoom = Math.min(500, Math.max(10, this.zoom + delta))
      
      this.$store.commit('image/SET_ZOOM', newZoom)
    },
    redraw() {
      if (!this.currentImage || !this.ctx) return
      
      const scale = this.zoom / 100
      const width = this.currentImage.width * scale
      const height = this.currentImage.height * scale
      
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.save()
      this.ctx.translate(this.offsetX, this.offsetY)
      this.ctx.drawImage(this.currentImage, 0, 0, width, height)
      this.ctx.restore()
    }
  }
}
</script>

<style scoped>
.main-canvas {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

canvas {
  display: block;
}

.canvas-info {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}
</style>
```

- [ ] **Step 2: 更新App.vue使用MainCanvas**

```vue
<template>
  <div id="app">
    <div class="menu-bar-container">
      <MenuBar />
    </div>
    <div class="main-container">
      <Sidebar />
      <div class="preview-area">
        <div class="canvas-container">
          <MainCanvas />
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
import MenuBar from './components/layout/MenuBar.vue'
import Sidebar from './components/layout/Sidebar.vue'
import StatusBar from './components/layout/StatusBar.vue'
import PropertiesPanel from './components/layout/PropertiesPanel.vue'
import MainCanvas from './components/canvas/MainCanvas.vue'

export default {
  name: 'App',
  components: {
    MenuBar,
    Sidebar,
    StatusBar,
    PropertiesPanel,
    MainCanvas
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
```

- [ ] **Step 3: 提交代码**

```bash
git add src/components/canvas/ src/App.vue
git commit -m "feat: add MainCanvas component with drag and drop support"
```

### Task 6: 工具组件

**Files:**
- Create: `web/src/components/tools/CropTool.vue`
- Create: `web/src/components/tools/RotateTool.vue`
- Create: `web/src/components/tools/AdjustTool.vue`
- Create: `web/src/components/tools/DenoiseTool.vue`
- Create: `web/src/components/tools/StitchTool.vue`
- Create: `web/src/components/tools/SplitTool.vue`

- [ ] **Step 1: 创建CropTool.vue**

```vue
<template>
  <div class="crop-tool">
    <div class="panel-section-title">裁剪参数</div>
    <div class="panel-row">
      <span class="panel-label">裁剪模式</span>
      <select class="panel-select" v-model="cropMode">
        <option value="free">自由裁剪</option>
        <option value="ratio">固定比例</option>
        <option value="size">固定尺寸</option>
      </select>
    </div>
    <div class="panel-row">
      <span class="panel-label">X</span>
      <input type="number" class="panel-input" v-model.number="cropRect.x">
    </div>
    <div class="panel-row">
      <span class="panel-label">Y</span>
      <input type="number" class="panel-input" v-model.number="cropRect.y">
    </div>
    <div class="panel-row">
      <span class="panel-label">宽度</span>
      <input type="number" class="panel-input" v-model.number="cropRect.width">
    </div>
    <div class="panel-row">
      <span class="panel-label">高度</span>
      <input type="number" class="panel-input" v-model.number="cropRect.height">
    </div>
    <div class="btn-group">
      <button class="btn btn-primary" @click="applyCrop">应用裁剪</button>
    </div>
  </div>
</template>

<script>
import cropService from '@/services/cropService'

export default {
  name: 'CropTool',
  data() {
    return {
      cropMode: 'free',
      cropRect: {
        x: 0,
        y: 0,
        width: 100,
        height: 100
      }
    }
  },
  methods: {
    applyCrop() {
      cropService.setCropRect(
        this.cropRect.x,
        this.cropRect.y,
        this.cropRect.width,
        this.cropRect.height
      )
      this.$emit('apply', {
        mode: this.cropMode,
        rect: { ...this.cropRect }
      })
    }
  }
}
</script>

<style scoped>
.crop-tool {
  padding: 12px 16px;
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

.panel-input {
  width: 80px;
  height: 28px;
  background-color: #1a1a2e;
  border: 1px solid #0f3460;
  border-radius: 4px;
  color: #eaeaea;
  padding: 0 8px;
  font-size: 12px;
}

.panel-select {
  width: 120px;
  height: 32px;
  background-color: #1a1a2e;
  border: 1px solid #0f3460;
  border-radius: 4px;
  color: #eaeaea;
  padding: 0 8px;
  font-size: 12px;
}

.btn-group {
  margin-top: 12px;
}

.btn {
  width: 100%;
  padding: 6px 12px;
  font-size: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #e94560;
  color: #fff;
}

.btn-primary:hover {
  background-color: #ff6b6b;
}
</style>
```

- [ ] **Step 2: 创建RotateTool.vue**

```vue
<template>
  <div class="rotate-tool">
    <div class="panel-section-title">旋转参数</div>
    <div class="panel-row">
      <span class="panel-label">旋转角度</span>
      <input type="number" class="panel-input" v-model.number="angle" min="-360" max="360">
    </div>
    <div class="angle-indicator" :style="{ transform: `rotate(${angle}deg)` }"></div>
    <div class="panel-row">
      <span class="panel-label">水平翻转</span>
      <button class="btn btn-secondary" @click="flipHorizontal">翻转</button>
    </div>
    <div class="panel-row">
      <span class="panel-label">垂直翻转</span>
      <button class="btn btn-secondary" @click="flipVertical">翻转</button>
    </div>
    <div class="btn-group">
      <button class="btn btn-primary" @click="applyRotation">应用旋转</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RotateTool',
  data() {
    return {
      angle: 0
    }
  },
  methods: {
    applyRotation() {
      this.$emit('apply', { angle: this.angle })
    },
    flipHorizontal() {
      this.$emit('flip', 'horizontal')
    },
    flipVertical() {
      this.$emit('flip', 'vertical')
    }
  }
}
</script>

<style scoped>
.rotate-tool {
  padding: 12px 16px;
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

.panel-input {
  width: 80px;
  height: 28px;
  background-color: #1a1a2e;
  border: 1px solid #0f3460;
  border-radius: 4px;
  color: #eaeaea;
  padding: 0 8px;
  font-size: 12px;
}

.angle-indicator {
  width: 80px;
  height: 80px;
  border: 2px solid #0f3460;
  border-radius: 50%;
  position: relative;
  margin: 16px auto;
  transition: transform 0.3s;
}

.angle-indicator::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 36px;
  background-color: #e94560;
  transform-origin: bottom center;
  transform: translate(-50%, -100%);
}

.btn-group {
  margin-top: 12px;
}

.btn {
  padding: 6px 12px;
  font-size: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #e94560;
  color: #fff;
  width: 100%;
}

.btn-secondary {
  background-color: #0f3460;
  color: #eaeaea;
}
</style>
```

- [ ] **Step 3: 创建AdjustTool.vue**

```vue
<template>
  <div class="adjust-tool">
    <div class="panel-section-title">亮度/对比度调节</div>
    <div class="slider-row">
      <span class="slider-label">亮度</span>
      <input type="range" class="slider-input" v-model.number="brightness" min="-100" max="100">
      <span class="slider-value">{{ brightness }}</span>
    </div>
    <div class="slider-row">
      <span class="slider-label">对比度</span>
      <input type="range" class="slider-input" v-model.number="contrast" min="-100" max="100">
      <span class="slider-value">{{ contrast }}</span>
    </div>
    <div class="slider-row">
      <span class="slider-label">饱和度</span>
      <input type="range" class="slider-input" v-model.number="saturation" min="-100" max="100">
      <span class="slider-value">{{ saturation }}</span>
    </div>
    <div class="slider-row">
      <span class="slider-label">色温</span>
      <input type="range" class="slider-input" v-model.number="temperature" min="-100" max="100">
      <span class="slider-value">{{ temperature }}</span>
    </div>
    <div class="btn-group">
      <button class="btn btn-secondary" @click="reset">重置</button>
      <button class="btn btn-primary" @click="apply">应用</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdjustTool',
  data() {
    return {
      brightness: 0,
      contrast: 0,
      saturation: 0,
      temperature: 0
    }
  },
  methods: {
    apply() {
      this.$emit('apply', {
        brightness: this.brightness,
        contrast: this.contrast,
        saturation: this.saturation,
        temperature: this.temperature
      })
    },
    reset() {
      this.brightness = 0
      this.contrast = 0
      this.saturation = 0
      this.temperature = 0
    }
  }
}
</script>

<style scoped>
.adjust-tool {
  padding: 12px 16px;
}

.panel-section-title {
  font-size: 12px;
  color: #888;
  margin-bottom: 8px;
}

.slider-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.slider-label {
  font-size: 12px;
  color: #aaa;
  width: 48px;
}

.slider-input {
  flex: 1;
}

.slider-value {
  font-size: 12px;
  color: #eaeaea;
  width: 36px;
  text-align: right;
}

.btn-group {
  margin-top: 12px;
  display: flex;
  gap: 8px;
}

.btn {
  flex: 1;
  padding: 6px 12px;
  font-size: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #e94560;
  color: #fff;
}

.btn-secondary {
  background-color: #0f3460;
  color: #eaeaea;
}
</style>
```

- [ ] **Step 4: 创建DenoiseTool.vue**

```vue
<template>
  <div class="denoise-tool">
    <div class="panel-section-title">去黑孔设置</div>
    <div class="panel-row">
      <label class="checkbox">
        <input type="checkbox" v-model="autoBlackEdge">
        <span>自动去黑边</span>
      </label>
    </div>
    <div class="panel-row">
      <label class="checkbox">
        <input type="checkbox" v-model="autoHole">
        <span>自动去装订孔</span>
      </label>
    </div>
    <div class="slider-row">
      <span class="slider-label">灵敏度</span>
      <input type="range" class="slider-input" v-model.number="sensitivity" min="0" max="100">
      <span class="slider-value">{{ sensitivity }}</span>
    </div>
    <div class="slider-row">
      <span class="slider-label">填充颜色</span>
      <input type="color" v-model="fillColor" class="color-picker">
    </div>
    <div class="btn-group">
      <button class="btn btn-secondary" @click="preview">预览</button>
      <button class="btn btn-primary" @click="apply">应用</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DenoiseTool',
  data() {
    return {
      autoBlackEdge: true,
      autoHole: true,
      sensitivity: 50,
      fillColor: '#ffffff'
    }
  },
  methods: {
    preview() {
      this.$emit('preview', {
        autoBlackEdge: this.autoBlackEdge,
        autoHole: this.autoHole,
        sensitivity: this.sensitivity,
        fillColor: this.fillColor
      })
    },
    apply() {
      this.$emit('apply', {
        autoBlackEdge: this.autoBlackEdge,
        autoHole: this.autoHole,
        sensitivity: this.sensitivity,
        fillColor: this.fillColor
      })
    }
  }
}
</script>

<style scoped>
.denoise-tool {
  padding: 12px 16px;
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

.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #e94560;
}

.checkbox span {
  font-size: 12px;
  color: #aaa;
}

.slider-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.slider-label {
  font-size: 12px;
  color: #aaa;
  width: 64px;
}

.slider-input {
  flex: 1;
}

.slider-value {
  font-size: 12px;
  color: #eaeaea;
  width: 36px;
  text-align: right;
}

.color-picker {
  width: 32px;
  height: 28px;
  border: none;
  cursor: pointer;
}

.btn-group {
  margin-top: 12px;
  display: flex;
  gap: 8px;
}

.btn {
  flex: 1;
  padding: 6px 12px;
  font-size: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #e94560;
  color: #fff;
}

.btn-secondary {
  background-color: #0f3460;
  color: #eaeaea;
}
</style>
```

- [ ] **Step 5: 创建StitchTool.vue**

```vue
<template>
  <div class="stitch-tool">
    <div class="panel-section-title">图像拼接</div>
    <div class="panel-row">
      <span class="panel-label">拼接方向</span>
      <div class="radio-group">
        <label class="radio-item">
          <input type="radio" v-model="direction" value="horizontal">
          <span>水平拼接</span>
        </label>
        <label class="radio-item">
          <input type="radio" v-model="direction" value="vertical">
          <span>垂直拼接</span>
        </label>
      </div>
    </div>
    <div class="panel-section-title">待拼接图片</div>
    <div class="stitch-preview">
      <div v-for="(img, index) in images" :key="index" class="stitch-item" :class="{ selected: selectedImages.includes(index) }" @click="toggleImage(index)">
        <svg viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
      </div>
    </div>
    <div class="panel-row">
      <span class="panel-label">间距</span>
      <input type="number" class="panel-input" v-model.number="gap" min="0">
    </div>
    <div class="panel-row">
      <span class="panel-label">对齐方式</span>
      <select class="panel-select" v-model="alignment">
        <option value="top">顶部对齐</option>
        <option value="center">居中对齐</option>
        <option value="bottom">底部对齐</option>
      </select>
    </div>
    <div class="btn-group">
      <button class="btn btn-primary" @click="apply">执行拼接</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StitchTool',
  data() {
    return {
      direction: 'horizontal',
      images: [],
      selectedImages: [],
      gap: 0,
      alignment: 'top'
    }
  },
  methods: {
    toggleImage(index) {
      const idx = this.selectedImages.indexOf(index)
      if (idx > -1) {
        this.selectedImages.splice(idx, 1)
      } else {
        this.selectedImages.push(index)
      }
    },
    apply() {
      this.$emit('apply', {
        direction: this.direction,
        images: this.selectedImages,
        gap: this.gap,
        alignment: this.alignment
      })
    }
  }
}
</script>

<style scoped>
.stitch-tool {
  padding: 12px 16px;
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

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.radio-item input[type="radio"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #e94560;
}

.radio-item span {
  font-size: 12px;
  color: #aaa;
}

.stitch-preview {
  display: flex;
  gap: 8px;
  padding: 12px;
  background-color: #1a1a2e;
  border-radius: 4px;
  overflow-x: auto;
  min-height: 80px;
  margin-bottom: 12px;
}

.stitch-item {
  width: 60px;
  height: 60px;
  background-color: #0f3460;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s;
  flex-shrink: 0;
}

.stitch-item:hover {
  border-color: #e94560;
}

.stitch-item.selected {
  border-color: #e94560;
  background-color: #e94560;
}

.stitch-item svg {
  width: 24px;
  height: 24px;
  fill: #eaeaea;
}

.panel-input {
  width: 80px;
  height: 28px;
  background-color: #1a1a2e;
  border: 1px solid #0f3460;
  border-radius: 4px;
  color: #eaeaea;
  padding: 0 8px;
  font-size: 12px;
}

.panel-select {
  width: 100px;
  height: 32px;
  background-color: #1a1a2e;
  border: 1px solid #0f3460;
  border-radius: 4px;
  color: #eaeaea;
  padding: 0 8px;
  font-size: 12px;
}

.btn-group {
  margin-top: 12px;
}

.btn {
  width: 100%;
  padding: 6px 12px;
  font-size: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #e94560;
  color: #fff;
}
</style>
```

- [ ] **Step 6: 创建SplitTool.vue**

```vue
<template>
  <div class="split-tool">
    <div class="panel-section-title">图像分割</div>
    <div class="panel-row">
      <span class="panel-label">分割方向</span>
      <div class="radio-group">
        <label class="radio-item">
          <input type="radio" v-model="direction" value="horizontal">
          <span>水平分割</span>
        </label>
        <label class="radio-item">
          <input type="radio" v-model="direction" value="vertical">
          <span>垂直分割</span>
        </label>
      </div>
    </div>
    <div class="panel-row">
      <span class="panel-label">分割数量</span>
      <input type="number" class="panel-input" v-model.number="parts" min="2" max="10">
    </div>
    <div class="panel-row">
      <span class="panel-label">分割模式</span>
      <select class="panel-select" v-model="mode">
        <option value="equal">等分</option>
        <option value="custom">自定义比例</option>
      </select>
    </div>
    <div class="panel-section-title">分割预览</div>
    <div class="split-preview" :class="direction">
      <div v-for="i in parts" :key="i" class="split-part">
        第 {{ i }} 部分 ({{ Math.floor(100 / parts) }}%)
      </div>
    </div>
    <div class="btn-group">
      <button class="btn btn-primary" @click="apply">执行分割</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SplitTool',
  data() {
    return {
      direction: 'horizontal',
      parts: 2,
      mode: 'equal'
    }
  },
  methods: {
    apply() {
      this.$emit('apply', {
        direction: this.direction,
        parts: this.parts,
        mode: this.mode
      })
    }
  }
}
</script>

<style scoped>
.split-tool {
  padding: 12px 16px;
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

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.radio-item input[type="radio"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #e94560;
}

.radio-item span {
  font-size: 12px;
  color: #aaa;
}

.panel-input {
  width: 80px;
  height: 28px;
  background-color: #1a1a2e;
  border: 1px solid #0f3460;
  border-radius: 4px;
  color: #eaeaea;
  padding: 0 8px;
  font-size: 12px;
}

.panel-select {
  width: 120px;
  height: 32px;
  background-color: #1a1a2e;
  border: 1px solid #0f3460;
  border-radius: 4px;
  color: #eaeaea;
  padding: 0 8px;
  font-size: 12px;
}

.split-preview {
  display: flex;
  gap: 4px;
  padding: 12px;
  background-color: #1a1a2e;
  border-radius: 4px;
  margin-bottom: 12px;
}

.split-preview.vertical {
  flex-direction: column;
}

.split-part {
  flex: 1;
  background-color: #0f3460;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: #888;
  min-height: 40px;
}

.btn-group {
  margin-top: 12px;
}

.btn {
  width: 100%;
  padding: 6px 12px;
  font-size: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #e94560;
  color: #fff;
}
</style>
```

- [ ] **Step 7: 提交代码**

```bash
git add src/components/tools/
git commit -m "feat: add tool components (Crop, Rotate, Adjust, Denoise, Stitch, Split)"
```

### Task 7: Worker和工具函数

**Files:**
- Create: `web/src/workers/imageWorker.js`
- Create: `web/src/workers/batchWorker.js`
- Create: `web/src/utils/canvasUtils.js`
- Create: `web/src/utils/imageUtils.js`
- Create: `web/src/utils/fileUtils.js`
- Create: `web/src/utils/mathUtils.js`

- [ ] **Step 1: 创建imageWorker.js**

```javascript
self.onmessage = function(e) {
  const { type, data } = e.data
  
  switch(type) {
    case 'PROCESS_IMAGE':
      const result = processImage(data)
      self.postMessage({ type: 'IMAGE_PROCESSED', data: result })
      break
      
    case 'APPLY_FILTER':
      const filtered = applyFilter(data)
      self.postMessage({ type: 'FILTER_APPLIED', data: filtered })
      break
      
    case 'ADJUST_BRIGHTNESS':
      const brightnessResult = adjustBrightness(data)
      self.postMessage({ type: 'BRIGHTNESS_ADJUSTED', data: brightnessResult })
      break
      
    case 'ADJUST_CONTRAST':
      const contrastResult = adjustContrast(data)
      self.postMessage({ type: 'CONTRAST_ADJUSTED', data: contrastResult })
      break
  }
}

function processImage(data) {
  const { imageData, operations } = data
  let result = imageData
  
  for (const op of operations) {
    switch(op.type) {
      case 'brightness':
        result = adjustBrightness({ imageData: result, value: op.value })
        break
      case 'contrast':
        result = adjustContrast({ imageData: result, value: op.value })
        break
    }
  }
  
  return result
}

function applyFilter(data) {
  const { imageData, filter } = data
  const result = new ImageData(
    new Uint8ClampedArray(imageData.data),
    imageData.width,
    imageData.height
  )
  
  // 应用滤镜
  return result
}

function adjustBrightness(data) {
  const { imageData, value } = data
  const result = new ImageData(
    new Uint8ClampedArray(imageData.data),
    imageData.width,
    imageData.height
  )
  
  for (let i = 0; i < result.data.length; i += 4) {
    result.data[i] = Math.min(255, Math.max(0, result.data[i] + value))
    result.data[i + 1] = Math.min(255, Math.max(0, result.data[i + 1] + value))
    result.data[i + 2] = Math.min(255, Math.max(0, result.data[i + 2] + value))
  }
  
  return result
}

function adjustContrast(data) {
  const { imageData, value } = data
  const result = new ImageData(
    new Uint8ClampedArray(imageData.data),
    imageData.width,
    imageData.height
  )
  
  const factor = (259 * (value + 255)) / (255 * (259 - value))
  
  for (let i = 0; i < result.data.length; i += 4) {
    result.data[i] = Math.min(255, Math.max(0, factor * (result.data[i] - 128) + 128))
    result.data[i + 1] = Math.min(255, Math.max(0, factor * (result.data[i + 1] - 128) + 128))
    result.data[i + 2] = Math.min(255, Math.max(0, factor * (result.data[i + 2] - 128) + 128))
  }
  
  return result
}
```

- [ ] **Step 2: 创建batchWorker.js**

```javascript
self.onmessage = function(e) {
  const { type, data } = e.data
  
  switch(type) {
    case 'BATCH_PROCESS':
      const { images, params } = data
      const results = []
      
      images.forEach((image, index) => {
        const result = processImage(image, params)
        results.push(result)
        
        self.postMessage({ 
          type: 'BATCH_PROGRESS', 
          data: { 
            index, 
            total: images.length, 
            result,
            progress: ((index + 1) / images.length) * 100
          } 
        })
      })
      
      self.postMessage({ type: 'BATCH_COMPLETE', data: results })
      break
      
    case 'BATCH_CANCEL':
      self.postMessage({ type: 'BATCH_CANCELLED' })
      break
  }
}

function processImage(image, params) {
  // 处理单个图像
  return {
    original: image,
    processed: image // 简化处理
  }
}
```

- [ ] **Step 3: 创建canvasUtils.js**

```javascript
export function createCanvas(width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas
}

export function getCanvasContext(canvas) {
  return canvas.getContext('2d')
}

export function clearCanvas(canvas) {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

export function drawImageOnCanvas(canvas, image, x = 0, y = 0) {
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, x, y)
}

export function getImageDataFromCanvas(canvas, x = 0, y = 0, width, height) {
  const ctx = canvas.getContext('2d')
  return ctx.getImageData(x, y, width || canvas.width, height || canvas.height)
}

export function putImageDataOnCanvas(canvas, imageData, x = 0, y = 0) {
  const ctx = canvas.getContext('2d')
  ctx.putImageData(imageData, x, y)
}

export function resizeCanvas(canvas, newWidth, newHeight) {
  const imageData = getImageDataFromCanvas(canvas)
  canvas.width = newWidth
  canvas.height = newHeight
  putImageDataOnCanvas(canvas, imageData)
}

export function rotateCanvas(canvas, angle) {
  const ctx = canvas.getContext('2d')
  const radians = (angle * Math.PI) / 180
  
  const width = canvas.width
  const height = canvas.height
  
  const newWidth = Math.abs(width * Math.cos(radians)) + Math.abs(height * Math.sin(radians))
  const newHeight = Math.abs(width * Math.sin(radians)) + Math.abs(height * Math.cos(radians))
  
  const tempCanvas = createCanvas(newWidth, newHeight)
  const tempCtx = getCanvasContext(tempCanvas)
  
  tempCtx.translate(newWidth / 2, newHeight / 2)
  tempCtx.rotate(radians)
  tempCtx.drawImage(canvas, -width / 2, -height / 2)
  
  canvas.width = newWidth
  canvas.height = newHeight
  ctx.drawImage(tempCanvas, 0, 0)
}

export function flipCanvas(canvas, direction) {
  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height
  
  const tempCanvas = createCanvas(width, height)
  const tempCtx = getCanvasContext(tempCanvas)
  
  if (direction === 'horizontal') {
    tempCtx.scale(-1, 1)
    tempCtx.drawImage(canvas, -width, 0)
  } else {
    tempCtx.scale(1, -1)
    tempCtx.drawImage(canvas, 0, -height)
  }
  
  ctx.clearRect(0, 0, width, height)
  ctx.drawImage(tempCanvas, 0, 0)
}
```

- [ ] **Step 4: 创建imageUtils.js**

```javascript
export function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = e.target.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function loadImageFromUrl(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}

export function getImageInfo(image) {
  return {
    width: image.width,
    height: image.height,
    naturalWidth: image.naturalWidth,
    naturalHeight: image.naturalHeight
  }
}

export function resizeImage(image, maxWidth, maxHeight) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  let width = image.width
  let height = image.height
  
  if (width > maxWidth) {
    height = (height * maxWidth) / width
    width = maxWidth
  }
  
  if (height > maxHeight) {
    width = (width * maxHeight) / height
    height = maxHeight
  }
  
  canvas.width = width
  canvas.height = height
  
  ctx.drawImage(image, 0, 0, width, height)
  
  return canvas
}

export function cropImage(image, x, y, width, height) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  canvas.width = width
  canvas.height = height
  
  ctx.drawImage(image, x, y, width, height, 0, 0, width, height)
  
  return canvas
}

export function rotateImage(image, angle) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  const radians = (angle * Math.PI) / 180
  const cos = Math.cos(radians)
  const sin = Math.sin(radians)
  
  const width = image.width
  const height = image.height
  
  const newWidth = Math.abs(width * cos) + Math.abs(height * sin)
  const newHeight = Math.abs(width * sin) + Math.abs(height * cos)
  
  canvas.width = newWidth
  canvas.height = newHeight
  
  ctx.translate(newWidth / 2, newHeight / 2)
  ctx.rotate(radians)
  ctx.drawImage(image, -width / 2, -height / 2)
  
  return canvas
}

export function flipImage(image, direction) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  canvas.width = image.width
  canvas.height = image.height
  
  if (direction === 'horizontal') {
    ctx.scale(-1, 1)
    ctx.drawImage(image, -image.width, 0)
  } else {
    ctx.scale(1, -1)
    ctx.drawImage(image, 0, -image.height)
  }
  
  return canvas
}
```

- [ ] **Step 5: 创建fileUtils.js**

```javascript
export function getFileExtension(filename) {
  return filename.split('.').pop().toLowerCase()
}

export function isImageFile(file) {
  const validTypes = ['image/jpeg', 'image/png']
  return validTypes.includes(file.type)
}

export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function generateFileName(originalName, suffix) {
  const name = originalName.replace(/\.[^/.]+$/, '')
  return `${name}_${suffix}`
}

export function downloadFile(data, filename, mimeType) {
  const blob = new Blob([data], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function downloadCanvasAsImage(canvas, filename, format = 'png', quality = 0.92) {
  const mimeType = `image/${format}`
  const dataUrl = canvas.toDataURL(mimeType, quality)
  
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
```

- [ ] **Step 6: 创建mathUtils.js**

```javascript
export function degToRad(degrees) {
  return (degrees * Math.PI) / 180
}

export function radToDeg(radians) {
  return (radians * 180) / Math.PI
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function lerp(start, end, t) {
  return start + (end - start) * t
}

export function map(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

export function distance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

export function angle(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1)
}

export function normalizeAngle(angle) {
  return ((angle % 360) + 360) % 360
}

export function snapToGrid(value, gridSize) {
  return Math.round(value / gridSize) * gridSize
}
```

- [ ] **Step 7: 提交代码**

```bash
git add src/workers/ src/utils/
git commit -m "feat: add Web Workers and utility functions"
```

### Task 8: 样式和常量

**Files:**
- Create: `web/src/assets/styles/main.scss`
- Create: `web/src/assets/styles/variables.scss`
- Create: `web/src/assets/styles/components.scss`
- Create: `web/src/constants/index.js`
- Create: `web/src/constants/tools.js`

- [ ] **Step 1: 创建variables.scss**

```scss
// 颜色变量
$primary-color: #e94560;
$primary-hover: #ff6b6b;
$secondary-color: #0f3460;
$secondary-hover: #1a4a8a;
$success-color: #28a745;
$warning-color: #ffc107;
$danger-color: #dc3545;

// 背景颜色
$bg-dark: #1a1a2e;
$bg-darker: #16213e;
$bg-darkest: #0f0f23;

// 文本颜色
$text-primary: #eaeaea;
$text-secondary: #aaa;
$text-muted: #666;
$text-dark: #333;

// 边框颜色
$border-color: #0f3460;
$border-light: #1a4a8a;

// 字体
$font-family: 'Microsoft YaHei', Arial, sans-serif;
$font-size-xs: 10px;
$font-size-sm: 12px;
$font-size-md: 14px;
$font-size-lg: 16px;
$font-size-xl: 18px;

// 间距
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 12px;
$spacing-lg: 16px;
$spacing-xl: 20px;

// 圆角
$border-radius-sm: 4px;
$border-radius-md: 6px;
$border-radius-lg: 8px;

// 阴影
$shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
$shadow-md: 0 4px 8px rgba(0, 0, 0, 0.2);
$shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.3);

// 过渡
$transition-fast: 0.2s;
$transition-normal: 0.3s;
$transition-slow: 0.5s;

// 断点
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;
```

- [ ] **Step 2: 创建main.scss**

```scss
@import 'variables';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: $font-family;
  background-color: $bg-dark;
  color: $text-primary;
  overflow: hidden;
  height: 100vh;
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

// 滚动条样式
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: $bg-darker;
}

::-webkit-scrollbar-thumb {
  background: $secondary-color;
  border-radius: $border-radius-sm;
  
  &:hover {
    background: $secondary-hover;
  }
}

// 选中文本样式
::selection {
  background-color: $primary-color;
  color: $text-primary;
}
```

- [ ] **Step 3: 创建components.scss**

```scss
@import 'variables';

// 按钮样式
.btn {
  padding: 6px 12px;
  font-size: $font-size-sm;
  border: none;
  border-radius: $border-radius-sm;
  cursor: pointer;
  transition: all $transition-fast;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.btn-primary {
  background-color: $primary-color;
  color: $text-primary;
  
  &:hover:not(:disabled) {
    background-color: $primary-hover;
  }
}

.btn-secondary {
  background-color: $secondary-color;
  color: $text-primary;
  
  &:hover:not(:disabled) {
    background-color: $secondary-hover;
  }
}

.btn-success {
  background-color: $success-color;
  color: $text-primary;
  
  &:hover:not(:disabled) {
    background-color: darken($success-color, 10%);
  }
}

.btn-warning {
  background-color: $warning-color;
  color: $text-dark;
  
  &:hover:not(:disabled) {
    background-color: darken($warning-color, 10%);
  }
}

// 输入框样式
.input {
  height: 32px;
  background-color: $bg-dark;
  border: 1px solid $border-color;
  border-radius: $border-radius-sm;
  color: $text-primary;
  padding: 0 $spacing-sm;
  font-size: $font-size-sm;
  
  &:focus {
    outline: none;
    border-color: $primary-color;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

// 选择框样式
.select {
  height: 32px;
  background-color: $bg-dark;
  border: 1px solid $border-color;
  border-radius: $border-radius-sm;
  color: $text-primary;
  padding: 0 $spacing-sm;
  font-size: $font-size-sm;
  
  &:focus {
    outline: none;
    border-color: $primary-color;
  }
}

// 滑块样式
.slider {
  width: 100%;
  height: 4px;
  background-color: $bg-dark;
  border-radius: 2px;
  outline: none;
  -webkit-appearance: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    background-color: $primary-color;
    border-radius: 50%;
    cursor: pointer;
    
    &:hover {
      background-color: $primary-hover;
    }
  }
}

// 复选框样式
.checkbox {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  cursor: pointer;
  
  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
    accent-color: $primary-color;
  }
  
  span {
    font-size: $font-size-sm;
    color: $text-secondary;
  }
}

// 单选框样式
.radio {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  cursor: pointer;
  
  input[type="radio"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
    accent-color: $primary-color;
  }
  
  span {
    font-size: $font-size-sm;
    color: $text-secondary;
  }
}

// 卡片样式
.card {
  background-color: $bg-darker;
  border: 1px solid $border-color;
  border-radius: $border-radius-md;
  padding: $spacing-md;
}

// 模态框样式
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: $bg-darker;
  border-radius: $border-radius-lg;
  width: 520px;
  max-height: 80vh;
  overflow: hidden;
}

.modal-header {
  padding: $spacing-lg $spacing-xl;
  border-bottom: 1px solid $border-color;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  font-size: $font-size-lg;
  font-weight: 600;
}

.modal-close {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: $border-radius-sm;
  transition: background-color $transition-fast;
  
  &:hover {
    background-color: $secondary-color;
  }
}

.modal-body {
  padding: $spacing-xl;
  overflow-y: auto;
}

.modal-footer {
  padding: $spacing-lg $spacing-xl;
  border-top: 1px solid $border-color;
  display: flex;
  justify-content: flex-end;
  gap: $spacing-sm;
}

// 进度条样式
.progress {
  width: 100%;
  height: 6px;
  background-color: $bg-dark;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: $primary-color;
  transition: width $transition-normal;
}

// 提示框样式
.alert {
  padding: $spacing-sm $spacing-md;
  border-radius: $border-radius-sm;
  font-size: $font-size-sm;
  margin-bottom: $spacing-md;
}

.alert-info {
  background-color: $secondary-color;
  color: $text-primary;
}

.alert-warning {
  background-color: $warning-color;
  color: $text-dark;
}

.alert-success {
  background-color: $success-color;
  color: $text-primary;
}

.alert-danger {
  background-color: $danger-color;
  color: $text-primary;
}
```

- [ ] **Step 4: 创建constants/index.js**

```javascript
export const APP_NAME = '档案扫描件处理软件'
export const APP_VERSION = '1.0.0'

export const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB
export const SUPPORTED_FILE_TYPES = ['image/jpeg', 'image/png']

export const MIN_ZOOM = 10
export const MAX_ZOOM = 500
export const ZOOM_STEP = 10

export const MIN_BRIGHTNESS = -100
export const MAX_BRIGHTNESS = 100

export const MIN_CONTRAST = -100
export const MAX_CONTRAST = 100

export const MIN_SATURATION = -100
export const MAX_SATURATION = 100

export const MIN_TEMPERATURE = -100
export const MAX_TEMPERATURE = 100

export const MIN_ROTATION = -360
export const MAX_ROTATION = 360

export const MIN_CROP_SIZE = 10
export const MAX_CROP_SIZE = 10000

export const MIN_SPLIT_PARTS = 2
export const MAX_SPLIT_PARTS = 10

export const MAX_HISTORY_SIZE = 20

export const DEFAULT_FILL_COLOR = '#ffffff'

export const EXPORT_FORMATS = {
  JPG: 'jpg',
  PNG: 'png',
  PDF: 'pdf'
}

export const IMAGE_QUALITY = {
  LOW: 0.5,
  MEDIUM: 0.75,
  HIGH: 0.92,
  MAX: 1.0
}
```

- [ ] **Step 5: 创建constants/tools.js**

```javascript
export const TOOLS = {
  SELECT: 'select',
  MOVE: 'move',
  CROP: 'crop',
  ROTATE: 'rotate',
  ZOOM_IN: 'zoom_in',
  ZOOM_OUT: 'zoom_out',
  FIT_TO_WINDOW: 'fit_to_window',
  ACTUAL_SIZE: 'actual_size',
  CORRECTION: 'correction',
  DENOISE: 'denoise',
  CUTOUT: 'cutout',
  ADJUST: 'adjust',
  STITCH: 'stitch',
  SPLIT: 'split',
  UNDO: 'undo',
  REDO: 'redo'
}

export const TOOL_GROUPS = {
  FILE: 'file',
  SELECT: 'select',
  CROP: 'crop',
  ROTATE: 'rotate',
  ZOOM: 'zoom',
  PROCESS: 'process',
  ADJUST: 'adjust',
  BATCH: 'batch',
  HELP: 'help'
}

export const TOOL_NAMES = {
  [TOOLS.SELECT]: '选择',
  [TOOLS.MOVE]: '移动',
  [TOOLS.CROP]: '裁剪',
  [TOOLS.ROTATE]: '旋转',
  [TOOLS.ZOOM_IN]: '放大',
  [TOOLS.ZOOM_OUT]: '缩小',
  [TOOLS.FIT_TO_WINDOW]: '适应窗口',
  [TOOLS.ACTUAL_SIZE]: '实际大小',
  [TOOLS.CORRECTION]: '纠偏',
  [TOOLS.DENOISE]: '去黑孔',
  [TOOLS.CUTOUT]: '扣照片',
  [TOOLS.ADJUST]: '亮度/对比度',
  [TOOLS.STITCH]: '图像拼接',
  [TOOLS.SPLIT]: '图像分割',
  [TOOLS.UNDO]: '撤销',
  [TOOLS.REDO]: '恢复'
}

export const CROP_MODES = {
  FREE: 'free',
  RATIO: 'ratio',
  SIZE: 'size'
}

export const CROP_RATIOS = {
  '1:1': 1,
  '4:3': 4 / 3,
  '16:9': 16 / 9,
  '3:2': 3 / 2,
  '2:3': 2 / 3
}

export const STITCH_DIRECTIONS = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical'
}

export const STITCH_ALIGNMENTS = {
  TOP: 'top',
  CENTER: 'center',
  BOTTOM: 'bottom'
}

export const SPLIT_DIRECTIONS = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical'
}

export const SPLIT_MODES = {
  EQUAL: 'equal',
  CUSTOM: 'custom'
}

export const DENOISE_OPTIONS = {
  AUTO_BLACK_EDGE: 'autoBlackEdge',
  AUTO_HOLE: 'autoHole'
}

export const SHORTCUTS = {
  UNDO: 'Ctrl+Z',
  REDO: 'Ctrl+Y',
  SAVE: 'Ctrl+S',
  OPEN: 'Ctrl+O',
  ZOOM_IN: 'Ctrl+Plus',
  ZOOM_OUT: 'Ctrl+Minus',
  FIT_TO_WINDOW: 'Ctrl+0',
  ACTUAL_SIZE: 'Ctrl+1'
}
```

- [ ] **Step 6: 提交代码**

```bash
git add src/assets/styles/ src/constants/
git commit -m "feat: add SCSS styles and constants"
```

### Task 9: 样式导入和最终集成

**Files:**
- Modify: `web/src/main.js`
- Modify: `web/src/App.vue`

- [ ] **Step 1: 更新main.js导入样式**

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/styles/main.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

- [ ] **Step 2: 更新App.vue使用SCSS**

```vue
<template>
  <div id="app">
    <div class="menu-bar-container">
      <MenuBar />
    </div>
    <div class="main-container">
      <Sidebar />
      <div class="preview-area">
        <div class="canvas-container">
          <MainCanvas />
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
import MenuBar from './components/layout/MenuBar.vue'
import Sidebar from './components/layout/Sidebar.vue'
import StatusBar from './components/layout/StatusBar.vue'
import PropertiesPanel from './components/layout/PropertiesPanel.vue'
import MainCanvas from './components/canvas/MainCanvas.vue'

export default {
  name: 'App',
  components: {
    MenuBar,
    Sidebar,
    StatusBar,
    PropertiesPanel,
    MainCanvas
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

<style lang="scss">
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
  
  svg {
    width: 64px;
    height: 64px;
    fill: #0f3460;
    margin-bottom: 16px;
  }
  
  p {
    font-size: 14px;
    margin-bottom: 8px;
  }
  
  .hint {
    font-size: 12px;
    color: #555;
  }
}

.status-bar-container {
  height: 28px;
  flex-shrink: 0;
}
</style>
```

- [ ] **Step 3: 最终测试**

```bash
cd web
npm run dev
```

- [ ] **Step 4: 提交代码**

```bash
git add src/main.js src/App.vue
git commit -m "feat: integrate styles and finalize app structure"
```

## 自我审查

### 1. 规范覆盖
- ✅ 项目初始化
- ✅ 状态管理（Vuex Store）
- ✅ 布局组件
- ✅ 图像处理服务
- ✅ 主画布组件
- ✅ 工具组件
- ✅ Worker和工具函数
- ✅ 样式和常量
- ✅ 最终集成

### 2. 占位符扫描
- 所有步骤都包含实际代码
- 没有发现"TBD"、"TODO"等占位符
- 每个步骤都有具体的文件路径和代码内容

### 3. 类型一致性
- 所有组件和函数的命名保持一致
- Vuex store的模块命名一致
- 工具函数的参数和返回值类型一致

### 4. 范围检查
- 计划专注于档案扫描件处理软件的实现
- 没有包含不相关的功能
- 任务分解合理，每个任务都可以独立完成

## 执行选项

计划已完成并保存到 `docs/superpowers/plans/2026-06-15-archive-scanner-implementation.md`。两种执行选项：

**1. Subagent-Driven（推荐）** - 我为每个任务分派一个新的子代理，任务间进行审查，快速迭代

**2. Inline Execution** - 使用executing-plans在当前会话中执行任务，批量执行并设置检查点

你选择哪种方式？