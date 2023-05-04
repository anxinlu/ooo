import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from './router'
import 'element-plus/dist/index.css'
import '@/assets/styles/main.css'
import '@/assets/styles/element-variables.scss'
import 'virtual:svg-icons-register'
import svgIcon from "@/components/svgIcon";

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(svgIcon)

app.mount('#app')
