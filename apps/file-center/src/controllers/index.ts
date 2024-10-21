import {
  RESPONSE_CODE,
  UploadFileSuccessResponse,
} from '@yx-chat/shared/types';
import { Context, Next } from 'koa';
import getFile from '~/services/file';
import upload from '~/services/upload';

export default class Controller {
  static async upload(ctx: Context, next: Next) {
    const filename = await upload(ctx.file);
    ctx.body = {
      status: RESPONSE_CODE.SUCCESS,
      data: {
        filename,
      } as UploadFileSuccessResponse,
    };
    await next();
  }
  static async getFile(ctx: Context, next: Next) {
    const { filename } = ctx.params;
    const file = await getFile(filename);
    if (file) {
      ctx.set('Content-Type', 'application/octet-stream');
      ctx.set('Content-Disposition', `attachment; filename=${filename}`);
      ctx.body = file;
    }
    await next();
  }
}
