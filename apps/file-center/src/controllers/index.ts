import {
  RESPONSE_CODE,
  UploadFileSuccessResponse,
} from '@yx-chat/shared/types';
import { Context, Next } from 'koa';
import getFile from '~/services/file';
import upload from '~/services/upload';
import { getContentTypeByFilename } from '~/utils/content-type';

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
    const filename = ctx.params.filename as string;
    const file = await getFile(filename);
    if (file) {
      const contentType = getContentTypeByFilename(filename);
      ctx.set('Content-Type', contentType);
      if (
        contentType.startsWith('image/') ||
        contentType.startsWith('video/') ||
        contentType.startsWith('audio/')
      ) {
        ctx.set('Content-Disposition', `inline; filename=${filename}`);
      } else {
        ctx.set('Content-Disposition', `attachment; filename=${filename}`);
      }
      ctx.body = file;
    }
    await next();
  }
}
