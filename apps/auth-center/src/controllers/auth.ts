import { Context, Next } from 'koa';

export default class AuthController {
  static async authToken(ctx: Context, next: Next) {
    ctx.body = { message: 'Auth Token' };
    await next();
  }
}
