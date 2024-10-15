import Router from 'koa-router';
import UserController from '../controllers/user';

const userRouter = new Router({ prefix: '/user' });

userRouter.get('/login', UserController.login);
userRouter.get('/loginByToken', UserController.loginByToken);
userRouter.post('/register', UserController.register);

export default userRouter;
