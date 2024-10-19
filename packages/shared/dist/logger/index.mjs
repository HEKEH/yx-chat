// src/logger/index.ts
import { getLogger } from "log4js";
var logger = getLogger();
logger.level = process.env.NODE_ENV === "production" ? "info" : "trace";
export {
  logger
};
