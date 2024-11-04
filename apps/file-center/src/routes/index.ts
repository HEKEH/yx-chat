import Router from 'koa-router';
import Controller from '~/controllers';
import { tokenAuthMiddleware } from '~/middlewares';
import { uploadMulter } from '~/services/upload';
import range from 'koa-range';

const router = new Router();

// file upload
router.post(
  '/upload',
  tokenAuthMiddleware,
  uploadMulter.single('file'),
  Controller.upload,
);

// files upload
router.post(
  '/upload-files',
  tokenAuthMiddleware,
  uploadMulter.array('files'),
  Controller.uploadFiles,
);

router.get(
  '/file/:filename',
  range, // handle range request of video or audio
  Controller.getFile,
);

export default router;
