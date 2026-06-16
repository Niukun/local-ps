<template>
  <!-- 另存为对话框：400px 宽 -->
  <div class="dialog-overlay" @click.self="$emit('close')">
    <div class="dialog-box save-as-dialog">
      <div class="dialog-header">
        <h3>另存为</h3>
        <button class="dialog-close" @click="$emit('close')">×</button>
      </div>

      <div class="dialog-body">
        <div class="form-item">
          <label class="form-label">文件名</label>
          <input
            v-model="fileName"
            class="form-input"
            type="text"
            placeholder="请输入文件名"
            ref="nameInput"
          />
        </div>

        <div class="form-item">
          <label class="form-label">保存格式</label>
          <select v-model="format" class="form-select">
            <option value="jpg">JPG</option>
            <option value="png">PNG</option>
            <option value="pdf">PDF</option>
          </select>
        </div>

        <!-- JPG 质量滑块 -->
        <div v-show="format === 'jpg'" class="form-item">
          <label class="form-label">
            质量：<span class="quality-value">{{ quality }}%</span>
          </label>
          <input
            v-model.number="quality"
            type="range"
            class="form-range"
            min="1"
            max="100"
          />
        </div>
      </div>

      <div class="dialog-footer">
        <button class="btn btn-cancel" @click="$emit('close')">取消</button>
        <button
          class="btn btn-primary"
          :disabled="!fileName.trim()"
          @click="handleConfirm"
        >
          保存
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SaveAsDialog',

  props: {
    defaultName: {
      type: String,
      default: '图片_编辑'
    },

    defaultFormat: {
      type: String,
      default: 'jpg'
    }
  },

  data() {
    return {
      fileName: this.defaultName,
      format: this.defaultFormat,
      quality: 85
    }
  },

  methods: {
    handleConfirm() {
      if (!this.fileName.trim()) return
      const ext = this.fileName.includes('.') ? '' : '.' + this.format
      this.$emit('confirm', {
        fileName: this.fileName.trim() + ext,
        format: this.format,
        quality: this.quality
      })
    }
  },

  mounted() {
    this.$nextTick(() => {
      const input = this.$refs.nameInput
      if (input) {
        input.focus()
        input.select()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.save-as-dialog {
  width: 400px;
}
</style>
