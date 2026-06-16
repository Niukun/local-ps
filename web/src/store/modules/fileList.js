/**
 * 文件列表模块 - 管理已打开文件的状态
 */
import { INPUT_FILE_FORMATS } from '@/utils/constants'
import { generateFileId, getFileExtension } from '@/utils/fileUtils'

const state = {
  files: [],           // [{ id, name, size, dimensions, thumbnail, dataUrl, format, originalFile }]
  activeFileId: null,
  loading: false
}

const getters = {
  activeFile: (state) => {
    return state.files.find(f => f.id === state.activeFileId) || null
  },

  fileCount: (state) => state.files.length,

  activeFileIndex: (state) => {
    return state.files.findIndex(f => f.id === state.activeFileId)
  },

  hasActiveFile: (state) => state.activeFileId !== null,

  supportedFormats: () => Object.values(INPUT_FILE_FORMATS)
}

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading
  },

  ADD_FILE(state, file) {
    state.files.push(file)
  },

  SET_ACTIVE_FILE(state, fileId) {
    state.activeFileId = fileId
  },

  REMOVE_FILE(state, fileId) {
    const idx = state.files.findIndex(f => f.id === fileId)
    if (idx === -1) return

    state.files.splice(idx, 1)

    // 如果关闭的是当前活跃文件，切换为相邻文件
    if (state.activeFileId === fileId) {
      if (state.files.length > 0) {
        const newIdx = Math.min(idx, state.files.length - 1)
        state.activeFileId = state.files[newIdx].id
      } else {
        state.activeFileId = null
      }
    }
  },

  REMOVE_ALL_FILES(state) {
    state.files = []
    state.activeFileId = null
  },

  UPDATE_FILE(state, { fileId, updates }) {
    const file = state.files.find(f => f.id === fileId)
    if (file) {
      Object.assign(file, updates)
    }
  },

  REORDER_FILES(state, newOrder) {
    state.files = newOrder
  }
}

const actions = {
  addFile({ commit }, fileInfo) {
    const file = {
      id: generateFileId(),
      name: fileInfo.name,
      size: fileInfo.size,
      dimensions: fileInfo.dimensions || { width: 0, height: 0 },
      thumbnail: fileInfo.thumbnail || '',
      dataUrl: fileInfo.dataUrl || '',
      format: getFileExtension(fileInfo.name).toLowerCase(),
      originalFile: fileInfo.originalFile || null
    }
    commit('ADD_FILE', file)
    return file
  },

  setActiveFile({ commit }, fileId) {
    commit('SET_ACTIVE_FILE', fileId)
  },

  removeFile({ commit, state }, fileId) {
    commit('REMOVE_FILE', fileId)
    return state.files
  },

  switchToNext({ commit, state }) {
    const idx = state.files.findIndex(f => f.id === state.activeFileId)
    if (idx < state.files.length - 1) {
      commit('SET_ACTIVE_FILE', state.files[idx + 1].id)
    }
  },

  switchToPrev({ commit, state }) {
    const idx = state.files.findIndex(f => f.id === state.activeFileId)
    if (idx > 0) {
      commit('SET_ACTIVE_FILE', state.files[idx - 1].id)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
