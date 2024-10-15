import {
  LoginByTokenRequestBody,
  LoginRequestBody,
  RegisterRequestBody,
} from '@yx-chat/shared/types';
import { Context } from 'koa';
import { login, register, loginByToken } from '~/services/user';

export default class UserController {
  static async login(ctx: Context) {
    const data = ctx.request.query as unknown as LoginRequestBody;
    ctx.body = await login(data);
  }
  static async loginByToken(ctx: Context) {
    const data = ctx.request.query as unknown as LoginByTokenRequestBody;
    ctx.body = await loginByToken(data);
  }
  static async register(ctx: Context) {
    const data = ctx.request.body as unknown as RegisterRequestBody;
    ctx.body = await register(data);
  }
}
