import multer from '@koa/multer';
import {
  RESPONSE_CODE,
  UploadFilesSuccessResponse,
  UploadFileSuccessResponse,
} from '@yx-chat/shared/types';
import { Context, Next } from 'koa';
import getFile from '~/services/file';
import { uploadSingleFile, uploadFiles } from '~/services/upload';
import { getContentTypeByFilename } from '~/utils/content-type';

export default class Controller {
  static async upload(ctx: Context, next: Next) {
    const filename = await uploadSingleFile(ctx.file);
    ctx.body = {
      status: RESPONSE_CODE.SUCCESS,
      data: {
        filename,
      } as UploadFileSuccessResponse,
    };
    await next();
  }
  static async uploadFiles(ctx: Context, next: Next) {
    const filenames = await uploadFiles(ctx.files as multer.File[]);
    ctx.body = {
      status: RESPONSE_CODE.SUCCESS,
      data: {
        filenames,
      } as UploadFilesSuccessResponse,
    };
    await next();
  }
  static async getFile(ctx: Context, next: Next) {
    const filename = ctx.params.filename as string;
    const file = await getFile(filename);
    if (file) {
      const contentType = getContentTypeByFilename(filename);
      ctx.set('Content-Type', contentType);
      const downloadName = (ctx.query['download-name'] || filename) as string;
      const sanitizedName = encodeURIComponent(downloadName);
      if (
        contentType.startsWith('image/') ||
        contentType.startsWith('video/') ||
        contentType.startsWith('audio/')
      ) {
        ctx.set('Content-Disposition', `inline; filename=${sanitizedName}`);
      } else {
        ctx.set('Content-Disposition', `attachment; filename=${sanitizedName}`);
      }
      ctx.body = file;
    }
    await next();
  }
}
