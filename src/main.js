import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import router from './router.js'
import { vuetify } from './plugins/vuetify.js'

let app = createApp(App)

app.use(router)
app.use(vuetify)
app.mount('#app')
