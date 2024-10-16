import path from 'path';
import i18n, { TOptions } from 'i18next';
import Backend from 'i18next-fs-backend';
import { ACCEPT_LANGUAGES } from '@yx-chat/shared/constants';
import config from '~/config';

i18n.use(Backend).init({
  backend: {
    loadPath: path.join(process.cwd(), 'public/locales/{{lng}}.json'),
  },
  preload: ACCEPT_LANGUAGES,
});

export const t = (key: string, options?: TOptions) => {
  return i18n.t(key, { lng: config.defaultLanguage, ...options });
};

export default i18n;
