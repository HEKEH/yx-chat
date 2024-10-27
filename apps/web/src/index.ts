import { createApp } from 'vue';
import { vLoading } from 'element-plus';
import App from './App';
import i18n from './infra/i18n';
import './style.css';
import './styles/global.sass';
import './styles/theme.sass';

const app = createApp(App);
app.directive('loading', vLoading);

app.use(i18n);
app.mount('#app');
