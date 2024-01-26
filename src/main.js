import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueMatomo from 'vue-matomo'
import './assets/main.css'
import App from './App.vue'
import router from './router.js'
import { vuetify } from './plugins/vuetify.js'
import i18n from './i18n'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(i18n)
app.use(VueMatomo, {
  host: 'https://analytics.openfoodfacts.org/',
  siteId: 13,
})

app.mount('#app')

// Matomo
window._paq.push(['trackPageView'])
window._paq.push(['enableLinkTracking'])
