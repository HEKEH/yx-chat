/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { name } = require('./package.json');

module.exports = {
  apps: [
    {
      name,
      script: path.resolve(__dirname, './dist/index.js'),
      instances: 1,
      autorestart: true,
      watch: true,
      exec_mode: 'fork',
      // node_args: '-r dotenv/config', // 注入.env参数
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },
    },
  ],
};
