/**
 * 画布模块 - 管理缩放、视口偏移、渲染状态
 */
import { LIMITS } from '@/utils/constants'

const state = {
  zoom: 100,            // 缩放比例 10~500
  offsetX: 0,           // 视口X偏移
  offsetY: 0,           // 视口Y偏移
  mouseX: 0,            // 鼠标X坐标
  mouseY: 0,            // 鼠标Y坐标
  fabricReady: false,   // Fabric.js 是否就绪
  canvasWidth: 0,       // 画布容器宽度
  canvasHeight: 0       // 画布容器高度
}

const getters = {
  zoomText: (state) => `${state.zoom}%`,

  mouseText: (state) => `(${Math.round(state.mouseX)}, ${Math.round(state.mouseY)})`,

  canZoomIn: (state) => state.zoom < LIMITS.ZOOM_MAX,

  canZoomOut: (state) => state.zoom > LIMITS.ZOOM_MIN
}

const mutations = {
  SET_ZOOM(state, zoom) {
    state.zoom = Math.max(LIMITS.ZOOM_MIN, Math.min(LIMITS.ZOOM_MAX, zoom))
  },

  SET_OFFSET(state, { x, y }) {
    state.offsetX = x
    state.offsetY = y
  },

  SET_MOUSE_POS(state, { x, y }) {
    state.mouseX = x
    state.mouseY = y
  },

  SET_FABRIC_READY(state, ready) {
    state.fabricReady = ready
  },

  SET_CANVAS_SIZE(state, { width, height }) {
    state.canvasWidth = width
    state.canvasHeight = height
  }
}

const actions = {
  updateZoom({ commit }, zoom) {
    commit('SET_ZOOM', zoom)
  },

  zoomIn({ commit, state }) {
    const newZoom = state.zoom + LIMITS.ZOOM_STEP
    commit('SET_ZOOM', newZoom)
    return newZoom
  },

  zoomOut({ commit, state }) {
    const newZoom = state.zoom - LIMITS.ZOOM_STEP
    commit('SET_ZOOM', newZoom)
    return newZoom
  },

  setFabricReady({ commit }, ready) {
    commit('SET_FABRIC_READY', ready)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
