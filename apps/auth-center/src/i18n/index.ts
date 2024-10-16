import path from 'path';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import config from '~/config';

i18next.use(Backend).init({
  backend: {
    loadPath: path.join(process.cwd(), 'public/locales/{{lng}}.json'),
  },
  fallbackLng: config.defaultLanguage,
  preload: ['en', 'zh-cn'],
});

export default i18next;
