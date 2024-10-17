import { I18nMessage } from '@yx-chat/i18n/types';
import zhCn from '@yx-chat/i18n/zh-cn';
import { createI18n } from 'vue-i18n';
import { LANGUAGE } from '@yx-chat/shared/constants';
import config from '~/config';
import { LocalStorageStore } from '../local-storage-store';

const initialMessages: { [x in LANGUAGE]?: I18nMessage } = {
  [LANGUAGE.ZH_CN]: zhCn,
};

const i18n = createI18n({
  legacy: false,
  fallbackLocale: LANGUAGE.ZH_CN,
  messages: initialMessages,
});

const LoadLocaleMap = {
  en: () => import('@yx-chat/i18n/en'),
};

async function loadLocaleMessages(locale: Exclude<LANGUAGE, LANGUAGE.ZH_CN>) {
  if (i18n.global.availableLocales.includes(locale)) {
    return;
  }
  // load locale messages with dynamic import
  // cannot code like import(`@yx-chat/i18n/${locale}`)
  const messages = await LoadLocaleMap[locale]();

  // set locale and locale message
  i18n.global.setLocaleMessage(
    locale,
    messages.default as unknown as I18nMessage,
  );
}

export async function setI18nLanguage(locale: LANGUAGE) {
  if (locale !== LANGUAGE.ZH_CN) {
    await loadLocaleMessages(locale);
  }
  i18n.global.locale.value = locale;
  LocalStorageStore.instance.setItem('locale', locale);
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector('html')?.setAttribute('lang', locale);
}

export async function initI18n() {
  await setI18nLanguage(
    LocalStorageStore.instance.getItem<LANGUAGE | undefined>('locale') ||
      config.defaultLanguage,
  );
}

export const I18N_OPTIONS: { value: LANGUAGE; label: string }[] = [
  { value: LANGUAGE.EN, label: 'English' },
  { value: LANGUAGE.ZH_CN, label: '中文' },
];

export default i18n;
