// ===== 文件格式与导出枚举（参见 PRD 总册 §6） =====

export const INPUT_FILE_FORMATS = {
  JPG: 'jpg',
  JPEG: 'jpeg',
  PNG: 'png'
}

export const OUTPUT_FILE_FORMATS = {
  JPG: 'jpg',
  PNG: 'png',
  PDF: 'pdf'
}

export const EXPORT_NAMING_RULE = {
  ORIGINAL: 'original',
  AUTO_NUM: 'auto_num',
  CUSTOM: 'custom'
}

export const CROP_MODE = {
  FREE: 'free',
  RATIO: 'ratio',
  SIZE: 'size'
}

export const CROP_RATIOS = [
  { label: '1:1 正方形', value: '1:1' },
  { label: '4:3 标准', value: '4:3' },
  { label: '16:9 宽屏', value: '16:9' },
  { label: '3:2 照片', value: '3:2' },
  { label: '2:3 竖版', value: '2:3' }
]

export const FLIP_DIRECTION = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical'
}

export const DEBLACK_OPTION = {
  BLACK_EDGE: 'black_edge',
  HOLE: 'hole'
}

export const CUTOUT_MODE = {
  AUTO: 'auto',
  MANUAL: 'manual'
}

export const CUTOUT_BG = {
  COLOR: 'color',
  TRANSPARENT: 'transparent'
}

export const STITCH_DIRECTION = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical'
}

export const STITCH_ALIGN = {
  TOP: 'top',
  CENTER: 'center',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right'
}

export const SPLIT_DIRECTION = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical'
}

export const SPLIT_MODE = {
  EQUAL: 'equal',
  CUSTOM: 'custom'
}

export const BATCH_OP_TYPE = {
  CROP: 'crop',
  ROTATE: 'rotate',
  ADJUST: 'adjust',
  DENOISE: 'denoise',
  CORRECTION: 'correction'
}

export const BATCH_TASK_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled'
}

export const ADJUST_PARAM = {
  BRIGHTNESS: 'brightness',
  CONTRAST: 'contrast',
  SATURATION: 'saturation',
  TEMPERATURE: 'temperature'
}

// ===== 工具枚举 =====

export const TOOLS = {
  SELECT: 'select',
  MOVE: 'move',
  CROP: 'crop',
  ROTATE: 'rotate',
  CORRECTION: 'correction',
  DEBLACK: 'deblack',
  AI_CUTOUT: 'aiCutout',
  COLOR_ADJUST: 'colorAdjust',
  STITCH: 'stitch',
  SPLIT: 'split'
}

// ===== 全局限制常量 =====

export const LIMITS = {
  MAX_FILE_SIZE: 50 * 1024 * 1024,   // 50MB
  MAX_HISTORY_STEPS: 20,
  ZOOM_MIN: 10,
  ZOOM_MAX: 500,
  ZOOM_STEP: 10,
  CANVAS_MIN_CROP: 10,              // 裁剪最小像素
  CORRECTION_ANGLE_MIN: -45,
  CORRECTION_ANGLE_MAX: 45,
  SENSITIVITY_MIN: 1,
  SENSITIVITY_MAX: 10,
  SENSITIVITY_DEFAULT: 5,
  FEATHER_MIN: 0,
  FEATHER_MAX: 20,
  FEATHER_DEFAULT: 2,
  SMOOTH_MIN: 0,
  SMOOTH_MAX: 100,
  SMOOTH_DEFAULT: 50,
  COLOR_ADJUST_MIN: -100,
  COLOR_ADJUST_MAX: 100,
  COLOR_ADJUST_DEFAULT: 0,
  STITCH_GAP_MIN: 0,
  STITCH_GAP_MAX: 100,
  STITCH_GAP_DEFAULT: 0,
  SPLIT_COUNT_MIN: 2,
  SPLIT_COUNT_MAX: 10,
  SPLIT_COUNT_DEFAULT: 2,
  EXPORT_QUALITY_MIN: 1,
  EXPORT_QUALITY_MAX: 100,
  EXPORT_QUALITY_DEFAULT: 85,
  DEBLACK_EDGE_RANGE: 50            // 去黑边检测范围（边缘向内px）
}

// ===== 错误消息 =====

export const ERROR_MSG = {
  FILE_FORMAT_UNSUPPORTED: '不支持的文件格式，仅支持 JPG、JPEG、PNG 格式',
  FILE_TOO_LARGE: '文件大小超过 50MB 限制，无法加载',
  FILE_LOAD_FAILED: '文件加载失败，文件可能已损坏或格式异常',
  FILE_READ_FAILED: '文件读取失败，请检查文件是否可访问',
  MEMORY_INSUFFICIENT: '内存不足，请尝试关闭部分已打开文件后重试',
  SAVE_FAILED: '保存失败，请重试',
  NO_FILE_TO_SAVE: '当前没有可保存的文件',
  NO_FILE_TO_EXPORT: '当前没有可导出的文件',
  EXPORT_FAILED: '导出失败，请重试',
  PDF_NOT_SUPPORTED: '当前浏览器不支持 PDF 导出，请使用 Chrome 或 Edge 浏览器',
  AI_BACKEND_OFFLINE: 'AI 抠图功能需要启动本地后端服务',
  STITCH_NEED_MORE_FILES: '至少需要 2 张图片才能拼接',
  SPLIT_TOO_SMALL: '分割数量过多，每段过小',
  SPLIT_RATIO_INVALID: '各段比例之和必须为 100%',
  STITCH_SIZE_OVERFLOW: '拼接结果尺寸过大，建议减少图片数量',
  BATCH_NO_OPERATION: '请至少选择一项操作',
  BATCH_NO_FILE: '请至少选择一个文件',
  NO_CORRECTION_DETECTED: '未检测到明显倾斜，建议手动微调',
  NO_BLACK_EDGE_DETECTED: '未检测到黑边',
  AI_INFERENCE_TIMEOUT: '推理超时，请重试',
  AI_SERVICE_ERROR: 'AI 服务异常，请检查后端服务状态',
  AI_RESULT_ABNORMAL: '抠图结果异常，请重试或切换模式',
  NO_SELECTION: '请先选择图片'
}
