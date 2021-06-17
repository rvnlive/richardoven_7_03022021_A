import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2'
import moment from 'moment'
// for the use of BootstrapVue
import BootstrapVue from 'bootstrap-vue'
import './assets/style.scss'
import { IconsPlugin } from 'bootstrap-vue'

// for the use of VueSweetalert2
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.use(VueSweetalert2)

Vue.use(Vuelidate)

// Components
Vue.use(IconsPlugin)
Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY H:mm')
  }
})

const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// console.log(vue)
