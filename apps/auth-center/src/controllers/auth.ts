import { Context } from 'koa';

export default class AuthController {
  static async auth(ctx: Context) {
    return { message: 'Auth' };
  }
}
