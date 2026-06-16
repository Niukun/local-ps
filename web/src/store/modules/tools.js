/**
 * 工具模块 - 管理当前激活工具及参数状态
 */
import { TOOLS, LIMITS, CROP_MODE } from '@/utils/constants'

const state = {
  activeTool: TOOLS.SELECT,

  // ===== 裁剪参数 =====
  cropMode: CROP_MODE.FREE,
  cropRatio: '1:1',
  cropWidth: 800,
  cropHeight: 600,
  cropX: 0,
  cropY: 0,
  cropActive: false,

  // ===== 旋转参数 =====
  rotationAngle: 0,

  // ===== 纠偏参数 =====
  correctionSensitivity: LIMITS.SENSITIVITY_DEFAULT,
  correctionAngle: 0,
  correctionActive: false,

  // ===== 去黑孔参数 =====
  deblackEdge: true,
  deblackHole: false,
  deblackSensitivity: LIMITS.SENSITIVITY_DEFAULT,
  deblackFillColor: '#ffffff',
  deblackManual: false,

  // ===== AI 抠图参数 =====
  cutoutMode: 'auto',
  cutoutFeather: LIMITS.FEATHER_DEFAULT,
  cutoutSmooth: LIMITS.SMOOTH_DEFAULT,
  cutoutBgMode: 'transparent',
  cutoutBgColor: '#ffffff',
  cutoutProcessing: false,

  // ===== 色彩调整参数 =====
  colorBrightness: LIMITS.COLOR_ADJUST_DEFAULT,
  colorContrast: LIMITS.COLOR_ADJUST_DEFAULT,
  colorSaturation: LIMITS.COLOR_ADJUST_DEFAULT,
  colorTemperature: LIMITS.COLOR_ADJUST_DEFAULT,

  // ===== 图像拼接参数 =====
  stitchDirection: 'horizontal',
  stitchGap: LIMITS.STITCH_GAP_DEFAULT,
  stitchAlign: 'center',
  stitchSelected: [],

  // ===== 图像分割参数 =====
  splitDirection: 'horizontal',
  splitMode: 'equal',
  splitCount: LIMITS.SPLIT_COUNT_DEFAULT,
  splitRatios: [],

  // ===== 批量处理参数 =====
  batchOperations: [],
  batchSelected: [],
  batchStatus: 'pending'
}

const getters = {
  activeToolName: (state) => state.activeTool,
  adjustmentParams: (state) => ({
    brightness: state.colorBrightness,
    contrast: state.colorContrast,
    saturation: state.colorSaturation,
    temperature: state.colorTemperature
  })
}

const mutations = {
  SET_TOOL(state, tool) {
    state.activeTool = tool
  },

  // ===== 裁剪 =====
  SET_CROP_MODE(state, mode) { state.cropMode = mode },
  SET_CROP_RATIO(state, ratio) { state.cropRatio = ratio },
  SET_CROP_DIMENSIONS(state, { width, height }) {
    state.cropWidth = width
    state.cropHeight = height
  },
  SET_CROP_ACTIVE(state, active) { state.cropActive = active },

  // ===== 旋转 =====
  SET_ROTATION_ANGLE(state, angle) { state.rotationAngle = angle },

  // ===== 纠偏 =====
  SET_CORRECTION_SENSITIVITY(state, val) { state.correctionSensitivity = val },
  SET_CORRECTION_ANGLE(state, angle) { state.correctionAngle = angle },
  SET_CORRECTION_ACTIVE(state, active) { state.correctionActive = active },

  // ===== 去黑孔 =====
  SET_DEBLACK_EDGE(state, val) { state.deblackEdge = val },
  SET_DEBLACK_HOLE(state, val) { state.deblackHole = val },
  SET_DEBLACK_SENSITIVITY(state, val) { state.deblackSensitivity = val },
  SET_DEBLACK_FILL_COLOR(state, color) { state.deblackFillColor = color },
  SET_DEBLACK_MANUAL(state, val) { state.deblackManual = val },

  // ===== AI 抠图 =====
  SET_CUTOUT_MODE(state, mode) { state.cutoutMode = mode },
  SET_CUTOUT_FEATHER(state, val) { state.cutoutFeather = val },
  SET_CUTOUT_SMOOTH(state, val) { state.cutoutSmooth = val },
  SET_CUTOUT_BG_MODE(state, mode) { state.cutoutBgMode = mode },
  SET_CUTOUT_BG_COLOR(state, color) { state.cutoutBgColor = color },
  SET_CUTOUT_PROCESSING(state, val) { state.cutoutProcessing = val },

  // ===== 色彩调整 =====
  SET_COLOR_BRIGHTNESS(state, val) { state.colorBrightness = val },
  SET_COLOR_CONTRAST(state, val) { state.colorContrast = val },
  SET_COLOR_SATURATION(state, val) { state.colorSaturation = val },
  SET_COLOR_TEMPERATURE(state, val) { state.colorTemperature = val },

  // ===== 拼接 =====
  SET_STITCH_DIRECTION(state, dir) { state.stitchDirection = dir },
  SET_STITCH_GAP(state, gap) { state.stitchGap = gap },
  SET_STITCH_ALIGN(state, align) { state.stitchAlign = align },
  SET_STITCH_SELECTED(state, selected) { state.stitchSelected = selected },

  // ===== 分割 =====
  SET_SPLIT_DIRECTION(state, dir) { state.splitDirection = dir },
  SET_SPLIT_MODE(state, mode) { state.splitMode = mode },
  SET_SPLIT_COUNT(state, count) { state.splitCount = count },
  SET_SPLIT_RATIOS(state, ratios) { state.splitRatios = ratios },

  // ===== 批量 =====
  SET_BATCH_OPERATIONS(state, ops) { state.batchOperations = ops },
  SET_BATCH_SELECTED(state, selected) { state.batchSelected = selected },
  SET_BATCH_STATUS(state, status) { state.batchStatus = status },

  // 重置当前工具所有参数
  RESET_TOOL_PARAMS(state) {
    state.cropActive = false
    state.rotationAngle = 0
    state.correctionAngle = 0
    state.correctionActive = false
    state.colorBrightness = LIMITS.COLOR_ADJUST_DEFAULT
    state.colorContrast = LIMITS.COLOR_ADJUST_DEFAULT
    state.colorSaturation = LIMITS.COLOR_ADJUST_DEFAULT
    state.colorTemperature = LIMITS.COLOR_ADJUST_DEFAULT
  }
}

const actions = {
  switchTool({ commit }, tool) {
    commit('SET_TOOL', tool)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
