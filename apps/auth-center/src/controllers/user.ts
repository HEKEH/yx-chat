import { LoginRequestBody } from '@yx-chat/shared/types';
import { Context } from 'koa';

export default class UserController {
  static async login(ctx: Context) {
    const { username, password } = ctx.request
      .query as unknown as LoginRequestBody;
    ctx.body = { username, password };
  }
}
