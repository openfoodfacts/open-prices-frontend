import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from './store'
import localeManager from './i18n/localeManager.js'

/** @type {import('vue-router').RouterOptions['routes']} */
const routes = [
  { path: '/', name: 'home', component: () => import('./views/Home.vue'), meta: { title: 'Home', icon: 'mdi-home', drawerMenu: true } },
  { path: '/sign-in', name: 'sign-in', component: () => import('./views/SignIn.vue'), meta: { title: 'SignIn', icon: 'mdi-login', drawerMenu: true, requiresAuth: false } },
  { path: '/dashboard', name: 'dashboard', component: () => import('./views/UserDashboard.vue'), meta: { title: 'Dashboard', requiresAuth: true } },
  { path: '/dashboard/prices', name: 'dashboard-prices', component: () => import('./views/UserDashboardPriceList.vue'), meta: { title: 'MyPrices', requiresAuth: true } },
  { path: '/dashboard/proofs', name: 'dashboard-proofs', component: () => import('./views/UserDashboardProofList.vue'), meta: { title: 'MyProofs', requiresAuth: true } },
  { path: '/settings', name: 'settings', component: () => import('./views/UserSettings.vue'), meta: { title: 'Settings', requiresAuth: true } },
  { path: '/search', name: 'search', component: () => import('./views/Search.vue'), meta: { title: 'Search', icon: 'mdi-magnify', drawerMenu: true }},
  { path: '/prices', name: 'prices', component: () => import('./views/PriceList.vue'), meta: { title: 'LatestPrices', icon: 'mdi-tag-multiple-outline', drawerMenu: true }},
  { path: '/prices/add', name: 'add-price', component: () => import('./views/AddPriceHome.vue'), meta: { title: 'AddPrice', icon: 'mdi-tag-plus-outline', drawerMenu: true, color: 'primary', requiresAuth: true }},
  { path: '/prices/add/single', name: 'add-price-single', component: () => import('./views/AddPriceSingle.vue'), meta: { title: 'Add a single price (price tag)', requiresAuth: true }},
  { path: '/prices/add/multiple/price-tag', name: 'add-price-multiple-price-tag', component: () => import('./views/AddPriceMultiple.vue'), meta: { title: 'Add multiple prices (price tags)', requiresAuth: true }},
  { path: '/prices/add/multiple/receipt', name: 'add-price-multiple-receipt', component: () => import('./views/AddPriceMultiple.vue'), meta: { title: 'Add multiple prices (receipt)', requiresAuth: true }},
  { path: '/products', name: 'products', component: () => import('./views/ProductList.vue'), meta: { title: 'TopProducts', icon: 'mdi-database-outline', drawerMenu: true }},
  { path: '/products/:id', name: 'product-detail', component: () => import('./views/ProductDetail.vue'), meta: { title: 'Product detail' }},
  { path: '/locations', name: 'locations', component: () => import('./views/LocationList.vue'), meta: { title: 'TopLocations', icon: 'mdi-map-marker-star-outline', drawerMenu: true }},
  { path: '/locations/:id', name: 'location-detail', component: () => import('./views/LocationDetail.vue'), meta: { title: 'Location detail' }},
  { path: '/countries/:country', name: 'country-detail', component: () => import('./views/CountryDetail.vue'), meta: { title: 'Country detail' }},
  { path: '/countries/:country/cities/:city', name: 'country-city-detail', component: () => import('./views/CountryCityDetail.vue'), meta: { title: 'City detail' }},
  { path: '/brands/:id', name: 'brand-detail', component: () => import('./views/BrandDetail.vue'), meta: { title: 'Brand detail' }},
  { path: '/dates/:date', name: 'date-detail', component: () => import('./views/DateDetail.vue'), meta: { title: 'Date detail' }},
  { path: '/categories/:id', name: 'category-detail', component: () => import('./views/CategoryDetail.vue'), meta: { title: 'Category detail' }},
  { path: '/proofs/add/single', name: 'proof-add', component: () => import('./views/ProofAddSingle.vue'), meta: { title: 'ProofAddSingle', icon: 'mdi-plus', color: 'primary', requiresAuth: true }},
  { path: '/proofs/:id', name: 'proof-detail', component: () => import('./views/ProofDetail.vue'), meta: { title: 'Proof detail', requiresAuth: true }},
  { path: '/users', name: 'users', component: () => import('./views/UserList.vue'), meta: { title: 'TopContributors', icon: 'mdi-account-star-outline', drawerMenu: true }},
  { path: '/users/:username', name: 'user-detail', component: () => import('./views/UserDetail.vue'), meta: { title: 'User detail' }},
  { path: '/stats', name: 'stats', component: () => import('./views/Stats.vue'), meta: { title: 'Stats' }},
  { path: '/:path(.*)', component: () => import('./views/NotFound.vue') },
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
  const locale = localeManager.guessDefaultLocale()
  if (locale !== store.user.language) {
    await localeManager.changeLanguage(locale)
  }
  if (to.meta.requiresAuth && !store.user.token) {
    console.log('checkAuth')
    return next({ name: 'sign-in' })
  }

  next()
})

export default router
