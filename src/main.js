import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueMatomo from 'vue-matomo'
import './assets/main.css'
import App from './App.vue'
import router from './router.js'
import { vuetify } from './plugins/vuetify.js'
import i18n from './i18n'
import localeManager from './i18n/localeManager.js'
import * as Sentry from "@sentry/vue"

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(i18n)

app.use(VueMatomo, {
  host: 'https://analytics.openfoodfacts.org',
  siteId: 13,
})

const locale = localeManager.guessDefaultLocale()
localeManager.changeLanguage(locale)

// Sentry
if (import.meta.env.VITE_SENTRY_DSN) {
  if (["staging", "prod"].includes(import.meta.env.VITE_OPEN_PRICES_ENV)) {
    if (window.location.origin === import.meta.env.VITE_OPEN_PRICES_APP_URL) {
      Sentry.init({
        app,
        dsn: import.meta.env.VITE_SENTRY_DSN,
        environment: import.meta.env.VITE_OPEN_PRICES_ENV,
        sendDefualtPii: false,  // default
        tracesSampleRate: 1  // default
      })
    }
  }
}

app.mount('#app')

// Matomo
window._paq.push(['trackPageView'])
window._paq.push(['enableLinkTracking'])
