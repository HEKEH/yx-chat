// @ts-expect-error ignore type error
const env = import.meta.env; // import.meta来自vite，process.env无法取到值
let serverUrl = env.PUBLIC_SERVER_HOSTNAME;
if (serverUrl && env.PUBLIC_SERVER_PORT) {
  serverUrl = `${serverUrl}:${env.PUBLIC_SERVER_PORT}`;
}

export default {
  server:
    serverUrl || (env.MODE === 'development' ? 'http://localhost:6870' : '/'),
};
