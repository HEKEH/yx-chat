/* eslint-disable @typescript-eslint/no-empty-interface */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Koa from 'koa';

interface CustomContext {
  getRequestData<T = any>(): T;
  readonly lng: 'en' | 'zh-cn' | undefined;
}

declare module 'koa' {
  function getRequestData<T = any>(): T;
  export interface Context extends CustomContext {}
}

declare module 'koa-router' {
  export interface IRouterParamContext extends CustomContext {}
}
