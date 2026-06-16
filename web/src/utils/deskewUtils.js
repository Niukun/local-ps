const SOBEL_X = [-1, 0, 1, -2, 0, 2, -1, 0, 1]
const SOBEL_Y = [-1, -2, -1, 0, 0, 0, 1, 2, 1]

function rgbToGray(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b
}

function toGrayScale(data, w, h) {
  const len = w * h
  const gray = new Float64Array(len)
  for (let i = 0; i < len; i++) {
    const o = i << 2
    gray[i] = rgbToGray(data[o], data[o + 1], data[o + 2])
  }
  return gray
}

function downscaleImage(imageData, scale) {
  const srcW = imageData.width
  const srcH = imageData.height
  const dstW = Math.max(1, Math.round(srcW * scale))
  const dstH = Math.max(1, Math.round(srcH * scale))

  const srcCanvas = document.createElement('canvas')
  srcCanvas.width = srcW
  srcCanvas.height = srcH
  const srcCtx = srcCanvas.getContext('2d')
  srcCtx.putImageData(imageData, 0, 0)

  const dstCanvas = document.createElement('canvas')
  dstCanvas.width = dstW
  dstCanvas.height = dstH
  const dstCtx = dstCanvas.getContext('2d')
  dstCtx.drawImage(srcCanvas, 0, 0, dstW, dstH)

  return dstCtx.getImageData(0, 0, dstW, dstH)
}

function gaussianBlur(gray, w, h) {
  const result = new Float64Array(w * h)
  for (let y = 1; y < h - 1; y++) {
    const r0 = (y - 1) * w
    const r1 = y * w
    const r2 = (y + 1) * w
    for (let x = 1; x < w - 1; x++) {
      const tl = gray[r0 + (x - 1)]
      const tc = gray[r0 + x]
      const tr = gray[r0 + (x + 1)]
      const cl = gray[r1 + (x - 1)]
      const cc = gray[r1 + x]
      const cr = gray[r1 + (x + 1)]
      const bl = gray[r2 + (x - 1)]
      const bc = gray[r2 + x]
      const br = gray[r2 + (x + 1)]
      result[y * w + x] = (tl + 2 * tc + tr + 2 * cl + 4 * cc + 2 * cr + bl + 2 * bc + br) / 16
    }
  }
  return result
}

function sobelGradient(gray, w, h) {
  const magnitude = new Float64Array(w * h)
  const direction = new Float64Array(w * h)
  for (let y = 1; y < h - 1; y++) {
    const r0 = (y - 1) * w
    const r1 = y * w
    const r2 = (y + 1) * w
    for (let x = 1; x < w - 1; x++) {
      const tl = gray[r0 + (x - 1)]
      const tc = gray[r0 + x]
      const tr = gray[r0 + (x + 1)]
      const cl = gray[r1 + (x - 1)]
      const cr = gray[r1 + (x + 1)]
      const bl = gray[r2 + (x - 1)]
      const bc = gray[r2 + x]
      const br = gray[r2 + (x + 1)]
      const gx = -tl + tr - 2 * cl + 2 * cr - bl + br
      const gy = -tl - 2 * tc - tr + bl + 2 * bc + br
      const idx = y * w + x
      magnitude[idx] = Math.sqrt(gx * gx + gy * gy)
      direction[idx] = Math.atan2(gy, gx)
    }
  }
  return { magnitude, direction }
}

function nonMaxSuppression(magnitude, direction, w, h) {
  const result = new Float64Array(w * h)
  for (let y = 1; y < h - 1; y++) {
    const r0 = (y - 1) * w
    const r1 = y * w
    const r2 = (y + 1) * w
    for (let x = 1; x < w - 1; x++) {
      const i = r1 + x
      const mag = magnitude[i]
      if (mag === 0) continue

      let angle = direction[i] * (180 / Math.PI)
      if (angle < 0) angle += 180

      let n1, n2
      if ((angle >= 0 && angle < 22.5) || angle >= 157.5) {
        n1 = magnitude[r1 + (x - 1)]
        n2 = magnitude[r1 + (x + 1)]
      } else if (angle >= 22.5 && angle < 67.5) {
        n1 = magnitude[r0 + (x + 1)]
        n2 = magnitude[r2 + (x - 1)]
      } else if (angle >= 67.5 && angle < 112.5) {
        n1 = magnitude[r0 + x]
        n2 = magnitude[r2 + x]
      } else {
        n1 = magnitude[r0 + (x - 1)]
        n2 = magnitude[r2 + (x + 1)]
      }

      if (mag >= n1 && mag >= n2) {
        result[i] = mag
      }
    }
  }
  return result
}

function cannyEdges(magnitude, w, h, low, high) {
  const len = w * h
  const labels = new Uint8Array(len)
  const edges = new Uint8Array(len)
  const stack = new Int32Array(len)

  for (let i = 0; i < len; i++) {
    const m = magnitude[i]
    if (m >= high) labels[i] = 2
    else if (m >= low) labels[i] = 1
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x
      if (labels[i] !== 2 || edges[i] === 1) continue

      let sp = 0
      stack[sp++] = i
      edges[i] = 1

      while (sp > 0) {
        const p = stack[--sp]
        const px = p % w
        const py = (p / w) | 0

        for (let dy = -1; dy <= 1; dy++) {
          const ny = py + dy
          if (ny < 0 || ny >= h) continue
          const row = ny * w
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue
            const nx = px + dx
            if (nx < 0 || nx >= w) continue
            const ni = row + nx
            if (labels[ni] >= 1 && edges[ni] === 0) {
              edges[ni] = 1
              if (labels[ni] === 2) {
                stack[sp++] = ni
              }
            }
          }
        }
      }
    }
  }

  return edges
}

function countEdges(edges, w, h) {
  let count = 0
  const len = w * h
  for (let i = 0; i < len; i++) {
    if (edges[i] === 1) count++
  }
  return count
}

function computeHoughAngle(edges, w, h) {
  const edgeCount = countEdges(edges, w, h)
  if (edgeCount < 100) return 0

  const minAngle = -45
  const maxAngle = 45
  const angleStep = 0.5
  const numAngleSteps = Math.floor((maxAngle - minAngle) / angleStep) + 1

  const rhoMax = Math.ceil(Math.sqrt(w * w + h * h))
  const numRhoSteps = 2 * rhoMax + 1
  const rhoOffset = rhoMax

  const accumulator = new Float64Array(numRhoSteps * numAngleSteps)
  const cosVals = new Float64Array(numAngleSteps)
  const sinVals = new Float64Array(numAngleSteps)

  for (let i = 0; i < numAngleSteps; i++) {
    const rad = (minAngle + i * angleStep) * (Math.PI / 180)
    cosVals[i] = Math.cos(rad)
    sinVals[i] = Math.sin(rad)
  }

  const xs = new Int32Array(edgeCount)
  const ys = new Int32Array(edgeCount)
  let ei = 0
  for (let y = 0; y < h; y++) {
    const row = y * w
    for (let x = 0; x < w; x++) {
      if (edges[row + x] === 1) {
        xs[ei] = x
        ys[ei] = y
        ei++
      }
    }
  }

  for (let i = 0; i < edgeCount; i++) {
    const x = xs[i]
    const y = ys[i]
    for (let t = 0; t < numAngleSteps; t++) {
      const rho = x * cosVals[t] + y * sinVals[t]
      const rhoIdx = (rho + rhoOffset + 0.5) | 0
      if (rhoIdx >= 0 && rhoIdx < numRhoSteps) {
        accumulator[rhoIdx * numAngleSteps + t]++
      }
    }
  }

  let maxVotes = 0
  let bestAngle = 0
  for (let r = 0; r < numRhoSteps; r++) {
    const offset = r * numAngleSteps
    for (let t = 0; t < numAngleSteps; t++) {
      const v = accumulator[offset + t]
      if (v > maxVotes) {
        maxVotes = v
        bestAngle = minAngle + t * angleStep
      }
    }
  }

  if (maxVotes < 20) return 0

  return bestAngle
}

export function detectSkewAngle(imageData, sensitivity = 5) {
  let w = imageData.width
  let h = imageData.height
  let pixels = imageData.data

  if (Math.max(w, h) > 800) {
    const scale = 800 / Math.max(w, h)
    const scaled = downscaleImage(imageData, scale)
    w = scaled.width
    h = scaled.height
    pixels = scaled.data
  }

  if (w < 3 || h < 3) return 0

  const gray = toGrayScale(pixels, w, h)
  const blurred = gaussianBlur(gray, w, h)
  const sbl = sobelGradient(blurred, w, h)
  const suppressed = nonMaxSuppression(sbl.magnitude, sbl.direction, w, h)

  const low = 30 + sensitivity * 5
  const high = 70 + sensitivity * 10
  const edges = cannyEdges(suppressed, w, h, low, high)

  return computeHoughAngle(edges, w, h)
}

export function createDeskewedImageData(imageData, angle) {
  const w = imageData.width
  const h = imageData.height

  if (angle === 0) {
    return { imageData: imageData, width: w, height: h }
  }

  const canvasW = Math.ceil(w * 1.5)
  const canvasH = Math.ceil(h * 1.5)

  const srcCanvas = document.createElement('canvas')
  srcCanvas.width = w
  srcCanvas.height = h
  const srcCtx = srcCanvas.getContext('2d')
  srcCtx.putImageData(imageData, 0, 0)

  const resultCanvas = document.createElement('canvas')
  resultCanvas.width = canvasW
  resultCanvas.height = canvasH
  const resultCtx = resultCanvas.getContext('2d')

  resultCtx.translate(canvasW / 2, canvasH / 2)
  resultCtx.rotate(-angle * Math.PI / 180)
  resultCtx.drawImage(srcCanvas, -w / 2, -h / 2, w, h)

  const rotatedImageData = resultCtx.getImageData(0, 0, canvasW, canvasH)

  return { imageData: rotatedImageData, width: canvasW, height: canvasH }
}
