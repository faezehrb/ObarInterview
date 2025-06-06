import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-rtl/dist/css/bootstrap-rtl.min.css'; 

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

createApp(App)
.use(router)
.mount('#app')