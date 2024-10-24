import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { initHttpClientPlugin } from './plugins/httpClient'

import './index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(initHttpClientPlugin, { baseURL: import.meta.env.VITE_PUBLIC_API_URL })

app.mount('#app')
