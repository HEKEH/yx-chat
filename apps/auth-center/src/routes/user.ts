import Router from 'koa-router';
import UserController from '../controllers/user';

const userRouter = new Router({ prefix: '/user' });

userRouter.get('/login', UserController.login);
userRouter.get('/login-by-token', UserController.loginByToken);
userRouter.post('/register', UserController.register);
userRouter.post('/update-user-info', UserController.updateUserInfo);

export default userRouter;
