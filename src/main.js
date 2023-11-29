import Cookies from 'js-cookie'

import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
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

const checkAuth = async () => {
  if (Cookies.get('access_token')) return true
}

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
