import Home from './views/Home.vue'
import SignIn from './views/SignIn.vue'
import AddPriceHome from './views/AddPriceHome.vue'
import AddPriceSingle from './views/AddPriceSingle.vue'
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export let routes = [
  { path: '/', name: 'home', component: Home, meta: { title: 'Open Prices' } },
  { path: '/sign-in', name: 'sign-in', component: SignIn, meta: { title: 'Sign in' } },
  { path: '/add', name: 'add-price', component: AddPriceHome, meta: { title: 'Add a price', requiresAuth: true }},
  { path: '/add/single', name: 'add-price-single', component: AddPriceSingle, meta: { title: 'Add a single price', requiresAuth: true }},
  { path: '/:path(.*)', component: NotFound },
]
