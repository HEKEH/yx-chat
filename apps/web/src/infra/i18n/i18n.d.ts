import type { I18nMessage } from '@yx-chat/i18n/types';

/** strictly define the type of the Locale message */
declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends I18nMessage {}
}
