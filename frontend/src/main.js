import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// for the use of BootstrapVue
import BootstrapVue from 'bootstrap-vue'
import './assets/style.scss'
import { IconsPlugin } from 'bootstrap-vue'

// Components
Vue.use(IconsPlugin)

Vue.use(BootstrapVue)
Vue.config.productionTip = false

const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

console.log(vue)
