import { I18nMessage, Locale } from '@yx-chat/i18n/types';
import zhCn from '@yx-chat/i18n/zh-cn';
import { createI18n } from 'vue-i18n';
import { LocalStorageStore } from '../local-storage-store';

const initialMessages: { [x in Locale]?: I18nMessage } = {
  'zh-cn': zhCn,
};

const i18n = createI18n({
  legacy: false,
  fallbackLocale: 'zh-cn',
  messages: initialMessages,
});

const LoadLocaleMap = {
  en: () => import('@yx-chat/i18n/en'),
};

async function loadLocaleMessages(locale: Exclude<Locale, 'zh-cn'>) {
  if (i18n.global.availableLocales.includes(locale)) {
    return;
  }
  // load locale messages with dynamic import
  // cannot code like import(`@yx-chat/i18n/${locale}`)
  const messages = await LoadLocaleMap[locale]();

  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default);
}

export async function setI18nLanguage(locale: Locale) {
  if (locale !== 'zh-cn') {
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
    LocalStorageStore.instance.getItem('locale') || 'zh-cn',
  );
}

export const I18N_OPTIONS: { value: Locale; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'zh-cn', label: '中文' },
];

export default i18n;
