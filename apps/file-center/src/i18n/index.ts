import path from 'path';
import i18n from 'i18next';
import Backend from 'i18next-fs-backend';
import { ACCEPT_LANGUAGES } from '@yx-chat/shared/constants';

i18n.use(Backend).init({
  backend: {
    loadPath: path.join(process.cwd(), 'public/locales/{{lng}}.json'),
  },
  preload: ACCEPT_LANGUAGES,
});

export default i18n;
