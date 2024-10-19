const { env } = process;

const config = {
  /** mongodb url */
  mongoDBUrl: env.MONGO_DB_URL || 'mongodb://localhost:27017/yx-chat',
};

// console.log('config', config);

export default config;
