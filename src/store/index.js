import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import layout from './modules/layout'
import info from './modules/info'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    layout,
    info
  },
  strict: debug,
  plugins: [
    ...(debug ? [createLogger()] : [])
  ]
})
