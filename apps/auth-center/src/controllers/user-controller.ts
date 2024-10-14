import { Context } from 'koa';

export default class UserController {
  static async login(ctx: Context) {
    ctx.body = { message: 'Login' };
  }
}
