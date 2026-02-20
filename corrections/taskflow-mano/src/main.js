import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import './styles/tooltip.css'
import App from './App.vue'
import router from './router'
import { TaskFlowDirectives } from './plugins/taskflowDirectives'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(TaskFlowDirectives)
app.mount('#app')
