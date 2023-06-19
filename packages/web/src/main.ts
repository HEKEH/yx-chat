import { createApp } from 'vue';
import App from './App';
import './style.css';
import { registerServices } from './utils/vue';
import globalServiceContext from './domain/service';

const app = createApp(App);
registerServices(app, globalServiceContext);
app.mount('#app');
