const env = import.meta.env; // import.meta来自vite，process.env无法取到值
let path = env.PUBLIC_SERVER_BASE_URL;
if (path && env.PUBLIC_SERVER_PORT) {
  path = `${path}:${env.PUBLIC_SERVER_PORT}`;
}
export default {
  server: path || (env.MODE === 'development' ? 'http://localhost:6870' : '/'),
};
