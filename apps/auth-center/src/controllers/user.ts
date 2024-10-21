import {
  LoginByTokenRequestBody,
  LoginRequestBody,
  RegisterRequestBody,
  UpdateAvatarRequestBody,
} from '@yx-chat/shared/types';
import { Context, Next } from 'koa';
import { login, register, loginByToken, updateAvatar } from '~/services/user';

export default class UserController {
  static async login(ctx: Context, next: Next) {
    const data = ctx.getRequestData<LoginRequestBody>();
    ctx.body = await login(data);
    await next();
  }
  static async loginByToken(ctx: Context, next: Next) {
    const data = ctx.getRequestData<LoginByTokenRequestBody>();
    ctx.body = await loginByToken(data);
    await next();
  }
  static async register(ctx: Context, next: Next) {
    const data = ctx.getRequestData<RegisterRequestBody>();
    ctx.body = await register(data);
    await next();
  }
  static async updateAvatar(ctx: Context, next: Next) {
    const data = ctx.getRequestData<UpdateAvatarRequestBody>();
    await updateAvatar(data);
    await next();
  }
}
