/**
 * 全局快捷键映射
 */

export const DEFAULT_SHORTCUTS = {
  // ===== 文件操作 =====
  'ctrl+o': { action: 'openFile', description: '打开文件' },
  'ctrl+s': { action: 'saveFile', description: '保存' },
  'ctrl+shift+s': { action: 'saveAs', description: '另存为' },
  'ctrl+e': { action: 'export', description: '导出' },

  // ===== 编辑操作 =====
  'ctrl+z': { action: 'undo', description: '撤销' },
  'ctrl+y': { action: 'redo', description: '恢复' },

  // ===== 工具切换 =====
  'v': { action: 'selectTool', description: '选择工具' },
  'h': { action: 'moveTool', description: '移动工具' },
  'c': { action: 'cropTool', description: '裁剪工具' },
  'r': { action: 'rotateTool', description: '旋转工具' },

  // ===== 视图操作 =====
  '=': { action: 'zoomIn', description: '放大' },
  '-': { action: 'zoomOut', description: '缩小' },
  'ctrl+0': { action: 'fitWindow', description: '适应窗口' },
  'ctrl+1': { action: 'actualSize', description: '实际大小' },

  // ===== 文件切换 =====
  'ctrl+tab': { action: 'nextFile', description: '下一个文件' },
  'ctrl+shift+tab': { action: 'prevFile', description: '上一个文件' },

  // ===== 临时工具 =====
  'space': { action: 'toggleMove', description: '临时移动工具' },

  // ===== 帮助 =====
  '?': { action: 'showShortcuts', description: '快捷键帮助' },

  // ===== 通用 =====
  'escape': { action: 'escape', description: '取消/关闭' }
}

/**
 * 将键盘事件标准化为快捷键字符串
 */
export function normalizeKeyEvent(event) {
  const key = event.key.toLowerCase()
  const parts = []

  if (event.ctrlKey || event.metaKey) parts.push('ctrl')
  if (event.shiftKey) parts.push('shift')
  if (event.altKey) parts.push('alt')

  // 不加入修饰键本身
  const modifierKeys = ['control', 'shift', 'alt', 'meta']
  if (!modifierKeys.includes(key)) {
    parts.push(key)
  }

  return parts.join('+')
}

/**
 * 判断当前是否处于输入状态（输入框、文本域等）
 */
export function isInputFocused() {
  const tag = document.activeElement?.tagName?.toLowerCase()
  return tag === 'input' || tag === 'textarea' || tag === 'select' || document.activeElement?.isContentEditable
}

/**
 * 查找匹配的快捷键映射
 */
export function findShortcut(keyCombo, shortcuts) {
  const map = shortcuts || DEFAULT_SHORTCUTS
  return map[keyCombo] || null
}

export default DEFAULT_SHORTCUTS
