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