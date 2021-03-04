import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// for the use of BootstrapVue
import BootstrapVue from 'bootstrap-vue'
import '../public/index.scss'
import { IconsPlugin } from 'bootstrap-vue'

// Components
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
Vue.use(IconsPlugin)
Vue.component('Navbar', Navbar)
Vue.component('Footer', Footer)

Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
