import Vue from 'vue'
import Vuex from 'vuex'
import image from './modules/image'
import tool from './modules/tool'
import history from './modules/history'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    image,
    tool,
    history
  }
})
