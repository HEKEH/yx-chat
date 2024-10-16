import type { LANGUAGE } from '@yx-chat/shared/constants';

export type WithLng<T extends object> = T & { lng?: LANGUAGE };
