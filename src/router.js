import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from './store'
import Home from './views/Home.vue'
import SignIn from './views/SignIn.vue'
import UserDashboard from './views/UserDashboard.vue'
import AddPriceHome from './views/AddPriceHome.vue'
import AddPriceSingle from './views/AddPriceSingle.vue'
import PriceList from './views/PriceList.vue'
import ProductDetail from './views/ProductDetail.vue'
import LocationDetail from './views/LocationDetail.vue'
import Stats from './views/Stats.vue'
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
const routes = [
  { path: '/', name: 'home', component: Home, meta: { title: 'Home', icon: 'mdi-home', drawerMenu: true } },
  { path: '/sign-in', name: 'sign-in', component: SignIn, meta: { title: 'Sign in', icon: 'mdi-login', drawerMenu: true, requiresAuth: false } },
  { path: '/dashboard', name: 'dashboard', component: UserDashboard, meta: { title: 'Dashboard', requiresAuth: true } },
  { path: '/add', name: 'add-price', component: AddPriceHome, meta: { title: 'Add a price', icon: 'mdi-plus', drawerMenu: true, requiresAuth: true }},
  { path: '/add/single', name: 'add-price-single', component: AddPriceSingle, meta: { title: 'Add a single price', requiresAuth: true }},
  { path: '/prices', name: 'prices', component: PriceList, meta: { title: 'Latest prices', icon: 'mdi-tag-multiple-outline', drawerMenu: true }},
  { path: '/products/:id', name: 'product-detail', component: ProductDetail, meta: { title: 'Product detail' }},
  { path: '/locations/:id', name: 'location-detail', component: LocationDetail, meta: { title: 'Location detail' }},
  { path: '/stats', name: 'stats', component: Stats, meta: { title: 'Stats' }},
  { path: '/:path(.*)', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

/**
 * On each page change, check if it needs authentication.
 * If required, but the user is not authenticated (token unknown), then redirect to 'sign-in'
 */
router.beforeEach(async (to, from, next) => {
  const store = useAppStore()
  if(to.meta.requiresAuth && !store.user.token) {
      console.log("checkAuth")
      return next({ name: 'sign-in' })
  }
  next()
})

export default router
