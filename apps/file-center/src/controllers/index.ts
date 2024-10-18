import { Context, Next } from 'koa';
import upload from '~/services/upload';

export default class Controller {
  static async upload(ctx: Context, next: Next) {
    await upload(ctx.file);
    ctx.body = {
      message: ctx.t('File uploaded successfully'),
    };
    await next();
  }
}
