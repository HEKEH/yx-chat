import Router from 'koa-router';
import UserController from '../controllers/user';

const userRouter = new Router({ prefix: '/user' });

userRouter.get('/login', UserController.login);

export default userRouter;
