import { createApp } from 'vue'

import App from './App.vue'
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import axios from 'axios'
import VueAxios from 'vue-axios'


import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primeflex/primeflex.css';

// createApp(App).mount('#app')

const app = createApp(App);

app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.use(VueAxios, axios)

app.mount('#app')