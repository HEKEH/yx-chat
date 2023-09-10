import http from 'http';
import Koa from 'koa';

const app = new Koa();
app.proxy = true;

const httpServer = http.createServer(app.callback());

export default httpServer;
