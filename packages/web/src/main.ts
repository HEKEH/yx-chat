import { createApp, reactive } from 'vue';
import './style.css';
import App from './App';
import serviceContext from './domain/service';

const app = createApp(App);
app.config.globalProperties.$services = reactive(serviceContext);
app.mount('#app');
