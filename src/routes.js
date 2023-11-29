import Home from './views/Home.vue'
import Login from './views/Login.vue'
import AddPrice from './views/AddPrice.vue'
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export let routes = [
  { path: '/', name: 'home', component: Home, meta: { title: 'Home' } },
  { path: '/login', name: 'login', component: Login, meta: { title: 'Login' } },
  { path: '/add', name: 'add-price', component: AddPrice, meta: { title: 'Add a price', requiresAuth: true } },
  { path: '/:path(.*)', component: NotFound },
]
