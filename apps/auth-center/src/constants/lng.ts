import { enum2ValueArray } from '@yx-chat/shared/utils';

export enum LANGUAGE {
  EN = 'en',
  ZH_CN = 'zh-cn',
}

export const ACCEPT_LANGUAGES = enum2ValueArray(LANGUAGE);
