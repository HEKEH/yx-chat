import http from 'http';
import path from 'path';
import Koa from 'koa';
import koaStatic from 'koa-static';
import { Server } from 'socket.io';
import logger from './utils/logger';
import config from './config';
import { registerSocketEventHandlers } from './socket-io/handler';
import { SocketContext } from './socket-io/context';
import SocketModel from './database/mongoDB/model/socket';

const app = new Koa();
app.proxy = true;

// serve public static files
app.use(
  koaStatic(path.join(__dirname, '../public'), {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    gzip: true,
  }),
);

const httpServer = http.createServer(app.callback());

const io = new Server(httpServer, {
  cors: {
    origin: config.allowOrigin || '*',
    credentials: true,
  },
  pingTimeout: 10000,
  pingInterval: 5000,
});

io.on('connection', async socket => {
  const context = new SocketContext(socket);
  logger.info(`connection ${socket.id} ${context.socketIp}`);
  await SocketModel.create({
    id: socket.id,
    ip: context.socketIp,
  });

  socket.on('disconnect', async () => {
    logger.info(`disconnect ${socket.id} ${context.socketIp}`);
    await SocketModel.deleteOne({
      id: socket.id,
    });
  });

  registerSocketEventHandlers(context);

  // socket.use(seal(socket));
  // socket.use(isLogin(socket));
  // socket.use(isAdmin(socket));
  // socket.use(frequency(socket));
  // socket.use(registerRoutes(socket, routes));
});

export default httpServer;
