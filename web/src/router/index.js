import Vue from 'vue'
import VueRouter from 'vue-router'
import MainEditor from '@/views/MainEditor.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainEditor',
    component: MainEditor
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
