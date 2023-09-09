import { createApp } from 'vue';
import Element from 'element-plus';
import App from './App';
import i18n from './infra/i18n';
import './style.css';
import './styles/global.sass';
import './styles/theme.sass';

const app = createApp(App);
app.use(Element); // TODO 最好干掉，不要全局如此使用
// app.directive('v-loading', vLoading); // TODO 不生效，过一段时间再尝试

app.use(i18n);
app.mount('#app');
