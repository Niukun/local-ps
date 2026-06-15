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