import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import clickOutside from "@/directives/clickOutside";

const app = createApp(App)
app.use(store)
clickOutside(app)
app.mount('#app')
