import { createApp } from 'vue';
import Element from 'element-plus';
import App from './App';
import i18n from './infrastructure/i18n';
import { LocalStorageStore } from './infrastructure/local-store/local-storage-store';
import { registerServices } from './utils/vue';
import { setTheme } from './utils/theme';
import globalServiceContext from './domain/service';

import './style.css';
import './styles/global.sass';

setTheme(LocalStorageStore.instance.getItem('theme') || 'cool');

const app = createApp(App);
registerServices(app, globalServiceContext);
app.use(Element); // TODO 最好干掉，不要全局如此使用
// app.directive('v-loading', vLoading); // TODO 不生效，过一段时间再尝试

app.use(i18n);
app.mount('#app');