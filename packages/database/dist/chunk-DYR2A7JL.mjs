// src/config.ts
var { env } = process;
var config = {
  /** mongodb url */
  mongoDBUrl: env.MONGO_DB_URL || "mongodb://localhost:27017/yx-chat"
};
var config_default = config;

export {
  config_default
};
