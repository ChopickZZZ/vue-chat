import { createApp } from 'vue'
import { createPinia } from 'pinia'
import focusDirective from './plugins/focusDirective';
import App from './App.vue'
import "./style.css";

const pinia = createPinia()

createApp(App)
   .use(pinia)
   .use(focusDirective)
   .mount('#app')
