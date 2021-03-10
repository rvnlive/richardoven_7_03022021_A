import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'

// for the use of BootstrapVue
import BootstrapVue from 'bootstrap-vue'
import '../public/index.scss'
import { IconsPlugin } from 'bootstrap-vue'

// Components
import SideBar from './components/Global/SideBar'
import TopBar from './components/Global/TopBar'
Vue.use(IconsPlugin)
Vue.component('SideBar', SideBar)
Vue.component('TopBar', TopBar)

Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
