<template>
  <div class="menu-bar">
    <div class="menu-left">
      <div class="menu-item" @click="showMenuDropdown('file')">文件(F)</div>
      <div class="menu-item" @click="showMenuDropdown('edit')">编辑(E)</div>
      <div class="menu-item" @click="showMenuDropdown('view')">视图(V)</div>
      <div class="menu-item" @click="showMenuDropdown('tool')">工具(T)</div>
      <div class="menu-item" @click="showMenuDropdown('help')">帮助(H)</div>
    </div>
    <div class="app-title">档案扫描件处理软件</div>
    <div class="menu-right">
      <span class="version">v1.0</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuBar',
  methods: {
    showMenuDropdown(menu) {
      console.log('Menu clicked:', menu)
    }
  }
}
</script>

<style scoped>
.menu-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #16213e;
  height: 36px;
  padding: 0 12px;
  border-bottom: 1px solid #0f3460;
}

.menu-left {
  display: flex;
  gap: 4px;
}

.menu-item {
  padding: 6px 12px;
  font-size: 13px;
  color: #eaeaea;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #0f3460;
}

.app-title {
  font-size: 14px;
  font-weight: 600;
  color: #e94560;
}

.menu-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.version {
  font-size: 12px;
  color: #888;
}
</style>