import Router from 'koa-router';
import Controller from '~/controllers';
import { uploadMulter } from '~/services/upload';

const router = new Router();

// file upload
router.post('/upload', uploadMulter.single('file'), Controller.upload);

export default router;
