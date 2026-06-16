/**
 * Canvas / Fabric.js 工具函数
 */

import { fabric } from 'fabric'
import { LIMITS } from './constants'

// ===== 画布初始化 =====
export function createFabricCanvas(canvasEl, options = {}) {
  return new fabric.Canvas(canvasEl, {
    width: options.width || 800,
    height: options.height || 600,
    backgroundColor: options.backgroundColor || '#f0f0f0',
    selection: false,
    preserveObjectStacking: true,
    renderOnAddRemove: true,
    stopContextMenu: true,
    fireRightClick: true,
    enableRetinaScaling: true,
    devicePixelRatio: window.devicePixelRatio || 1
  })
}

// ===== 图片加载到画布 =====
export function loadImageToCanvas(canvas, dataUrl) {
  return new Promise((resolve, reject) => {
    fabric.Image.fromURL(dataUrl, (img) => {
      // 清除画布现有内容
      canvas.clear()
      canvas.backgroundColor = '#f0f0f0'

      // 缩放图片适应画布
      const canvasWidth = canvas.getWidth()
      const canvasHeight = canvas.getHeight()
      const scale = Math.min(
        canvasWidth / img.width,
        canvasHeight / img.height,
        1
      )
      img.set({
        scaleX: scale,
        scaleY: scale,
        left: (canvasWidth - img.width * scale) / 2,
        top: (canvasHeight - img.height * scale) / 2
      })

      canvas.add(img)
      canvas.setActiveObject(img)
      canvas.renderAll()
      resolve(img)
    }, { crossOrigin: 'anonymous' })
  })
}

// ===== 缩放控制 =====
export function zoomCanvas(canvas, newZoom, centerPoint) {
  const clamped = Math.max(LIMITS.ZOOM_MIN, Math.min(LIMITS.ZOOM_MAX, newZoom))
  canvas.zoomToPoint(centerPoint || canvas.getCenterPoint(), clamped / 100)
  canvas.renderAll()
  return clamped
}

export function zoomIn(canvas, currentZoom) {
  return zoomCanvas(canvas, currentZoom + LIMITS.ZOOM_STEP)
}

export function zoomOut(canvas, currentZoom) {
  return zoomCanvas(canvas, currentZoom - LIMITS.ZOOM_STEP)
}

export function zoomFitWindow(canvas) {
  const activeObj = canvas.getActiveObject()
  if (!activeObj) return 100

  const canvasWidth = canvas.getWidth()
  const canvasHeight = canvas.getHeight()
  const objWidth = activeObj.getScaledWidth()
  const objHeight = activeObj.getScaledHeight()

  const scale = Math.min(
    (canvasWidth - 40) / objWidth,
    (canvasHeight - 40) / objHeight,
    5
  ) * 100

  const clamped = Math.max(LIMITS.ZOOM_MIN, Math.min(LIMITS.ZOOM_MAX, Math.round(scale)))
  canvas.zoomToPoint(canvas.getCenterPoint(), clamped / 100)
  canvas.renderAll()
  return clamped
}

export function zoomActualSize(canvas) {
  canvas.zoomToPoint(canvas.getCenterPoint(), 1)
  canvas.renderAll()
  return 100
}

// ===== 画布数据导出 =====
export function exportCanvasToDataURL(canvas, format = 'image/jpeg', quality = 0.85) {
  return canvas.toDataURL({
    format: format,
    quality: quality,
    multiplier: 1
  })
}

export function getCanvasImageData(canvas) {
  const activeObj = canvas.getActiveObject()
  if (!activeObj) return null

  // 创建临时画布提取图片
  const tempCanvas = document.createElement('canvas')
  const width = activeObj.getScaledWidth()
  const height = activeObj.getScaledHeight()
  tempCanvas.width = width
  tempCanvas.height = height
  const ctx = tempCanvas.getContext('2d')

  // 将 fabric 画布内容绘制到临时 canvas
  const dataUrl = canvas.toDataURL({
    format: 'png',
    multiplier: 1
  })

  return { dataUrl, width, height }
}
