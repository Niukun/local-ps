import Vue from 'vue'
import Vuex from 'vuex'
import fileList from './modules/fileList'
import canvas from './modules/canvas'
import history from './modules/history'
import tools from './modules/tools'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    fileList,
    canvas,
    history,
    tools
  }
})
