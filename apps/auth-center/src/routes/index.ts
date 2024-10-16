import Router from 'koa-router';
import { ACCEPT_LANGUAGES } from '@yx-chat/shared/constants';
import userRouter from './user';
import authRouter from './auth';

const router = new Router({
  prefix: `/:lng(${ACCEPT_LANGUAGES.join('|')})?`,
});

router.use(userRouter.routes(), userRouter.allowedMethods());

router.use(authRouter.routes(), authRouter.allowedMethods());

export default router;
