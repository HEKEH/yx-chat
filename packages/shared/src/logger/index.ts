import * as process from 'node:process';
import { getLogger } from 'log4js';

const logger = getLogger();
logger.level = process.env.NODE_ENV === 'production' ? 'info' : 'trace';
export { logger };
