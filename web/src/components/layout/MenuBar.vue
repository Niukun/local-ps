<template>
  <!-- 菜单栏：文件(F) 编辑(E) 视图(V) 工具(T) 帮助(H) -->
  <div class="menu-bar">
    <div class="menu-group" v-for="menu in menus" :key="menu.label">
      <span
        class="menu-trigger"
        :class="{ 'is-active': activeMenu === menu.label }"
        @click="toggleMenu(menu.label)"
      >
        {{ menu.label }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuBar',

  data() {
    return {
      activeMenu: null,
      menus: [
        {
          label: '文件(F)',
          items: [
            { label: '打开文件', shortcut: 'Ctrl+O', action: 'openFile' },
            { type: 'divider' },
            { label: '保存', shortcut: 'Ctrl+S', action: 'saveFile' },
            { label: '另存为', shortcut: 'Ctrl+Shift+S', action: 'saveAs' },
            { type: 'divider' },
            { label: '导出', shortcut: 'Ctrl+E', action: 'exportFile' }
          ]
        },
        {
          label: '编辑(E)',
          items: [
            { label: '撤销', shortcut: 'Ctrl+Z', action: 'undo' },
            { label: '恢复', shortcut: 'Ctrl+Y', action: 'redo' }
          ]
        },
        {
          label: '视图(V)',
          items: [
            { label: '放大', shortcut: '+', action: 'zoomIn' },
            { label: '缩小', shortcut: '-', action: 'zoomOut' },
            { type: 'divider' },
            { label: '适应窗口', shortcut: 'Ctrl+0', action: 'fitWindow' },
            { label: '实际大小', shortcut: 'Ctrl+1', action: 'actualSize' }
          ]
        },
        {
          label: '工具(T)',
          items: [
            { label: '选择工具', shortcut: 'V', action: 'selectTool' },
            { label: '移动工具', shortcut: 'H', action: 'moveTool' },
            { label: '裁剪工具', shortcut: 'C', action: 'cropTool' },
            { label: '旋转工具', shortcut: 'R', action: 'rotateTool' }
          ]
        },
        {
          label: '帮助(H)',
          items: [
            { label: '快捷键', shortcut: '?', action: 'showShortcuts' }
          ]
        }
      ]
    }
  },

  methods: {
    toggleMenu(label) {
      this.activeMenu = this.activeMenu === label ? null : label
    },

    handleAction(action) {
      this.activeMenu = null
      this.$emit('menuAction', action)
    },

    handleClickOutside() {
      this.activeMenu = null
    }
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },

  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>

<style lang="scss" scoped>
.menu-bar {
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 8px;
  background-color: #2c2c2c;
  border-bottom: 1px solid #1a1a1a;
  user-select: none;
  flex-shrink: 0;

  .menu-group {
    position: relative;
  }

  .menu-trigger {
    display: inline-block;
    padding: 4px 10px;
    color: #ccc;
    font-size: 13px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.15s;

    &:hover,
    &.is-active {
      background-color: #3c3c3c;
      color: #fff;
    }
  }
}
</style>
