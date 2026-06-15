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