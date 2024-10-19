import mongoose, { ConnectOptions } from 'mongoose';
import { logger } from '@yx-chat/shared/logger';

import config from './config';

export async function initMongoDB(options?: ConnectOptions) {
  try {
    const instance = await mongoose.connect(config.mongoDBUrl, options);
    logger.info('[mongoDB] connected to', config.mongoDBUrl);
    // await SocketModel.deleteMany({}); // delete all socket history data
    return instance;
  } catch (err) {
    if (err) {
      logger.error('[mongoDB]', (err as Error).message);
      process.exit(1);
    } else {
      return null;
    }
  }
}

export * from './model';
