import fs from 'fs';
import { logger } from '@yx-chat/shared/logger';
import config from './config';
import initApp from './app';

const { env } = process;
logger.info('[env]', env.NODE_ENV);
logger.info('[port]', env.FILE_CENTER_PORT);

(async () => {
  // init file upload directory
  !fs.existsSync(config.uploadDir) &&
    fs.mkdirSync(config.uploadDir, { recursive: true });

  initApp().listen(config.port, async () => {
    logger.info(`>>> server listen on http://localhost:${config.port}`);
  });

  return null;
})();
