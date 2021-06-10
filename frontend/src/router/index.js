// Importing dependencies
import Vue from 'vue'
import VueRouter from 'vue-router'

// Importing pages
import logIn from '../views/LogIn'
import signUp from '../views/SignUp'

// Importing plugins
import NProgress from 'nprogress'
import '../assets/nprogress.css'

Vue.use(VueRouter)

// Creating routes
const router = new VueRouter({
  scrollBehavior () {
    return window.scrollTo({ top: 0, behavior: 'smooth' })
  },
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'LogIn',
      component: logIn,
      meta: {
        title: 'LogIn',
        meta: [
          {
            name: 'description',
            content: 'Groupomania\'s login page.'
          },
          {
            property: 'og:description',
            content: 'Groupomania\'s login page.'
          }
        ]
      }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: signUp,
      meta: {
        title: 'SignUp',
        meta: [
          {
            name: 'description',
            content: 'Groupomania\'s signup page.'
          },
          {
            property: 'og:description',
            content: 'Groupomania\'s signup page.'
          }
        ]
      }
    },
    {
      path: '/',
      name: 'Home',
      // Lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "Home" */ '../views/Home'),
      meta: {
        title: 'Home',
        meta: [
          {
            name: 'description',
            content: 'Groupomania\'s home page.'
          },
          {
            property: 'og:description',
            content: 'Groupomania\'s home page.'
          },
          {
            requiresAuth: true
          }
        ]
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      // Lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "Profile" */ '../views/Profile'),
      meta: {
        title: 'Profile',
        meta: [
          {
            name: 'description',
            content: 'Groupomania\'s user profile page.'
          },
          {
            property: 'og:description',
            content: 'Groupomania\'s user profile page.'
          },
          {
            requiresAuth: true
          }
        ]
      }
    },
    // Otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
})

// Redirect to 'login' page if not logged in and trying to access any restricted page
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/signup']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = window.localStorage.getItem('userInformation')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})

// Progress (Loading) bar on the top of page
router.beforeResolve((to, from, next) => {
  if (to.path) {
    NProgress.start()
  }
  next()
})
router.afterEach(() => {
  NProgress.done()
})

// Dynamically Updated Page Title
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next()

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta')

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key])
    })

    // We use this to track which meta tags we create so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '')

    return tag
  })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag))

  next()
})

export default router
