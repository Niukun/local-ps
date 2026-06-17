<template>
  <div class="main-editor">
    <!-- 顶部菜单栏 -->
    <MenuBar @menuAction="handleMenuAction" />

    <!-- 主体三栏布局 -->
    <div class="editor-body">
      <!-- 左侧：文件列表 -->
      <FileList
        :files="fileList"
        :activeFileId="activeFileId"
        @selectFile="handleSelectFile"
        @removeFile="handleRemoveFile"
      />

      <!-- 中间：工具栏 + 画布 -->
      <div class="editor-center">
        <div class="editor-workspace">
          <ToolBar
            :activeTool="activeTool"
            @switchTool="handleSwitchTool"
            @action="handleToolAction"
          />
          <CanvasArea
            ref="canvasArea"
            :hasActiveFile="hasActiveFile"
            :loading="fileLoading"
            :interactionMode="activeInteractionMode"
            :cropMode="cropMode"
            :cropRatio="cropRatio"
            @filesDropped="handleFilesDropped"
            @action="handleToolAction"
            @canvasReady="handleCanvasReady"
            @imageLoaded="handleImageLoaded"
            @zoomChanged="handleZoomChanged"
            @mouseMoved="handleMouseMoved"
            @beforeOperation="handleBeforeOperation"
            @operationRecorded="handleOperationRecorded"
            @cropComplete="handleCropComplete"
            @cropCancelled="handleCropCancelled"
            @deskewApplied="handleDeskewApplied"
            @deblackApplied="handleDeblackApplied"
          />
          <PropertyPanel
            :fileInfo="activeFile"
            :activeTool="activeTool"
            :historyList="historyItems"
            :defaultTab="defaultPanelTab"
          />
        </div>

        <!-- 工具属性栏：根据当前工具动态显示，位于画布与属性面板之间 -->
        <div v-if="showToolBar" class="tool-props-bar">
          <!-- ===== 裁剪参数 ===== -->
          <template v-if="activeTool === 'crop'">
            <label class="props-label">模式</label>
            <select v-model="cropMode" class="props-select">
              <option value="free">自由裁剪</option>
              <option value="ratio">固定比例</option>
            </select>
            <template v-if="cropMode === 'ratio'">
              <label class="props-label">比例</label>
              <select v-model="cropRatio" class="props-select">
                <option value="1:1">1:1 正方形</option>
                <option value="4:3">4:3 标准</option>
                <option value="16:9">16:9 宽屏</option>
                <option value="3:2">3:2 照片</option>
                <option value="2:3">2:3 竖版</option>
              </select>
            </template>
            <button class="props-btn props-btn-apply" :disabled="!canApplyCrop" @click="applyCrop">应用裁剪</button>
            <button class="props-btn" @click="cancelCrop">取消</button>
          </template>

          <!-- ===== 旋转参数 ===== -->
          <template v-if="activeTool === 'rotate'">
            <button class="props-btn" @click="rotateLeft90">左旋90°</button>
            <button class="props-btn" @click="rotateRight90">右旋90°</button>
            <button class="props-btn" @click="flipH">水平翻转</button>
            <button class="props-btn" @click="flipV">垂直翻转</button>
            <label class="props-label">角度</label>
            <input v-model.number="rotateAngleInput" type="number" class="props-input" min="-360" max="360" step="0.1" @input="onRotatePreview" />
            <input v-model.number="rotateAngleInput" type="range" class="props-range" min="-360" max="360" step="0.1" @input="onRotatePreview" />
            <button class="props-btn props-btn-apply" @click="applyRotate">应用</button>
            <button class="props-btn" @click="resetRotate">重置</button>
          </template>

          <!-- ===== 纠偏参数 ===== -->
          <template v-if="activeTool === 'correction'">
            <label class="props-label">检测角度</label>
            <span class="props-value">{{ correctionAngle.toFixed(1) }}°</span>
            <label class="props-label">灵敏度</label>
            <input :value="correctionSensitivity" type="range" class="props-range" min="1" max="10" step="1" @input="onCorrectionSensitivityInput" />
            <span class="props-value">{{ correctionSensitivity }}</span>
            <label class="props-label">微调</label>
            <button class="props-btn" @click="adjustCorrectionAngle(-1)">-1°</button>
            <button class="props-btn" @click="adjustCorrectionAngle(-0.1)">-0.1°</button>
            <button class="props-btn" @click="adjustCorrectionAngle(0.1)">+0.1°</button>
            <button class="props-btn" @click="adjustCorrectionAngle(1)">+1°</button>
            <button class="props-btn props-btn-apply" @click="applyDeskew">应用纠偏</button>
          </template>

          <!-- ===== 去黑孔参数 ===== -->
          <template v-if="activeTool === 'deblack'">
            <label class="props-label">模式</label>
            <label class="props-check"><input type="checkbox" :checked="deblackEdge" @change="onDeblackEdgeChange" />去黑边</label>
            <label class="props-check"><input type="checkbox" :checked="deblackHole" @change="onDeblackHoleChange" />去装订孔</label>
            <label class="props-label">灵敏度</label>
            <input :value="deblackSensitivity" type="range" class="props-range" min="1" max="10" step="1" @input="onDeblackSensitivityInput" />
            <span class="props-value">{{ deblackSensitivity }}</span>
            <label class="props-label">填充色</label>
            <input type="color" :value="deblackFillColor" class="props-color" @input="onDeblackFillColorInput" />
            <label class="props-check"><input type="checkbox" :checked="deblackManual" @change="onDeblackManualToggle" />手动框选</label>
            <button class="props-btn" @click="previewDeblack">预览</button>
            <button class="props-btn props-btn-apply" @click="applyDeblack">应用</button>
            <button class="props-btn" @click="cancelDeblack">取消</button>
          </template>

          <!-- ===== 色彩调整参数 ===== -->
          <template v-if="activeTool === 'colorAdjust'">
            <label class="props-label">亮度</label>
            <input :value="colorBrightness" type="range" class="props-range" min="-100" max="100" step="1" @input="onBrightnessInput" />
            <input :value="colorBrightness" type="number" class="props-input props-input-num" min="-100" max="100" @input="onBrightnessInput" />
            <label class="props-label">对比度</label>
            <input :value="colorContrast" type="range" class="props-range" min="-100" max="100" step="1" @input="onContrastInput" />
            <input :value="colorContrast" type="number" class="props-input props-input-num" min="-100" max="100" @input="onContrastInput" />
            <label class="props-label">饱和度</label>
            <input :value="colorSaturation" type="range" class="props-range" min="-100" max="100" step="1" @input="onSaturationInput" />
            <input :value="colorSaturation" type="number" class="props-input props-input-num" min="-100" max="100" @input="onSaturationInput" />
            <label class="props-label">色温</label>
            <input :value="colorTemperature" type="range" class="props-range" min="-100" max="100" step="1" @input="onTemperatureInput" />
            <input :value="colorTemperature" type="number" class="props-input props-input-num" min="-100" max="100" @input="onTemperatureInput" />
            <button class="props-btn" @click="resetColorAdjust">重置</button>
          </template>
        </div>
      </div>
    </div>

    <!-- 底部状态栏 -->
    <StatusBar
      :statusText="statusText"
      :zoomText="zoomDisplay"
      :mouseText="mouseDisplay"
      :fileIndexText="fileIndexDisplay"
      :historyStep="historyStep"
    />

    <!-- 保存文件输入框（隐藏） -->
    <input
      ref="fileInput"
      type="file"
      multiple
      accept=".jpg,.jpeg,.png"
      style="display: none"
      @change="handleFileInputChange"
    />

    <!-- 对话框 -->
    <SaveAsDialog
      v-if="showSaveAsDialog"
      :defaultName="saveAsDefaultName"
      :defaultFormat="saveAsDefaultFormat"
      @close="showSaveAsDialog = false"
      @confirm="handleSaveAsConfirm"
    />

    <ExportDialog
      v-if="showExportDialog"
      @close="showExportDialog = false"
      @confirm="handleExportConfirm"
    />

    <!-- 通知提示 -->
    <transition name="fade">
      <div v-if="notification.show" class="notification" :class="notification.type">
        {{ notification.message }}
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import MenuBar from '@/components/layout/MenuBar.vue'
import ToolBar from '@/components/layout/ToolBar.vue'
import CanvasArea from '@/components/layout/CanvasArea.vue'
import PropertyPanel from '@/components/layout/PropertyPanel.vue'
import StatusBar from '@/components/layout/StatusBar.vue'
import FileList from '@/components/file/FileList.vue'
import SaveAsDialog from '@/components/file/SaveAsDialog.vue'
import ExportDialog from '@/components/dialogs/ExportDialog.vue'

import {
  isValidImageFile,
  isFileSizeValid,
  readFileAsDataURL,
  generateThumbnail,
  getImageInfo,
  generateExportFileName,
  triggerDownloadBlob
} from '@/utils/fileUtils'
import { ERROR_MSG, LIMITS } from '@/utils/constants'
import { normalizeKeyEvent, isInputFocused, findShortcut } from '@/utils/shortcuts'
import { buildFilterString } from '@/utils/colorFilter'
import { detectSkewAngle } from '@/utils/deskewUtils'

export default {
  name: 'MainEditor',

  components: {
    MenuBar, ToolBar, CanvasArea, PropertyPanel, StatusBar,
    FileList, SaveAsDialog, ExportDialog
  },

  data() {
    return {
      // ===== 文件加载状态 =====
      fileLoading: false,
      pendingDataUrl: null,

      // ===== 画布引用 =====
      canvasInstance: null,

      // ===== 对话框状态 =====
      showSaveAsDialog: false,
      showExportDialog: false,

      // ===== 保存默认值 =====
      saveAsDefaultName: '',
      saveAsDefaultFormat: 'jpg',

      // ===== 通知 =====
      notification: { show: false, message: '', type: 'info' },

      // ===== 状态文本 =====
      appStatus: '就绪',

      // ===== 裁剪参数 =====
      cropMode: 'free',
      cropRatio: '1:1',

      // ===== 旋转参数 =====
      rotateAngleInput: 0,
      pendingRotateApply: false
    }
  },

  computed: {
    ...mapState('fileList', ['files', 'activeFileId']),
    ...mapState('canvas', ['zoom', 'mouseX', 'mouseY']),
    ...mapState('tools', ['activeTool', 'rotationAngle',
      'correctionSensitivity', 'correctionAngle',
      'deblackEdge', 'deblackHole', 'deblackSensitivity', 'deblackFillColor', 'deblackManual',
      'colorBrightness', 'colorContrast', 'colorSaturation', 'colorTemperature'
    ]),
    ...mapGetters('fileList', ['activeFile', 'fileCount', 'activeFileIndex', 'hasActiveFile']),
    ...mapGetters('canvas', ['zoomText', 'mouseText']),
    ...mapGetters('history', ['historyList', 'historyStep', 'canUndo', 'canRedo']),

    fileList() { return this.files },
    zoomDisplay() { return `${this.zoom}%` },
    mouseDisplay() { return `(${Math.round(this.mouseX)}, ${Math.round(this.mouseY)})` },
    fileIndexDisplay() {
      const idx = this.activeFileIndex
      return idx >= 0 ? `${idx + 1}/${this.fileCount}` : '0/0'
    },
    historyItems() { return this.historyList },
    statusText() { return this.appStatus },
    defaultPanelTab() { return this.hasActiveFile ? 'image' : 'image' },

    showToolBar() {
      return this.hasActiveFile && (this.activeTool === 'crop' || this.activeTool === 'rotate'
        || this.activeTool === 'correction' || this.activeTool === 'deblack' || this.activeTool === 'colorAdjust')
    },

    activeInteractionMode() {
      if (this.activeTool === 'move') return 'move'
      if (this.activeTool === 'crop') return 'crop'
      if (this.activeTool === 'deblack' && this.deblackManual) return 'deblack'
      return 'select'
    },

    canApplyCrop() {
      const canvasArea = this.$refs.canvasArea
      return canvasArea && canvasArea.cropRect
    }
  },

  watch: {
    activeFileId(fileId) {
      if (fileId && this.canvasInstance) {
        this.switchTool('select')
        const file = this.activeFile
        if (file && file.dataUrl) {
          this.$refs.canvasArea.loadImage(file.dataUrl)
        }
      }
    }
  },

  methods: {
    ...mapActions('fileList', ['addFile', 'setActiveFile', 'removeFile']),
    ...mapActions('canvas', ['updateZoom', 'setFabricReady']),
    ...mapActions('history', ['initStack', 'recordOperation', 'undo', 'redo']),
    ...mapActions('tools', ['switchTool']),
    ...mapMutations('canvas', ['SET_ZOOM', 'SET_MOUSE_POS']),
    ...mapMutations('tools', ['SET_ROTATION_ANGLE', 'RESET_TOOL_PARAMS',
      'SET_CORRECTION_SENSITIVITY', 'SET_CORRECTION_ANGLE',
      'SET_DEBLACK_EDGE', 'SET_DEBLACK_HOLE', 'SET_DEBLACK_SENSITIVITY',
      'SET_DEBLACK_FILL_COLOR', 'SET_DEBLACK_MANUAL',
      'SET_COLOR_BRIGHTNESS', 'SET_COLOR_CONTRAST', 'SET_COLOR_SATURATION', 'SET_COLOR_TEMPERATURE'
    ]),

    // ===== 通知 =====
    notify(message, type = 'info') {
      this.notification = { show: true, message, type }
      clearTimeout(this._notifyTimer)
      this._notifyTimer = setTimeout(() => { this.notification.show = false }, 2500)
    },

    // ===== 画布事件 =====
    handleCanvasReady(canvas) {
      this.canvasInstance = canvas
      this.setFabricReady(true)
      // 加载待处理图片
      if (this.pendingDataUrl) {
        this.$refs.canvasArea.loadImage(this.pendingDataUrl)
        this.pendingDataUrl = null
      } else if (this.hasActiveFile && this.activeFile.dataUrl) {
        this.$refs.canvasArea.loadImage(this.activeFile.dataUrl)
      }
    },

    handleImageLoaded() {
      // ===== TODO: 图片加载后同步尺寸到 store =====
    },

    handleZoomChanged(zoom) {
      this.SET_ZOOM(zoom)
    },

    handleMouseMoved({ x, y }) {
      this.SET_MOUSE_POS({ x, y })
    },

    // ===== 撤销/恢复 =====
    handleBeforeOperation({ label, type }) {
      this._operationPending = true
    },

    handleOperationRecorded({ label, type }) {
      if (!this._operationPending) return
      this._operationPending = false
      const canvasArea = this.$refs.canvasArea
      if (!canvasArea) return
      const json = canvasArea.getCanvasJSON()
      if (json) {
        this.recordOperation({
          label,
          type,
          canvasJSON: json
        })
      }
    },

    handleUndo() {
      const stack = this.$store.getters['history/currentStack']
      if (!stack || stack.pointer <= 0) {
        this.notify('已到最早记录', 'info')
        return
      }
      this.undo()
      setTimeout(() => {
        const newStack = this.$store.getters['history/currentStack']
        if (newStack && newStack.pointer > 0) {
          const state = newStack.stack[newStack.pointer - 1]
          if (state && state.canvasJSON) {
            this.$refs.canvasArea.loadCanvasJSON(state.canvasJSON)
          }
        } else if (newStack && newStack.pointer === 0) {
          if (this.activeFile && this.activeFile.dataUrl) {
            this.$refs.canvasArea.loadImage(this.activeFile.dataUrl)
          }
        }
      }, 50)
    },

    handleRedo() {
      const stack = this.$store.getters['history/currentStack']
      if (!stack || stack.pointer >= stack.stack.length) {
        this.notify('已到最后记录', 'info')
        return
      }
      this.redo()
      setTimeout(() => {
        const newStack = this.$store.getters['history/currentStack']
        if (newStack && newStack.pointer > 0) {
          const state = newStack.stack[newStack.pointer - 1]
          if (state && state.canvasJSON) {
            this.$refs.canvasArea.loadCanvasJSON(state.canvasJSON)
          }
        }
      }, 50)
    },

    // ===== 缩放 =====
    handleZoomIn() {
      const canvasArea = this.$refs.canvasArea
      if (!canvasArea) return
      const z = canvasArea.doZoomIn()
      this.SET_ZOOM(z)
    },

    handleZoomOut() {
      const canvasArea = this.$refs.canvasArea
      if (!canvasArea) return
      const z = canvasArea.doZoomOut()
      this.SET_ZOOM(z)
    },

    handleFitWindow() {
      const canvasArea = this.$refs.canvasArea
      if (!canvasArea) return
      const z = canvasArea.doFitWindow()
      this.SET_ZOOM(z)
    },

    handleActualSize() {
      const canvasArea = this.$refs.canvasArea
      if (!canvasArea) return
      const z = canvasArea.doActualSize()
      this.SET_ZOOM(z)
    },

    // ===== 旋转与翻转 =====
    rotateLeft90() {
      const canvasArea = this.$refs.canvasArea
      if (!canvasArea) return
      canvasArea.rotateLeft()
      this.syncRotateInput()
    },

    rotateRight90() {
      const canvasArea = this.$refs.canvasArea
      if (!canvasArea) return
      canvasArea.rotateRight()
      this.syncRotateInput()
    },

    syncRotateInput() {
      const canvasArea = this.$refs.canvasArea
      if (canvasArea && canvasArea.currentImage) {
        const angle = canvasArea.currentImage.angle
        this.rotateAngleInput = Math.round(angle % 360)
      }
    },

    flipH() {
      const canvasArea = this.$refs.canvasArea
      if (!canvasArea) return
      canvasArea.flipHorizontal()
    },

    flipV() {
      const canvasArea = this.$refs.canvasArea
      if (!canvasArea) return
      canvasArea.flipVertical()
    },

    onRotatePreview() {
      const canvasArea = this.$refs.canvasArea
      if (!canvasArea) return
      canvasArea.rotateToAngle(this.rotateAngleInput)
    },

    applyRotate() {
      const canvasArea = this.$refs.canvasArea
      if (!canvasArea) return
      this.handleBeforeOperation({ label: `旋转 ${this.rotateAngleInput}°`, type: 'rotate' })
      canvasArea.rotateToAngle(this.rotateAngleInput)
      this.handleOperationRecorded({ label: `旋转 ${this.rotateAngleInput}°`, type: 'rotate' })
      this.rotateAngleInput = 0
    },

    resetRotate() {
      const canvasArea = this.$refs.canvasArea
      if (!canvasArea) return
      this.rotateAngleInput = 0
      canvasArea.rotateToAngle(0)
    },

    // ===== 裁剪 =====
    applyCrop() {
      const canvasArea = this.$refs.canvasArea
      if (!canvasArea) return
      canvasArea.applyCrop()
    },

    cancelCrop() {
      const canvasArea = this.$refs.canvasArea
      if (!canvasArea) return
      canvasArea.cancelCrop()
      this.handleSwitchTool('select')
    },

    handleCropComplete() {
      this.RESET_TOOL_PARAMS()
      this.switchTool('select')
    },

    handleCropCancelled() {
      this.RESET_TOOL_PARAMS()
      this.switchTool('select')
    },

    // ===== 纠偏 =====
    onCorrectionSensitivityInput(e) {
      const val = Number(e.target.value)
      this.SET_CORRECTION_SENSITIVITY(val)
      this.$nextTick(() => this.runSkewDetection())
    },

    runSkewDetection() {
      this.SET_CORRECTION_SENSITIVITY(this.correctionSensitivity)
      const canvasArea = this.$refs.canvasArea
      if (!canvasArea || !canvasArea.fabricCanvas) return
      const activeObj = canvasArea.currentImage
      if (!activeObj) return

      const dataUrl = canvasArea.fabricCanvas.toDataURL({ format: 'png', multiplier: 1 })
      const img = new Image()
      img.onload = () => {
        const offCanvas = document.createElement('canvas')
        offCanvas.width = img.width
        offCanvas.height = img.height
        const ctx = offCanvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        const imageData = ctx.getImageData(0, 0, img.width, img.height)
        const angle = detectSkewAngle(imageData, this.correctionSensitivity)
        this.SET_CORRECTION_ANGLE(angle)
        this.$refs.canvasArea.showCorrectionGuide(angle)
      }
      img.src = dataUrl
    },

    adjustCorrectionAngle(delta) {
      let angle = this.correctionAngle + delta
      angle = Math.max(-45, Math.min(45, angle))
      this.SET_CORRECTION_ANGLE(angle)
      this.$refs.canvasArea.showCorrectionGuide(angle)
    },

    applyDeskew() {
      const canvasArea = this.$refs.canvasArea
      if (!canvasArea || !this.correctionAngle) return
      this.handleBeforeOperation({ label: `纠偏 ${this.correctionAngle.toFixed(1)}°`, type: 'correction' })
      canvasArea.applyDeskew(this.correctionAngle)
    },

    handleDeskewApplied() {
      this.handleOperationRecorded({ label: `纠偏 ${this.correctionAngle.toFixed(1)}°`, type: 'correction' })
      this.SET_CORRECTION_ANGLE(0)
      this.switchTool('select')
      this.appStatus = '纠偏完成'
    },

    // ===== 去黑孔 =====
    onDeblackEdgeChange(e) {
      this.SET_DEBLACK_EDGE(e.target.checked)
    },

    onDeblackHoleChange(e) {
      this.SET_DEBLACK_HOLE(e.target.checked)
    },

    onDeblackSensitivityInput(e) {
      const val = Number(e.target.value)
      this.SET_DEBLACK_SENSITIVITY(val)
    },

    onDeblackFillColorInput(e) {
      this.SET_DEBLACK_FILL_COLOR(e.target.value)
    },

    onDeblackManualToggle(e) {
      this.SET_DEBLACK_MANUAL(e.target.checked)
    },

    previewDeblack() {
      const canvasArea = this.$refs.canvasArea
      if (!canvasArea) return
      canvasArea.previewDeblack({
        edge: this.deblackEdge,
        hole: this.deblackHole,
        sensitivity: this.deblackSensitivity,
        fillColor: this.deblackFillColor
      })
    },

    applyDeblack() {
      const canvasArea = this.$refs.canvasArea
      if (!canvasArea) return
      this.handleBeforeOperation({ label: '去黑孔', type: 'deblack' })
      canvasArea.applyDeblack({
        edge: this.deblackEdge,
        hole: this.deblackHole,
        sensitivity: this.deblackSensitivity,
        fillColor: this.deblackFillColor
      })
    },

    handleDeblackApplied() {
      this.handleOperationRecorded({ label: '去黑孔', type: 'deblack' })
      this.switchTool('select')
      this.appStatus = '去黑孔完成'
    },

    cancelDeblack() {
      const canvasArea = this.$refs.canvasArea
      if (!canvasArea) return
      canvasArea.cancelDeblack()
      this.switchTool('select')
    },

    // ===== 色彩调整 =====
    onBrightnessInput(e) {
      const val = Number(e.target.value)
      this.SET_COLOR_BRIGHTNESS(val)
      this.applyColorFilterToCanvas()
    },

    onContrastInput(e) {
      const val = Number(e.target.value)
      this.SET_COLOR_CONTRAST(val)
      this.applyColorFilterToCanvas()
    },

    onSaturationInput(e) {
      const val = Number(e.target.value)
      this.SET_COLOR_SATURATION(val)
      this.applyColorFilterToCanvas()
    },

    onTemperatureInput(e) {
      const val = Number(e.target.value)
      this.SET_COLOR_TEMPERATURE(val)
      this.applyColorFilterToCanvas()
    },

    applyColorFilterToCanvas() {
      this.SET_COLOR_BRIGHTNESS(this.colorBrightness)
      this.SET_COLOR_CONTRAST(this.colorContrast)
      this.SET_COLOR_SATURATION(this.colorSaturation)
      this.SET_COLOR_TEMPERATURE(this.colorTemperature)

      const canvasArea = this.$refs.canvasArea
      if (!canvasArea) return
      const filter = buildFilterString({
        brightness: this.colorBrightness,
        contrast: this.colorContrast,
        saturation: this.colorSaturation,
        temperature: this.colorTemperature
      })
      canvasArea.applyColorFilter(filter)
    },

    resetColorAdjust() {
      this.SET_COLOR_BRIGHTNESS(0)
      this.SET_COLOR_CONTRAST(0)
      this.SET_COLOR_SATURATION(0)
      this.SET_COLOR_TEMPERATURE(0)

      const canvasArea = this.$refs.canvasArea
      if (canvasArea) {
        canvasArea.applyColorFilter('')
      }
    },

    handleBakeColorFilter() {
      const canvasArea = this.$refs.canvasArea
      if (!canvasArea) return
      this.handleBeforeOperation({ label: '色彩调整', type: 'colorAdjust' })
      canvasArea.bakeColorFilter()
      this.handleOperationRecorded({ label: '色彩调整', type: 'colorAdjust' })
      this.resetColorAdjust()
      this.switchTool('select')
    },

    // ===== 菜单响应 =====
    handleMenuAction(action) {
      switch (action) {
        case 'openFile': this.triggerOpenFile(); break
        case 'saveFile': this.handleSave(); break
        case 'saveAs': this.openSaveAsDialog(); break
        case 'exportFile': this.openExportDialog(); break
        case 'undo': this.handleUndo(); break
        case 'redo': this.handleRedo(); break
        case 'zoomIn': this.handleZoomIn(); break
        case 'zoomOut': this.handleZoomOut(); break
        case 'fitWindow': this.handleFitWindow(); break
        case 'actualSize': this.handleActualSize(); break
        case 'selectTool': this.handleSwitchTool('select'); break
        case 'moveTool': this.handleSwitchTool('move'); break
        case 'cropTool': this.handleSwitchTool('crop'); break
        case 'rotateTool': this.handleSwitchTool('rotate'); break
        case 'escape':
          if (this.activeTool === 'crop') this.cancelCrop()
          else if (this.activeTool === 'correction') this.switchTool('select')
          else if (this.activeTool === 'deblack') this.cancelDeblack()
          else if (this.activeTool === 'colorAdjust') this.handleBakeColorFilter()
          else this.handleSwitchTool('select')
          break
        default: break
      }
    },

    // ===== 工具操作 =====
    handleToolAction(action) {
      this.handleMenuAction(action)
    },

    handleSwitchTool(tool) {
      this.RESET_TOOL_PARAMS()
      this.rotateAngleInput = 0
      this.switchTool(tool)

      const canvasArea = this.$refs.canvasArea
      if (!canvasArea || !this.hasActiveFile) return

      if (tool === 'crop') {
        this.$nextTick(() => canvasArea.startCrop())
      } else if (tool === 'correction') {
        this.$nextTick(() => this.runSkewDetection())
      } else if (tool === 'colorAdjust') {
        this.SET_CORRECTION_ANGLE(0)
        this.$nextTick(() => this.applyColorFilterToCanvas())
      } else if (tool === 'deblack') {
        this.$nextTick(() => canvasArea.clearDeblackOverlay())
      } else {
        // 切换到非 filter 工具时，bake 并固化色彩调整效果
        canvasArea.bakeColorFilter()
        canvasArea.applyColorFilter('')
        canvasArea.clearDeblackOverlay()
        this.resetColorAdjust()
      }
    },

    // ===== 文件操作 =====
    triggerOpenFile() {
      this.$refs.fileInput.click()
    },

    handleFileInputChange(e) {
      const files = e.target.files
      if (files && files.length > 0) {
        this.processFiles(Array.from(files))
      }
      e.target.value = ''
    },

    handleFilesDropped(files) {
      this.processFiles(files)
    },

    async processFiles(fileArray) {
      this.fileLoading = true
      this.appStatus = '加载中...'

      for (const file of fileArray) {
        if (!isValidImageFile(file)) {
          this.notify(`${file.name}：${ERROR_MSG.FILE_FORMAT_UNSUPPORTED}`, 'error')
          continue
        }
        if (!isFileSizeValid(file)) {
          this.notify(`${file.name}：${ERROR_MSG.FILE_TOO_LARGE}`, 'error')
          continue
        }

        try {
          const dataUrl = await readFileAsDataURL(file)
          const info = await getImageInfo(dataUrl)
          const thumbnail = await generateThumbnail(dataUrl, 48)

          const fileRecord = await this.addFile({
            name: file.name,
            size: file.size,
            dimensions: { width: info.width, height: info.height },
            thumbnail: thumbnail,
            dataUrl: dataUrl,
            originalFile: file
          })

          this.setActiveFile(fileRecord.id)
          this.initStack(fileRecord.id)

          // 渲染到画布
          this.$nextTick(() => {
            const canvasArea = this.$refs.canvasArea
            if (canvasArea && canvasArea.fabricCanvas) {
              canvasArea.loadImage(dataUrl)
            } else if (canvasArea) {
              // 画布尚未初始化，标记待加载
              this.pendingDataUrl = dataUrl
              canvasArea.initCanvas()
            }
          })

          this.appStatus = '文件加载完成'
        } catch (err) {
          console.error('[MainEditor] 文件加载失败:', err)
          this.notify(`${file.name}：${ERROR_MSG.FILE_LOAD_FAILED}`, 'error')
        }
      }

      this.fileLoading = false
      if (!this.hasActiveFile) {
        this.appStatus = '就绪'
      }
    },

    handleSelectFile(fileId) {
      this.setActiveFile(fileId)
    },

    handleRemoveFile(fileId) {
      this.removeFile(fileId)
    },

    // ===== 保存 =====
    handleSave() {
      if (!this.hasActiveFile) {
        this.notify(ERROR_MSG.NO_FILE_TO_SAVE, 'error')
        return
      }
      this.openSaveAsDialog()
    },

    openSaveAsDialog() {
      if (!this.hasActiveFile) {
        this.notify(ERROR_MSG.NO_FILE_TO_SAVE, 'error')
        return
      }
      const af = this.activeFile
      this.saveAsDefaultName = af.name.replace(/\.[^.]+$/, '') + '_编辑'
      this.saveAsDefaultFormat = af.format
      this.showSaveAsDialog = true
    },

    async handleSaveAsConfirm({ fileName, format, quality }) {
      this.showSaveAsDialog = false
      this.appStatus = '保存中...'

      try {
        const canvasArea = this.$refs.canvasArea
        if (canvasArea && canvasArea.fabricCanvas) {
          const mimeType = format === 'jpg' ? 'jpeg' : format
          const dataUrl = canvasArea.exportToDataURL(mimeType, quality / 100)
          if (dataUrl) {
            const response = await fetch(dataUrl)
            const blob = await response.blob()
            triggerDownloadBlob(blob, fileName)
          }
        } else {
          // 回退到 dataURL
          const af = this.activeFile
          if (af && af.dataUrl) {
            const response = await fetch(af.dataUrl)
            const blob = await response.blob()
            triggerDownloadBlob(blob, fileName)
          }
        }

        this.appStatus = '保存完成'
        this.notify(`已保存：${fileName}`, 'success')
      } catch (err) {
        console.error('[MainEditor] 保存失败:', err)
        this.notify(ERROR_MSG.SAVE_FAILED, 'error')
      }
    },

    // ===== 导出 =====
    openExportDialog() {
      if (!this.hasActiveFile) {
        this.notify(ERROR_MSG.NO_FILE_TO_EXPORT, 'error')
        return
      }
      this.showExportDialog = true
    },

    async handleExportConfirm({ format, quality, namingRule, customPrefix }) {
      this.showExportDialog = false
      this.appStatus = '导出中...'

      try {
        const af = this.activeFile
        if (!af) return

        const fileName = generateExportFileName(af.name, format, namingRule, customPrefix, 0)
        const canvasArea = this.$refs.canvasArea

        if (canvasArea && canvasArea.fabricCanvas) {
          const mimeType = format === 'jpg' ? 'jpeg' : format
          const dataUrl = canvasArea.exportToDataURL(mimeType, quality / 100)
          if (dataUrl) {
            const response = await fetch(dataUrl)
            const blob = await response.blob()
            triggerDownloadBlob(blob, fileName)
          }
        }

        this.appStatus = '导出完成'
        this.notify(`已导出：${fileName}`, 'success')
      } catch (err) {
        console.error('[MainEditor] 导出失败:', err)
        this.notify(ERROR_MSG.EXPORT_FAILED, 'error')
      }
    },

    // ===== 快捷键 =====
    handleKeyDown(e) {
      if (isInputFocused()) return

      const combo = normalizeKeyEvent(e)
      const shortcut = findShortcut(combo)

      if (shortcut) {
        e.preventDefault()

        // 空格键临时切换移动工具
        if (combo === 'space') {
          if (this.activeTool !== 'move') {
            this._prevTool = this.activeTool
            this.switchTool('move')
          }
          return
        }

        this.handleMenuAction(shortcut.action)
      }
    },

    handleKeyUp(e) {
      // 松开空格恢复之前的工具
      if (e.code === 'Space' && this._prevTool && this.activeTool === 'move') {
        this.switchTool(this._prevTool)
        this._prevTool = null
      }
    }
  },

  mounted() {
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown)
    document.removeEventListener('keyup', this.handleKeyUp)
  }
}
</script>

<style lang="scss" scoped>
.main-editor {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #fff;

  .editor-body {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  .editor-center {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .editor-workspace {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  .tool-props-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background-color: #fafafa;
    border-top: 1px solid #e0e0e0;
    flex-shrink: 0;
    overflow-x: auto;

    .props-label {
      font-size: 12px;
      color: #666;
      white-space: nowrap;
    }

    .props-value {
      font-size: 13px;
      color: #333;
      font-weight: 500;
      min-width: 36px;
    }

    .props-check {
      font-size: 12px;
      color: #666;
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
    }

    .props-color {
      width: 28px;
      height: 28px;
      border: 1px solid #d9d9d9;
      border-radius: 3px;
      cursor: pointer;
      padding: 0;
      background: none;

      &::-webkit-color-swatch-wrapper { padding: 2px; }
      &::-webkit-color-swatch { border: none; border-radius: 2px; }
    }

    .props-select {
      padding: 4px 8px;
      border: 1px solid #d9d9d9;
      border-radius: 3px;
      font-size: 12px;
      background: #fff;
      cursor: pointer;
      outline: none;

      &:focus {
        border-color: #1890ff;
      }
    }

    .props-input {
      width: 70px;
      padding: 4px 6px;
      border: 1px solid #d9d9d9;
      border-radius: 3px;
      font-size: 12px;
      outline: none;

      &:focus {
        border-color: #1890ff;
      }

      &.props-input-num {
        width: 50px;
      }
    }

    .props-range {
      width: 100px;
      cursor: pointer;
    }

    .props-btn {
      padding: 4px 12px;
      border: 1px solid #d9d9d9;
      border-radius: 3px;
      font-size: 12px;
      background: #fff;
      color: #666;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s;

      &:hover {
        border-color: #1890ff;
        color: #1890ff;
      }

      &.props-btn-apply {
        background-color: #1890ff;
        border-color: #1890ff;
        color: #fff;

        &:hover {
          background-color: #40a9ff;
        }

        &:disabled {
          background-color: #b0d4ff;
          border-color: #b0d4ff;
          cursor: not-allowed;
        }
      }
    }
  }
}

/* ===== 通知提示 ===== */
.notification {
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 14px;
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  pointer-events: none;

  &.info { background-color: #e6f7ff; border: 1px solid #91d5ff; color: #333; }
  &.success { background-color: #f6ffed; border: 1px solid #b7eb8f; color: #333; }
  &.error { background-color: #fff2f0; border: 1px solid #ffccc7; color: #333; }
  &.warning { background-color: #fffbe6; border: 1px solid #ffe58f; color: #333; }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter, .fade-leave-to { opacity: 0; }
</style>
