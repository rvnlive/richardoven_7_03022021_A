// Importing dependencies
import Vue from 'vue'
import Vuex from 'vuex'

// Importing  modules
import modules from './modules'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules
})

// for (const moduleName of Object.keys(modules)) {
//   if (modules[moduleName].actions && modules[moduleName].actions.initStore) {
//     store.dispatch(`${moduleName}/initStore`)
//   }
// }

export default store
