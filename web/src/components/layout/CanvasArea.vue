<template>
  <div
    class="canvas-area"
    :class="{ 'is-dragover': isDragOver, 'is-empty': !hasActiveFile }"
    :style="{ cursor: cursorStyle }"
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop"
    ref="canvasContainer"
  >
    <!-- 空状态引导 -->
    <div v-if="!hasActiveFile" class="canvas-empty">
      <div class="empty-guide">
        <svg class="empty-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="8" y="8" width="48" height="48" rx="4" />
          <circle cx="28" cy="24" r="6" />
          <path d="M8 44l12-10 8 6 12-10 16 14" />
        </svg>
        <p class="empty-title">拖拽图片到此处打开</p>
        <p class="empty-desc">支持 JPG、JPEG、PNG 格式，最大 50MB</p>
        <button class="empty-btn" @click.stop="$emit('action', 'openFile')">选择文件</button>
      </div>
    </div>

    <!-- Fabric.js 画布 -->
    <canvas
      v-show="hasActiveFile"
      ref="fabricCanvas"
      class="fabric-canvas"
    ></canvas>

    <!-- 裁剪模式 HTML overlay：拦截所有鼠标事件，绕过 Fabric.js 事件系统 -->
    <div
      v-if="hasActiveFile && (interactionMode === 'crop' || interactionMode === 'deblack')"
      class="crop-overlay"
      ref="cropOverlay"
      @mousedown.prevent="onOverlayMouseDown"
      @mousemove.prevent="onOverlayMouseMove"
      @mouseup.prevent="onOverlayMouseUp"
      @dblclick.prevent="onOverlayDblClick"
    ></div>

    <!-- 加载遮罩 -->
    <div v-if="loading" class="canvas-loading">
      <div class="loading-spinner"></div>
      <span>加载中...</span>
    </div>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import { LIMITS } from '@/utils/constants'
import { detectBlackEdges, detectBindingHoles, calculateFillColor, applyDeblack as applyDeblackToImageData } from '@/utils/deblackUtils'
import { detectSkewAngle, createDeskewedImageData } from '@/utils/deskewUtils'

export default {
  name: 'CanvasArea',

  props: {
    hasActiveFile: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    interactionMode: { type: String, default: 'select' },
    cropMode: { type: String, default: 'free' },
    cropRatio: { type: String, default: '1:1' }
  },

  data() {
    return {
      isDragOver: false,
      fabricCanvas: null,
      currentImage: null,

      // ===== 平移状态 =====
      isPanning: false,
      lastPanX: 0,
      lastPanY: 0,

      // ===== 裁剪状态 =====
      isCropping: false,
      cropStartX: 0,
      cropStartY: 0,
      cropRect: null,
      cropMask: null,
      cropApplied: false,

      // ===== 纠偏 =====
      correctionGuide: null,

      // ===== 去黑孔手动模式 =====
      isDeblacking: false,
      deblackStartX: 0,
      deblackStartY: 0,
      deblackRects: [],
      deblackPreviewOverlay: null
    }
  },

  computed: {
    cursorStyle() {
      if (!this.hasActiveFile) return 'default'
      if (this.interactionMode === 'move') return 'grab'
      if (this.interactionMode === 'crop') return 'crosshair'
      return 'default'
    }
  },

  watch: {
    interactionMode(mode, oldMode) {
      if (!this.fabricCanvas) return
      this.exitOldMode(oldMode)
      this.enterMode(mode)
    },

    hasActiveFile(val) {
      if (!val && this.fabricCanvas) {
        this.fabricCanvas.clear()
        this.fabricCanvas.backgroundColor = '#f0f0f0'
        this.fabricCanvas.renderAll()
        this.currentImage = null
      }
    }
  },

  methods: {
    // ==================== 画布初始化 ====================
    initCanvas() {
      if (this.fabricCanvas) return
      const el = this.$refs.fabricCanvas
      if (!el) return

      const container = this.$refs.canvasContainer
      const width = container.clientWidth
      const height = container.clientHeight

      this.fabricCanvas = new fabric.Canvas(el, {
        width, height,
        backgroundColor: '#f0f0f0',
        selection: false,
        preserveObjectStacking: true,
        renderOnAddRemove: true,
        stopContextMenu: true,
        fireRightClick: true,
        enableRetinaScaling: true
      })

      this.fabricCanvas.on('mouse:move', this.onFabricMouseMove)
      this.fabricCanvas.on('mouse:down', this.onFabricMouseDown)
      this.fabricCanvas.on('mouse:up', this.onFabricMouseUp)
      this.fabricCanvas.on('mouse:wheel', this.onFabricMouseWheel)

      this.$emit('canvasReady', this.fabricCanvas)
      this.enterMode(this.interactionMode)
    },

    resizeCanvas() {
      if (!this.fabricCanvas) return
      const container = this.$refs.canvasContainer
      this.fabricCanvas.setWidth(container.clientWidth)
      this.fabricCanvas.setHeight(container.clientHeight)
      this.fabricCanvas.renderAll()
    },

    getCanvasPointer(e) {
      if (!this.fabricCanvas) return { x: 0, y: 0 }
      // 使用 Fabric.js 的 getPointer 将屏幕坐标转换为画布坐标
      const rect = this.$refs.canvasContainer.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      return this.fabricCanvas.getPointer({ clientX: e.clientX, clientY: e.clientY })
    },

    // ==================== 交互模式 ====================
    exitOldMode(mode) {
      if (mode === 'crop') {
        this.clearCropUI()
        this.restoreObjectsInteractive()
      }
      if (mode === 'deblack') {
        this.clearDeblackSelection()
      }
      if (mode === 'move') {
        this.isPanning = false
      }
    },

    enterMode(mode) {
      const canvas = this.fabricCanvas
      if (!canvas) return

      switch (mode) {
        case 'select':
          canvas.selection = true
          canvas.defaultCursor = 'default'
          canvas.hoverCursor = 'move'
          this.restoreObjectsInteractive()
          break
        case 'move':
          canvas.selection = false
          canvas.defaultCursor = 'grab'
          canvas.hoverCursor = 'grab'
          canvas.discardActiveObject()
          canvas.renderAll()
          break
        case 'crop':
          canvas.selection = false
          canvas.defaultCursor = 'crosshair'
          canvas.hoverCursor = 'crosshair'
          canvas.discardActiveObject()
          this.disableObjectsInteractive()
          this.createInitialCropMask()
          canvas.renderAll()
          break
        case 'deblack':
          canvas.selection = false
          canvas.defaultCursor = 'crosshair'
          canvas.hoverCursor = 'crosshair'
          canvas.discardActiveObject()
          canvas.renderAll()
          break
      }
    },

    disableObjectsInteractive() {
      const canvas = this.fabricCanvas
      if (!canvas) return
      this._savedObjectStates = canvas.getObjects().map(obj => ({
        obj, selectable: obj.selectable, evented: obj.evented
      }))
      canvas.getObjects().forEach(obj => {
        obj.selectable = false
        obj.evented = false
      })
    },

    restoreObjectsInteractive() {
      if (!this._savedObjectStates) return
      this._savedObjectStates.forEach(({ obj, selectable, evented }) => {
        obj.selectable = selectable
        obj.evented = evented
      })
      this._savedObjectStates = null
    },

    createInitialCropMask() {
      const canvas = this.fabricCanvas
      if (!canvas) return
      this.clearCropUI()

      // 使用 vpt 计算当前视口范围，精确覆盖可见区域，避免图片漂移
      const vpt = canvas.viewportTransform
      const cw = canvas.getWidth()
      const ch = canvas.getHeight()
      this.cropMask = new fabric.Rect({
        left: -vpt[4] / vpt[0],
        top: -vpt[5] / vpt[3],
        width: cw / vpt[0],
        height: ch / vpt[3],
        fill: 'rgba(0,0,0,0.35)',
        selectable: false,
        evented: false,
        objectCaching: false,
        excludeFromExport: true
      })
      canvas.add(this.cropMask)
    },

    // ==================== 图片加载 ====================
    loadImage(dataUrl) {
      if (!this.fabricCanvas) {
        this.$nextTick(() => {
          if (!this.fabricCanvas) this.initCanvas()
          this.loadImage(dataUrl)
        })
        return
      }
      const canvas = this.fabricCanvas
      fabric.Image.fromURL(dataUrl, (img) => {
        canvas.clear()
        canvas.backgroundColor = '#f0f0f0'
        this.fitImageToCanvas(img)
        canvas.add(img)
        canvas.renderAll()
        this.currentImage = img
        this.$emit('imageLoaded', img)
      }, { crossOrigin: 'anonymous' })
    },

    fitImageToCanvas(img) {
      const canvas = this.fabricCanvas
      const cw = canvas.getWidth()
      const ch = canvas.getHeight()
      const scale = Math.min(cw / img.width, ch / img.height, 1)
      img.set({
        scaleX: scale, scaleY: scale,
        left: (cw - img.width * scale) / 2,
        top: (ch - img.height * scale) / 2,
        lockUniScaling: true
      })
    },

    // ==================== 缩放 ====================
    doZoomIn() {
      return this.applyZoom(this.getCurrentZoom() + LIMITS.ZOOM_STEP)
    },
    doZoomOut() {
      return this.applyZoom(this.getCurrentZoom() - LIMITS.ZOOM_STEP)
    },
    doFitWindow() {
      const canvas = this.fabricCanvas
      if (!canvas) return 100
      const obj = this.currentImage
      if (!obj) return 100
      const cw = canvas.getWidth()
      const ch = canvas.getHeight()
      const ow = obj.getScaledWidth()
      const oh = obj.getScaledHeight()
      const raw = Math.min((cw - 40) / ow, (ch - 40) / oh, 5) * 100
      return this.applyZoom(Math.round(raw), true)
    },
    doActualSize() {
      const canvas = this.fabricCanvas
      if (!canvas) return 100
      const obj = this.currentImage
      if (!obj) return 100
      obj.set({ scaleX: 1, scaleY: 1 })
      obj.setCoords()
      canvas.zoomToPoint(canvas.getCenterPoint(), 1)
      canvas.renderAll()
      return 100
    },
    applyZoom(newZoom, skipLimit = false) {
      const canvas = this.fabricCanvas
      if (!canvas) return 100
      const clamped = skipLimit ? Math.round(newZoom) : Math.max(LIMITS.ZOOM_MIN, Math.min(LIMITS.ZOOM_MAX, Math.round(newZoom)))
      canvas.zoomToPoint(canvas.getCenterPoint(), clamped / 100)
      canvas.renderAll()
      this.$emit('zoomChanged', clamped)
      return clamped
    },
    getCurrentZoom() {
      if (!this.fabricCanvas) return 100
      return Math.round(this.fabricCanvas.getZoom() * 100)
    },

    // ==================== 旋转与翻转 ====================
    rotateLeft() { this.rotateObject(-90) },
    rotateRight() { this.rotateObject(90) },
    rotateObject(angleDelta) {
      const obj = this.currentImage
      if (!obj) return
      this.$emit('beforeOperation', { label: '旋转', type: 'rotate' })
      obj.rotate(obj.angle + angleDelta)
      obj.setCoords()
      this.fabricCanvas.renderAll()
      this.$emit('operationRecorded', { label: '旋转 ' + angleDelta + '°', type: 'rotate' })
    },
    rotateToAngle(angle) {
      const obj = this.currentImage
      if (!obj) return
      obj.rotate(angle)
      obj.setCoords()
      this.fabricCanvas.renderAll()
    },
    flipHorizontal() { this.doFlip(true, false) },
    flipVertical() { this.doFlip(false, true) },
    doFlip(flipX, flipY) {
      const obj = this.currentImage
      if (!obj) return
      this.$emit('beforeOperation', { label: flipX ? '水平翻转' : '垂直翻转', type: 'flip' })
      obj.set({ flipX: !obj.flipX, flipY: !obj.flipY })
      obj.setCoords()
      this.fabricCanvas.renderAll()
      this.$emit('operationRecorded', { label: flipX ? '水平翻转' : '垂直翻转', type: 'flip' })
    },

    // ==================== 裁剪 - HTML overlay 事件处理 ====================
    onOverlayMouseDown(e) {
      if (this.interactionMode === 'crop') {
        this.onCropMouseDown(e)
      } else if (this.interactionMode === 'deblack') {
        this.onDeblackOverlayMouseDown(e)
      }
    },

    onOverlayMouseMove(e) {
      if (this.interactionMode === 'crop') {
        this.onCropMouseMove(e)
      } else if (this.interactionMode === 'deblack') {
        this.onDeblackOverlayMouseMove(e)
      }
    },

    onOverlayMouseUp() {
      if (this.interactionMode === 'crop') {
        this.onCropMouseUp()
      } else if (this.interactionMode === 'deblack') {
        this.onDeblackOverlayMouseUp()
      }
    },

    onOverlayDblClick() {
      if (this.interactionMode === 'crop') {
        this.onCropDblClick()
      }
    },

    onCropMouseDown(e) {
      if (!this.fabricCanvas) return
      const pointer = this.getCanvasPointer(e)
      this.isCropping = true
      this.cropStartX = pointer.x
      this.cropStartY = pointer.y
      // 清除旧裁剪框
      if (this.cropRect) {
        this.fabricCanvas.remove(this.cropRect)
        this.cropRect = null
      }
      this.fabricCanvas.renderAll()
    },

    onCropMouseMove(e) {
      if (!this.isCropping || !this.fabricCanvas) return
      const pointer = this.getCanvasPointer(e)
      this.drawCropRect(this.cropStartX, this.cropStartY, pointer.x, pointer.y)
    },

    onCropMouseUp() {
      this.isCropping = false
    },

    onCropDblClick() {
      if (this.cropRect) {
        this.applyCrop()
      }
    },

    // ==================== 裁剪 - 绘制逻辑 ====================
    startCrop() {
      this.isCropping = false
      this.cropApplied = false
      if (this.cropRect) {
        this.fabricCanvas.remove(this.cropRect)
        this.cropRect = null
      }
      this.fabricCanvas.renderAll()
    },

    drawCropRect(x1, y1, x2, y2) {
      const canvas = this.fabricCanvas
      if (!canvas) return

      const left = Math.min(x1, x2)
      const top = Math.min(y1, y2)
      let width = Math.abs(x2 - x1)
      let height = Math.abs(y2 - y1)

      // 固定比例约束
      if (this.cropMode === 'ratio' && this.cropRatio) {
        const [rw, rh] = this.cropRatio.split(':').map(Number)
        const ratio = rw / rh
        if (width / height > ratio) width = height * ratio
        else height = width / ratio
      }

      // 重新创建遮罩（4块矩形围住裁剪区，中间镂空）
      if (this.cropMask) canvas.remove(this.cropMask)

      const mk = (lx, ly, lw, lh) => new fabric.Rect({
        left: lx, top: ly, width: lw, height: lh,
        fill: 'rgba(0,0,0,0.35)',
        selectable: false, evented: false, objectCaching: false
      })
      const cw = canvas.getWidth()
      const ch = canvas.getHeight()
      const right = left + width
      const bottom = top + height
      this.cropMask = new fabric.Group([
        mk(-999, -999, 9999, top + 999),
        mk(-999, top, left + 999, height),
        mk(right, top, 9999, height),
        mk(-999, bottom, 9999, 9999)
      ], { selectable: false, evented: false, objectCaching: false })

      if (this.cropRect) canvas.remove(this.cropRect)
      this.cropRect = new fabric.Rect({
        left, top, width, height,
        fill: 'transparent',
        stroke: '#1890ff',
        strokeWidth: 2,
        selectable: false, evented: false,
        objectCaching: false,
        hasControls: false, hasBorders: false
      })

      canvas.add(this.cropMask)
      canvas.add(this.cropRect)
      canvas.renderAll()
    },

    applyCrop() {
      const canvas = this.fabricCanvas
      if (!canvas || !this.cropRect) return

      const rect = this.cropRect
      const cropLeft = rect.left
      const cropTop = rect.top
      const cropWidth = rect.getScaledWidth()
      const cropHeight = rect.getScaledHeight()

      // 先清除遮罩，露出干净原图
      this.clearCropUI()

      // 保存干净状态用于撤销
      this.$emit('beforeOperation', { label: '裁剪', type: 'crop' })

      // 提取裁剪区域
      const dataUrl = canvas.toDataURL({
        format: 'png',
        left: cropLeft, top: cropTop,
        width: cropWidth, height: cropHeight
      })

      // 恢复并加载裁剪结果
      this.loadImage(dataUrl)
      this.cropApplied = true
      this.$emit('operationRecorded', { label: '裁剪', type: 'crop' })
      this.$emit('cropComplete')
    },

    cancelCrop() {
      this.clearCropUI()
      this.restoreObjectsInteractive()
      this.isCropping = false
      this.fabricCanvas.renderAll()
      this.$emit('cropCancelled')
    },

    clearCropUI() {
      const canvas = this.fabricCanvas
      if (!canvas) return
      if (this.cropMask) { canvas.remove(this.cropMask); this.cropMask = null }
      if (this.cropRect) { canvas.remove(this.cropRect); this.cropRect = null }
      canvas.renderAll()
    },

    // ==================== 纠偏 ====================
    showCorrectionGuide(angle) {
      const canvas = this.fabricCanvas
      if (!canvas) return
      if (this.correctionGuide) canvas.remove(this.correctionGuide)

      const rad = (angle * Math.PI) / 180
      const cw = canvas.getWidth()
      const ch = canvas.getHeight()
      const cx = cw / 2
      const cy = ch / 2
      const len = Math.max(cw, ch)
      const x1 = cx - Math.cos(rad) * len
      const y1 = cy - Math.sin(rad) * len
      const x2 = cx + Math.cos(rad) * len
      const y2 = cy + Math.sin(rad) * len

      this.correctionGuide = new fabric.Line([x1, y1, x2, y2], {
        stroke: '#ff4d4f',
        strokeWidth: 1,
        strokeDashArray: [8, 4],
        selectable: false,
        evented: false
      })
      canvas.add(this.correctionGuide)
      canvas.renderAll()
    },

    applyDeskew(angle) {
      const canvas = this.fabricCanvas
      if (!canvas || !this.currentImage) return
      if (this.correctionGuide) { canvas.remove(this.correctionGuide); this.correctionGuide = null }

      const dataUrl = canvas.toDataURL({ format: 'png', multiplier: 1 })
      const img = new Image()
      img.onload = () => {
        const offCanvas = document.createElement('canvas')
        offCanvas.width = img.width
        offCanvas.height = img.height
        const ctx = offCanvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        const imageData = ctx.getImageData(0, 0, img.width, img.height)

        const result = createDeskewedImageData(imageData, angle)
        const outCanvas = document.createElement('canvas')
        outCanvas.width = result.width
        outCanvas.height = result.height
        const outCtx = outCanvas.getContext('2d')
        outCtx.putImageData(result.imageData, 0, 0)

        this.loadImage(outCanvas.toDataURL('image/png'))
        this.$emit('deskewApplied')
      }
      img.src = dataUrl
    },

    // ==================== 去黑孔 ====================
    clearDeblackOverlay() {
      const canvas = this.fabricCanvas
      if (!canvas) return
      if (this.deblackPreviewOverlay) { canvas.remove(this.deblackPreviewOverlay); this.deblackPreviewOverlay = null }
      this.deblackRects.forEach(r => canvas.remove(r))
      this.deblackRects = []
      canvas.renderAll()
    },

    clearDeblackSelection() {
      const canvas = this.fabricCanvas
      if (!canvas) return
      if (this.deblackPreviewOverlay) { canvas.remove(this.deblackPreviewOverlay); this.deblackPreviewOverlay = null }
      canvas.renderAll()
      this.isDeblacking = false
    },

    onDeblackOverlayMouseDown(e) {
      if (!this.fabricCanvas) return
      const pointer = this.getCanvasPointer(e)
      this.isDeblacking = true
      this.deblackStartX = pointer.x
      this.deblackStartY = pointer.y
    },

    onDeblackOverlayMouseMove(e) {
      if (!this.isDeblacking || !this.fabricCanvas) return
      const pointer = this.getCanvasPointer(e)
      const canvas = this.fabricCanvas
      if (this.deblackRects.length > 0) {
        const last = this.deblackRects[this.deblackRects.length - 1]
        canvas.remove(last)
        this.deblackRects.pop()
      }
      const left = Math.min(this.deblackStartX, pointer.x)
      const top = Math.min(this.deblackStartY, pointer.y)
      const width = Math.abs(pointer.x - this.deblackStartX)
      const height = Math.abs(pointer.y - this.deblackStartY)
      const rect = new fabric.Rect({
        left, top, width, height,
        fill: 'rgba(255, 77, 79, 0.15)',
        stroke: '#ff4d4f',
        strokeWidth: 1,
        selectable: false,
        evented: false
      })
      this.deblackRects.push(rect)
      canvas.add(rect)
      canvas.renderAll()
    },

    onDeblackOverlayMouseUp() {
      this.isDeblacking = false
    },

    previewDeblack(opts) {
      const canvas = this.fabricCanvas
      if (!canvas) return
      this.clearDeblackOverlay()

      const rawDataUrl = canvas.toDataURL({ format: 'png', multiplier: 2 })
      const img = new Image()
      img.onload = () => {
        const offCanvas = document.createElement('canvas')
        offCanvas.width = img.width
        offCanvas.height = img.height
        const ctx = offCanvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        const imageData = ctx.getImageData(0, 0, img.width, img.height)

        let allPixels = []
        const scaleFactor = img.width / canvas.getWidth()
        const edgeRange = Math.round(LIMITS.DEBLACK_EDGE_RANGE * scaleFactor)
        if (opts.edge) {
          allPixels = allPixels.concat(detectBlackEdges(imageData, opts.sensitivity, edgeRange))
        }
        if (opts.hole) {
          allPixels = allPixels.concat(detectBindingHoles(imageData, opts.sensitivity, edgeRange))
        }

        if (allPixels.length === 0) return

        const fillColor = calculateFillColor(imageData, allPixels)
        applyDeblackToImageData(imageData, allPixels, fillColor)
        ctx.putImageData(imageData, 0, 0)

        const processedUrl = offCanvas.toDataURL('image/png')
        fabric.Image.fromURL(processedUrl, (previewImg) => {
          previewImg.set({
            left: 0, top: 0,
            selectable: false, evented: false,
            opacity: 0.5
          })
          previewImg.scaleToWidth(canvas.getWidth())
          this.deblackPreviewOverlay = previewImg
          canvas.add(this.deblackPreviewOverlay)
          canvas.renderAll()
        }, { crossOrigin: 'anonymous' })
      }
      img.src = rawDataUrl
    },

    applyDeblack(opts) {
      const canvas = this.fabricCanvas
      if (!canvas) return

      const dataUrl = canvas.toDataURL({ format: 'png', multiplier: 2 })
      const img = new Image()
      img.onload = () => {
        const offCanvas = document.createElement('canvas')
        offCanvas.width = img.width
        offCanvas.height = img.height
        const ctx = offCanvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        const imageData = ctx.getImageData(0, 0, img.width, img.height)

        let allPixels = []
        const w = img.width
        const scaleFactor = w / canvas.getWidth()
        const edgeRange = Math.round(LIMITS.DEBLACK_EDGE_RANGE * scaleFactor)
        if (opts.edge) {
          allPixels = allPixels.concat(detectBlackEdges(imageData, opts.sensitivity, edgeRange))
        }
        if (opts.hole) {
          allPixels = allPixels.concat(detectBindingHoles(imageData, opts.sensitivity, edgeRange))
        }

        // 添加手动框选区
        const vpt = canvas.viewportTransform
        this.deblackRects.forEach(rect => {
          const rLeft = Math.round((rect.left * vpt[0] + vpt[4]) * scaleFactor)
          const rTop = Math.round((rect.top * vpt[3] + vpt[5]) * scaleFactor)
          const rWidth = Math.round(rect.getScaledWidth() * vpt[0] * scaleFactor)
          const rHeight = Math.round(rect.getScaledHeight() * vpt[3] * scaleFactor)
          for (let y = rTop; y < rTop + rHeight; y++) {
            for (let x = rLeft; x < rLeft + rWidth; x++) {
              if (x >= 0 && x < w && y >= 0 && y < img.height) {
                allPixels.push({ x, y })
              }
            }
          }
        })

        if (allPixels.length === 0) { this.$emit('deblackApplied'); return }

        let fillColor = opts.fillColor
        if (fillColor.startsWith('#')) {
          const r = parseInt(fillColor.slice(1, 3), 16)
          const g = parseInt(fillColor.slice(3, 5), 16)
          const b = parseInt(fillColor.slice(5, 7), 16)
          fillColor = { r, g, b }
        } else {
          fillColor = calculateFillColor(imageData, allPixels)
        }
        applyDeblackToImageData(imageData, allPixels, fillColor)
        ctx.putImageData(imageData, 0, 0)

        this.clearDeblackOverlay()
        this.loadImage(offCanvas.toDataURL('image/png'))
        this.$emit('deblackApplied')
      }
      img.src = dataUrl
    },

    cancelDeblack() {
      this.clearDeblackOverlay()
      this.clearDeblackSelection()
    },

    // ==================== 色彩调整 ====================
    applyColorFilter(filterStr) {
      const el = this.$refs.canvasContainer
      if (el) {
        el.style.filter = filterStr
      }
    },

    bakeColorFilter() {
      const canvas = this.fabricCanvas
      if (!canvas || !this.currentImage) return
      const container = this.$refs.canvasContainer
      const filterStr = container ? container.style.filter : ''
      if (!filterStr || filterStr === 'none') return

      const el = canvas.lowerCanvasEl
      const offCanvas = document.createElement('canvas')
      offCanvas.width = el.width
      offCanvas.height = el.height
      const ctx = offCanvas.getContext('2d')
      ctx.filter = filterStr
      ctx.drawImage(el, 0, 0)

      this.loadImage(offCanvas.toDataURL('image/png'))
    },

    // ==================== Fabric.js 事件（非裁剪模式用） ====================
    onFabricMouseMove(opt) {
      const pointer = this.fabricCanvas.getPointer(opt.e)
      this.$emit('mouseMoved', { x: pointer.x, y: pointer.y })

      if (this.interactionMode !== 'move') return
      if (!this.isPanning) return
      const vpt = this.fabricCanvas.viewportTransform
      vpt[4] += pointer.x - this.lastPanX
      vpt[5] += pointer.y - this.lastPanY
      this.lastPanX = pointer.x
      this.lastPanY = pointer.y
      this.fabricCanvas.requestRenderAll()
    },

    onFabricMouseDown(opt) {
      if (this.interactionMode !== 'move') return
      this.isPanning = true
      const pointer = this.fabricCanvas.getPointer(opt.e)
      this.lastPanX = pointer.x
      this.lastPanY = pointer.y
      this.fabricCanvas.defaultCursor = 'grabbing'
    },

    onFabricMouseUp() {
      if (this.isPanning) {
        this.isPanning = false
        if (this.fabricCanvas) this.fabricCanvas.defaultCursor = 'grab'
      }
    },

    onFabricMouseWheel(opt) {
      const e = opt.e
      if (!e.ctrlKey && !e.metaKey) return
      e.preventDefault()
      e.stopPropagation()
      const zoom = this.fabricCanvas.getZoom()
      let newZoom = zoom * (e.deltaY < 0 ? 1.1 : 0.9)
      const clamped = Math.max(LIMITS.ZOOM_MIN / 100, Math.min(LIMITS.ZOOM_MAX / 100, newZoom))
      this.fabricCanvas.zoomToPoint(new fabric.Point(e.offsetX, e.offsetY), clamped)
      this.fabricCanvas.renderAll()
      this.$emit('zoomChanged', Math.round(clamped * 100))
    },

    // ==================== 外部调用 ====================
    getCanvasJSON() {
      return this.fabricCanvas ? JSON.stringify(this.fabricCanvas.toJSON()) : null
    },

    loadCanvasJSON(jsonStr) {
      if (!this.fabricCanvas || !jsonStr) return
      const parsed = JSON.parse(jsonStr)
      this.fabricCanvas.loadFromJSON(parsed, () => {
        const objs = this.fabricCanvas.getObjects()
        if (objs.length > 0) {
          this.currentImage = objs[0]
        }
        this.fabricCanvas.renderAll()
        this.$emit('stateRestored')
      })
    },

    exportToDataURL(format = 'jpeg', quality = 0.85) {
      if (!this.fabricCanvas) return null
      return this.fabricCanvas.toDataURL({ format, quality, multiplier: 1 })
    },

    // ==================== 拖拽上传 ====================
    handleDragOver(e) {
      this.isDragOver = true
      e.dataTransfer.dropEffect = 'copy'
    },
    handleDragLeave() { this.isDragOver = false },
    handleDrop(e) {
      this.isDragOver = false
      const files = e.dataTransfer.files
      if (files.length > 0) this.$emit('filesDropped', Array.from(files))
    }
  },

  mounted() {
    this.$nextTick(() => {
      if (this.hasActiveFile) this.initCanvas()
    })
    window.addEventListener('resize', this.resizeCanvas)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeCanvas)
    if (this.fabricCanvas) {
      this.fabricCanvas.dispose()
      this.fabricCanvas = null
    }
  }
}
</script>

<style lang="scss" scoped>
.canvas-area {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e8e8e8;
  overflow: hidden;

  &.is-dragover {
    .canvas-empty {
      border-color: #1890ff;
      background-color: rgba(24, 144, 255, 0.05);
    }
  }

  .fabric-canvas {
    display: block;
  }

  .crop-overlay {
    position: absolute;
    inset: 0;
    z-index: 5;
    cursor: crosshair;
  }

  .canvas-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    border: 2px dashed #ccc;
    border-radius: 8px;
    background-color: #fafafa;
    transition: border-color 0.2s, background-color 0.2s;

    .empty-guide {
      text-align: center;
      color: #999;

      .empty-icon {
        width: 64px;
        height: 64px;
        margin-bottom: 16px;
        color: #ccc;
      }

      .empty-title {
        margin-bottom: 8px;
        font-size: 16px;
        color: #666;
      }

      .empty-desc {
        margin-bottom: 20px;
        font-size: 13px;
        color: #999;
      }

      .empty-btn {
        padding: 8px 24px;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        background: #fff;
        color: #333;
        font-size: 14px;
        cursor: pointer;

        &:hover {
          border-color: #1890ff;
          color: #1890ff;
        }
      }
    }
  }

  .canvas-loading {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.85);
    z-index: 10;

    .loading-spinner {
      width: 32px;
      height: 32px;
      margin-bottom: 10px;
      border: 3px solid #e0e0e0;
      border-top-color: #1890ff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    span {
      font-size: 13px;
      color: #666;
    }
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
