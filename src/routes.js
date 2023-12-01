import Home from './views/Home.vue'
import AddPrice from './views/AddPrice.vue'
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export let routes = [
  { path: '/', component: Home, meta: { title: 'Home' } },
  { path: '/add', name: 'add-price', component: AddPrice, meta: { title: 'Add a price' } },
  { path: '/:path(.*)', component: NotFound },
]
