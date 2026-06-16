const PI = Math.PI;

function getBrightness(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function isDark(brightness, threshold) {
  return brightness < threshold;
}

function getPixelIndex(x, y, width) {
  return (y * width + x) * 4;
}

function buildDarkSet(imageData, threshold, edgeRange) {
  const { data, width, height } = imageData;
  const darkSet = new Set();

  function addIfDark(x, y) {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const i = getPixelIndex(x, y, width);
    const brightness = getBrightness(data[i], data[i + 1], data[i + 2]);
    if (isDark(brightness, threshold)) {
      darkSet.add(x + ',' + y);
    }
  }

  const topLimit = Math.min(edgeRange, height);
  for (let y = 0; y < topLimit; y++) {
    for (let x = 0; x < width; x++) {
      addIfDark(x, y);
    }
  }

  const bottomStart = Math.max(0, height - edgeRange);
  for (let y = bottomStart; y < height; y++) {
    for (let x = 0; x < width; x++) {
      addIfDark(x, y);
    }
  }

  const leftLimit = Math.min(edgeRange, width);
  for (let x = 0; x < leftLimit; x++) {
    for (let y = 0; y < height; y++) {
      addIfDark(x, y);
    }
  }

  const rightStart = Math.max(0, width - edgeRange);
  for (let x = rightStart; x < width; x++) {
    for (let y = 0; y < height; y++) {
      addIfDark(x, y);
    }
  }

  return darkSet;
}

export function detectBlackEdges(imageData, sensitivity, edgeRange) {
  if (sensitivity === undefined) sensitivity = 5;
  if (edgeRange === undefined) edgeRange = 50;

  const threshold = 255 - sensitivity * 20;
  const darkSet = buildDarkSet(imageData, threshold, edgeRange);

  const result = [];
  for (const key of darkSet) {
    const [x, y] = key.split(',').map(Number);
    result.push({ x, y });
  }

  return result;
}

export function detectBindingHoles(imageData, sensitivity, edgeRange) {
  if (sensitivity === undefined) sensitivity = 5;
  if (edgeRange === undefined) edgeRange = 50;

  const { width, height } = imageData;
  const threshold = 255 - sensitivity * 20;
  const darkSet = buildDarkSet(imageData, threshold, edgeRange);

  const visited = new Set();
  const result = [];

  for (const key of darkSet) {
    if (visited.has(key)) continue;

    const queue = [key];
    visited.add(key);
    let head = 0;
    const componentPixels = [];

    while (head < queue.length) {
      const current = queue[head++];
      const [cx, cy] = current.split(',').map(Number);
      componentPixels.push({ x: cx, y: cy });

      const neighbors = [
        [cx - 1, cy],
        [cx + 1, cy],
        [cx, cy - 1],
        [cx, cy + 1]
      ];

      for (const [nx, ny] of neighbors) {
        const nKey = nx + ',' + ny;
        if (darkSet.has(nKey) && !visited.has(nKey)) {
          visited.add(nKey);
          queue.push(nKey);
        }
      }
    }

    const area = componentPixels.length;

    const compSet = new Set();
    for (const p of componentPixels) {
      compSet.add(p.x + ',' + p.y);
    }

    let perimeter = 0;
    for (const p of componentPixels) {
      const { x: cx, y: cy } = p;
      const neighbors = [
        [cx - 1, cy],
        [cx + 1, cy],
        [cx, cy - 1],
        [cx, cy + 1]
      ];
      for (const [nx, ny] of neighbors) {
        if (!compSet.has(nx + ',' + ny)) {
          perimeter++;
        }
      }
    }

    if (area >= 20 && area <= 2000) {
      const circularity = 4 * PI * area / (perimeter * perimeter);
      if (circularity > 0.6) {
        for (const p of componentPixels) {
          result.push(p);
        }
      }
    }
  }

  return result;
}

export function calculateFillColor(imageData, blackPixels, radius) {
  if (radius === undefined) radius = 3;

  const { data, width, height } = imageData;

  const blackSet = new Set();
  for (const p of blackPixels) {
    blackSet.add(p.x + ',' + p.y);
  }

  const samplesR = [];
  const samplesG = [];
  const samplesB = [];

  for (const p of blackPixels) {
    const { x, y } = p;
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
        const key = nx + ',' + ny;
        if (blackSet.has(key)) continue;
        const i = getPixelIndex(nx, ny, width);
        samplesR.push(data[i]);
        samplesG.push(data[i + 1]);
        samplesB.push(data[i + 2]);
      }
    }
  }

  if (samplesR.length === 0) {
    return { r: 255, g: 255, b: 255 };
  }

  function median(arr) {
    arr.sort(function(a, b) { return a - b; });
    var mid = Math.floor(arr.length / 2);
    if (arr.length % 2 === 0) {
      return (arr[mid - 1] + arr[mid]) / 2;
    }
    return arr[mid];
  }

  return {
    r: Math.round(median(samplesR)),
    g: Math.round(median(samplesG)),
    b: Math.round(median(samplesB))
  };
}

export function applyDeblack(imageData, blackPixels, fillColor) {
  const { data, width } = imageData;
  const { r, g, b } = fillColor;

  for (const p of blackPixels) {
    const i = getPixelIndex(p.x, p.y, width);
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
  }

  return imageData;
}
