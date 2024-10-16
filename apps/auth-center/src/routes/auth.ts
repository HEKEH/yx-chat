import Router from 'koa-router';
import AuthController from '../controllers/auth';

const authRouter = new Router({ prefix: '/auth' });

authRouter.get('/token', AuthController.authToken);
export default authRouter;
