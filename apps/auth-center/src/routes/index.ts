import Router from 'koa-router';
import userRouter from './user';
import authRouter from './auth';

const router = new Router({
  prefix: '/:lng(en|zh-cn)?',
});

router.use(userRouter.routes(), userRouter.allowedMethods());

router.use(authRouter.routes(), authRouter.allowedMethods());

export default router;
