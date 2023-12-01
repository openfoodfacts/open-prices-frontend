import Home from './views/Home.vue'
import SignIn from './views/SignIn.vue'
import AddPrice from './views/AddPrice.vue'
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export let routes = [
  { path: '/', name: 'home', component: Home, meta: { title: 'Open Prices' } },
  { path: '/sign-in', name: 'sign-in', component: SignIn, meta: { title: 'Sign in' } },
  { path: '/add', name: 'add-price', component: AddPrice, meta: { title: 'Add a price', requiresAuth: true } },
  { path: '/:path(.*)', component: NotFound },
]
