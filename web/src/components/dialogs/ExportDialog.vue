<template>
  <!-- 导出对话框：480px -->
  <div class="dialog-overlay" @click.self="$emit('close')">
    <div class="dialog-box export-dialog">
      <div class="dialog-header">
        <h3>导出图片</h3>
        <button class="dialog-close" @click="$emit('close')">×</button>
      </div>

      <div class="dialog-body">
        <!-- 导出格式 -->
        <div class="form-item">
          <label class="form-label">导出格式</label>
          <select v-model="format" class="form-select">
            <option value="jpg">JPG - 照片格式（支持压缩）</option>
            <option value="png">PNG - 无损格式（支持透明）</option>
            <option value="pdf">PDF - 文档格式</option>
          </select>
        </div>

        <!-- JPG 质量 -->
        <div v-show="format === 'jpg'" class="form-item">
          <label class="form-label">
            输出质量：<span class="quality-value">{{ quality }}%</span>
          </label>
          <div class="range-row">
            <span class="range-label">低</span>
            <input
              v-model.number="quality"
              type="range"
              class="form-range"
              min="1"
              max="100"
            />
            <span class="range-label">高</span>
          </div>
        </div>

        <!-- PDF 提示 -->
        <div v-show="format === 'pdf'" class="form-item">
          <p class="form-hint">PDF 格式将图片嵌入为单页文档</p>
        </div>

        <!-- PNG 提示 -->
        <div v-show="format === 'png'" class="form-item">
          <p class="form-hint">PNG 格式无损导出，支持透明背景</p>
        </div>

        <!-- 命名规则 -->
        <div class="form-item">
          <label class="form-label">命名规则</label>
          <select v-model="namingRule" class="form-select">
            <option value="original">保持原名（文件名_编辑.扩展名）</option>
            <option value="auto_num">自动编号（001, 002, 003...）</option>
            <option value="custom">自定义前缀 + 编号</option>
          </select>
        </div>

        <!-- 自定义前缀 -->
        <div v-show="namingRule === 'custom'" class="form-item">
          <label class="form-label">自定义前缀</label>
          <input
            v-model="customPrefix"
            class="form-input"
            type="text"
            placeholder="请输入前缀（如 scan）"
          />
        </div>
      </div>

      <div class="dialog-footer">
        <button class="btn btn-cancel" @click="$emit('close')">取消</button>
        <button
          class="btn btn-primary"
          @click="handleConfirm"
        >
          导出
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { EXPORT_NAMING_RULE } from '@/utils/constants'

export default {
  name: 'ExportDialog',

  data() {
    return {
      format: 'jpg',
      quality: 85,
      namingRule: EXPORT_NAMING_RULE.ORIGINAL,
      customPrefix: ''
    }
  },

  methods: {
    handleConfirm() {
      this.$emit('confirm', {
        format: this.format,
        quality: this.quality,
        namingRule: this.namingRule,
        customPrefix: this.customPrefix
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.export-dialog {
  width: 480px;
}
</style>
