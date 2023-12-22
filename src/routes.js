import Home from './views/Home.vue'
import SignIn from './views/SignIn.vue'
import AddPriceHome from './views/AddPriceHome.vue'
import AddPriceSingle from './views/AddPriceSingle.vue'
import PriceList from './views/PriceList.vue'
import Stats from './views/Stats.vue'
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export let routes = [
  { path: '/', name: 'home', component: Home, meta: { title: 'Home', icon: 'mdi-home', drawerMenu: true } },
  { path: '/sign-in', name: 'sign-in', component: SignIn, meta: { title: 'Sign in', icon: 'mdi-login', drawerMenu: true, requiresAuth: false } },
  { path: '/add', name: 'add-price', component: AddPriceHome, meta: { title: 'Add a price', icon: 'mdi-plus', drawerMenu: true, requiresAuth: true }},
  { path: '/add/single', name: 'add-price-single', component: AddPriceSingle, meta: { title: 'Add a single price', requiresAuth: true }},
  { path: '/prices', name: 'prices', component: PriceList, meta: { title: 'Last prices', icon: 'mdi-tag-multiple-outline', drawerMenu: true }},
  { path: '/stats', name: 'stats', component: Stats, meta: { title: 'Stats' }},
  { path: '/:path(.*)', component: NotFound },
]
