import { TOKEN_HEADER_KEY } from '@yx-chat/shared/constants';
import { Context, Next } from 'koa';
import { authToken } from '~/services/auth';

export default class AuthController {
  static async authToken(ctx: Context, next: Next) {
    const token = ctx.header[TOKEN_HEADER_KEY] as string | undefined;
    const data = await authToken(token);
    ctx.body = data;
    await next();
  }
}
