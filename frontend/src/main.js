import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// for the use of BootstrapVue
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Components
import Navbar from './components/Navbar.vue'
Vue.component('Navbar', Navbar)

Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
