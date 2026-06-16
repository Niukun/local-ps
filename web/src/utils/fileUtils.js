/**
 * 文件操作工具函数
 */

// ===== 文件校验 =====
export function isValidImageFile(file) {
  const validExts = ['jpg', 'jpeg', 'png']
  const ext = getFileExtension(file.name)
  return validExts.includes(ext.toLowerCase())
}

export function isFileSizeValid(file) {
  const MAX_SIZE = 50 * 1024 * 1024   // 50MB
  return file.size <= MAX_SIZE
}

export function getFileExtension(filename) {
  const parts = filename.split('.')
  return parts.length > 1 ? parts.pop() : ''
}

// ===== 文件读取 =====
export function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = (e) => reject(new Error('文件读取失败'))
    reader.readAsDataURL(file)
  })
}

export function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = (e) => reject(new Error('文件读取失败'))
    reader.readAsArrayBuffer(file)
  })
}

// ===== 图片信息提取 =====
export function getImageInfo(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      })
    }
    img.onerror = () => reject(new Error('图片加载失败'))
    img.src = dataUrl
  })
}

// ===== 缩略图生成 =====
export function generateThumbnail(dataUrl, size = 48) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const ratio = Math.min(size / img.width, size / img.height)
      canvas.width = img.width * ratio
      canvas.height = img.height * ratio
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/jpeg', 0.7))
    }
    img.src = dataUrl
  })
}

// ===== 文件大小格式化 =====
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + units[i]
}

// ===== Canvas 导出 =====
export function canvasToBlob(canvas, format = 'image/jpeg', quality = 0.85) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      } else {
        reject(new Error('Canvas 导出失败'))
      }
    }, format, quality)
  })
}

// ===== 下载触发 =====
export function triggerDownload(url, filename) {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function triggerDownloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  triggerDownload(url, filename)
  URL.revokeObjectURL(url)
}

// ===== 文件名处理 =====
export function getBaseFileName(filename) {
  const ext = getFileExtension(filename)
  return filename.slice(0, filename.length - ext.length - 1)
}

export function generateExportFileName(originalName, format, rule, customPrefix = '', index = 0) {
  const baseName = getBaseFileName(originalName)
  switch (rule) {
    case 'original':
      return `${baseName}_编辑.${format}`
    case 'auto_num': {
      const num = String(index + 1).padStart(3, '0')
      return `${num}.${format}`
    }
    case 'custom': {
      const prefix = customPrefix || 'export'
      const num = String(index + 1).padStart(3, '0')
      return `${prefix}_${num}.${format}`
    }
    default:
      return `${baseName}.${format}`
  }
}

// ===== 文件 ID 生成 =====
let fileIdCounter = 0
export function generateFileId() {
  return `file_${Date.now()}_${++fileIdCounter}`
}
