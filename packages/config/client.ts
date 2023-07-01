const env = import.meta.env; // import.meta来自vite，process.env无法取到值
export default {
  server:
    env.CLIENT_SERVER_PATH ||
    (env.MODE === 'development' ? 'http://localhost:9200' : '/'),
};
