import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from './store'
import localeManager from './i18n/localeManager.js'
import constants from './constants'
import i18n from './i18n'
import utils from './utils.js'


/** @type {import('vue-router').RouterOptions['routes']} */
const routes = [
  { path: '/', name: 'home', component: () => import('./views/Home.vue'), meta: { title: 'Home', description: 'Explore and compare food prices crowdsourced by the community', icon: 'mdi-home', drawerMenu: true } },
  { path: '/sign-in', name: 'sign-in', component: () => import('./views/SignIn.vue'), meta: { title: 'SignIn', description: 'Sign in to your Open Prices account', icon: 'mdi-login', drawerMenu: true, requiresAnonymous: true, breadcrumbs: [{title: 'SignIn', disabled: true }] } },
  { path: '/dashboard', name: 'dashboard', component: () => import('./views/UserDashboard.vue'), meta: { title: 'MyDashboard', description: 'Manage your prices and proofs', icon: 'mdi-account-circle', drawerMenu: true, requiresAuth: true, breadcrumbs: [{title: 'MyDashboard', disabled: true }] } },
  { path: '/dashboard/prices', name: 'dashboard-prices', component: () => import('./views/UserDashboardPriceList.vue'), meta: { title: 'MyPrices', description: 'View and manage your contributed prices', requiresAuth: true, breadcrumbs: [{title: 'MyDashboard', disabled: false, to: '/dashboard' }, {title: 'MyPrices', disabled: true}] } },
  { path: '/dashboard/proofs', name: 'dashboard-proofs', component: () => import('./views/UserDashboardProofList.vue'), meta: { title: 'MyProofs', description: 'View and manage your proof receipts and price tags', requiresAuth: true, breadcrumbs: [{title: 'MyDashboard', disabled: false, to: '/dashboard' }, {title: 'MyProofs', disabled: true}] } },
  { path: '/contribute', name: 'contribute', component: () => import('./views/Contribute.vue'), meta: { title: 'Contribute', description: 'Add prices to help build an open food price database', icon: 'mdi-tag-plus-outline', drawerMenu: true, breadcrumbs: [{title: 'Contribute', disabled: true }] }},
  { path: '/prices/add', name: 'add-price', component: () => import('./views/PriceAddHome.vue'), meta: { title: 'AddPrice', description: 'Add a new price entry', requiresAuth: true, breadcrumbs: [{title: 'AddPrice', disabled: true }] }},  // not used anymore
  { path: '/prices/add/single', name: 'price-add-single', component: () => import('./views/PriceAddSingle.vue'), meta: { title: 'Add a single price (price tag)', description: 'Add a price from a price tag photo', icon: 'mdi-tag-plus-outline', requiresAuth: true, breadcrumbs: [{title: 'Experiments', disabled: false, to: '/experiments' }, {title: 'PriceAddSingle', disabled: true }] }},
  { path: '/prices/add/multiple', name: 'price-add-multiple', component: () => import('./views/PriceAddMultiple.vue'), meta: { title: 'AddPrices', description: 'Add multiple prices at once', icon: 'mdi-tag-plus-outline', requiresAuth: true, breadcrumbs: [{title: 'AddPrices', disabled: true }] }},
  { path: '/prices/add/multiple/price-tag', name: 'price-add-multiple-price-tag', redirect: () => { return { path: '/prices/add/multiple' }}},
  { path: '/prices/add/multiple/receipt', name: 'price-add-multiple-receipt', redirect: () => { return { path: '/prices/add/multiple' }}},
  { path: '/prices/add/validate', name: 'price-add-validate', component: () => import('./views/PriceAddValidate.vue'),  meta: { title: 'ValidatePrices', description: 'Validate your prices before submission', icon: 'mdi-checkbox-marked-circle-plus-outline', requiresAuth: true, breadcrumbs: [{title: 'Prices', disabled: false, to: '/prices' }, { title: 'Add', disabled: true }, {title: 'Validate', disabled: true }] }},
  { path: '/proofs/add/single', name: 'proof-add-single', component: () => import('./views/ProofAddSingle.vue'), meta: { title: 'AddProofSingle', description: 'Add a proof receipt or price tag photo', icon: 'mdi-image-plus', requiresAuth: true, breadcrumbs: [{title: 'Experiments', disabled: false, to: '/experiments' }, {title: 'AddProofSingle', disabled: true }] }},
  { path: '/proofs/add/receipt', name: 'proof-add-receipt', component: () => import('./views/ProofReceiptAdd.vue'), meta: { title: 'AddProofsReceipt', description: 'Upload a receipt as proof for your prices', icon: 'mdi-image-plus', requiresAuth: true, breadcrumbs: [{ title: 'Proofs', disabled: false, to: '/proofs' }, { title: 'Add', disabled: true }, { title: 'Receipt', disabled: true }] }},
  { path: '/proofs/add/price-tags', name: 'proof-add-multiple-price-tags', component: () => import('./views/ProofPriceTagAddMultiple.vue'), meta: { title: 'AddProofsPriceTags', description: 'Upload price tag photos as proof', icon: 'mdi-image-plus', requiresAuth: true, breadcrumbs: [{ title: 'Proofs', disabled: false, to: '/proofs' }, { title: 'Add', disabled: true }, { title: 'PriceTags', disabled: true }] }},
  { path: '/prices/:id', name: 'prices-detail', component: () => import('./views/PriceDetail.vue'), meta: { title: 'Price detail', description: 'View detailed information about this price' }},
  { path: '/prices', name: 'prices', component: () => import('./views/PriceList.vue'), meta: { title: 'LatestPrices', description: 'Browse the latest prices added by the community', icon: constants.PRICE_ICON, breadcrumbs: [{title: 'LatestPrices', disabled: true }] }},
  { path: '/proofs/:id', name: 'proof-detail', component: () => import('./views/ProofDetail.vue'), meta: { title: 'Proof detail', description: 'View proof details', requiresAuth: true }},
  { path: '/proofs', name: 'proofs', component: () => import('./views/ProofList.vue'), meta: { title: 'LatestProofs', description: 'Browse the latest proofs uploaded by contributors', icon: constants.PROOF_ICON, breadcrumbs: [{title: 'LatestProofs', disabled: true }] }},
  { path: '/products', name: 'products', component: () => import('./views/ProductList.vue'), meta: { title: 'TopProducts', description: 'Discover the most priced products in our database', icon: constants.PRODUCT_ICON, breadcrumbs: [{title: 'TopProducts', disabled: true }] }},
  { path: '/products/:id', name: 'product-detail', component: () => import('./views/ProductDetail.vue'), meta: { title: 'Product detail', description: 'View product details and associated prices' }},
  { path: '/locations', name: 'locations', component: () => import('./views/LocationList.vue'), meta: { title: 'TopLocations', description: 'Explore locations where prices have been recorded', icon: constants.LOCATION_ICON, breadcrumbs: [{title: 'TopLocations', disabled: true }] }},
  { path: '/locations/:id', name: 'location-detail', component: () => import('./views/LocationDetail.vue'), meta: { title: 'Location detail', description: 'View location details and associated prices' }},
  { path: '/locations/:id/proofs', name: 'location-proofs', component: () => import('./views/LocationProofList.vue'), meta: { title: 'Location proofs', description: 'Browse proofs from this location', breadcrumbs: [{title: 'Locations', disabled: false, to: '/locations' }, {title: ':id', disabled: false, to: '/locations/:id' }, {title: 'Proofs', disabled: true }] }},
  { path: '/locations/compare', name: 'locations-compare', component: () => import('./views/LocationsCompare.vue'), meta: { title: 'LocationsCompare', description: 'Compare prices across different locations', icon: 'mdi-information-outline', breadcrumbs: [{title: 'CompareLocations', disabled: true }] }},
  { path: '/countries', name: 'countries', component: () => import('./views/CountryList.vue'), meta: { title: 'Countries', description: 'Browse prices by country', icon: constants.COUNTRY_ICON, breadcrumbs: [{title: 'Countries', disabled: true }] }},
  { path: '/countries/:country', name: 'country-detail', component: () => import('./views/CountryDetail.vue'), meta: { title: 'Country detail', description: 'Explore prices in this country', breadcrumbs: [{title: 'Countries', disabled: false, to: '/countries' }, {title: ':country', disabled: true }] }},
  { path: '/countries/:country/cities/:city', name: 'country-city-detail', component: () => import('./views/CountryCityDetail.vue'), meta: { title: 'City detail', description: 'Explore prices in this city', breadcrumbs: [{title: 'Countries', disabled: false, to: '/countries' }, {title: ':country', disabled: false, to: '/countries/:country' }, {title: 'Cities', disabled: true}, {title: ':city', disabled: true }] }},
  { path: '/brands/:id', name: 'brand-detail', component: () => import('./views/BrandDetail.vue'), meta: { title: 'Brand detail', description: 'View brand details and associated prices' }},
  { path: '/dates/:date', name: 'date-detail', component: () => import('./views/DateDetail.vue'), meta: { title: 'Date detail', description: 'Browse prices added on this date' }},
  { path: '/currencies/:currency', name: 'currency-detail', component: () => import('./views/CurrencyDetail.vue'), meta: { title: 'Currency detail', description: 'View prices in this currency' }},
  { path: '/categories/:id', name: 'category-detail', component: () => import('./views/CategoryDetail.vue'), meta: { title: 'Category detail', description: 'Browse products in this category' }},
  { path: '/labels/:id', name: 'label-detail', component: () => import('./views/LabelDetail.vue'), meta: { title: 'Label detail', description: 'View label details' }},
  { path: '/users', name: 'users', component: () => import('./views/UserList.vue'), meta: { title: 'TopContributors', description: 'Meet our top price contributors', icon: 'mdi-account-star-outline', breadcrumbs: [{title: 'TopContributors', disabled: true }] }},
  { path: '/users/:username', name: 'user-detail', component: () => import('./views/UserDetail.vue'), meta: { title: 'User detail', description: 'View user profile and contributions' }},
  { path: '/users/:username/proofs', name: 'user-proofs', component: () => import('./views/UserProofList.vue'), meta: { title: 'User proofs', description: 'Browse this user\'s proofs', breadcrumbs: [{title: 'Users', disabled: false, to: '/users' }, {title: ':username', disabled: false, to: '/users/:username' }, {title: 'Proofs', disabled: true }] }},
  { path: '/users/:username/badges', name: 'user-badges', component: () => import('./views/UserBadgeList.vue'), meta: { title: 'User badges', description: 'View this user\'s badges', breadcrumbs: [{title: 'Users', disabled: false, to: '/users' }, {title: ':username', disabled: false, to: '/users/:username' }, {title: 'Badges', disabled: true }] }},
  { path: '/explore', name: 'explore', component: () => import('./views/Explore.vue'), meta: { title: 'Explore', description: 'Explore the Open Prices database', icon: 'mdi-magnify-expand', drawerMenu: true, breadcrumbs: [{title: 'Explore', disabled: true }] }},
  { path: '/search', name: 'search', component: () => import('./views/Search.vue'), meta: { title: 'Search', description: 'Search for products, prices, and more', icon: 'mdi-magnify', breadcrumbs: [{title: 'Search', disabled: true }] }},
  { path: '/community', name: 'community', component: () => import('./views/Community.vue'), meta: { title: 'Community', description: 'Learn about the Open Prices community', icon: 'mdi-account-group', drawerMenu: true, breadcrumbs: [{title: 'Community', disabled: true }] }},
  { path: '/reuses', name: 'reuses', component: () => import('./views/Reuses.vue'), meta: { title: 'Reuses', description: 'Discover how Open Prices data is being reused', icon: 'mdi-account-group', drawerMenu: false, breadcrumbs: [{title: 'Reuses', disabled: true }] }},
  { path: '/challenge', name: 'current-challenge', component: () => import('./views/ChallengeDetail.vue'), meta: { title: 'Challenge', description: 'Participate in the current community challenge', icon: constants.CHALLENGE_ICON, drawerMenu: false,  breadcrumbs: [{title: 'Challenges', disabled: false, to: '/challenges' }, {title: 'CommunityChallenge', disabled: true }] }},
  { path: '/challenges', name: 'challenges', component: () => import('./views/ChallengeList.vue'), meta: { title: 'Challenges', description: 'Browse community challenges', icon: constants.CHALLENGE_ICON, drawerMenu: true, breadcrumbs: [{title: 'Challenges', disabled: true }] }},
  { path: '/challenges/:id', name: 'challenge-detail', component: () => import('./views/ChallengeDetail.vue'), meta: { title: 'Challenge', description: 'View challenge details', icon: constants.CHALLENGE_ICON,  breadcrumbs: [{title: 'Challenges', disabled: false, to: '/challenges' }, {title: ':id', disabled: true }] }},
  { path: '/challenges/:id/prices', name: 'challenge-prices', component: () => import('./views/ChallengePriceList.vue'), meta: { title: 'Challenge prices', description: 'Browse prices for this challenge', breadcrumbs: [{title: 'Challenges', disabled: false, to: '/challenges' }, {title: ':id', disabled: false, to: '/challenges/:id' }, {title: 'Prices', disabled: true }] }},
  { path: '/challenges/:id/proofs', name: 'challenge-proofs', component: () => import('./views/ChallengeProofList.vue'), meta: { title: 'Challenge proofs', description: 'Browse proofs for this challenge', breadcrumbs: [{title: 'Challenges', disabled: false, to: '/challenges' }, {title: ':id', disabled: false, to: '/challenges/:id' }, {title: 'Proofs', disabled: true }] }},
  { path: '/badges', name: 'badges', component: () => import('./views/BadgeList.vue'), meta: { title: 'Badges', description: 'Browse available badges', icon: constants.BADGE_ICON, drawerMenu: true, breadcrumbs: [{title: 'Badges', disabled: true }] }},
  { path: '/badges/:id', name: 'badge-detail', component: () => import('./views/BadgeDetail.vue'), meta: { title: 'Badge detail', description: 'View badge details', breadcrumbs: [{title: 'Badges', disabled: false, to: '/badges' }, {title: ':id', disabled: true }] }},
  { path: '/experiments', name: 'experiments', component: () => import('./views/Experiments.vue'), meta: { title: 'Experiments', description: 'Try out experimental features', icon: constants.EXPERIMENTS_ICON, drawerMenu: true, breadcrumbs: [{title: 'Experiments', disabled: true }] }},
  { path: '/experiments/proof-price-tag-assistant', name: 'price-tag-assistant', component: () => import('./views/ProofPriceTagAssistant.vue'), meta: { title: 'ProofPriceTagAssistant', description: 'AI assistant for identifying price tags in photos', icon: 'mdi-draw', requiresAuth: true, breadcrumbs: [{title: 'Experiments', disabled: false, to: '/experiments' }, {title: 'ProofPriceTagAssistant', disabled: true }] }},
  { path: '/experiments/receipt-assistant', name: 'receipt-assistant', component: () => import('./views/ReceiptAssistant.vue'), meta: { title: 'ReceiptAssistant', description: 'AI assistant for processing receipt photos', icon: 'mdi-draw', requiresAuth: true, breadcrumbs: [{title: 'Experiments', disabled: false, to: '/experiments' }, {title: 'ReceiptAssistant', disabled: true }] }},
  { path: '/experiments/create-off-product', name: 'create-off-product', component: () => import('./views/CreateOffProduct.vue'), meta: { title: 'CreateOffProduct', description: 'Create a new Open Food Facts product', icon: 'mdi-draw', requiresAuth: true, breadcrumbs: [{title: 'Experiments', disabled: false, to: '/experiments' }, {title: 'CreateOffProduct', disabled: true }] }},
  { path: '/moderation', name: 'moderation-dashboard', component: () => import('./views/ModerationDashboard.vue'), meta: { title: 'Moderation', description: 'Moderation dashboard', icon: constants.MODERATION_ICON, drawerMenu: true, requiresAuth: true, requiresModerator: true, breadcrumbs: [{title: 'Moderation', disabled: true }] }},
  { path: '/stats', name: 'stats', component: () => import('./views/Stats.vue'), meta: { title: 'Stats', description: 'View statistics about the Open Prices database', icon: constants.STATS_ICON, drawerMenu: true, breadcrumbs: [{title: 'Stats', disabled: true }] }},
  { path: '/settings', name: 'settings', component: () => import('./views/Settings.vue'), meta: { title: 'Settings', description: 'Manage your account settings', icon: constants.SETTINGS_ICON, drawerMenu: true, breadcrumbs: [{title: 'Settings', disabled: true }] }},
  { path: '/about', name: 'about', component: () => import('./views/About.vue'), meta: { title: 'About', description: 'Learn about Open Prices and its mission', icon: constants.ABOUT_ICON, drawerMenu: true, breadcrumbs: [{title: 'About', disabled: true }] }},
  // redirects (in the component)
  { path: '/locations/osm/:osmType/:osmId', name: 'location-osm-detail', component: () => import('./views/LocationOSMDetail.vue'), meta: { title: 'Location OSM detail', description: 'View location details from OpenStreetMap' }},
  // redirects
  { path: '/experiments/challenge', redirect: '/challenge' },
  { path: '/experiments/contribution-assistant', redirect: '/experiments/proof-price-tag-assistant' },
  { path: '/experiments/price-validation-assistant', redirect: '/prices/add/validate' },
  { path: '/proofs/add/multiple', redirect: '/proofs/add/price-tags' },
  // Why this redirect?
  // The app used to be available at https://prices.openfoodfacts.org/app
  // It is now available at https://prices.openfoodfacts.org
  // Therefore we redirect old users to the new URL, by removing any incoming /app routes
  { path: '/app:path(.*)', redirect: to => { return { path: to.params.path }} },
  // 404
  { path: '/:path(.*)', component: () => import('./views/NotFound.vue') },
]

/**
 * Create the Vue Router instance with the defined routes and history mode.
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

/**
 * Before each page change:
 * - check the user's preferred language and update the app's language if necessary
 * - check if it needs authentication. If required, but the user is not authenticated (token unknown):
 *   - then redirect to 'sign-in'
 *   - the initial url is passed as query parameter ?next=, in order to redirect back after login
 * - check if it needs moderator privileges. If required, but the user is not a moderator:
 *   - then redirect to 'home'
 */
 router.beforeEach(async (to, from, next) => {
  const store = useAppStore()
  const locale = localeManager.guessDefaultLocale()
  if (locale !== store.user.language) {
    await localeManager.changeLanguage(locale)
  }
  if (to.meta.requiresAuth && !store.user.token) {
    return next({ name: 'sign-in', query: { next: to.fullPath } })
  }
  else if (to.meta.requiresModerator && !store.user.is_moderator) {
    return next({ name: 'home' })
  }

  next()
})

/**
 * When a new version is deployed, the (hashed) js chunks of the previous version disappear from the server.
 * Users who still have the previous version open then fail to lazy-load any view they haven't visited yet
 * ("Failed to fetch dynamically imported module"), and the navigation silently does nothing.
 * In that case, do a full page load of the target route (see router.onError below): it picks up the new version.
 * The sessionStorage key avoids a reload loop if the chunk is still missing after the reload.
 */
const CHUNK_LOAD_ERROR_RELOAD_KEY = 'chunk-load-error-reload'
const CHUNK_LOAD_ERROR_REGEX = /Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed/i  // Chrome / Firefox / Safari

/**
 * After each page change, update the document title and meta tags based on the route meta.
 */
router.afterEach((to) => {
  const routeTitle = to.meta?.title
  const routeDescription = to.meta?.description || constants.APP_DESCRIPTION

  let resolvedTitle = constants.APP_NAME
  if (routeTitle) {
    const translationKey = `Router.${routeTitle}.Title`
    const hasTranslation = i18n.global.te(translationKey)
    resolvedTitle = hasTranslation
      ? `${i18n.global.t(translationKey)} | ${constants.APP_NAME}`
      : `${routeTitle} | ${constants.APP_NAME}`
  }

  // Update document title
  document.title = resolvedTitle

  // Update meta tags directly
  // (unjs/unhead doesn't work outside Vue setup context)
  utils.setMeta('name', 'description', routeDescription)
  utils.setMeta('property', 'og:title', resolvedTitle)
  utils.setMeta('property', 'og:description', routeDescription)
  utils.setMeta('name', 'twitter:title', resolvedTitle)
  utils.setMeta('name', 'twitter:description', routeDescription)

  // navigation succeeded: forget any chunk-load reload (see router.onError)
  sessionStorage.removeItem(CHUNK_LOAD_ERROR_RELOAD_KEY)
})

/**
 * On navigation error: reload the page if a view's js chunk couldn't be loaded (see CHUNK_LOAD_ERROR_REGEX above).
 */
router.onError((error, to) => {
  if (!CHUNK_LOAD_ERROR_REGEX.test(error?.message)) {
    return
  }
  if (sessionStorage.getItem(CHUNK_LOAD_ERROR_RELOAD_KEY) === to.fullPath) {
    // already reloaded once for this route: don't loop, let the error surface
    return
  }
  sessionStorage.setItem(CHUNK_LOAD_ERROR_RELOAD_KEY, to.fullPath)
  window.location.assign(to.fullPath)
})

export default router
