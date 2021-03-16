import Vue from 'vue'
import VueRouter from 'vue-router'
import LogIn from '../views/LogIn'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/Register',
    name: 'Register',
    // Lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register')
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/Profile',
    name: 'Profile',
    // Lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Profile" */ '../views/Profile')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
