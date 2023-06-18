import { createApp } from 'vue';
import App from './App';
import './style.css';
import { registerServices } from './utils/vue';

const app = createApp(App);
registerServices(app);
app.mount('#app');
