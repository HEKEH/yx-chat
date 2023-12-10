import mongoose, { ConnectOptions } from 'mongoose';

import config from '../../config';
import logger from '../../utils/logger';
import SocketModel from './model/socket';

export default async function initMongoDB(options?: ConnectOptions) {
  try {
    const instance = await mongoose.connect(config.mongoDBUrl, options);
    logger.info('[mongoDB] connected to', config.mongoDBUrl);
    await SocketModel.deleteMany({}); // delete all socket history data
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
