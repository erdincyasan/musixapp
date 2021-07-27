import { createApp } from 'vue';
import VeeValidator from './includes/validation';
import App from './App.vue';
import router from './router';
import store from './store';
import './includes/firebase';
import './assets/tailwind.css';
import './assets/main.css';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(VeeValidator);
app.mount('#app');
