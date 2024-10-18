import Router from 'koa-router';
import Controller from '~/controllers';
import { tokenAuthMiddleware } from '~/middlewares';
import { uploadMulter } from '~/services/upload';

const router = new Router();

// file upload
router.post(
  '/upload',
  tokenAuthMiddleware,
  uploadMulter.single('file'),
  Controller.upload,
);

router.get('/file/:filename', tokenAuthMiddleware, Controller.getFile);

export default router;
