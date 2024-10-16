/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-unused-vars */

import Koa from 'koa';
import { TOptions } from 'i18next';
import type { LANGUAGE } from '~/constants/lng';

interface CustomContext {
  readonly logId: string;
  getRequestData<T = any>(): T;
  readonly lng: LANGUAGE | undefined;
  t: (key: string, options?: TOptions) => string;
}

declare module 'koa' {
  function getRequestData<T = any>(): T;
  export interface Context extends CustomContext {}
}

declare module 'koa-router' {
  export interface IRouterParamContext extends CustomContext {}
}
