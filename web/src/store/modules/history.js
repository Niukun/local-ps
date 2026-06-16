/**
 * 操作历史模块 - 管理撤销/恢复栈
 * 每个文件维护独立历史栈，上限 20 步
 */
import { LIMITS } from '@/utils/constants'

const state = {
  // keyed by fileId: { stack: [...], pointer: number }
  stacks: {}
}

const getters = {
  currentStack: (state, getters, rootState) => {
    const fileId = rootState.fileList.activeFileId
    if (!fileId || !state.stacks[fileId]) return null
    return state.stacks[fileId]
  },

  canUndo: (state, getters, rootState) => {
    const stack = getters.currentStack
    return stack && stack.pointer > 0
  },

  canRedo: (state, getters, rootState) => {
    const stack = getters.currentStack
    return stack && stack.pointer < stack.stack.length
  },

  historyList: (state, getters, rootState) => {
    const stack = getters.currentStack
    if (!stack) return []
    // 按时间倒序
    return stack.stack.slice(0, stack.pointer).map((item, idx) => ({
      ...item,
      index: idx,
      isCurrent: idx === stack.pointer - 1,
      isUndone: idx >= stack.pointer
    })).reverse()
  },

  historyStep: (state, getters, rootState) => {
    const stack = getters.currentStack
    if (!stack) return 0
    return stack.pointer
  }
}

const mutations = {
  INIT_STACK(state, fileId) {
    if (!state.stacks[fileId]) {
      state.stacks[fileId] = {
        stack: [],
        pointer: 0
      }
    }
  },

  PUSH_OPERATION(state, { fileId, operation }) {
    const fileStack = state.stacks[fileId]
    if (!fileStack) return

    // 清除指针之后的已撤销记录
    fileStack.stack = fileStack.stack.slice(0, fileStack.pointer)

    // 添� 操作记录
    fileStack.stack.push({
      ...operation,
      timestamp: Date.now()
    })

    // 超出上限删除最早
    if (fileStack.stack.length > LIMITS.MAX_HISTORY_STEPS) {
      fileStack.stack.shift()
    }

    fileStack.pointer = fileStack.stack.length
  },

  UNDO(state, fileId) {
    const fileStack = state.stacks[fileId]
    if (fileStack && fileStack.pointer > 0) {
      fileStack.pointer--
    }
  },

  REDO(state, fileId) {
    const fileStack = state.stacks[fileId]
    if (fileStack && fileStack.pointer < fileStack.stack.length) {
      fileStack.pointer++
    }
  },

  REMOVE_FILE_STACK(state, fileId) {
    delete state.stacks[fileId]
  },

  CLEAR_STACKS(state) {
    state.stacks = {}
  }
}

const actions = {
  initStack({ commit }, fileId) {
    commit('INIT_STACK', fileId)
  },

  recordOperation({ commit, rootState }, operation) {
    const fileId = rootState.fileList.activeFileId
    if (!fileId) return
    commit('PUSH_OPERATION', { fileId, operation })
  },

  undo({ commit, getters, rootState }) {
    if (!getters.canUndo) return null
    const fileId = rootState.fileList.activeFileId
    const stack = getters.currentStack
    commit('UNDO', fileId)
    return stack.stack[stack.pointer - 1]
  },

  redo({ commit, getters, rootState }) {
    if (!getters.canRedo) return null
    const fileId = rootState.fileList.activeFileId
    const stack = getters.currentStack
    commit('REDO', fileId)
    return stack.stack[stack.pointer]
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
