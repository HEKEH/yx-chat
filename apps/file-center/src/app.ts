import path from 'path';
import http from 'http';
import { corsMiddleware } from '@yx-chat/shared/utils';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import koaStatic from 'koa-static';
import config from './config';
import {
  addContextPropsMiddleware,
  compressMiddleware,
  requestWrapMiddleware,
} from './middlewares';
import router from './routes';

export default function initApp() {
  const app = new Koa();

  // app.proxy = true;

  // Add compression middleware
  app.use(compressMiddleware);

  // serve public static files
  app.use(
    koaStatic(path.join(__dirname, '../public/assets'), {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      gzip: true,
    }),
  );
  app.use(corsMiddleware(config.allowOrigin));
  app.use(bodyParser());
  app.use(addContextPropsMiddleware);
  app.use(requestWrapMiddleware);
  // use router
  app.use(router.routes());
  app.use(router.allowedMethods());

  const httpServer = http.createServer(app.callback());

  return httpServer;
}
