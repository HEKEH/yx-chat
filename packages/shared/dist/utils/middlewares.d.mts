import Koa from 'koa';

declare function corsMiddleware(allowOrigin: string): (ctx: Koa.Context, next: Koa.Next) => Promise<void>;

export { corsMiddleware };
