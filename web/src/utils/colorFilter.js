const DEFAULT_PARAMS = { brightness: 0, contrast: 0, saturation: 0, temperature: 0 }

function buildFilterString(params) {
  if (typeof params === 'number') {
    params = { ...DEFAULT_PARAMS, temperature: params }
  }
  const { brightness = 0, contrast = 0, saturation = 0, temperature = 0 } = params || {}

  const parts = []

  if (brightness !== 0) {
    parts.push(`brightness(${100 + brightness}%)`)
  }
  if (contrast !== 0) {
    parts.push(`contrast(${100 + contrast}%)`)
  }
  if (saturation !== 0) {
    parts.push(`saturate(${100 + saturation}%)`)
  }
  if (temperature > 0) {
    const t = temperature / 100
    parts.push(`sepia(${t * 0.5})`)
  } else if (temperature < 0) {
    const t = -temperature / 100
    parts.push(`hue-rotate(${-t * 40}deg) saturate(${1 - t * 0.3})`)
  }

  return parts.join(' ')
}

export { buildFilterString, DEFAULT_PARAMS }
