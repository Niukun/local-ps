<template>
  <div id="app-container">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
/* ===== 全局样式 ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app,
#app-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

body {
  font-family: "Microsoft YaHei", "微软雅黑", "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #333;
  background-color: #fff;
}

/* ===== 滚动条美化 ===== */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;

  &:hover {
    background-color: #aaa;
  }
}

/* ===== 对话框公共样式 ===== */
.dialog-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}

.dialog-box {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: dialogIn 0.2s ease-out;
}

@keyframes dialogIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  .dialog-close {
    width: 28px;
    height: 28px;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: #999;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #f5f5f5;
      color: #333;
    }
  }
}

.dialog-body {
  padding: 20px;
}

.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 20px;
  border-top: 1px solid #f0f0f0;
  background-color: #fafafa;
}

/* ===== 表单控件公共样式 ===== */
.form-item {
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
}

.form-label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  color: #666;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  transition: border-color 0.15s;
  outline: none;

  &:focus {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
  }
}

.form-select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
  }
}

.form-range {
  width: 100%;
  height: 4px;
  appearance: none;
  background: #e0e0e0;
  border-radius: 2px;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #1890ff;
    cursor: pointer;
  }
}

.form-hint {
  padding: 8px 12px;
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 4px;
  font-size: 13px;
  color: #666;
}

.quality-value {
  color: #1890ff;
  font-weight: 600;
}

.range-row {
  display: flex;
  align-items: center;
  gap: 8px;

  .range-label {
    font-size: 12px;
    color: #999;
    flex-shrink: 0;
  }

  .form-range {
    flex: 1;
  }
}

/* ===== 按钮公共样式 ===== */
.btn {
  padding: 7px 20px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s;
  outline: none;

  &.btn-primary {
    background-color: #1890ff;
    border-color: #1890ff;
    color: #fff;

    &:hover {
      background-color: #40a9ff;
      border-color: #40a9ff;
    }

    &:disabled {
      background-color: #b0d4ff;
      border-color: #b0d4ff;
      cursor: not-allowed;
    }
  }

  &.btn-cancel {
    background-color: #fff;
    color: #666;

    &:hover {
      color: #1890ff;
      border-color: #1890ff;
    }
  }
}
</style>
