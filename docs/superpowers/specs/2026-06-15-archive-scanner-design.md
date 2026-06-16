# 档案扫描件处理软件 设计文档

## 1. 项目概述

### 1.1 产品定位
一款专为档案管理员设计的本地图像处理软件，用于处理扫描仪生成的JPG/PNG格式档案文件，解决扫描件歪斜、黑边、装订孔、图像质量差等问题。

### 1.2 技术栈
- **前端框架**：Vue 2.6.x
- **构建工具**：Vue CLI 4.x
- **状态管理**：Vuex 3.x
- **路由**：Vue Router 3.x
- **图像处理**：Canvas API + WebGL
- **开源组件**：Cropper.js、Fabric.js、FileSaver.js、JSZip
- **测试框架**：Jest + Vue Test Utils
- **代码规范**：ESLint + Prettier

### 1.3 开发环境
- **Node.js**：16.x LTS
- **包管理器**：npm 8.x 或 yarn 1.22.x
- **操作系统**：Windows 10/11

## 2. 架构设计

### 2.1 分层架构
采用三层架构设计，符合PRD文档要求：

```
┌─────────────────────────────────────────┐
│              用户界面层                  │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  │
│  │ Vue组件 │  │ 事件处理 │  │ 状态显示 │  │
│  └─────────┘  └─────────┘  └─────────┘  │
├─────────────────────────────────────────┤
│              业务逻辑层                  │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  │
│  │图像处理 │  │ 批量处理 │  │ 文件管理 │  │
│  │  服务   │  │   服务   │  │   服务   │  │
│  └─────────┘  └─────────┘  └─────────┘  │
├─────────────────────────────────────────┤
│              技术层                      │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  │
│  │ Canvas  │  │ WebGL   │  │ Web Worker│  │
│  └─────────┘  └─────────┘  └─────────┘  │
└─────────────────────────────────────────┘
```

### 2.2 数据流设计
```
用户操作 → Vue组件事件 → Vuex Store → Service层处理 → Canvas渲染 → 预览显示
    ↓
文件操作 → 本地存储 → 导出下载
```

### 2.3 状态管理
使用Vuex进行全局状态管理，分为三个模块：

**image模块**：管理图像状态
```javascript
{
  state: {
    currentImage: null,      // 当前图像对象
    imageList: [],           // 图像列表
    imageInfo: {},           // 图像信息（尺寸、格式等）
    zoom: 100,               // 缩放比例
    rotation: 0,             // 旋转角度
    isProcessing: false      // 处理状态
  }
}
```

**tool模块**：管理工具状态
```javascript
{
  state: {
    activeTool: 'select',    // 当前激活工具
    toolParams: {},          // 工具参数
    toolHistory: []          // 工具使用历史
  }
}
```

**history模块**：管理操作历史
```javascript
{
  state: {
    history: [],             // 操作历史
    historyIndex: -1,        // 当前历史索引
    maxHistory: 20           // 最大历史步数
  }
}
```

## 3. 项目结构

```
web/
├── public/                    # 静态资源
│   ├── index.html            # 入口HTML文件
│   └── favicon.ico           # 网站图标
├── src/                      # 源代码目录
│   ├── main.js               # 应用入口
│   ├── App.vue               # 根组件
│   ├── router/               # 路由配置
│   │   └── index.js
│   ├── store/                # Vuex状态管理
│   │   ├── index.js
│   │   └── modules/
│   │       ├── image.js      # 图像状态管理
│   │       ├── tool.js       # 工具状态管理
│   │       └── history.js    # 历史记录管理
│   ├── components/           # Vue组件
│   │   ├── layout/           # 布局组件
│   │   │   ├── MenuBar.vue   # 顶部菜单栏
│   │   │   ├── Sidebar.vue   # 左侧工具栏
│   │   │   ├── StatusBar.vue # 底部状态栏
│   │   │   └── PropertiesPanel.vue # 右侧属性面板
│   │   ├── canvas/           # 画布组件
│   │   │   ├── MainCanvas.vue # 主画布组件
│   │   │   └── CanvasToolbar.vue # 画布工具栏
│   │   ├── tools/            # 工具组件
│   │   │   ├── CropTool.vue  # 裁剪工具
│   │   │   ├── RotateTool.vue # 旋转工具
│   │   │   ├── AdjustTool.vue # 亮度对比度调节
│   │   │   ├── DenoiseTool.vue # 去黑孔工具
│   │   │   ├── StitchTool.vue # 图像拼接工具
│   │   │   └── SplitTool.vue # 图像分割工具
│   │   └── common/           # 通用组件
│   │       ├── Modal.vue     # 模态框
│   │       ├── Slider.vue    # 滑块组件
│   │       └── Progress.vue  # 进度条
│   ├── services/             # 业务逻辑层
│   │   ├── imageProcessor.js # 图像处理核心服务
│   │   ├── cropService.js    # 裁剪服务
│   │   ├── rotateService.js  # 旋转服务
│   │   ├── adjustService.js  # 亮度对比度服务
│   │   ├── denoiseService.js # 去黑孔服务
│   │   ├── stitchService.js  # 图像拼接服务
│   │   ├── splitService.js   # 图像分割服务
│   │   ├── batchService.js   # 批量处理服务
│   │   └── exportService.js  # 导出服务
│   ├── workers/              # Web Worker
│   │   ├── imageWorker.js    # 图像处理Worker
│   │   └── batchWorker.js    # 批量处理Worker
│   ├── utils/                # 工具函数
│   │   ├── canvasUtils.js    # Canvas工具函数
│   │   ├── imageUtils.js     # 图像工具函数
│   │   ├── fileUtils.js      # 文件工具函数
│   │   └── mathUtils.js      # 数学计算工具
│   ├── assets/               # 静态资源
│   │   ├── styles/           # 样式文件
│   │   │   ├── main.scss     # 主样式
│   │   │   ├── variables.scss # 变量定义
│   │   │   └── components.scss # 组件样式
│   │   └── icons/            # 图标资源
│   └── constants/            # 常量定义
│       ├── index.js          # 常量导出
│       └── tools.js          # 工具常量
├── tests/                    # 测试目录
│   ├── unit/                 # 单元测试
│   ├── integration/          # 集成测试
│   └── e2e/                  # 端到端测试
├── package.json              # 项目配置
├── vue.config.js             # Vue CLI配置
├── babel.config.js           # Babel配置
├── .eslintrc.js              # ESLint配置
└── README.md                 # 项目说明
```

## 4. 组件设计

### 4.1 核心组件关系
```
App.vue
├── MenuBar.vue (顶部菜单)
├── Sidebar.vue (左侧工具栏)
├── MainCanvas.vue (中央画布)
├── PropertiesPanel.vue (右侧属性面板)
│   ├── ImageInfoPanel.vue (图像信息)
│   ├── ToolPanel.vue (工具属性)
│   │   ├── CropPanel.vue
│   │   ├── RotatePanel.vue
│   │   ├── AdjustPanel.vue
│   │   ├── DenoisePanel.vue
│   │   ├── StitchPanel.vue
│   │   └── SplitPanel.vue
│   └── HistoryPanel.vue (历史记录)
└── StatusBar.vue (底部状态栏)
```

### 4.2 组件职责

**App.vue**
- 整体布局管理
- 全局事件处理
- 快捷键监听

**MenuBar.vue**
- 文件菜单：打开、保存、导出
- 编辑菜单：撤销、恢复
- 视图菜单：缩放控制
- 工具菜单：功能入口
- 帮助菜单：快捷键、关于

**Sidebar.vue**
- 工具分组：文件、选择、裁剪、旋转、缩放、处理、调整、批量、辅助
- 工具激活状态管理
- 工具提示显示

**MainCanvas.vue**
- Canvas渲染管理
- 图像显示和缩放
- 鼠标事件处理
- 拖拽支持

**PropertiesPanel.vue**
- 标签页切换：图像、工具、历史
- 动态加载对应工具面板
- 工具参数传递

### 4.3 组件通信

**Vuex Store**
- 全局状态管理
- 组件间数据共享
- 操作历史记录

**事件总线**
- 用于组件间松耦合通信
- 处理Canvas事件和工具交互

### 4.4 组件API设计

**MainCanvas.vue Props**
```javascript
props: {
  image: Object,
  zoom: Number,
  rotation: Number,
  activeTool: String
}
```

**工具组件通用接口**
```javascript
// 每个工具组件都需要实现
{
  props: {
    image: Object,
    params: Object
  },
  methods: {
    apply(),      // 应用处理
    preview(),    // 预览效果
    reset()       // 重置参数
  }
}
```

## 5. 服务层设计

### 5.1 图像处理核心服务
```javascript
// services/imageProcessor.js
class ImageProcessor {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.originalImage = null;
  }
  
  // 加载图像
  loadImage(file) {}
  
  // 获取图像数据
  getImageData() {}
  
  // 设置图像数据
  setImageData(data) {}
  
  // 渲染图像
  render() {}
  
  // 缩放图像
  zoom(scale) {}
  
  // 旋转图像
  rotate(angle) {}
}
```

### 5.2 工具服务设计

**裁剪服务**
```javascript
// services/cropService.js
class CropService {
  // 自由裁剪
  freeCrop(x, y, width, height) {}
  
  // 固定比例裁剪
  ratioCrop(ratio) {}
  
  // 固定尺寸裁剪
  sizeCrop(width, height) {}
}
```

**旋转服务**
```javascript
// services/rotateService.js
class RotateService {
  // 左旋90度
  rotateLeft() {}
  
  // 右旋90度
  rotateRight() {}
  
  // 任意角度旋转
  rotateAngle(angle) {}
  
  // 水平翻转
  flipHorizontal() {}
  
  // 垂直翻转
  flipVertical() {}
}
```

**亮度对比度服务**
```javascript
// services/adjustService.js
class AdjustService {
  // 调节亮度
  adjustBrightness(value) {}
  
  // 调节对比度
  adjustContrast(value) {}
  
  // 调节饱和度
  adjustSaturation(value) {}
  
  // 调节色温
  adjustTemperature(value) {}
}
```

**去黑孔服务**
```javascript
// services/denoiseService.js
class DenoiseService {
  // 自动去黑边
  autoRemoveBlackEdge() {}
  
  // 自动去装订孔
  autoRemoveBindingHoles() {}
  
  // 手动框选去除
  manualRemove(regions) {}
  
  // 检测灵敏度设置
  setSensitivity(value) {}
}
```

**图像拼接服务**
```javascript
// services/stitchService.js
class StitchService {
  // 水平拼接
  horizontalStitch(images, gap) {}
  
  // 垂直拼接
  verticalStitch(images, gap) {}
  
  // 设置对齐方式
  setAlignment(alignment) {}
}
```

**图像分割服务**
```javascript
// services/splitService.js
class SplitService {
  // 水平分割
  horizontalSplit(parts) {}
  
  // 垂直分割
  verticalSplit(parts) {}
  
  // 自定义比例分割
  customSplit(ratios) {}
}
```

### 5.3 批量处理服务
```javascript
// services/batchService.js
class BatchService {
  // 批量裁剪
  batchCrop(images, params) {}
  
  // 批量旋转
  batchRotate(images, params) {}
  
  // 批量调色
  batchAdjust(images, params) {}
  
  // 显示处理进度
  onProgress(callback) {}
  
  // 取消操作
  cancel() {}
}
```

### 5.4 导出服务
```javascript
// services/exportService.js
class ExportService {
  // 导出为JPG
  exportJPG(quality) {}
  
  // 导出为PNG
  exportPNG() {}
  
  // 导出为PDF
  exportPDF() {}
  
  // 批量导出
  batchExport(images, format) {}
  
  // 打包下载
  downloadAsZip(images) {}
}
```

## 6. Worker设计

### 6.1 图像处理Worker
```javascript
// workers/imageWorker.js
self.onmessage = function(e) {
  const { type, data } = e.data;
  
  switch(type) {
    case 'PROCESS_IMAGE':
      // 处理图像
      const result = processImage(data);
      self.postMessage({ type: 'IMAGE_PROCESSED', data: result });
      break;
      
    case 'APPLY_FILTER':
      // 应用滤镜
      const filtered = applyFilter(data);
      self.postMessage({ type: 'FILTER_APPLIED', data: filtered });
      break;
  }
};
```

### 6.2 批量处理Worker
```javascript
// workers/batchWorker.js
self.onmessage = function(e) {
  const { type, data } = e.data;
  
  switch(type) {
    case 'BATCH_PROCESS':
      // 批量处理
      data.images.forEach((image, index) => {
        const result = processImage(image, data.params);
        self.postMessage({ 
          type: 'BATCH_PROGRESS', 
          data: { index, total: data.images.length, result } 
        });
      });
      self.postMessage({ type: 'BATCH_COMPLETE' });
      break;
  }
};
```

## 7. 性能优化设计

### 7.1 Web Worker优化
- 将耗时算法放到Worker线程执行
- 避免阻塞主线程导致界面卡顿
- 支持多Worker并行处理

### 7.2 虚拟画布
- 只渲染可见区域
- 减少重绘次数
- 提升大图片处理性能

### 7.3 内存管理
- 及时释放不用的图像数据
- 使用离屏Canvas处理中间结果
- 避免内存泄漏

### 7.4 渲染优化
- 使用requestAnimationFrame进行渲染
- 实现防抖和节流
- 批量更新DOM

## 8. 测试策略

### 8.1 单元测试
- 图像处理算法测试
- 工具函数测试
- 数据验证测试

### 8.2 集成测试
- 模块间交互测试
- 数据流完整性测试
- 错误处理流程测试

### 8.3 功能测试
- 各功能按钮响应测试
- 快捷键功能测试
- 批量处理流程测试

### 8.4 性能测试
- 大图片处理性能
- 批量处理效率
- 内存占用监控

### 8.5 兼容性测试
- 主流浏览器兼容性（Chrome、Firefox、Edge）
- 不同分辨率适配
- 触屏设备支持

## 9. 错误处理

### 9.1 文件操作错误
- **文件格式不支持**：提示支持的格式列表（JPG、PNG）
- **文件过大**：提示最大限制（50MB）
- **文件损坏**：提示重新选择

### 9.2 图像处理错误
- **Canvas操作失败**：降级处理或提示
- **内存不足**：分块处理或提示
- **处理超时**：提示用户等待或取消

### 9.3 浏览器兼容性
- **不支持Canvas**：提示升级浏览器
- **不支持Web Worker**：降级为主线程处理
- **存储空间不足**：提示清理或导出

## 10. 部署配置

### 10.1 构建配置
```javascript
// vue.config.js
module.exports = {
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
};
```

### 10.2 环境变量
```bash
# .env.development
VUE_APP_TITLE=档案扫描件处理软件
VUE_APP_BASE_API=http://localhost:3000

# .env.production
VUE_APP_TITLE=档案扫描件处理软件
VUE_APP_BASE_API=./
```

### 10.3 部署脚本
```json
{
  "scripts": {
    "dev": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "test:unit": "jest --config jest.config.js",
    "test:e2e": "cypress open",
    "test:e2e:run": "cypress run",
    "lint": "eslint --ext .js,.vue src",
    "lint:fix": "eslint --ext .js,.vue src --fix",
    "format": "prettier --write src/**/*.{js,vue,css}"
  }
}
```

## 11. 开发计划

### 阶段一：基础框架（1-2周）
- [ ] 项目初始化和架构搭建
- [ ] 基础UI组件开发
- [ ] 文件上传和预览功能

### 阶段二：核心功能（3-4周）
- [ ] 裁剪、旋转、缩放功能
- [ ] 亮度/对比度调节
- [ ] 撤销/恢复功能

### 阶段三：高级功能（5-6周）
- [ ] 纠偏和去黑孔算法
- [ ] 批量处理功能
- [ ] 图像拼接/分割

### 阶段四：优化完善（7-8周）
- [ ] 性能优化
- [ ] 快捷键设置
- [ ] 测试和修复

## 12. 附录

### 12.1 术语表
- **纠偏**：将歪斜的图像旋转到正确角度
- **去黑孔**：去除扫描件边缘的黑边和装订孔阴影
- **批处理**：对多张图片应用相同的处理操作

### 12.2 参考原型
- 原型文件：`prototype.html`
- PRD文档：`docs/PRD-档案扫描件处理软件.md`

---

**文档版本**：v1.0  
**创建日期**：2026-06-15  
**最后更新**：2026-06-15