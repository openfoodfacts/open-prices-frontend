import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import api from './services/api';
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'

let app = createApp(App)
let router = createRouter({
  history: createWebHistory(),
  routes: import.meta.hot ? [] : routes,
})

if (import.meta.hot) {
  let removeRoutes = []

  for (let route of routes) {
    removeRoutes.push(router.addRoute(route))
  }

  import.meta.hot.accept('./routes.js', ({ routes }) => {
    for (let removeRoute of removeRoutes) removeRoute()
    removeRoutes = []
    for (let route of routes) {
      removeRoutes.push(router.addRoute(route))
    }
    router.replace('')
  })
}


/**
 * Method to check if the user is logged in
 */
const checkAuth = async () => {
  if (api.getToken()) return true
}

/**
 * On each page change, check if it needs authentication.
 * If required, but the user is not logged in (cookie not present), then redirect to 'login'
 */
router.beforeEach(async (to, from, next) => {
  if(to.meta.requiresAuth) {
      if(!(await checkAuth())) {
        console.log("checkAuth")
        return next({name: 'login'})
      }
  }
  next()
})

app.use(router)

app.mount('#app')
