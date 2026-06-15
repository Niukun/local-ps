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