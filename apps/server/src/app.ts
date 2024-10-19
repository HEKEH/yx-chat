import http from 'http';
import { Server } from 'socket.io';
import { SocketModel } from '@yx-chat/database';
import { logger } from '@yx-chat/shared/logger';
import config from './config';
import { registerSocketEventHandlers } from './socket-io/handler';
import { SocketContext } from './socket-io/context';

export default function initApp() {
  const httpServer = http.createServer((req, res) => {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  });

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
    registerSocketEventHandlers(context);
    // socket.use(seal(socket));
    // socket.use(isLogin(socket));
    // socket.use(isAdmin(socket));
    // socket.use(frequency(socket));
    // socket.use(registerRoutes(socket, routes));

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
  });
  return httpServer;
}
