import Router from 'koa-router';
import UserController from '../controllers/user-controller';

const userRouter = new Router({ prefix: '/user' });

userRouter.post('/login', UserController.login);
userRouter.get('/login', UserController.login);

export default userRouter;
