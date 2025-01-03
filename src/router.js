import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from './store'
import localeManager from './i18n/localeManager.js'

/** @type {import('vue-router').RouterOptions['routes']} */
const routes = [
  { path: '/', name: 'home', component: () => import('./views/Home.vue'), meta: { title: 'Home', icon: 'mdi-home', drawerMenu: true } },
  { path: '/sign-in', name: 'sign-in', component: () => import('./views/SignIn.vue'), meta: { title: 'SignIn', icon: 'mdi-login', drawerMenu: true, requiresAuth: false, breadcrumbs: [{title: 'SignIn', disabled: true }] } },
  { path: '/dashboard', name: 'dashboard', component: () => import('./views/UserDashboard.vue'), meta: { title: 'Dashboard', icon: 'mdi-account-circle', drawerMenu: true, requiresAuth: true, breadcrumbs: [{title: 'Dashboard', disabled: true }] } },
  { path: '/dashboard/prices', name: 'dashboard-prices', component: () => import('./views/UserDashboardPriceList.vue'), meta: { title: 'MyPrices', requiresAuth: true, breadcrumbs: [{title: 'Dashboard', disabled: false, to: '/dashboard' }, {title: 'MyPrices', disabled: true}] } },
  { path: '/dashboard/proofs', name: 'dashboard-proofs', component: () => import('./views/UserDashboardProofList.vue'), meta: { title: 'MyProofs', requiresAuth: true, breadcrumbs: [{title: 'Dashboard', disabled: false, to: '/dashboard' }, {title: 'MyProofs', disabled: true}] } },
  { path: '/dashboard/settings', name: 'dashboard-settings', component: () => import('./views/UserSettings.vue'), meta: { title: 'Settings', requiresAuth: true, breadcrumbs: [{title: 'Settings', disabled: true }] } },  // not used anymore
  { path: '/prices/add', name: 'add-price', component: () => import('./views/PriceAddHome.vue'), meta: { title: 'AddPrice', requiresAuth: true, breadcrumbs: [{title: 'AddPrice', disabled: true }] }},  // not used anymore
  { path: '/prices/add/single', name: 'price-add-single', component: () => import('./views/PriceAddSingle.vue'), meta: { title: 'Add a single price (price tag)', requiresAuth: true, breadcrumbs: [{title: 'Experiments', disabled: false, to: '/experiments' }, {title: 'PriceAddSingle', disabled: true }] }},
  { path: '/prices/add/multiple', name: 'price-add-multiple', component: () => import('./views/PriceAddMultiple.vue'), meta: { title: 'AddPrice', icon: 'mdi-tag-plus-outline', drawerMenu: true, color: 'primary', requiresAuth: true, breadcrumbs: [{title: 'PriceAddMultiple', disabled: true }] }},
  { path: '/prices/add/multiple/price-tag', name: 'price-add-multiple-price-tag', redirect: () => { return { path: '/prices/add/multiple' }}},
  { path: '/prices/add/multiple/receipt', name: 'price-add-multiple-receipt', redirect: () => { return { path: '/prices/add/multiple' }}},
  { path: '/prices/:id', name: 'prices-detail', component: () => import('./views/PriceDetail.vue'), meta: { title: 'Price detail' }},
  { path: '/search', name: 'search', component: () => import('./views/Search.vue'), meta: { title: 'Search', icon: 'mdi-magnify', drawerMenu: true, breadcrumbs: [{title: 'Search', disabled: true }] }},
  { path: '/prices', name: 'prices', component: () => import('./views/PriceList.vue'), meta: { title: 'LatestPrices', icon: 'mdi-tag-multiple-outline', drawerMenu: true, breadcrumbs: [{title: 'LatestPrices', disabled: true }] }},
  { path: '/proofs/add/single', name: 'proof-add-single', component: () => import('./views/ProofAddSingle.vue'), meta: { title: 'AddProofSingle', icon: 'mdi-image-plus', requiresAuth: true, breadcrumbs: [{title: 'Experiments', disabled: false, to: '/experiments' }, {title: 'AddProofSingle', disabled: true }] }},
  { path: '/proofs/add/multiple', name: 'proof-add-multiple', component: () => import('./views/ProofAddMultiple.vue'), meta: { title: 'AddProofMultiple', icon: 'mdi-image-multiple', requiresAuth: true, breadcrumbs: [{title: 'Experiments', disabled: false, to: '/experiments' }, {title: 'AddProofMultiple', disabled: true }] }},
  { path: '/proofs/:id', name: 'proof-detail', component: () => import('./views/ProofDetail.vue'), meta: { title: 'Proof detail', requiresAuth: true }},
  { path: '/proofs', name: 'proofs', component: () => import('./views/ProofList.vue'), meta: { title: 'LatestProofs', icon: 'mdi-image-multiple', drawerMenu: true, breadcrumbs: [{title: 'LatestProofs', disabled: true }] }},
  { path: '/products', name: 'products', component: () => import('./views/ProductList.vue'), meta: { title: 'TopProducts', icon: 'mdi-database-outline', drawerMenu: true, breadcrumbs: [{title: 'TopProducts', disabled: true }] }},
  { path: '/products/:id', name: 'product-detail', component: () => import('./views/ProductDetail.vue'), meta: { title: 'Product detail' }},
  { path: '/locations', name: 'locations', component: () => import('./views/LocationList.vue'), meta: { title: 'TopLocations', icon: 'mdi-map-marker-star-outline', drawerMenu: true, breadcrumbs: [{title: 'TopLocations', disabled: true }] }},
  { path: '/locations/:id', name: 'location-detail', component: () => import('./views/LocationDetail.vue'), meta: { title: 'Location detail' }},
  { path: '/countries/:country', name: 'country-detail', component: () => import('./views/CountryDetail.vue'), meta: { title: 'Country detail' }},
  { path: '/countries/:country/cities/:city', name: 'country-city-detail', component: () => import('./views/CountryCityDetail.vue'), meta: { title: 'City detail' }},
  { path: '/brands/:id', name: 'brand-detail', component: () => import('./views/BrandDetail.vue'), meta: { title: 'Brand detail' }},
  { path: '/dates/:date', name: 'date-detail', component: () => import('./views/DateDetail.vue'), meta: { title: 'Date detail' }},
  { path: '/currencies/:currency', name: 'currency-detail', component: () => import('./views/CurrencyDetail.vue'), meta: { title: 'Currency detail' }},
  { path: '/categories/:id', name: 'category-detail', component: () => import('./views/CategoryDetail.vue'), meta: { title: 'Category detail' }},
  { path: '/labels/:id', name: 'label-detail', component: () => import('./views/LabelDetail.vue'), meta: { title: 'Label detail' }},
  { path: '/users', name: 'users', component: () => import('./views/UserList.vue'), meta: { title: 'TopContributors', icon: 'mdi-account-star-outline', drawerMenu: true, breadcrumbs: [{title: 'TopContributors', disabled: true }] }},
  { path: '/users/:username', name: 'user-detail', component: () => import('./views/UserDetail.vue'), meta: { title: 'User detail' }},
  { path: '/experiments', name: 'experiments', component: () => import('./views/Experiments.vue'), meta: { title: 'Experiments', icon: 'mdi-test-tube', drawerMenu: true, drawerMenuConditionalDisplay: 'drawer_display_experiments', breadcrumbs: [{title: 'Experiments', disabled: true }] }},
  { path: '/experiments/contribution-assistant', name: 'contribution-assistant', component: () => import('./views/ContributionAssistant.vue'), meta: { title: 'ContributionAssistant', icon: 'mdi-draw', requiresAuth: true, breadcrumbs: [{title: 'Experiments', disabled: false, to: '/experiments' }, {title: 'ContributionAssistant', disabled: true }] }},
  { path: '/experiments/price-validation-assistant', name: 'price-validation-assistant', component: () => import('./views/PriceValidationAssistant.vue'), meta: { title: 'PriceValidationAssistant', icon: 'mdi-checkbox-marked-circle-plus-outline', requiresAuth: true, breadcrumbs: [{title: 'Experiments', disabled: false, to: '/experiments' }, {title: 'PriceValidationAssistant', disabled: true }] }},
  { path: '/reuses', name: 'reuses', component: () => import('./views/Reuses.vue'), meta: { title: 'Reuses', icon: 'mdi-account-group', drawerMenu: false, breadcrumbs: [{title: 'Reuses', disabled: true }] }},
  { path: '/community', name: 'community', component: () => import('./views/Community.vue'), meta: { title: 'Community', icon: 'mdi-account-group', drawerMenu: true, breadcrumbs: [{title: 'Community', disabled: true }] }},
  { path: '/stats', name: 'stats', component: () => import('./views/Stats.vue'), meta: { title: 'Stats', icon: 'mdi-chart-box-outline', drawerMenu: true, breadcrumbs: [{title: 'Stats', disabled: true }] }},
  { path: '/settings', name: 'settings', component: () => import('./views/Settings.vue'), meta: { title: 'Settings', icon: 'mdi-cog-outline', drawerMenu: true, breadcrumbs: [{title: 'Settings', disabled: true }] }},
  { path: '/about', name: 'about', component: () => import('./views/About.vue'), meta: { title: 'About', icon: 'mdi-information-outline', drawerMenu: true, breadcrumbs: [{title: 'About', disabled: true }] }},
  // Why this redirect?
  // The app used to be available at https://prices.openfoodfacts.org/app
  // It is now available at https://prices.openfoodfacts.org
  // Therefore we redirect old users to the new URL, by removing any incoming /app routes
  { path: '/app:path(.*)', redirect: to => { return { path: to.params.path }} },
  // 404
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
    return next({ name: 'sign-in' })
  }

  next()
})

export default router
