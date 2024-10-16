// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Koa from 'koa';

declare module 'koa' {
  function getRequestData<T = any>(): T;
  export interface Context {
    getRequestData<T = any>(): T;
  }
}

declare module 'koa-router' {
  export interface IRouterParamContext {
    getRequestData<T = any>(): T;
  }
}
