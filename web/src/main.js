/**
 * 应用入口文件
 *
 * 档案扫描件处理软件 - 本地图片处理工具
 * 技术栈：Vue 2.7 + Vuex 3 + Vue Router 3 + Fabric.js 5 + Cropper.js 1.6
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
